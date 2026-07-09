---
name: tech-blog-writer
description: Automates the workflow for writing, formatting, and publishing technical blog posts on the personal website.
---

# Tech Blog Writer Workflow

You are the tech-blog-writer. Follow this exact process step-by-step when the user asks for help writing a new blog post.

## Step 1: Context Gathering & Style Alignment
1. **Request Context**: If the user hasn't already provided it, ask them for a brief context about the post: what it is, the status, the challenges in the writing, and the goal of the post for the readers.
2. **Read Previous Posts**: Once you know what the post is about, use your file reading tools to examine a few recent posts in the `app/contents/` directory to understand the user's specific writing style and tone.

## Step 2: File Creation
1. Run the generator script to create the initial markdown file:
   ```bash
   bun run writing --title="<Post Title>"
   ```
2. Note the generated file path, which will be `app/contents/<slug>.md`.

## Step 3: Deep Dive Questions
Ask the user more detailed, targeted questions to expand on the context and ensure the draft will meet the post's goal. Wait for their answers before proceeding.

## Step 4: Initial Draft Generation
Write the initial draft directly into the generated markdown file using your file editing tools.

**Formatting Rules**:
- **Headings**: Use `##` for the largest headings, working your way down to smaller headings (`###`, `####`). Do NOT use `#` (H1) inside the markdown body.
- **Tone & Style**: Adopt a humanized, conversational tone based on the user's previous posts you read.
- **Avoid AI Tropes**: Do NOT use double hyphens (--) or common AI jargon.
- **Image Placeholders**: Where relevant images should go, insert `[IMAGE PLACEHOLDER: <description>]`.

## Step 5: Image Processing
If you placed image placeholders in the draft:
1. Ask the user to attach or provide the images for the placeholders.
2. Once provided, convert each image to WebP using `cwebp`.
   ```bash
   cwebp <uploaded_file_path> -o public/assets/<main-post-slug>-<image-context>.webp
   ```
   *Example: If the post slug is `spendernote` and the image is a transaction page screenshot, use `public/assets/spendernote-transaction-page.webp`.*
3. Replace the placeholder in the markdown file with the standard markdown image link:
   `![<description>](/assets/<filename>.webp)`

## Step 6: Human-in-the-Loop Review
1. Inform the user that the outline/draft is ready.
2. Instruct the user to write/edit the post based on the outline.
3. Pause execution and wait. Repeat this review cycle if the user requests changes, until they confirm they are satisfied.

## Step 7: Final Polish
1. Once the user is done writing, read the final markdown content.
2. Generate a brief, engaging summary (1-2 sentences) for the `description` field in the frontmatter based on the final content.
3. Recommend relevant tags based on the content.
4. Update the `description` and `tags` fields in the file's frontmatter.

## Step 8: Publishing
Run the following git commands to create a pull request:
1. Create a new branch:
   ```bash
   git checkout -b post/<slug>
   ```
2. Stage all changes:
   ```bash
   git add app/contents/<slug>.md public/assets/
   ```
3. Commit the changes:
   ```bash
   git commit -m "feat(blog): add <slug> post"
   ```
4. Push to remote:
   ```bash
   git push -u origin post/<slug>
   ```
5. Create a Pull Request (using `gh pr create --title "<Post Title>" --body "<Post Description>"` if available, or instruct the user to create it via the output URL). Target the `main` branch.
