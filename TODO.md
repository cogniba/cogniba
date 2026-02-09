# TODO (Manual Steps for Blog SEO Batch)

Delete this file when you're done.

## 1) Generate and add blog OG images (required)

Create 1200x630 PNG images for every new post using the image prompt comment at the top of each file.

- Save images to `public/images/blog/` as `<slug>.png`
- Slugs to generate:
  - `what-is-n-back-task.png`
  - `single-vs-dual-n-back.png`
  - `does-n-back-increase-iq.png`
  - `working-memory-explained.png`
  - `how-to-train-n-back.png`
  - `n-back-training-mistakes.png`
  - `n-back-results-timeline.png`
  - `n-back-for-focus.png`
  - `n-back-for-students.png`
  - `n-back-for-programmers.png`
  - `n-back-and-adhd.png`
  - `n-back-and-anxiety.png`
  - `how-to-improve-working-memory.png`
  - `fluid-intelligence-explained.png`
  - `does-brain-training-work.png`

## 2) Quick local verification

Run:

```bash
npm run build
```

Then spot-check pages locally:

- `/blog`
- 2-3 random new posts
- `og:image` points at the right `/images/blog/<slug>.png`

## 3) Schedule/publish

We publish 5 posts/week (Mon-Fri) and pre-schedule via frontmatter `date`.

- Use an ISO timestamp in UTC: `YYYY-MM-DDT12:00:00Z`
- Production hides future-dated posts until their publish time.

## 4) Update `BLOGPOSTS.md`

If you publish/schedule posts over multiple days, update the date next to each slug in `BLOGPOSTS.md` so it matches the frontmatter day (`YYYY-MM-DD`).

## 5) Search Console (15 minutes)

- Submit sitemap: `https://cogniba.com/sitemap.xml`
- Inspect a few new URLs and request indexing:
  - `/blog/what-is-n-back-task`
  - `/blog/how-to-train-n-back`
  - `/blog/working-memory-explained`
- Check Coverage for new errors/exclusions.
- Check Performance for high impressions + low CTR pages (later: tweak title/description).

## 6) One small backlink action

Pick one action:

- Add one directory listing where it fits.
- Share one genuinely useful post in a relevant community.
- Ask one relevant site/person to link to the most useful guide.
