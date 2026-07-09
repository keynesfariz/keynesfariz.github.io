---
title: 'SpenderNote: Gmail Became My Accountant (Part 1)'
created_at: '2026-07-07T12:42:00Z'
description: "I built SpenderNote so I'd never have to type 'coffee, 25000' again"
url: 'https://github.com/keynesfariz/spender-note'
tags:
  [
    'side-project',
    'gmail-api',
    'personal-finance',
    'automation',
    'ai-parsing',
    'build-log',
  ]
---

![SpenderNote Transactions Page](/assets/spendernote-1-transactions-page.webp)

Okay so here's my confession: I've tried to keep a budget spreadsheet at least six times in my life. Every single attempt died within two weeks, always at the exact moment I had to manually type in "Gojek, transport, 34500" for the ninth time that week 😃.

So I did what any reasonably stubborn developer would do. Instead of fixing my discipline, I built software to remove the need for it entirely. Meet **SpenderNote**, my automated personal finance tracker that watches my inbox and does the budgeting for me.
f

> TL;DR: Manual expense tracking sucks, so I connected Gmail to AI to a parser to a database and now my money just... tracks itself.

## Why This Exists

I've been almost entirely cashless for the past few years, and pretty much every rupiah in and out of my account leaves a trail somewhere in my email. Bank notifications, e-wallet receipts, transfer confirmations, all of it lands in one inbox (my main one, don't worry about the "well who says I only have one" joke, that's a story for another post 😄).

If the data's already there, why am I still the one typing it into a spreadsheet? That question is basically the entire premise of **SpenderNote**.

## The Pipeline

At its core, **SpenderNote** runs a dumb simple 3 step loop:

1. **Fetch** new emails from Gmail
2. **Parse** the transaction details out of them
3. **Save** them to the database

Simple to say, way less simple to get right, especially step 2. That parsing step went through a full identity crisis before it became something I'd trust with my actual wallet.

![Me realizing that AI doesn't need to do everything](/assets/spendernote-1-illustration.webp)

## Phase 1: Throwing AI At Everything

My first instinct, like everyone's first instinct nowadays, was "just throw it at an LLM." Raw email body in, structured transaction out. Dead simple to prototype, and it worked... until it didn't.

The moment my transaction volume grew past "a handful a day," I started hitting rate limits and getting inconsistent extractions. Sometimes the amount field came back as a string with a currency symbol still attached. Sometimes the date decided to reformat itself into something my database didn't recognize. Cool, cool, very fun to debug at 11pm.

## Phase 2: Juggling Providers

Rate limits on one provider? Fine, switch providers. I moved from Gemini to Groq to squeeze out more throughput, and even built a dedicated AI agent skill just to help generate parsing templates faster. It bought me some breathing room, but it was still fundamentally the same problem wearing a different provider's logo.

## Phase 3: The "Wait, Why Am I Using AI For This At All" Moment

Here's the thing that finally clicked: bank and e-wallet emails are boring. They're structured. The same sender sends the same template every single time. I don't need a language model to read something that's basically already a form.

Before I even got here, I'd already built an agent skill that used my Gemini Pro subscription to generate parser files for me, based on emails I fed it myself. It worked, but only for me, sitting quietly in my own repo. Then it hit me: why keep this locked to just my account? If I moved the regex out of static files and into a database instead, anyone could define their own parser for their own bank or e-wallet.

So **SpenderNote** pivoted to a custom Regex Parser engine. Users define regex groups for `amount`, `remark`, and `date`, and those templates live in the database per sender, ready for other people to add their own down the line. No API call at runtime, no rate limit, no unpredictability. Just deterministic pattern matching doing exactly what it's told.

The fun twist: the regex templates themselves are still AI generated. I just flipped the role. AI used to parse the transaction directly and now it only helps me write the parser once. After that, it gets out of the way completely.

## Syncing With Gmail Was Its Own Boss Fight

I assumed Gmail's API would hand me emails back in a nice, predictable chronological order. It does not. My original sync logic stopped fetching the moment it hit an email it had already processed, which sounds efficient until you realize it also means silently dropping any transaction that happened to arrive slightly out of order. Money was going missing from my own tracker and I didn't even notice until the numbers stopped adding up.

The fix was almost embarrassingly simple: stop trusting the ordering. Fetch broader, overlapping time windows every sync, and let duplicates happen on purpose. Which then meant I needed a real answer for duplicates, but more on that in Part 2.

## Where Things Stand

**SpenderNote** works. It's parsing real transactions from my real inbox with real regex templates I wrote myself, and it hasn't double charged me a single time (yet, knock on wood). It's not deployed publicly right now, it currently lives happily on my machine while I keep poking at it. But you guys can start using it too, clone it to your own machine, and if you run into bugs or want a feature, just post an issue on GitHub. I'd be happy to help out.

Next up on the list is a proper UI/UX pass. The engine underneath is solid, so now it's time to make the part I actually look at every day feel like something I'd want to open. There's also a user-facing form already sitting in the codebase that would let you build your own regex parser through the UI instead of me hand-writing templates, it's just not tested enough yet, so the AI powered parser is still doing the default parsing job in the meantime.

If you want the actual code and architecture behind the parser and the sync engine, that's [Part 2](/writings/spendernote-part-2-deep-dive), and it gets a lot more technical.
