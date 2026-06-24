# Repository Guidelines

## Communication

- Default to Chinese for user-facing explanations, task notes, and change summaries.
- Keep code identifiers, file names, route slugs, and technical keywords in English.
- Prefer concise, implementation-oriented answers over broad discussion.
- Read `docs/index.md` first and load other docs on demand.

## Project Overview

- Product: `trashmail.space`
- Type: temporary email website running on Cloudflare Workers
- Frontend: React 19 + React Router 7
- Infra: Cloudflare Workers + D1 + R2
- Content model:
  - `app/routes/` for route modules
  - `app/md/<locale>/` for SEO landing pages
  - `app/blog/<locale>/` for blog content
  - `app/i18n/` for UI copy and dictionaries
  - `app/seo.config.ts` for indexable route definitions
  - `workers/app.ts` for `fetch`, `email`, and `scheduled` entrypoints

## Architecture Rules

- D1 stores email metadata only.
- R2 stores raw email content only.
- Session data belongs in cookie/KV-backed session handling, not in D1.
- Email detail access must validate both mailbox ownership and retention window.
- Do not introduce ORM or unrelated persistence abstractions unless explicitly requested.
- Do not modify the current routing structure, API shape, or application architecture unless the user explicitly asks for it.

## Coding Style

- Use TypeScript/TSX and ESM.
- Preserve existing formatting conventions.
- Avoid unrelated refactors while doing targeted work.
- Add comments only when the logic is not obvious from the code itself.

## Content And SEO Rules

This repository was forked from another project. Content uniqueness is now a hard requirement.

- Treat `trashmail.space` as the only primary brand.
- Do not reuse original-project wording, positioning, or brand narratives verbatim.
- Do not mention the original author or source project in page copy unless the page explicitly exists for attribution or migration notes.
- Do not publish pages whose title, description, headings, FAQ copy, or JSON-LD still read like generic cloned temp-mail SEO text.
- Every indexable page must have unique value beyond keyword substitution.
- Do not publish copy that reads like generic AI-generated marketing content.

### Brand Constraints

- Primary site name is `trashmail.space`.
- Allowed comparison/clarification page:
  - `smail-vs-smailpro`
- Outside explicit clarification pages, avoid overusing `smail`, `smail pro`, or `smailpro`.
- If a page must mention another brand, the copy must clearly explain why the mention exists and must not imply affiliation.

### Indexable Content Constraints

For any page under `app/md/` or `app/blog/`, ensure all of the following are true:

- The page has a distinct search intent.
- The `title` and `description` are not copied from another locale or source site.
- The first screen content states what the page helps with in plain language.
- The body contains site-specific wording, not generic SEO filler.
- Internal links point to real supporting pages on this site.
- Claims about retention, OTP delivery, privacy, or product behavior match the actual implementation.

### No-Clone Checklist

Before merging any content change, verify:

1. The page does not use inherited brand copy unchanged.
2. The page title is specific to the actual intent.
3. The meta description is rewritten, not lightly paraphrased.
4. Headings and FAQ entries are not mirror copies of the source project.
5. Structured data text matches the rewritten visible content.
6. Internal CTA labels and footer/navigation wording still fit the current brand.
7. The copy does not rely on empty marketing adjectives or filler transitions.

## Required File Sync For Markdown And SEO Changes

When adding or changing an SEO landing page, check and sync all relevant locations:

1. `app/routes.ts`
2. `app/seo.config.ts`
3. `app/routes/md.tsx`
4. `app/routes/sitemap.xml.tsx`
5. `app/md/<locale>/<slug>.md`
6. Any impacted UI copy in `app/i18n/messages.ts`

When adding or changing blog content, check and sync:

1. `app/blog/data.ts`
2. `app/routes/blog.tsx`
3. `app/routes/blog.page.tsx`
4. `app/routes/blog.post.tsx`
5. `app/routes/rss.xml.tsx`
6. `app/routes/sitemap.xml.tsx`
7. `app/blog/<locale>/<slug>.md`

## Locale Rules

- Supported locales must stay aligned with `app/i18n/config.ts`.
- Do not add a locale-specific page to sitemap/indexing unless the actual content exists.
- English and Chinese should be updated first when creating a new landing page.
- Do not ship placeholder translations.
- If a locale is incomplete, prefer not indexing it over indexing weak or duplicated copy.
- After English is accepted, translation rollout should proceed one locale at a time.
- Do not start multiple locale rewrites in parallel unless explicitly requested.

## Implementation Truthfulness

- If the product is receive-only, do not imply outbound sending support.
- If retention is 24 hours, do not use vague wording that suggests longer storage.
- If cleanup is scheduled, describe it conservatively.
- Do not claim mailbox anonymity, deliverability, or reliability beyond what the code and infrastructure actually guarantee.

## Validation Before Delivery

Run these when code or content changes affect behavior or build output:

1. `pnpm run typecheck`
2. `pnpm run build`

Also verify manually:

1. The route renders.
2. The title and description are correct.
3. The page appears in sitemap if it should be indexed.
4. The page is absent from sitemap or marked `noindex` if it should not be indexed.

## Content Workflow Reference

- Start from `docs/index.md`.
- Use `docs/content-seo-rules.md` for the detailed editorial workflow.
