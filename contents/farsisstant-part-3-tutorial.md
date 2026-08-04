---
title: 'Farsisstant: Build Your Own RAG Chatbot (Part 3)'
created_at: '2026-08-04T17:42:00Z'
description: 'Step-by-step tutorial on how to fork the Farsisstant repo, set up Pinecone, and customize the personality.'
url: 'https://github.com/keynesfariz/personal-rag-chatbot'
tags:
  ['rag', 'chatbot', 'tutorial', 'pinecone', 'github-webhook', 'open-source']
---

We've talked about the architecture in [Part 1](/writings/farsisstant-part-1-architecture) and dug into the backend ingestion engine in [Part 2](/writings/farsisstant-part-2-backend). Now, it's time for the fun part: making it yours.

I built this so anyone can fork it, plug in their own API keys, and have a fully functional RAG chatbot reading their own GitHub repos. Here is exactly how you do it.

## The Backend Stack & Free Services

Before we start, here's a quick rundown of what we're actually using under the hood:

- **Language & Framework**: [Python](https://www.python.org/) ([FastAPI](https://fastapi.tiangolo.com/))
- **Orchestrator**: [Langchain](https://www.langchain.com/)
- **Vector DB**: [Pinecone](https://pinecone.io) (plus your choice of free embedding model)
- **Ingestion Mechanism**: [GitHub Webhooks](https://docs.github.com/en/webhooks)
- **RDBMS**: [Supabase](https://supabase.com)
- **Hosting**: Deployed to [Render](https://render.com)
- **LLM APIs**: [Gemini GenAI](https://aistudio.google.com/), [Groq](https://console.groq.com) (Interchangeable)
- **Cache**: [Redis](https://redis.io/) ([Upstash](https://upstash.com))

### Codebase Limitations

> Keep in mind that this specific codebase is heavily opinionated right now. It is strictly bounded to use Pinecone for vector storage, GitHub Webhooks specifically for the ingestion pipeline, and Supabase for storing the conversational history.

## Step 1: Local Prerequisites

First, make sure you have **Python 3.10+** installed on your machine. You'll also want to know how to create a virtual environment (`venv`) to keep your dependencies clean, though it's optional.

## Step 2: Set up Cloud Services

You'll need API keys from a few different free-tier services before we clone the repo:

1. **Pinecone**: Head over to [Pinecone](https://pinecone.io) and create a free account. Create a new **Index**, select your embedding model, and grab your **API key** and **index name**. _Write down its namespace as well._
2. **Supabase**: Set up [Supabase](https://supabase.com). Create a new project. Grab your **Project URL** and its **Secret Key**, you can find it by clicking a "Connect" button on your dashboard. Once created, you'll need to run the [`schema.sql`](https://github.com/keynesfariz/personal-rag-chatbot/blob/main/schema.sql) in Supabase's SQL Editor afterwards.
3. **Upstash Redis**: You need Redis for caching and rate-limiting. [Upstash](https://upstash.com) has a hassle-free serverless free tier. Grab your **TCP URL**.
4. **LLM Provider**: Get an API key from [Gemini GenAI](https://aistudio.google.com/api-keys) or [Groq](https://console.groq.com/keys) to generate the actual chat responses. Both have generous free tiers.

## Step 3: Clone the Repo

Now that you have your keys, clone the repo to your local machine:

```bash
git clone https://github.com/keynesfariz/personal-rag-chatbot.git
cd personal-rag-chatbot
```

_(Don't forget to run `schema.sql` in your Supabase SQL Editor now that you have the file!)_

## Step 4: Configure Your `.env` and Personality

Duplicate the [`.env.example`](https://github.com/keynesfariz/personal-rag-chatbot/blob/main/.env.example) and rename it to `.env`.

Fill in the blanks with your keys (Pinecone, Supabase, Redis, GitHub PAT, LLM). You also configure names and limits here. The defaults are strict: `30` queries per week (`604800` seconds), and conversations expire after `300` seconds (5 minutes). That 5-minute TTL also tells Redis exactly how long to cache the conversation context before wiping it.

If you want to customize how the bot talks (since you probably don't want it to sound exactly like me), you can edit the personality logic inside [`prompts.py`](https://github.com/keynesfariz/personal-rag-chatbot/blob/main/core/prompts.py).

## Step 5: Running Locally & Testing

To start the server locally:

```bash
pip install -r requirements.txt
fastapi run main.py --port 8000
```

Once running, you can test the `POST /chat` endpoint directly from your terminal using curl:

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hi, who are you?"}'
```

## Step 6: Deploying to Render.com

Before we can set up GitHub webhooks, we need a public URL. You can deploy this FastAPI backend anywhere that runs Python, but I chose [Render.com](https://render.com) for its solid free tier.

1. Go to your Render Dashboard and create a new **Web Service**.
2. Connect your forked GitHub repository.
3. Set the build command to `pip install -r requirements.txt`.
4. Set the start command to `uvicorn main:app --host 0.0.0.0`.
5. In the **Environment** section, copy over every single variable from your `.env` file.

Once deployed, grab the **public URL** Render gives you.

## Step 7: Prepare GitHub Repos & Webhook

Now that we have a public URL, we can tell GitHub to send pushes to it.

1. **For Public Repos**: They work out of the box.
2. **For Private Repos**: You will need to generate a GitHub Personal Access Token (PAT) so the backend can actually read the files.
3. **Secret Code**: Generate a secure webhook secret code. **You only need to create ONE secret code** and store it safely somewhere (like your `.env` file). You will use this exact same secret code across all your different repos.
4. **The Webhook**: Go to your repository settings -> **Webhooks** -> **Add webhook**. Point the payload URL to your deployed backend's `/webhooks/github` endpoint (e.g. `https://your-render-url.onrender.com/webhooks/github`).
   - You need to also add query parameters to filter exactly what gets ingested:
     - `?files=path/to/file.md,path/to/another-file.json`, OR
     - `?folders=path/to/folder1,src/folder2&read_dependency=true`
   - _Note: If you use the `files` parameter, it will take precedence and completely ignore the `folders` or `read_dependency` parameters._
   - Which events would you like to trigger this webhook? Pick "**Just the push event.**".

Once you add it, GitHub will immediately trigger the webhook with a `ping` event. This initial payload contains a `zen` field. Our backend looks for this `zen` field to know it's the very first setup, triggering a "first-time ingestion" that reads and processes _all_ of the files in your repo. _Ah, the literal zen moment of automating your data pipeline._

After that initial setup, any subsequent pushes to the `main` branch will only ingest the newly `added` or `modified` files.

## Step 8: Troubleshooting Tips

If things aren't working right away, don't panic. The codebase is heavily logged.

- **Data not showing up in Pinecone?** Check your Render backend logs. The ingestion engine logs exactly what it's trying to do and if it hit any permission errors (especially with private repos).
- **Missing context during chat?** Check the Pinecone dashboard directly to see if the records actually exist. If they do, but the bot isn't retrieving them, try experimenting with the `top_k` value inside `rag.py` to retrieve more chunks per query.

And that's it! You now have a free-tier RAG chatbot that reads your code and talks to your visitors. If you build something cool with it, let me know!now!
