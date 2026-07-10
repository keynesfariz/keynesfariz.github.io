---
title: 'SpenderNote: The Deep Dive (Part 2)'
created_at: '2026-07-07T13:42:00Z'
description: "A look at SpenderNote's regex parser engine, idempotent Gmail syncing, and the bulk update tools that keep the whole thing sane."
url: 'https://github.com/keynesfariz/spender-note'
tags:
  [
    'deep-dive',
    'regex',
    'supabase',
    'drizzle-orm',
    'idempotency',
    'system-design',
  ]
---

![SpenderNote Transactions Page](/assets/spendernote-1-transactions-page.webp?w=800&h=545)

Hi again! In [Part 1](/writings/spendernote-part-1-journey), I talked about why **SpenderNote** exists and why I ditched pure AI parsing for something a lot more boring and a lot more reliable. Now let's actually crack it open.

> TL;DR: Regex is criminally underrated, idempotent database writes save your sanity, and mass-editing UI needs to be fast or nobody will use it.

## 1. The Custom Regex Parser Engine

Once I accepted that AI was too unpredictable (and honestly too expensive) to run on every single receipt, I pivoted to a custom Regex engine. The idea is stupidly simple: define regex groups for `amount`, `remark`, and `date`, then store those as templates in Supabase, one set per sender.

Small confession here: I only have the free tier of the Gemini API despite paying for Gemini Pro, so rate limits were a constant thorn. I genuinely thought paying for the Pro subscription meant I'd get the API too 😢, turns out no. At one point I built a custom agent skill just to generate parser files for me, and that side project eventually turned into this whole feature. These days the regex templates are still AI generated, I just review them instead of trusting AI to run live on every email.

At runtime, the parser engine doesn't call any external LLM at all. It just loops through the active templates for a given sender and runs the regex against the raw email body.

```typescript
// A simplified look at how the regex engine applies the template
export function applyRegexTemplate(
  emailBody: string,
  template: ParserTemplate,
) {
  const match = new RegExp(template.regexPattern, 'i').exec(emailBody);

  if (!match || !match.groups) return null;

  return {
    amount: parseFloat(match.groups.amount),
    remark: match.groups.remark.trim(),
    date: new Date(match.groups.date),
  };
}
```

This one change made the syncing pipeline almost instant and completely deterministic. No more waiting on an API, no more "why did it parse the amount as a string this time."

## 2. Solving the Sync Nightmare (and Idempotency)

![SpenderNote Sync Process Flow](/assets/spendernote-2-sync-process-flow.webp?w=800&h=622)

The single biggest headache of this whole project was the sync gaps. Gmail's API sorting is quirky enough that I couldn't rely on strict chronological order. My first version of the sync script stopped fetching the moment it saw an already processed email, which quietly dropped transactions that happened to arrive out of order. Fun fact: I only found out because my tracked balance and my actual bank balance stopped agreeing.

![SpenderNote Day-to-Day Sync Process Flow](/assets/spendernote-2-day2day-sync-process-flow.webp?w=800&h=281)

The fix was to rebuild the sync logic around much broader, overlapping time blocks. That decision intentionally invites duplicate emails back into the pipeline, which brings us to the actual fix: idempotency.

I solved the duplicate problem at the database level using Drizzle ORM's `onConflictDoNothing`. Every transaction is tied to a unique `message_id` from Gmail, so the same email can never turn into two transactions no matter how many times it gets fetched.

```typescript
// The deduplication logic in Drizzle
await db.insert(transactions).values(parsedTransactions).onConflictDoNothing({
  target: transactions.messageId,
});
```

With idempotency enforced at the database level, the sync engine can be as aggressive as it wants about re-fetching without ever double charging my wallet.

## 3. The Bulk Update and Wallet Merge Tools

As my transaction history grew, fixing one miscategorized remark at a time turned into its own chore, which defeats the entire point of building this thing. So I built a way to mass update categories and wallets instead of clicking into each transaction individually.

Wallets had a related problem. Since AI parsed transactions aren't guaranteed to be perfectly precise, it occasionally spun up a brand new wallet that was really just a slight misspelling of one I already had. Nothing dramatic, just annoying clutter.

To fix both problems, I built a custom UI on top of bulk `UPDATE` statements in Supabase:

- **The Bulk Update Tool:** Shadcn UI's data tables with row selection let me select multiple transactions and fire a single Drizzle `inArray` update to change their categories all at once.
- **The Merge Wallet Feature:** A dedicated tool that sweeps duplicate wallets into the correct one, updating every associated transaction in the same pass.

## Closing and What's Next

Moving away from "magic" AI features toward solid, predictable engineering was the best call I made on this project. Turns out the boring solution usually wins.

Lesson to myself: write your database queries defensively, and never underestimate a good old fashioned Regular Expression 😃.

**What's Next?** _SpenderNote_ isn't deployed publicly yet, it's still living on my machine while I keep refining it. Now that the engine underneath is solid, you can clone, run it on your local/even deploy it, start using it too with your own db so it gives you privacy, give some feedbacks to me etc.
