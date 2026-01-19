# Cogniba SEO Guide

This guide explains how to create SEO-ready blog posts in `src/content/blog` and how to optimize them for evergreen sign-up traffic.

## Blog Post Workflow

1. Create a new `.mdx` file in `src/content/blog`.
2. Use a short, readable slug in the filename (e.g. `working-memory-training.mdx`).
3. Fill in the required frontmatter fields (see below).
4. Write content using clear headings, internal links, and a strong sign-up call-to-action.

## Required Frontmatter

```yaml
---
title: ""
description: ""
date: "YYYY-MM-DD"
image: "/images/blog/your-image.png"
author: "Cogniba Team"
tags: ["working-memory", "n-back", "cognitive-training"]
---
```

## Recommended Frontmatter

```yaml
---
updatedAt: "YYYY-MM-DD"
ogImage: "/images/blog/your-og-image.png"
canonicalUrl: "https://cogniba.com/blog/your-slug"
noindex: false
draft: false
---
```

### Field Guidelines

- `title`: 55-60 characters. Put the primary keyword near the beginning.
- `description`: 140-160 characters. Summarize the benefit and include the primary keyword once.
- `date`: Original publish date.
- `updatedAt`: Update when the content changes meaningfully.
- `image`: 1200x630 hero image (also used as fallback OG image).
- `ogImage`: Optional, use if the OG image needs to differ from the hero image.
- `canonicalUrl`: Only needed if the post has a canonical URL different from `/blog/[slug]`.
- `noindex`: Set to `true` for posts you do not want indexed.
- `draft`: Set to `true` to hide a post from the blog list and sitemap.
- `tags`: 3-6 keywords, use the same casing and hyphen style across posts.
- `author`: Optional; defaults to Cogniba Team.
- `role`: Optional; used in structured data when provided.

## Content Structure

Use this format for most posts:

1. H1: The post title (automatic).
2. Intro paragraph: State the problem and promise the outcome.
3. H2: Core topic sections (2-4 of these).
4. H3: Supporting details, evidence, or examples.
5. Summary + CTA: Direct users to sign up.

## SEO Best Practices

- Target one primary keyword and 2-3 secondary keywords.
- Use the primary keyword in:
  - Title
  - First 100 words
  - One H2 heading
  - Meta description
- Keep paragraphs short and add lists for skimmability.
- Link to related posts and high-intent pages (`/sign-up`, `/pricing`).
- Add external references only when they improve trust (studies, peer-reviewed sources).

## Evergreen Topic Ideas

Prioritize topics that align with sign-ups and long-term search demand:

- Working memory training
- N-back training benefits
- Cognitive training for focus
- Improving fluid intelligence
- Brain fitness routines
- Neuroplasticity and learning
- How to train concentration
- Science-backed brain training

## Calls to Action (Sign-Ups)

Use a CTA near the end of every post:

- "Start training your working memory with Cogniba." (link to `/sign-up`)
- "Try Cogniba free and track your progress." (link to `/sign-up`)
- "Upgrade for unlimited training." (link to `/pricing`)

## Internal Linking Tips

- Link to one related blog post and one product page per article.
- Use descriptive anchor text (avoid "click here").
- Keep the link count to 3-6 per post unless the article is long.

## Image Optimization

- Use 1200x630 images for hero + OG.
- Use descriptive filenames (`working-memory-guide.png`).
- Always include `alt` text in markdown images.

## Example Post

```mdx
---
title: "Working Memory Training: A Practical Guide"
description: "Learn the best working memory exercises and how n-back training improves focus."
date: "2026-01-19"
updatedAt: "2026-01-19"
image: "/images/blog/working-memory-guide.png"
ogImage: "/images/blog/working-memory-guide.png"
author: "Cogniba Team"
tags: ["working-memory", "n-back", "brain-training"]
---

Your intro paragraph here.

## What Is Working Memory?

Explain the concept.

## How N-Back Training Helps

Explain the science.

## Start Training Today

[Start training your working memory with Cogniba.](/sign-up)
```
