# SEO Guide for Cogniba Blog

This guide explains how to create and optimize blog posts for maximum search engine visibility.

## 1. Creating a New Post

1.  Create a new `.mdx` file in `src/content/blog/`.
2.  Name the file using a "slug" format (lowercase, hyphens instead of spaces).
    - Example: `how-to-improve-working-memory.mdx`
    - URL will be: `cogniba.com/blog/how-to-improve-working-memory`

### Required: Image Prompt Comment (Dark Mode)

At the top of every post (immediately after frontmatter), include a JSX comment block that contains an **AI image prompt** for the OG image.

- Use MDX-safe JSX comments: `{/* ... */}` (do not use `<!-- ... -->`).
- The generator does not know our brand; **do not mention Cogniba** or "brand colors".
- Be explicit about **dark-mode colors** using the exact hex values from `src/styles/globals/globals.css` (use the `.dark` palette).
- State: 1200x630 PNG, no watermark, no people (unless intentionally needed), keep text within safe margins.
- Provide the exact headline/subtitle text that should appear on the image.

## 0. Avoid Duplicates (Required)

Before writing a post, check `BLOGPOSTS.md` so we don't publish the same topic twice.

- If a similar post already exists, update it or pick a different angle.
- After publishing, add the post to `BLOGPOSTS.md` (title, slug, date, and 1-line description).

## 2. Frontmatter (The Metadata)

Every post must start with "Frontmatter" block between three dashes `---`. This data controls how your post appears in Google and social media.

```yaml
---
title: "The Ultimate Guide to N-Back Training"
description: "Learn how the n-back task improves IQ and working memory. We explain the science and how to start training today."
date: "2024-03-20T12:00:00Z"
image: "/images/blog/n-back-guide.png"
author: "Marcos Hernanz"
role: "Founder & CEO"
tags: ["n-back", "brain-training", "science"]
---
```

### Field Breakdown

- **title**: The `<h1>` of the page and the blue link in Google. Keep it under 60 characters. Make it catchy but accurate.
- **description**: The short text under the link in Google. Keep it under 160 characters. Include your main keywords (e.g., "n-back", "IQ").
- **date**: Prefer an ISO timestamp in UTC for scheduled publishing (e.g. `2026-02-10T12:00:00Z`). Date-only (`YYYY-MM-DD`) is ok if you don't care about publish hour.
- **image**: The "social card" image shown on Twitter/LinkedIn.
  - Place images in `public/images/blog/`.
  - Recommended size: **1200x630 pixels**.
- **tags**: Used for internal organization and potentially future filtering.

## 3. Writing Content for SEO

### Keywords

Identify the main phrase users search for (e.g., "increase working memory").

- Include it in the **Title**.
- Include it in the **Description**.
- Include it in the **first 100 words** of the content.
- Include it naturally 2-3 times throughout the post.

### Structure (Headings)

Use headings to structure your content. Google loves hierarchy.

- `#` (H1) is automatic (from the title), so start your content with text or H2.
- Use `##` (H2) for main sections.
- Use `###` (H3) for subsections.

### Formatting

- Use **bold** for key concepts (don't overdo it).
- Use bullet points (like this list) for readability.
- Short paragraphs are better for mobile readers.

### Links

- **Internal Links**: Link to other Cogniba pages (e.g., "Check out our [pricing](/pricing) page" or "Read our [research](/research)"). This is crucial for crawling.
- **External Links**: Link to authoritative sources (e.g., "According to a [study by Jaeggi et al.](https://...)").

## 4. Checklist Before Publishing

- [ ] Filename is URL-friendly (`my-post-name.mdx`).
- [ ] Title is compelling and < 60 chars.
- [ ] Description is unique and < 160 chars.
- [ ] Image exists in `public/images/blog/` and is 1200x630px.
- [ ] Content uses H2 and H3 headings correctly.
- [ ] You have linked to at least one other page on Cogniba.com.
- [ ] You updated `BLOGPOSTS.md`.
