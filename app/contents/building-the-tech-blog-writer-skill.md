---
title: 'Building the Tech Blog Writer Skill'
created_at: '2026-07-09T13:42:01.596Z'
description: ''
url: ''
tags: ['automation', 'ai-agents', 'antigravity', 'productivity']
---
> TL;DR: Context switching between Claude, the terminal, and my editor was killing my writing flow. So I built an AI skill right into my IDE to automate the entire pipeline.

I've been trying to write more lately. The goal is simple: I want my thoughts to be structured, grammatically correct, and actually published. But the friction to just get a post out the door was surprisingly high.

## The Old Way Was Tedious

Before this, writing a blog post felt like juggling. I already had a simple script to generate the markdown template (`lib/writing-generator.ts`), but that was just step one. 

The workflow looked something like this:
1. Open terminal, run the script to create the file.
2. Open Claude in a browser to help me outline and draft the content.
3. Copy-paste back and forth between Claude and my editor.
4. Realize I need an image. Open terminal again, run `cwebp` manually to compress it.
5. Manually type out the markdown image links.
6. Commit the changes, push the branch, and open GitHub to create a Pull Request.

That's a lot of app switching just to write some text. The generator and the AI chat were completely separated. It was tedious, and honestly, it made me not want to write. 

## The "Wait, I Can Automate This" Moment

Since I'm already deep into the AI space, it hit me: why am I acting as the human bridge between all these tools? I should just leverage Antigravity's architecture to handle the orchestration for me. 

So, I built a custom **Skill** specifically for this repository. 

![Screenshot of the Antigravity IDE showing the skill in action](/assets/building-the-tech-blog-writer-skill-ide-action.webp)

## How It Works Under The Hood

By placing a `SKILL.md` file inside the `.agents/` folder of my project, I effectively taught my local AI assistant how to be my personal editor.

Here is a summarized version of the prompt I used to bootstrap the skill:
> "Guide me to create a workflow to help me write blog posts. The flow: you run my generator script to create the markdown file, ask me questions to outline the post, write the draft, handle any image conversions using `cwebp` on my machine, and finally push a PR for me to review."

Now, when I want to write a post, I just type "Help me write a new tech blog post." The agent immediately:
- Runs the local `bun` script to generate the file.
- Drafts the initial content right in my editor based on our chat.
- Asks for my images, runs the `cwebp` shell commands behind the scenes, and injects the links.
- Uses Git commands to create a branch, commit, push, and open a PR.

It completely cuts out the context switching. I stay in one window, focus on the actual ideas, and let the AI handle the mechanical drudgery of file creation, image compression, and version control. 

[IMAGE PLACEHOLDER: Screenshot of the automated Pull Request created by the agent]

Next up: writing more posts, obviously. 😃
