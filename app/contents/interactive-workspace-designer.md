---
title: 'Interactive Workspace Designer: Claude Did Most of the Work'
created_at: '2026-04-16T07:42:26.586Z'
description: 'Got a coding challenge, used AI to help build it, shipped a blueprint-style workspace configurator in one sitting'
url: 'https://workspace-designer-chi.vercel.app'
tags:
  [
    'coding-challenge',
    'ai-assisted',
    'vercel',
    'nextjs',
    'react',
    'typescript',
    'tailwindcss',
  ]
is_featured: false
---

> TL;DR: Got a coding challenge, used AI to help build it, shipped a blueprint-style workspace configurator through some iterations.

## Background of the Story

I came across a job vacancy from [desent.io](https://www.desent.io/) for a frontend engineer position. After applying, they sent me a coding challenge: build an **interactive workspace configurator**. Something where a freelance dev who just landed in [Canggu](https://maps.app.goo.gl/1T7LUs7XEo11hhrN6) can actually feel something when designing their workspace, get hyped about it, and click **"Rent"**.

The premise: digital nomads in Bali don't want to buy a desk, a chair, and a monitor just to use them for two weeks before flying off to Lisbon. So instead of buying, you rent. A whole office setup. By the day.

One thing of this challenge that should be kept in mind. They wrote this:

> Feel free to use AI, code from other projects, open-source libraries — whatever you want. Copy-paste from Stack Overflow. Ask ChatGPT. We genuinely don't care how you get there. We only care about the result.

So I put Claude Desktop to work. (Claude Chat, I don't have a subscription _yet_ 😉).

## The Vibe I Went For

**First decision**: what should this thing look like?

They gave us the rough idea of them on how it might look like:
![Workspace UI Idea](/assets/workspace-monis-sketch.webp)

And some constrained stacks that should be used: Next.js, Tailwind CSS, Vercel Deployment.

Based on their sketch, I landed on retro-like blueprint aesthetics. Clean lines, outline strokes, that slightly nerdy technical drawing energy. Felt right for a workspace tool — like you're an architect designing your own office, except the office is 3 meters wide and costs $49/day.

And I used Claude Sonnet 4.6 via the Claude chat desktop app to help me build it.
Yes, I used Claude to build something I'm posting on my blog. Yes, I'm aware of it, but they literally said so in the brief 🙂‍↔️

## What I Built

It's a 3-step wizard and I promise it's more fun than it sounds:

1. **Select size** — Small, Medium, or Large
2. **Design** — place furniture on a canvas like a tiny god with only limited abilities
3. **Checkout** — cry at the daily total (cause it's expensive), adjust rental duration, confirm anyway

![Workspace Actual UI: Step 1, Office Size](/assets/workspace-step-1-office-size.webp)

Step 2 is where all the action is.

#### The Wall-Elevation Canvas

A unique decision from my side: Instead of a free drag-n-drop floor plan (boring, messy), I went with a wall elevation view. Basically an architect's side-cut drawing of your room. You're looking at the wall straight-on.

Each office is divided into vertical columns called space units, and each column has zones with strict placement rules:

![Workspace Actual UI: Step 2, Designer](/assets/workspace-step-2-design.webp)

You click `+` on a slot, pick an object from a modal, it snaps in. Done.

**Slot-based placement**, not free-drag. I know free-dragging sounds cooler. It's not. Free-drag means validating overlaps, dealing with partial placements, handling mobile touch events, and spending three hours debugging why a chair is clipping through a table. Slot-based keeps it clean, deterministic, and actually shippable within a day.

#### The Object Catalog

![Workspace All Object Assets](/assets/workspace-all-assets.webp)

19 Objects, All generated SVGs. No icon libraries. Every single object is a custom inline SVG with outline strokes — tables, chairs, plants, a coffee maker, a toaster, a printer, a monitor, and!!! a **David sculpture**. Renaissance art in a Bali coworking space. Perfectly normal.

You can also put a cactus 🌵 on your desk for $2/day. I don't know why someone would rent a cactus (I do, cause it would look pretty), but I respect the decision 😎.

#### The Two-Zone Table System

Every table you place exposes two child slot rows: a surface row for stuff that sits on top (monitors, coffee makers, succulents), and a floor row strictly for chairs. Remove a table and it cascades — all child objects get cleared too.

```ts
interface CanvasState {
  wallSlots: (string | null)[];
  floorSlots: (string | null)[];
  tableTopSlots: Record<string, (string | null)[]>; // keyed by table instanceId
  tableFloorSlots: Record<string, (string | null)[]>; // keyed by table instanceId
  instances: Record<string, PlacedInstance>;
}
```

#### Live Cart + Checkout

![Workspace Checkout](/assets/workspace-step-3-checkout.webp)

The cart updates in real time as you place or remove objects. Step 3 shows a full rental summary, lets you adjust the rental duration in days, and spits out a grand total. Daily rates vary per object — a monitor is $6/day, a coffee maker is $5/day, a cactus is $2/day (fair).

![Workspace Booking Confirmed](/assets/workspace-step-4-booked.webp)

## A Few Technical Notes

**Responsive**. Side panel on desktop, bottom drawer on mobile. The canvas itself scales down via a CSS transform on smaller screens.

**Keyboard shortcuts**. Small thing but it makes the canvas feel more like a real tool.

- `Delete` or `Backspace` removes the selected object,
- `Escape` closes the picker modal.

All CSS via **Tailwind** utility classes. The only inline style props are for runtime-computed pixel values (slot positions, canvas geometry) that can't be expressed as static Tailwind classes.

## What Claude Helped With

Honestly? Most of the heavy lifting on the UI. I gave it the brief, the canvas concept, and the placement rules and it got the structure right pretty fast. The SVG object rendering, the slot validation logic, the cascade-on-remove behavior — all came out of a collaborative back-and-forth on the Claude chat desktop. Here's the summary:

1. Constructed the drag n drop first.
2. Decided to switch to slot-based placement.
3. Manually separated the OG `WorkspaceDesigner.tsx` file into 3 `Next.js` pages since I forgot to put the requirement to Claude
4. Waited for a couple of hours cause I maxed out my token usage.
5. Submitted and had it deployed to vercel.

What I still had to do myself: deciding on the wall-elevation framing over a top-down view, the slot-based-vs-free-drag tradeoff, and the overall UX flow of the wizard. Yes, the AI is fast at generating but the product decisions are still on you.

## Closing

This was a fun one. The brief had a clear user in mind — a digital nomad in Bali who wants to feel excited about their workspace — and that made every design decision easier. When you know who you're building for, the tradeoffs get obvious.

If I had more time I'd add: drag-to-reorder slots, a save/share link for your design (a good idea), and maybe a 3D preview mode. But for a challenge submission? Happy with where it landed 🙂

Go check out the codebase on [Github](https://github.com/keynesfariz/workspace-designer) or just open the actual deployed version on [Vercel](https://workspace-designer-chi.vercel.app).
