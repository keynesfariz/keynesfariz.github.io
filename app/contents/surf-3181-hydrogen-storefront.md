---
title: 'Custom Storefront for Surf3181 Boardstore, Powered by Shopify Hydrogen'
created_at: '2026-05-09T18:42:27.757Z'
description: 'How I built an Australian surf shop storefront with Shopify Hydrogen + Oxygen, and why the stack was worth every bit of it.'
url: 'https://surf3181.com.au/'
tags:
  [
    'shopify',
    'hydrogen',
    'oxygen',
    'remixjs',
    'typescript',
    'pos',
    'surfboard',
    'storefront',
  ]
---

> TL;DR: Leveraging Shopify's Environment to build a custom storefront with Hydrogen + Remix.js. Deployed to Oxygen. Waiting on the client's end to go live.

## What's Surf 3181? (& How I Got Involved)

![Surf3181 Offline Store](/assets/surf3181-offline-store.webp)

[Surf 3181](https://maps.app.goo.gl/5A7DcHDh56Wz2toB9) is a surf shop based in Victoria, Australia. They sell surfboards, custom boards, apparel, accessories, wetsuits, and gift cards. They've had a solid offline presence from the start and have been using [Instagram](https://www.instagram.com/surf_3181) to keep their community engaged. Now they're expanding online so customers can actually browse and order without sliding into the DMs.

A friend of mine, who handles the website design side, pulled me in as the frontend developer. I honestly have no idea how she landed an Aussie client from here, but hey, I wasn't going to ask too many questions 😄.

## The Stack and Why

![Surf3181 Pricing Comparison, Shopify vs Building from Scratch](/assets/surf3181-pricing-comparison.webp)

Before this project, they had no storefront at all. The first big decision was whether to build everything from scratch (storefront + CMS modules) or go with an existing platform like Shopify. We ran the numbers. Shopify came in at less than half the initial cost of a custom build, and that's before you factor in the time saved on things like auth, payments, product management, and security. For the first two years, it wasn't even close.

### Shopify Hydrogen

[Hydrogen](https://hydrogen.shopify.dev) is Shopify's official React-based framework for building custom storefronts. It connects directly to the Shopify Storefront API and gives you full control over the UI — no themes, no Liquid templating, just React and a headless approach to your store's data.

The reason we went with Hydrogen over a regular Shopify theme is simple: we needed complete design freedom. A default Shopify theme would've gotten us 70% of the way there fast, but the client had a clear visual direction and we didn't want to fight the theme structure to get there. With Hydrogen, we own the entire frontend.

### Shopify Oxygen

Oxygen is Shopify's own hosting platform. Think of it like Vercel, but it's baked into the Shopify ecosystem and comes free with your Shopify plan. More on this in the deployment section.

You can go and checkout their blog posts on how they build [Hydrogen](https://shopify.engineering/how-we-built-hydrogen) and [Oxygen](https://shopify.engineering/how-we-built-oxygen).

## Design

The visual direction for Surf 3181 leans into high-quality imagery, which makes a lot of sense for a brand like this. Surfing is a high-interest, lifestyle-heavy hobby. You're not just selling a product, you're selling a feeling. The design reflects that.

The color palette uses a thick black-and-white logo against a soft, muted teal header. Bold sans-serif typography. The overall vibe I'd describe as "urban surf shop meets sun-drenched professional." Clean but not sterile. Premium but not pretentious.

![Surf3181 Homepage Design](/assets/surf3181-homepage.webp)

Most of the components were built from scratch. The one exception is the range slider for the surfboard volume calculator, where I used a Radix slider since it handles accessibility and interaction behavior really well out of the box. For everything else, custom all the way.

## Features

This is the part where the build gets interesting.

### Product Listing and Collections

![Surf3181 Product collections page](/assets/surf3181-collection.webp)

Products are organized into collections (surfboards, apparel, accessories, etc.) and the catalog uses infinite scroll instead of pagination. It keeps the browsing experience smooth, especially on mobile.

### Product Detail Page (PDP)

![Surfboard PDP with specs](/assets/surf3181-pdp.webp)

The PDP for regular products has your standard variant chooser (size, color) and a dimension chooser. But the surfboard PDP has some extra stuff that made this more fun to build.

Each surfboard has a set of custom metadata we defined on the Shopify platform: wave height range, skill level, rails, nose rocker, and tail rocker. These aren't default Shopify fields, they're custom metafields we set up and pull in via the Storefront API. This way, a customer can actually understand what they're looking at before buying a board.

### Surfboard Volume Calculator

![Volume calculator](/assets/surf3181-volume-calculator.webp)

This was one of the more fun features to build. Choosing the right surfboard volume depends on the rider's weight, height, and skill level. We built an interactive calculator that takes those inputs and spits out a recommended volume range. Helps customers self-select the right board without needing to talk to someone first.

These are sources for the formula:

- [SurferToday](https://www.surfertoday.com/surfing/the-surfboard-volume-calculator#google_vignette)
- [Onboard](https://onboardstore.com.au/volumecalculator) - _No longer exists_

### Cart

![Cart drawer and cart page on mobile view](/assets/surf3181-cart-drawer-full-page-on-mobile.webp)

The cart is available both as a slide-over drawer and a dedicated cart page. Both stay in sync with the same cart state. The drawer is the quick-access version for when you just want to add something and keep browsing. The dedicated page is for when you're ready to review everything before checkout.

### Interactive Navbar

![Navbar in desktop view](/assets/surf3181-navbar.webp)

The navbar handles collection navigation, cart access, and user account. On mobile it collapses into a proper drawer menu. It also reflects the cart item count in real time.

### User Profile and Order History

Once logged in, users can see their order history from their profile page. Standard stuff, but important for a shop that's building long-term customer relationships.

## Deployment and CI/CD via Oxygen

This was genuinely one of the smoothest deployment experiences I've had on a client project.

Setting up Oxygen is basically:

1. Connect your GitHub repository in the Shopify admin
2. Set your production branch
3. Oxygen opens an automated pull request that adds a GitHub Actions workflow to your repo

That's it for setup. After that, the workflow is exactly what you'd want:

![Shopify bot PR](/assets/surf3181-shopify-bot.webp)

Every pull request gets a live preview deployment on Oxygen's infrastructure automatically. The Shopify bot posts the preview URL as a PR comment along with the deployment status check. When the PR is merged, it deploys to production and you get the deployment link for that merge as well.

No extra config, no separate CI setup, no platform hopping. It just works. I genuinely enjoyed this part.

### Why Oxygen over Vercel?

Oxygen comes with your Shopify subscription, it's optimized for Hydrogen, and it's one less platform to manage. For a client project where the hosting should be their concern long-term, keeping everything under the Shopify umbrella is a clean handoff. Even though Hydrogen apps technically can deploy to Vercel or other platforms.

Speaking of cost: Shopify Basic is USD 19/month, and the first 3 months are just USD 1/month. That plan includes Oxygen hosting. You'll still need to pay for a custom domain separately, but the baseline is pretty affordable for what you get.

## Where It's At Now

The storefront is dev-complete and deployed on Oxygen ✅. All the features above are built, tested, and sitting on a staging URL ready to go.

The public launch is tied to the client's migration from their current point-of-sale system, Abacus, to Shopify POS. That migration is a whole separate process on the business side that's outside of my scope as the frontend developer. Once they've completed it, the inventory, products, and operational side will be fully on Shopify and the storefront can go live.

My part of the fence is done. The storefront is ready to sell surfboards. We're just waiting on the cash register to be set up 😄.

## Closing

This was a fun project. Building on Hydrogen felt different from a typical Next.js project in good ways. The Remix foundation pushes you toward cleaner data loading patterns, and the Shopify Storefront API is well-documented enough that you're not constantly guessing.

The custom metafields for surfboard specs were a nice touch, and the volume calculator was the kind of feature that actually makes the storefront feel like it was built for surfers, not just built for Shopify.

Would I use Hydrogen + Oxygen again? Yes, without hesitation. If a client's business is already on Shopify or heading there, this stack is the obvious call. The dev experience is solid, the deployment is smooth, and the cost is reasonable. Hard to argue with that.
