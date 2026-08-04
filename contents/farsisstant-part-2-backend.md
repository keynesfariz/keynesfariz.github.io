---
title: 'Farsisstant: Deep Dive into the Ingestion Engine (Part 2)'
created_at: '2026-08-04T16:42:00Z'
description: 'How the FastAPI backend handles webhooks, MD5 chunking, and talks to Pinecone without timing out.'
tags: ['rag', 'chatbot', 'fastapi', 'pinecone', 'langchain', 'backend']
url: 'https://github.com/keynesfariz/personal-rag-chatbot'
---

In [Part 1](/writings/farsisstant-part-1-architecture), I talked about the overall free-tier architecture for Farsisstant. Now it's time to get our hands dirty with the actual ingestion engine.

The backend is where all the heavy lifting happens. It has to listen for changes in my code, chunk the text, embed it, and store it in Pinecone without timing out.

## The Webhook Problem

The whole ingestion process starts with a GitHub webhook. Whenever I push to the `main` branch of my tracked repos, GitHub sends a payload to my FastAPI backend with the `added` and `modified` files.

The problem? GitHub expects a response to that webhook _fast_. If my server takes too long to process the files and generate embeddings, GitHub assumes the webhook failed and times out.

To fix this, I immediately shove the ingestion process into a **FastAPI Background Task**. The server responds to GitHub with a `200 OK` almost instantly, while the actual heavy lifting happens quietly in the background.

## The Vector Pipeline: Chunking and Embedding

Once the background task takes over, the orchestrator (using Langchain) goes to work.

It pulls the markdown files, chunks them up into smaller pieces, and passes them to Pinecone's LLM embedding model. The metadata is also stored alongside the embedded chunks—stuff like the link to the file, the path in the repo, and a special case for my personal website repo so the chatbot can give direct links to the blog posts.

### Deleting Old Chunks

When I modify a file, I can't just embed the new version and call it a day, otherwise I'd have duplicate (and outdated) information floating around.

Before inserting new chunks, the pipeline deletes the old ones using Pinecone filters:

```python
filter={"source": file_path, "repo": repo_name}
```

### Why I used MD5 for Chunk IDs

Every chunk needs a unique ID in the vector database. I wanted a deterministic ID so that the same chunk of text always generates the exact same ID.

I combined the repo, path, and the chunk content itself:

```python
hash_input = f"{repo_name}_{file_path}_{chunk}".encode("utf-8")
```

Then, I hashed it using MD5. You might be thinking, _"Wait, isn't MD5 insecure?"_

Yes, it is garbage for hashing passwords. But for generating a 32-hex ID to prevent database duplicates? It's perfect. It's significantly faster than SHA-256, and you'd need to hash about 18.4 quintillion records before reaching a 50% chance of a collision. I think my free-tier Pinecone account will run out of space long before I hit 18 quintillion records 😃.

## Caching and TTL

To make things faster and save on API calls, I cache a bunch of information: the currently used LLM, the embedding model, the latest ingestion status, and even the assistant's name. I set a specific TTL (Time To Live) for the cache so that it doesn't hold onto stale context forever.

## A Brief Nod to the Frontend

I know I said this was a backend post, but the frontend has to deal with the consequences of how fast the backend works.

When you ask a question, the FastAPI server blasts the streamed response using Server-Sent Events (SSE). It happens _so fast_ that if I just rendered it directly, it would instantly appear on screen and look totally unnatural.

To fix this on the Next.js side, I use TanStack Query to manage the state and mutations, and implemented an **optimistic update** combined with a **typing queue**. The frontend receives the rapid stream from the backend, dumps it into a queue, and then artificially slows it down so it looks like the bot is actually typing it out for you.

In [Part 3](/writings/farsisstant-part-3-tutorial), I'll show you exactly how you can fork this entire setup and run your own version of Farsisstant.
