---
title: 'Building My Personal Website: Stack, Decisions, and Lessons'
created_at: '2026-04-13T08:42:00Z'
description: "Eleven years of overthinking later, I finally built my personal website. Here's the stack, the AI-assisted design process, and what I'd do differently."
url: 'https://github.com/keynesfariz/keynesfariz.github.io'
---

Hi! This is my first post 😃 and I want to talk about this very own personal website that I've finally launched.

```
TL;DR: I overthink the details. A lot.
```

Ever since I've started doing projects in 2015, I always wanted to make a personal website, but for me it's a bit of a challenge since I was constantly thinking about how it would look rather than just 'do it first' and 'polish it later'. So yeah, it really took me a while. Especially when you come from a background that loves graphic designing and thinking in detail rather than big pictures 😃.

## Why I Built It

When you work for companies, your work lives inside company repos, nothing public to point to. It's like you're invisible to the world unless you enjoy tinkering, publishing packages, or helping the community on public repos, or if you work at [Spatie](https://spatie.be).

There are also some other reasons, though:

- Sharpening up my skills by picking tools and frameworks that I think suit this usecase.
- A single place to showcase my portfolios and projects I've done in the past.
- And force myself to write more. To actually document and articulate what I learn.

## What's In It?

Navigating this website, you'll find the **About Me** section which contains a github commits chart for the commits I've made, my last work experiences, a link to my brief CV, and of course, the **Writings** section!.

## The Tech Stack~

After some consideration, I've decided to go with these:

#### GitHub Pages

I've always wanted to just have a simple static personal website because it's generally fast. Github Pages comes to the rescue because it's free, and you already live in the GitHub ecosystem, so zero new infrastructure to manage. And its main key constraint is static hosting only, which already aligns on what I've always wanted in a personal website.

There are other free options like Vercel, but it introduces a platform dependency and cost at scale. GitHub Pages keeps it simple. On top of that, if later in the future I want to use a custom domain, I can just set it up later without changing anything about the stack.

#### Next.js + React 19

I've juggled between [Next.js](https://nextjs.org) and [TanStack Start](https://tanstack.com) and I've found that generated static pages from Next.js performs better than Start. I've experienced some delay when navigating to an already generated dynamic page in Start vs what Next generates.

There are also Nuxt/Svelte/Astro, and Sveltekit is actually good for small project like this, but it all comes down to personal preferences. I **enjoy** writing frontend code in pure JS rather than templating ones.

#### Content Collections for Blog Posts

One down, many more to go. After deciding to go with Next.js, the next step was choosing how the contents of the writings are sourced. I chose markdown because it's markdown: clean and simple and [Content Collections](https://www.content-collections.dev) handles markdown nicely. It turns local markdown files into typed, queryable data.

I decided not to use MDX or a headless CMS because I only need this to be a simple place to write, no need for fancy components to be included here.

#### JSON Resume for CV Data

I was inspired by some personal websites that include CV in it, and I decided to follow along their footsteps. For this, I go with [JSON Resume](https://jsonresume.org) as a standard for writing a resume online. It also comes with beautiful themes that you can immediately use when you use their hosting service by creating a `resume.json` file in your own Github Gist.

Adding `@supastuff/json-resume-types` to the mix gives me TypeScript types on top of the JSON Resume schema on this project. Basically it's portable, consistent, easy to update in one place gives you TypeScript types on top of it.

#### Shadcn UI

[Shadcn UI](https://ui.shadcn.com) is a popular collection of re-usable components designed for React applications. It's really good for prototyping ✅ and the best part is you only add the components you need to your project and the components will live inside your project, not hidden in a package. The one I'm using is based on Base UI.

## Development Process

### Getting the design right

- The inspiration phase: I've browsed through a collection of personal websites from [Emma Bostian's repo](https://github.com/emmabostian/developer-portfolios) and my choice landed on [Jesus Santander's](https://cv.jsantanders.dev) and [Namanh's](https://namanhkapur.super.site).
- Curating a small, intentional color palette:
  - Brand color: [Georgia Peach](https://www.pantone.com/color-finder/16-1641-TCX)
  - Monochromatic black, white, and TailwindCSS' zinc
- Handing the screenshots + palette to AI assistant
- I used Google Antigravity, an AI-native IDE powered by Gemini 3.1 Pro, with the [`agency-ui-designer`](https://github.com/msitarzewski/agency-agents/) skill to handle the design prompting.

Here's the prompt I've used:

```
Use agency-ui-designer to design my personal website.

The website should have these pages: (...)
Here are some details of each page (...)

Please just focus on the design, the layout, the color.
I want it to be simple with clarity, and only use these colors
- white or black (depends on light/dark theme)
- accent color: pantone georgia peach (#F97272)

Never write custom components, use only components from shadcn.
```

One thing worth highlighting: Antigravity supports multimodal input natively, so feeding it screenshots directly (not descriptions of them) is part of the workflow 🙌.

### The Review Loop

![Prototyping Flowchart](/assets/prototyping-flowchart.png)

In this phase, human judgment was still essential. The overall _"feel",_ typography, spacing are still up to us to decide. AI gets you 70% there fast, the remaining 30% is still on you. AI-assisted design is quick at generating a starting point but you still make the real calls. Although it's mostly constrained because I only use Shadcn components.

## Deployment

![Deployment Flowchart](/assets/deployment-flowchart.png)

- Started out by adding `output: 'export' in next.config` so that `next build` can generate a static `out/` folder.
- The GitHub Actions workflow: triggered on push to main, builds and deploys to GitHub Pages automatically.

## Outcomes & What's Next

What I actually got out of it: hands-on time with newer tooling, a live public presence, a writing platform
Spinning up a simple website like this has never been easier nowadays now that AI assistants are everywhere and mostly free. It's been a nice learning experience for me. Besides that, now that the website is finally live, I now have a live public presence, also a writing platform.

There's probably one thing that I'd do differently: Making the content of the website (can also including the design) to reflect my thinking process. Honestly I'm mostly happy with what it turned out to be for now.

So what's next? I'll do more research when I have another time so that this website can serve its purpose. In the mean time, I'd continue to learn more about system design, software architecture, do more projects and have them documented here. Oh! And one small thing for this website: I'd put an outline section on the writing details.

## Closing

Stop waiting for the perfect design. Ship the first, polish it forever. That's what I tell myself now.
