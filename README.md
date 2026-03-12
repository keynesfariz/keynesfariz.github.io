# fariz.me - Personal Portfolio

Welcome to the source code for my personal portfolio website, built with modern web technologies to showcase my work, experience, and writings.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/icons/)
- **Theming**: `next-themes` (Dark/Light mode support)
- **Package Manager**: [Bun](https://bun.sh/)

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

> **Note**: If you are using a different package manager, make sure to update the `deploy.yml` file accordingly.

## 📝 TODO List

This is a personal checklist of things I need to update before this site is fully ready for production:

### Content Updates

- [ ] **Home Page**: Update the hero section text to accurately reflect my current role.
- [ ] **About Page**: Rewrite the "About Me" paragraphs to be more personal and detailed.
- [x] **Home Page**: Replace `/placeholder-avatar.png` with a real professional headshot.
- [x] **Home Page**: Update the "Experience" section with my actual timeline and responsibilities.
- [x] **Home Page**: Update the "Education" section with my actual degrees and universities.
- [x] **About Page**: Replace the mock Git contribution graph with an actual integration (e.g., using GitHub API) or remove it if unnecessary.
- [x] **Footer**: Update the `href` links for LinkedIn, GitHub, and Resume.
- [x] **Resume**: Add my actual `resume.pdf` to the `/public` folder.

### Blog / Writing

- [ ] **Writings Page**: Remove all mock data from `/app/writings/page.tsx` and implement a real CMS or MDX fetching system.
- [ ] **Writing Detail**: Implement dynamic routing fetching real markdown/MDX content instead of using hardcoded switch statements or mock text.

### Deployment & SEO

- [x] **Metadata**: Update the `app/layout.tsx` metadata (title, description, open graph images) for SEO.
- [x] **Analytics**: Add web analytics (e.g., Vercel Analytics, Plausible, or Google Analytics).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
