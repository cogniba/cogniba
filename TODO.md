# Manual SEO Tasks (TODO)

This file tracks the manual steps required to complete the "Week 1" SEO plan.
**Status**: Pending

## 1. Image Generation (Required before publishing)

You need to generate 15 OG images (1200x630) for the new blog posts.
Open each file in `src/content/blog/` and copy the prompt from the top comment.

- [ ] `src/content/blog/what-is-n-back-task.mdx`
- [ ] `src/content/blog/single-vs-dual-n-back.mdx`
- [ ] `src/content/blog/does-n-back-increase-iq.mdx`
- [ ] `src/content/blog/working-memory-explained.mdx`
- [ ] `src/content/blog/how-to-train-n-back.mdx`
- [ ] `src/content/blog/n-back-training-mistakes.mdx`
- [ ] `src/content/blog/n-back-results-timeline.mdx`
- [ ] `src/content/blog/n-back-for-focus.mdx`
- [ ] `src/content/blog/n-back-for-students.mdx`
- [ ] `src/content/blog/n-back-for-programmers.mdx`
- [ ] `src/content/blog/n-back-and-adhd.mdx`
- [ ] `src/content/blog/n-back-and-anxiety.mdx`
- [ ] `src/content/blog/how-to-improve-working-memory.mdx`
- [ ] `src/content/blog/fluid-intelligence-explained.mdx`
- [ ] `src/content/blog/does-brain-training-work.mdx`

**Action**: Save the generated images to `public/images/blog/[slug].png`.

## 2. Deployment

- [ ] Push all changes to main.
- [ ] Verify the build succeeds on Vercel/Host.

## 3. Search Console Verification (After Deploy)

- [ ] **Sitemap**: Verify `https://cogniba.com/sitemap.xml` now lists 17 blog posts (2 old + 15 new).
- [ ] **Indexing**: Go to "URL Inspection" in Google Search Console for at least 3 of the new posts (e.g., the 5 pillars).
  - Click "Test Live URL".
  - Click "Request Indexing".
- [ ] **Check Auth Pages**: Inspect `https://cogniba.com/sign-in` and confirm it says "Excluded by noindex tag".

## 4. Backlink Action (One Small Win)

- [ ] **Action**: Find one directory, forum thread (Reddit r/nootropics, r/cognitiveTesting), or social discussion relevant to "n-back" or "brain training".
- [ ] **Post**: Share a helpful summary of one of the new articles (e.g., "Single vs Dual N-Back") and link to it as a source.

## 5. Weekly Review (Next Monday)

- [ ] Check `BLOGPOSTS.md` to pick next week's topics.
- [ ] Check GSC for "Performance" gains.
