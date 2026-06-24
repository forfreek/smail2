# Content And SEO Rules

## Goal

This document defines how Codex should create or modify markdown, blog, and SEO-related content for `trashmail.space`.

The main objective is to stop the project from looking like a textual clone of its source while keeping indexable pages consistent with the real product.

## Scope

Apply these rules whenever touching:

- `app/md/**`
- `app/blog/**`
- `app/routes/md.tsx`
- `app/routes/blog*.tsx`
- `app/seo.config.ts`
- `app/routes/sitemap.xml.tsx`
- `app/routes/rss.xml.tsx`
- `app/i18n/messages.ts`

## Core Principles

### 1. Brand First

- Write for `trashmail.space`, not for the original fork source.
- Use the current site name naturally in titles and copy.
- Do not keep legacy wording just because it already ranks somewhere else.

### 2. Unique Intent

Every indexable page must answer a distinct query or user problem.

Bad:

- multiple pages that all say "free temporary email for OTP"
- same article rewritten only by changing locale
- same article duplicated across slugs with minor keyword swaps

Good:

- one page for registration use cases
- one page for OTP delivery issues
- one page for receive-only limitations
- one clarification page for brand confusion

### 3. Truth Over SEO Inflation

- Do not promise inbox delivery success.
- Do not imply permanent storage.
- Do not claim security guarantees that the app does not implement.
- Keep language consistent with actual retention and access behavior.

### 4. Anti-AI Writing Standard

- Write like a precise product editor, not a generic SEO generator.
- Prefer concrete statements over padded persuasion.
- Every paragraph should add real information, not just tone.
- If a sentence could fit on any disposable-email website, rewrite it.

## Anti-AI Language Constraints

### Avoid These Writing Patterns

- empty praise without substance
- generic motivational phrasing
- repeated keyword permutations
- headline/body duplication
- broad claims with no operational meaning
- filler transitions that do not move the argument forward

### Avoid These Word Types By Default

- best
- ultimate
- seamless
- powerful
- robust
- secure solution
- game-changing
- effortless
- next-level
- instantly protect your privacy
- perfect for
- whether you are
- in today's digital world
- unlock
- elevate

Use them only if the page genuinely proves the claim. In most cases, do not use them.

### Avoid These Sentence Habits

- opening with broad industry clichés
- stacking 3 to 5 near-synonyms in one sentence
- repeating `temporary email`, `temp mail`, `disposable email`, and `OTP` in one paragraph unless required
- writing intros that restate the title without adding new meaning
- writing conclusions that only say the site is fast, simple, or convenient

### Preferred Style

- short factual sentences
- plain product language
- concrete limitations
- explicit use cases
- direct contrast between suitable and unsuitable scenarios
- strong nouns and verbs over marketing adjectives

## Quality Gates For Indexable Copy

Before accepting any new or rewritten page, verify:

1. The first paragraph says something specific about this site.
2. The page has at least one section that would not make sense on a generic clone.
3. The body does not repeat the same keyword cluster unnaturally.
4. At least one limitation or boundary is stated clearly.
5. The page does not rely on empty brand adjectives to sound credible.
6. The conclusion gives the user a concrete next step or decision rule.

## Markdown Page Rules

For each page in `app/md/<locale>/`:

- The `h1` must clearly state the page topic.
- The first two paragraphs must explain actual user value quickly.
- Include concrete use cases or limitations.
- Avoid filler blocks written only for keyword density.
- Use internal links only when they help the user continue the task.

Preferred page structure:

1. Problem or intent
2. How this site helps
3. Limits or caveats
4. Recommended next step

## Blog Rules

For each post in `app/blog/<locale>/`:

- Focus on one specific question or troubleshooting scenario.
- Avoid broad generic "ultimate guide" style posts unless the page is genuinely comprehensive.
- Prefer short paragraphs and direct headings.
- If operational advice is given, ensure it matches product behavior.

## Metadata Rules

For all indexable pages:

- `title` must be rewritten intentionally, not copied forward.
- `description` must summarize real page value.
- FAQ JSON-LD must match visible FAQ content.
- Article JSON-LD must describe the actual page topic.
- Breadcrumb labels must reflect the current page wording.
- Do not let metadata sound more promotional or more generic than the body.

Do not:

- stuff multiple near-duplicate keywords into every title
- repeat the same description pattern across every page
- leave metadata referring to another brand or historical wording
- use clickbait phrasing
- use vague superlatives that the page does not support

## Brand Mention Rules

Allowed cases for mentioning other names:

- comparison page
- clarification page
- migration note
- explicit user-requested comparison content

When used:

- explain the purpose of the mention
- avoid any implication of partnership
- keep the current site as the primary subject

## Locale Strategy

- `en` and `zh` are the minimum priority locales for new landing pages.
- Only add other locales when the content is properly localized.
- Do not machine-copy the English structure with low-quality literal translation.
- If localization quality is weak, keep the locale unindexed until improved.

## Sync Checklist

When adding a new markdown landing page:

1. Add the route mapping.
2. Add the slug to `app/seo.config.ts`.
3. Add meta copy in `app/routes/md.tsx`.
4. Add markdown files for required locales.
5. Confirm sitemap output includes it if indexable.
6. Confirm robots behavior is correct.

When rewriting an existing page:

1. Update visible markdown.
2. Update metadata copy.
3. Update FAQ or structured data if affected.
4. Review internal links and CTA blocks.
5. Re-check sitemap and indexing assumptions.

## Review Questions Before Merge

Ask these before finishing a content task:

1. If Google indexed only this page, would it look obviously different from the source project?
2. Does the page teach something specific, or is it mostly rewritten filler?
3. Are the product claims accurate?
4. Is the page worth indexing in its current locale?
5. Did all metadata and sitemap links stay in sync?
6. Does the page avoid generic AI-seeming wording?
7. Would a human editor keep every paragraph, or cut some as fluff?

## Minimum Verification

After content-related changes:

1. Run `pnpm run typecheck`
2. Run `pnpm run build`
3. Manually inspect the affected route if possible

If those checks are skipped, state that explicitly in the final summary.
