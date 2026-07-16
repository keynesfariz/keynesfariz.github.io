---
title: 'Shipping a Wedding Invitation Website as a Gift'
created_at: '2026-07-16T13:42:44.839Z'
description: 'How I built a wedding invitation website as a gift to save my friend from a bad vendor experience. Fully designed and shipped in 5 hours using Google Stitch, Next.js, and Supabase.'
url: 'https://dinda-pahlevi.web.app'
tags: ['web-development', 'ai-native', 'google-stitch', 'nextjs', 'supabase', 'tailwindcss']
---

> TL;DR: My friend got scammed by a wedding website company and only got an animated video. So I built her a real wedding website as a gift, forced visitors to watch the expensive video so it wasn't a waste, and shipped it using an AI-Native workflow with Google Stitch.

## The Backstory

So my friend, the bride, is getting married this August. A while ago she came to me asking for advice because she commissioned a small wedding website company to build hers. She paid quite a good amount of money compared to the market rate here, but guess what she got? Just an animated video of the wedding. No website.

I couldn't let my friend be sad about it, so I offered to build the actual website for her as my wedding gift.

But there was a catch. She already paid for that animated video, and we did not want that money to go to waste. So the main concern became: we need to use this video. My solution? We built the website where we _force_ the visitors to finish watching the video first, and only then they can browse around the actual website. A bit authoritarian? Maybe. But it works!

## The Clock is Ticking

The deadline was pretty tight. The wedding is in less than 45 days. We needed to move fast.

We focused on a mobile-first approach, although we definitely tested it extensively on desktop as well to make sure it looks good everywhere.

## Features We Built (and What We Skipped)

Since we wanted the website to serve the visitors well, we included these main features:

- **The Forced Video Player**: We built a video player that you _have_ to watch. We even added a loading screen so the video can be downloaded in the background using a service worker. No buffering excuses!
- **Schedule and Venues**: Details for the Holy Matrimony and the Reception, complete with links to the designated locations.
- **Wedding Gift Section**: Displaying the bank account details of the couple. Very important.
- **Wedding Wishes Form**: A section for guests to leave their congratulations.

What we intentionally skipped:

- **RSVP Form**: It wasn't really what the client (my friend) needed.
- **Gallery**: The groom is quite a shy guy, so we opted out of showing tons of pre-wedding photos.

![Forced video player mobile view](/assets/shipping-a-wedding-invitation-website-as-a-gift-video.webp?w=800&h=546)

## The Tech Stack

I went with my usual trusty tools, but with a fully AI-Native approach:

- **Next.js (App Router)** for the framework.
- **Tailwind CSS** and **Shadcn components** for the styling and UI.
- **Firebase Static Hosting** for deployment.
- **Supabase** to store the wedding wishes sent by the guests, though we kept using it for generating the wishes table only on local/development (same database). I also added a simple rate limiting by IP address (up to 3 comments) just to be safe.
- **Tanstack Query** to handle fetching the wishes data smoothly.

**A note on performance**: I thought about how the website would be accessed on a slow internet connection. Since we didn't have the budget to implement HLS under the hood, I moved the video download into a service worker. It runs in the background immediately after you visit the website. I put up a loading screen and tested it specifically using slow connections. Also, all the images are in WebP format and fully optimized using `srcset` and `sizes` attributes!

![Wedding wishes guestbook section](/assets/shipping-a-wedding-invitation-website-as-a-gift-wishes.webp?w=800&h=546)

## AI-Native Workflow with Google Stitch

This was the fun part. The entire design was generated using Google Stitch.

I told the agent in Google Stitch to create the screens we needed, and it generated the `design.md`. The bride and I iterated a couple of times on the design. Once we were happy, I just grabbed the project ID, put it into my initial website setup (because I already had the Stitch MCP set up), and everything was built AI-Natively from there. It saved us so much time, which is exactly what we needed for a 45-day deadline.

![Google Stitch design iterations](/assets/shipping-a-wedding-invitation-website-as-a-gift-stitch.webp?w=800&h=496)

## The "Cheap" Indonesian Wedding Website Trick

Oh, one fun limitation or trick I used. If you look at most commercial Indonesian wedding websites, they don't generate a unique secure link for every guest. They just use a query param to display the guest's name, like `?to=Budi`.

![Hero section showing the query param trick](/assets/shipping-a-wedding-invitation-website-as-a-gift-trick.webp?w=800&h=546)

We did the exact same thing. I would consider this very cheap from a technical perspective, but hey, it's how the market operates here! Why bother creating a unique link with a database for every single guest when a simple query string does the job perfectly?

## Fun Trivias

To wrap this up, here are some fun facts about the project:
- **Zero domain costs**: We didn't need to pay for a domain since the `.web.app` provided by Firebase was already acceptable for them.
- **Developer fatigue**: The three of us got so tired of watching the video during testing that I ended up creating a secret "skip" button just for development mode.
- **The NSFW Favicon**: We spent around *one hour* just to generate and decide on the favicon 😂. We originally set an icon of wedding rings stacked next to each other with a diamond in the top center... but somehow it came out looking like an NSFW picture. We quickly decided to just use a monogram of the couple's initials instead!
- **Speed**: All of this was done within 5 hours!

You can check out the live website here: [https://dinda-pahlevi.web.app](https://dinda-pahlevi.web.app)
