# keynesfariz.github.io

My personal website and blog, built because I finally decided to stop overthinking the design and just ship something 😃.

It serves as a central place to showcase my projects, host my resume, and force myself to write more about systems design, AI tooling, and whatever side projects I'm tinkering with.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static Export)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Content**: [Content Collections](https://www.content-collections.dev/) for type-safe Markdown blog posts
- **Resume Data**: [JSON Resume](https://jsonresume.org/) schema integration
- **Icons**: [Lucide React](https://lucide.dev/icons/)
- **Theming**: `next-themes` (Dark/Light mode)
- **Package Manager**: [Bun](https://bun.sh/)

## 🏗️ Features

- **Markdown Blog**: Fast and type-safe markdown parsing for all my writings using Content Collections.
- **Data-Driven Resume**: The `/resume` page is powered directly by a schema conforming to the JSON Resume standard, making it incredibly easy to update my professional timeline.
- **AI Chatbot**: Real-time conversational interface on the `/chat` route powered by a [custom RAG backend](https://github.com/keynesfariz/personal-rag-chatbot) for you to ask about myself.
- **100% Static**: Hosted on GitHub Pages as a fully static export (`output: 'export'`) for maximum speed and zero infrastructure overhead.

## 🏃‍♂️ Getting Started

1. Clone the repository
2. Install dependencies using Bun:

```bash
bun install
```

3. Run the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
