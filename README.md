# kwoolford.github.io

Personal site for projects, notes, and digests. Published at https://kwoolford.github.io.

Built with [Jekyll](https://jekyllrb.com/) using the default `minima` theme. GitHub Pages builds and publishes automatically on push.

## Adding a post by hand

Drop a file into `_posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
title: My post title
date: 2026-04-18
categories: [project]   # or [note]
tags: [ml, python]
---

Markdown content here.
```

`categories` accepts `project` or `note` — any value is fine, but sticking to these two keeps the homepage organized.

## Adding a post via Claude Code

Run the `project-digest` skill from your projects folder:

- `/project-digest` — pick a project interactively
- `/project-digest ./my-project` — digest one project
- `/project-digest all` — iterate every project folder

The skill reads each project's README, writes a markdown digest into `_posts/`, and (with confirmation) commits and pushes.

## Running locally (optional)

Only needed if you want to preview before pushing. Requires Ruby.

```bash
bundle install
bundle exec jekyll serve
```
