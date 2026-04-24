---
title: "Art Calls Indonesia: The Loss of Indonesian Artists' Community Website"
created_at: '2026-04-24T10:42:45.496Z'
description: 'A story of my first React/Next.js project that no longer exists'
url: 'https://artcallsindonesia.com/'
tags: ['retrospective', 'nextjs', 'react', 'headless-cms', 'deployment']
is_featured: false
---

> TL;DR My first professional Next.js website has died along with its history. One project that is quite personal because it introduced me to the React community.

## The Loss

Ever since I started building this portfolio website, I was committed to writing about software development stuff, and that includes writing about my past projects (the ones that can be showcased of course~).

From that commitment, I went to access all the public websites and apps I've built, one of them being this one: [**Art Calls Indonesia**](https://artcallsindonesia.com). But as soon as I tried to access it earlier this year, I found out that it was no longer alive 🪦.

![404 on Art Calls Indonesia's Website](/assets/art-calls-indonesias-404.webp)

The loss made me like... _"d\*mn, that's a shame"_. Only because it was my first React baby 🥲. I guess you'd understand the feeling if you had kids (I don't, fyi).

## What Was Art Calls Indonesia?

![Open Calls](/assets/art-calls-indonesias-open-calls.webp)

For the brief context, Art Calls Indonesia 🎨 was a platform for inspiring Indonesian artists to share their thoughts, post art events, and even art related jobs.

The idea of the website came from an acquaintance, a script writer. He saw a potential for Indonesian artists to write down their thoughts, share their opinions, showcase their arts through events, and even share art project opportunities with each other.

The moment the website was launched, I saw art events coming up, articles being published, artistic opinions being shared, and man, was it growing in a good direction.

## Why Did It Matter?

I came from the Laravel ecosystem and was afraid of even touching JavaScript. I only knew how to work my way around jQuery. The idea of working with reactive JavaScript, or JavaScript in general, terrified me, but I pushed myself to get used to it.

When I was offered this project, I immediately thought about growth. You always have to try something new, and this was my chance.

So, there were mainly two things I had to learn:

- React.js
- JavaScript in general

![React Meme from Level Up Coding](/assets/art-calls-indonesias-react-meme.webp)

It was an absolute challenge. Apart from getting used to how the React mental model works, I had to Google basic JavaScript things multiple times. My search history was looking something like this:

- `PHP explode/implode in JavaScript`
- `Uppercase in JavaScript`
- `PHP date equivalent in JavaScript`

## How It Was Built

Being a newbie in the React community, I was guided by [my brother/mentor](https://caffeinated-dev.com). He had done the research on tech stack and deployment. The main factors were performance, scalability, and long-term maintenance costs. We opted to use:

- [Directus.js](https://directus.io) as a headless CMS,
- [Next.js](https://nextjs.org) to serve the user,
- [DigitalOcean](https://www.digitalocean.com)'s droplet as the deployment server.

**Directus.js** was and still is very easy to set up, you just connect it to a **PostgreSQL** database and you're done. **Next.js** was a very popular React metaframework with one key feature that suited this blogging website: **Incremental Static Regeneration (ISR)**. A small DigitalOcean droplet was enough given one of the core requirements of the project: no user registrations, no user-generated content other than from the website admins. Since a DO droplet is technically a VPS, we relied on `pm2` to keep the website running.

One thing worth noting: the owner and his admins could log in to the CMS and post articles themselves. We set Directus up so they could handle it independently. I'd just be on standby, watching the articles come in.

## It Was Alive, Once

I couldn't really remember exactly when the first article got posted, but less than a month after launch, I was already seeing quite a number of articles. They were all quite interesting, coming from a non-artist background, I was reading everything from tips and tricks, to open calls, to opinions on arts.

Artists express their feelings, emotions, and messages through their work. Sometimes their art isn't accepted by society, but that's what makes it art, pure, raw, untouched, original thoughts of the artist. There was one article about a [Surabayan painter](https://www.google.com/search?q=lukisan+yos+suprapto&ie=UTF-8&oe=UTF-8) who wasn't afraid to defy social stigma in this country. I liked how the writer sided with the painter, with the art, not the stigma.

As the section title says, it was alive, once. My two-year-old baby served its purpose ❤️‍🩹.

## The End

I don't really know why the owner shut it down. I'm guessing it's life stuff, I doubt he lost interest in arts. I didn't get any heads up. It was just me thinking "hey, let me check up on ACI" and it was already gone. My brother confirmed it randomly one day, and then it was official, gone-gone.

You can still see how ACI looked on [Wayback Machine](https://web.archive.org/web/20251204195901/https://artcallsindonesia.com/). A ghost of a website. Oh, and we aced the SEO, apparently ⛏️.

## Closing Thought

![React Meme from Level Up Coding](/assets/art-calls-indonesias-you-can-do-it-meme.webp)

I might sound like a broken radio, but this was my first React baby. And I think that's exactly why it stings a little, not because of the code, but because of what it represented. Proof that I _could_ do it. That switching from PHP + jQuery to the React world wasn't going to kill me.

The site's gone, but that part stays. It did its job. I guess I did mine too ✌️.
