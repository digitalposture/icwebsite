---
language: en
layout: post
title:  "Behind the Scenes: How This Website Is Built"
subtitle: A look at the AI agents and cloud automation that keep every certificate page up to date
cover-img: /assets/img/path.jpg
thumbnail-img: /assets/img/thumb.png
share-img: /assets/imgs/path.jpg
date:   2026-08-11 09:00:00 +0100
categories: technology automation
---
Every certificate page, ticker, quote, and lifecycle event you see on iCertificates was produced automatically. Almost nothing on the site is entered by hand. Behind the scenes, a chain of **AI agents** and **cloud automation** does the work of discovering, detailing, and tracking investment certificates — issued by banks like BNP, Marex, Mediobanca, Leonteq, Vontobel, UniCredit, Citigroup, and Barclays — around the clock.

The lifecycle of a single certificate begins the moment one email lands: an ISIN comes in, and an AI agent takes it from there. That one message sets off an automated, repeatable pipeline — scraping the web, extracting structured data with an LLM, storing it, loading it into a data warehouse, and publishing it to the site — all without anyone touching a spreadsheet.

## The Agents Behind the Scenes

Rather than a single monolithic system, iCertificates runs on a set of specialized layers, each responsible for one part of the journey from raw email to published chart.

## From Inbox to Published Certificate

Zooming out, the full lifecycle of a certificate looks like this:

1. **Discovery** — an email with an ISIN arrives, gets extracted, de-duplicated, logged, and turned into a GitHub issue.
2. **Detailing** — an AI agent reads the KID document and issuer/CeD web pages to produce structured details, tickers, and ex-dates.
3. **Observation** — the batch pipeline begins pulling quotes on a recurring schedule per issuer.
4. **Lifecycle tracking** — the same scraping and extraction loop picks up status changes over time — called, reimbursed, expired, and so on — as issuer pages and KID data change.
5. **Consolidation** — everything lands in BigQuery, gets exported on a schedule, and is published to the site through the Cloudflare Worker/Pages stack.

## Why We Built It This Way

Investment certificate data is scattered across issuer sites, KID documents, and pricing pages that all speak slightly different languages. Keeping that data accurate and current by hand doesn't scale — and it invites human error exactly where precision matters most.

By putting AI agents at the center of discovery and enrichment, and wrapping them in cloud automation for orchestration, storage, and delivery, we get a pipeline that's fast, consistent, and auditable. Every certificate is processed the same way, every time, whether it's the first one we track or the thousandth.

To know more about [AI and Cloud Automation](https://icwebsite.pages.dev/about-this-website-architecture)

Curious how we turn this data into evaluations you can act on? Check out our [ACUED Scoring Framework](https://icwebsite.pages.dev/acued-scoring-framework), or explore certificates [by ticker](https://icwebsite.pages.dev/analysis/by-ticker), [by value](https://icwebsite.pages.dev/analysis/by-value), or [by industry](https://icwebsite.pages.dev/analysis/by-industry).