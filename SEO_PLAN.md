# SEO Plan (90 Days)

Start date: Fri Feb 06, 2026
End date: Wed May 06, 2026

This plan is optimized for speed and low ongoing effort. The goal is to fix all current SEO issues today, then run a repeatable weekly system every Monday.

This plan assumes you are publishing at high volume with AI. To avoid repeating topics, maintain `BLOGPOSTS.md`.

## Goals (90 days)

- Get all public pages correctly indexed (no canonical mistakes, no missing OG assets, auth pages excluded).
- Publish enough high-quality content to win long-tail queries in the "n-back / working memory / IQ / focus" space.
- Build internal linking so Google understands site structure and topical authority.

Primary KPIs (track in Google Search Console):

- Pages indexed (Coverage)
- Impressions and clicks (Performance)
- Queries and average position for target topics

Secondary KPIs:

- Blog posts published
- Internal links per post (target: 3-5)
- Referring domains (even 5-20 good links moves the needle)

## Day 0: Fix All SEO Issues Today

Due: Fri Feb 06, 2026 (today)

Definition of done: all items below are deployed and verified via page source and/or live URLs.

1. Canonicals

- Problem found: `src/app/layout.tsx` sets a global canonical of `/`, which makes most pages canonicalize to the homepage.
- Fix:
  - Remove the global canonical from `src/app/layout.tsx`, OR
  - Set correct canonicals per marketing page and keep `/` canonical only on the homepage.
- Verify:
  - View source on `/pricing`, `/research`, `/faq`, `/blog` and confirm canonical points to itself.

2. Open Graph / Twitter images

- Problem found: `src/app/layout.tsx` references `/og-image.png` but the file is missing.
- Fix:
  - Add `public/og-image.png` (1200x630).
- Verify:
  - `https://cogniba.com/og-image.png` returns 200.
  - Home page HTML contains `og:image` and `twitter:image` with a valid URL.

3. JSON-LD publisher logo for blog posts

- Problem found: blog JSON-LD uses `${siteUrl}/logo.png` but only `public/logo.svg` exists.
- Fix:
  - Update `src/app/(www)/blog/[slug]/page.tsx` to point to an existing logo asset (`/apple-icon.png`).
- Verify:
  - View source for a blog post and confirm JSON-LD `publisher.logo.url` is a real file.

4. Unique metadata for key marketing pages

- Problem found: the homepage and pricing page currently inherit the root title/description; most pages do not define unique metadata.
- Fix (minimum): add a unique `metadata` export for:
  - `src/app/(www)/(landing-page)/page.tsx`
  - `src/app/(www)/pricing/page.tsx`
- Fix (nice-to-have today): add/confirm unique metadata for:
  - `src/app/(www)/research/page.tsx` (already has metadata)
  - `src/app/(www)/faq/page.tsx` (already has metadata)
  - `src/app/(www)/blog/page.tsx` (already has metadata)
- Verify:
  - `title` and `meta description` are unique per page and not duplicated (avoid "| Cogniba" twice).

5. Noindex auth pages

- Problem found: auth pages are indexable (sign-in/sign-up/forgot-password).
- Fix:
  - Add `src/app/(www)/(auth)/layout.tsx` exporting `metadata.robots` with `noindex, follow` for all auth routes.
- Verify:
  - View source and confirm `meta name="robots" content="noindex"` (or equivalent) is present.

6. Sitemap + robots.txt

- Current state (good): `src/app/sitemap.ts` and `src/app/robots.ts` exist.
- Verify today:
  - `https://cogniba.com/sitemap.xml` returns 200 and includes blog URLs.
  - `https://cogniba.com/robots.txt` returns 200 and references the sitemap.

7. Measurement setup (non-code)

- Google Search Console
  - Add property for `cogniba.com`.
  - Submit sitemap: `https://cogniba.com/sitemap.xml`.
- Optional but recommended:
  - Bing Webmaster Tools (same sitemap).

## Weekly Monday System (Repetitive Tasks)

Every Monday at a fixed time (30-90 minutes total).

Start: Mon Feb 09, 2026
Last Monday in this plan: Mon May 04, 2026

### Monday checklist

1. Pick and schedule content for the week

- Recommended cadence: 15 posts/week (3 posts/day, Mon-Fri), written in a Monday batch and scheduled.
- If you can keep quality high, you can go to 21 posts/week (3/day, 7 days).
- Mandatory process step: update `BLOGPOSTS.md` with every post you publish.
- Guardrails (to avoid AI-thin spam):
  - One primary keyword/query per post.
  - Must cite 2+ real sources when making scientific claims.
  - Must include 3+ internal links (at least one to `/pricing` or `/sign-up`, one to `/research`, one to another blog post).
  - Must have a unique meta description (no duplicates across posts).
  - Must have an OG image in `public/images/blog/` (1200x630).

2. Refresh internal links

- Update 5 older posts:
  - Add links to the newest posts.
  - Add links to product pages where relevant.

3. Check Search Console for 15 minutes

- Indexing:
  - Any new errors (Coverage).
  - Any pages excluded unexpectedly.
- Performance:
  - Queries with high impressions + low CTR: improve title/description.
  - Queries ranking positions 8-20: add internal links and expand sections.

4. One small backlink action

- Pick one:
  - Submit one relevant directory listing.
  - Ask one person/site for a link to a useful guide.
  - Post one strong article to a community where it fits (and link back).

## Content Strategy (Fast, High Volume, Still Useful)

Your best advantage is topical depth around a narrow set of themes. Use clusters:

Cluster A: N-Back basics

- What is the n-back task?
- Single vs dual n-back
- Common mistakes, how to practice, what results to expect

Cluster B: Working memory

- What is working memory?
- How to increase working memory (evidence-based)
- Training protocols and routines

Cluster C: IQ / fluid intelligence

- Does n-back increase IQ?
- What meta-analyses show
- Practical expectations and limitations

Cluster D: Focus / ADHD

- N-back and attention control
- How to train for focus
- What the science says (avoid medical claims)

Cluster E: Anxiety / rumination

- Working memory and rumination
- Cognitive control and emotion regulation

For each cluster:

- Create 1 "pillar" post (2,000-4,000 words) and 10-30 supporting long-tail posts.
- Every supporting post links back to the pillar.

## Timeline and Deadlines

### Today (Fri Feb 06, 2026)

- Complete all items in "Day 0".

### Week 1

- Mon Feb 09, 2026: run Monday checklist; publish/schedule first 15 posts.
- Fri Feb 13, 2026: verify in Search Console that pages are being discovered (even if not ranked yet).

### Weeks 2-4

- Mon Feb 16, 2026: Monday checklist.
- Mon Feb 23, 2026: Monday checklist.
- Mon Mar 02, 2026: Monday checklist.

Milestone by Fri Mar 06, 2026:

- 60+ posts live (minimum) OR 120+ posts live (aggressive).
- No indexing of auth pages.
- No canonical mistakes.

### Weeks 5-8

- Mon Mar 09, 2026: Monday checklist.
- Mon Mar 16, 2026: Monday checklist.
- Mon Mar 23, 2026: Monday checklist.
- Mon Mar 30, 2026: Monday checklist.

Milestone by Mon Apr 06, 2026:

- 120+ posts live (minimum) OR 240+ posts live (aggressive).
- Identify top 10 queries by impressions and update matching posts to improve CTR and on-page depth.

### Weeks 9-13

- Mon Apr 06, 2026: Monday checklist.
- Mon Apr 13, 2026: Monday checklist.
- Mon Apr 20, 2026: Monday checklist.
- Mon Apr 27, 2026: Monday checklist.
- Mon May 04, 2026: final Monday checklist for this 90-day plan.

Final milestone by Wed May 06, 2026:

- 180+ posts live (minimum) OR 360+ posts live (aggressive).
- Refresh the top 20 posts (based on impressions) with:
  - better titles/descriptions
  - stronger internal linking
  - updated citations

## Notes and Repo References

- Blog SEO guidelines: `SEO.md`
- Blog topics index (avoid duplicates): `BLOGPOSTS.md`
- Sitemap: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`
- Root metadata: `src/app/layout.tsx`
- Blog post metadata + JSON-LD: `src/app/(www)/blog/[slug]/page.tsx`
- Blog content: `src/content/blog/`
