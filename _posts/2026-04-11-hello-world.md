---
layout: post
title: "Hello World — Why I Started This Blog"
date: 2026-04-11
tags: [non-technical]
excerpt: >
  A brief introduction to what this space will be about: supply chain security research,
  CI/CD offensive techniques, responsible disclosure write-ups, and whatever else I find
  interesting enough to write down.
---

```
$ whoami
pl — Offensive Security Engineer, Red Team Operator
```

## Why a blog?

I've been accumulating notes for years, between research findings, vulnerability write-ups, random
observations about CI/CD pipeline security that didn't fit into a paper. A blog is the right
format: low overhead, no peer-review cycle, and I can be as verbose or as terse as the topic
deserves.

## What to expect

A few recurring themes:

**Software supply chain security** — My PhD research focused on OSS attack taxonomies and malicious
package detection. There's still a lot of ground to cover: typosquatting automation, dependency
confusion variations, CI pipeline poisoning. Expect write-ups on techniques I encounter in the wild
or during red team operations (suitably anonymized).

**CI/CD offensive techniques** — GitHub Actions, GitLab CI, Azure Pipelines: every
environment has interesting attack surfaces. I'll document what I find, from OIDC token abuse to
poisoned pipeline execution (PPE) primitives.

**Bug bounty / responsible disclosure** — I disclose vulnerabilities through when I find
something in my spare time. Once disclosure timelines allow, I'll write about the more interesting
finds. 

**Red team notes** — General tradecraft, tool reviews, methodology thoughts. Nothing that burns
operational security, but enough to be useful.

---


