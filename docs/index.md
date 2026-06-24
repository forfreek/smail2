# Docs Index

## Purpose

This index exists to keep repository guidance lightweight at runtime.

Use this file first.
Do not read every long document by default.
Read only the document or section needed for the current task.

## Usage Rule

1. Read this index first.
2. Identify the task type.
3. Read only the matching document.
4. Within that document, read only the relevant section if possible.
5. Avoid full-document rereads unless the task scope changed.

## Document Map

### 1. Project Memory

- File: `docs/project-memory.md`
- Use when:
  - you need the current project phase
  - you need brand identity
  - you need rollout strategy
  - you need current rewrite priority
- Read these sections first:
  - `Project Identity`
  - `Current Execution Strategy`
  - `Priority Order`
- Key facts:
  - primary brand is `trashmail`
  - canonical domain is `trashmail.space`
  - English is the source language
  - current rollout is `one locale at a time`
  - do not rewrite all locales by default

### 2. Content And SEO Rules

- File: `docs/content-seo-rules.md`
- Use when:
  - editing `app/md/**`
  - editing `app/blog/**`
  - editing metadata or JSON-LD
  - deciding whether a page is worth indexing
- Read these sections first:
  - `Core Principles`
  - `Anti-AI Language Constraints`
  - `Metadata Rules`
  - `Sync Checklist`
- Key facts:
  - content must not feel cloned
  - content must not feel AI-generated
  - metadata must match visible content
  - English source version should be stabilized before translation

### 3. Repository Rules

- File: `AGENTS.md`
- Use when:
  - you need repository-wide coding or content constraints
  - you need route/content sync requirements
  - you need validation requirements
- Read these sections first:
  - `Content And SEO Rules`
  - `Required File Sync For Markdown And SEO Changes`
  - `Validation Before Delivery`
- Key facts:
  - `trashmail` / `trashmail.space` is the active brand
  - content uniqueness is mandatory
  - route, sitemap, meta, and markdown must stay aligned

## Task Routing

### If the task is homepage copy

Read:

1. `docs/project-memory.md`
2. `docs/content-seo-rules.md`

Optional:

- `AGENTS.md` only if route sync or validation scope is unclear

### If the task is one markdown landing page

Read:

1. `docs/project-memory.md`
2. `docs/content-seo-rules.md`

Optional:

- `AGENTS.md` for sync checklist

### If the task is metadata or JSON-LD only

Read:

1. `docs/content-seo-rules.md`
2. `docs/project-memory.md`

### If the task is repo-level planning

Read:

1. `docs/project-memory.md`
2. `AGENTS.md`

## Fast Memory

- Brand: `trashmail`
- Domain: `trashmail.space`
- Source language: `en`
- Current rewrite phase: `one locale at a time`
- Current completed locale after English: `zh`
- Current strategy: one focused page or one focused content surface at a time
- Do not modify routes, APIs, or architecture unless explicitly requested
- Do not default to reading all docs
