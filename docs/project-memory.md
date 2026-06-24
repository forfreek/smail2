# Project Memory

## Project Identity

- Repository: `smail2`
- Production domain: `trashmail.space`
- Primary brand: `trashmail`
- Product type: temporary email website
- Deployment target: Cloudflare Workers
- Canonical site brand in content can appear as `trashmail` or `trashmail.space` depending on context

## Current Situation

- The site is already online.
- A meaningful part of the current SEO/content layer still carries fork-derived wording.
- Indexing quality is incomplete.
- The main risk is not missing routes alone, but low-distinction content and brand ambiguity.

## Canonical Content Policy

- Treat `trashmail` as the primary brand and `trashmail.space` as the canonical domain.
- Do not preserve source-project wording just because it already exists in the repo.
- Do not write copy that implies affiliation with similarly named services.
- If another brand is mentioned, it must be for explicit clarification only.

## Current Execution Strategy

This project is intentionally being updated in controlled stages.

- Do not rewrite the whole site in one pass.
- Do not expand changes to all locales by default.
- English source pages were rewritten first.
- Current active phase: `Locale rollout, one language at a time`
- Translation work must proceed one locale at a time, not in parallel across all locales.

## Content Rollout Rule

For any SEO or markdown rewrite:

1. Rewrite `en` first.
2. Make the English page internally consistent:
   - visible body copy
   - title
   - description
   - FAQ copy
   - JSON-LD copy
   - internal CTA copy if relevant
3. Review the English version as the source-of-truth page.
4. Only then consider translating to other locales.

For locale rollout after English is accepted:

1. Pick exactly one locale.
2. Update that locale's markdown pages first.
3. Update that locale's blog content and related metadata.
4. Verify build still passes.
5. Move to the next locale only after the current locale batch is stable.

## Priority Order

Until this document is changed, use this content priority:

1. High-visibility English SEO copy
2. English markdown landing pages
3. English metadata and structured data
4. Other locales one language at a time after English quality is confirmed

## Current Constraints

- Avoid broad multi-file rewrites unless they belong to one focused page/task.
- Prefer one page or one content surface at a time.
- Keep code and content changes scoped and reviewable.
- Do not change locale strategy implicitly.
- Keep future copy rewrites low-fluff and non-generic.
- Do not change the existing route structure, API behavior, or application architecture unless explicitly requested by the user.

## Known Content Surfaces

- UI and homepage copy:
  - `app/i18n/messages.ts`
- Markdown landing pages:
  - `app/md/en/**`
  - `app/md/zh/**`
- Markdown metadata and structured data:
  - `app/routes/md.tsx`
- Indexing config:
  - `app/seo.config.ts`
  - `app/routes/sitemap.xml.tsx`

## Working Assumptions

- `en` is the source language for rewrite work.
- Locales are rolled out sequentially, not all at once.
- Temporary inconsistency across untranslated locales is acceptable while one target locale is being updated.

## Locale Rollout Status

- `en`: rewritten and used as source-of-truth
- `zh`: completed for markdown content and blog content in this round
- `es`: completed for markdown content, blog content, and locale metadata in this round
- `fr`: completed for markdown content, blog content, and locale metadata in this round
- `de`: completed for markdown content, blog content, and locale metadata in this round
- `ja`: completed for markdown content, blog content, and locale metadata in this round
- `ko`: completed for markdown content, blog content, and locale metadata in this round
- `ru`: completed for markdown content, blog content, and locale metadata in this round
- `pt`: completed for markdown content, blog content, and locale metadata in this round
- `ar`: completed for markdown content, blog content, and locale metadata in this round
- Next locale: not started yet

## Chinese Locale Progress

Updated in this round:

- `app/md/zh/about.md`
- `app/md/zh/faq.md`
- `app/md/zh/temporary-email-24-hours.md`
- `app/md/zh/temporary-email-no-registration.md`
- `app/md/zh/disposable-email-for-verification.md`
- `app/md/zh/temporary-email-for-registration.md`
- `app/md/zh/online-temporary-email.md`
- `app/md/zh/domestic-temporary-email.md`
- `app/md/zh/can-temporary-email-send.md`
- `app/md/zh/smail-vs-smailpro.md`
- `app/md/zh/privacy.md`
- `app/md/zh/terms.md`
- `app/blog/zh/temporary-email-best-practices.md`
- `app/blog/zh/otp-email-not-arriving-fixes.md`
- `app/blog/zh/temporary-email-vs-email-alias.md`
- `app/blog/data.ts` zh blog titles/descriptions

Verification status:

- `pnpm install`: fixed earlier pnpm build-approval issue
- `pnpm run build`: passed after zh updates
- `pnpm run typecheck`: still fails because of existing syntax errors in `app/app.ts`, unrelated to locale content changes

## Definition Of Done For A Content Task

A content task is only considered complete when all relevant English-layer pieces for that task are aligned:

- route copy
- metadata
- structured data
- internal links/CTA
- brand wording

## Related Docs

- `docs/index.md`
- `AGENTS.md`
- `docs/content-seo-rules.md`
