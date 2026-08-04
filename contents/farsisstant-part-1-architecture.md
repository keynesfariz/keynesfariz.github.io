---
title: 'Farsisstant: Building a Free-Tier RAG Chatbot (Part 1)'
created_at: '2026-08-04T15:15:00Z'
description: 'How I built a fully functional RAG chatbot without spending a single dime, and named it after myself.'
tags: ['rag', 'chatbot', 'free-tier', 'architecture', 'fastapi', 'nextjs']
url: 'https://keynesfariz.github.io/chat'
---

So, I wanted to learn how to build a RAG (Retrieval-Augmented Generation) chatbot that acts as a showcase for my skills on my personal website. The problem? I am stubbornly cheap and refuse to pay for server costs for a side project 😃.

So I decided to build **[Farsisstant](/chat)**, my own RAG chatbot where the main architectural constraint is that every single piece of the stack has to run on a **free tier**.

If you want to know how to connect modern AI tools without opening your wallet, this is the post for you.

## The "Zero Dollar" Tech Stack

Building a RAG system usually means you need a vector database, an LLM provider, a backend to orchestrate things, and a frontend. Here is what I ended up using to keep my credit card safely inside my wallet:

- **Frontend**: [Next.js](https://nextjs.org/), hosted on [GitHub Pages](https://pages.github.com/) (since it lives right here on my personal website, obviously you guys are already familiar with).
- **Backend**: Python with [FastAPI](https://fastapi.tiangolo.com), deployed on [Render.com](https://render.com).
- **Vector Database**: [Pinecone](https://www.pinecone.io) (their free tier is actually plenty for a personal site).
- **Caching & Rate Limiting**: [Upstash Redis](https://upstash.com).
- **Other DB needs**: [Supabase](https://supabase.com).

The LLM provider is completely interchangeable in my backend, so I can just swap API keys if I find a better free or cheap tier somewhere else. Right now I am using [Gemini GenAI](https://aistudio.google.com), but I've also setup [Groq](https://groq.com) into the code as well.

## The High Level Architecture

The flow of **Farsisstant** is mostly split into two big chunks: how it learns (**Ingestion**), and how it talks (**Chat**).

### 1. Ingestion (How it reads my code)

Since this is a portfolio chatbot, its **"brain"** is just my own code. I set up a [GitHub webhook](https://docs.github.com/en/webhooks/getting-started/about-webhooks) so that every time I push to `main` on my digested repos, GitHub pings my FastAPI backend.

The backend then pulls the markdown or text files, chunks them up using [Langchain](https://www.langchain.com)'s orchestrator, creates embeddings, and shoves them into Pinecone. I'll get way more into the messy details of this (like how I use MD5 hashes to avoid duplicate chunks) in [Part 2](/writings/farsisstant-part-2-backend).

![The ingestion flow from GitHub webhooks to Pinecone Vector DB](/assets/farsisstant-part-1-architecture-ingestion-flow.webp?w=800&h=295)

### 2. Chatting (How it talks back)

When you ask **Farsisstant** a question on the frontend, the Next.js app hits my FastAPI endpoints. Farsisstant searches Pinecone for relevant context from my repos, builds a prompt, and streams the answer back using [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).

![A simple diagram showing the chat flow between Next.js, FastAPI, Pinecone, and LLM](/assets/farsisstant-part-1-architecture-chat-flow.webp?w=800&h=401)

## The Cost of Free: Limitations

You get what you pay for, and when you pay nothing, you get some fun challenges.

The biggest headache is **Render's cold start**. Because I'm on their free tier, the FastAPI server goes to sleep if no one talks to it for a while. When a new visitor opens the chat, the server has to boot up, which means you might be staring at a loading state for like 1 to 2 minutes.

To prevent abuse (since I'm still using my own LLM API keys on the backend), I added strict rate limiting. I couldn't use user accounts since I want guests to just chat immediately, so I generate **device fingerprints**. This limits how many questions a specific device can ask, keeping my API usage from blowing up if someone decides to spam it.

Also, right now, the data source is heavily restricted. It only digests my specific GitHub repos, so if you ask it about something outside of my code, it will politely (or not so politely) refuse to answer.

## Fun Side-Note: The Name and Personality

You probably guessed it, but **Farsisstant** is just a mashup of my name (Fariz) and Assistant.

The fun part was actually tuning how it talks. Originally, the answers were super robotic. Then I tried injecting a ["Squidward"](https://www.google.com/search?q=squidward+tentacles) personality into the prompt, making it slightly annoyed that you woke it up from its Render.com sleep state. Eventually, I used my own [`tone-assessor`](https://github.com/keynesfariz/keynesfariz.github.io/blob/main/.agents/skills/tone-assessor/SKILL.md) skill to tune the system prompt so that the bot just sounds like me. I even added custom system prompts for when it "wakes up" from a cold boot versus when its messages expire.

But I extracted the prompt into a [separate file](https://github.com/keynesfariz/personal-rag-chatbot/blob/main/core/prompts.py), so if you fork my code (which I'll show you how to do in [Part 3](/writings/farsisstant-part-3-tutorial)), you can make it sound like whoever you want.

Up next in [Part 2](/writings/farsisstant-part-2-backend), we'll dive deep into the actual code behind the FastAPI ingestion engine, the webhooks, and how the frontend handles the streaming. Stay tuned!
