---
layout: page
title: Architecture, about this website
permalink: /about-this-website-architecture/
---

# Architecture & Automation Documentation 

---

## 1. Introduction

iCertificates is a website that exposes data and charts describing investment
certificates (structured products issued by banks such as BNP, Marex,
Mediobanca, Leonteq, Vontobel, UniCredit, Citigroup and Barclays). Almost
nothing on the site is entered by hand: every certificate page, ticker,
underlying, quote and lifecycle event is produced by a chain of **AI agents**
(built on Zapier + Gemini) and **cloud automation** (GCP + GitHub Actions).

The lifecycle of a single certificate starts with one email sent to a **AI agent**.
Everything downstream of that first email — scraping, extraction with an LLM,
storage, loading into a data warehouse, and publishing to the website — is
automated and repeatable per ISIN.

---
## 2. High Level Diagram
![Architecture diagram](/assets/imgs/icertificates_full_agent_pipeline.svg)

| Name/Acronym | Description | Technologies |
|---|---|---|
| LLM | Trained API first AI | Groq + Gemini |
| GCP | Google Cloud Platfrom | BigQuery + Storage + Workers |
| CF | Cloudflare | Storage + Workers + Pages |
| GH | Github | Repo + Actions + Issues |
| Zapier | AI and Integration Automation | AI Workflows + Connectors |
{:.table-full}

---
## 3. What each type of automation is responsible for

| Layer | Technology | Responsibility |
|---|---|---|
| Email triage & ISIN registry | Zapier + Gmail + Google Docs | Turns an incoming email into a de-duplicated, tracked ISIN with a KID URL. |
| Enrichment agent | Zapier + Gemini | Reads KID/website content and produces structured JSON (details, tickers, ex-dates) for a single ISIN, on request. |
| Trigger & orchestration | GitHub Issues + GitHub Actions + LLM | One issue per ISIN drives the batch scraping/extraction jobs and records pipeline status including tests. |
| Data Searching and Extraction | `webclaw` | Downloads certificate/quote pages and KID PDFs, converts to trimmed Markdown. |
| Data Enrichment and Normalization | GitHub Actions + LLM | Converts scraped Markdown into structured JSON (tickers, details). |
| Job monitoring | jobmonitor | Tracks per-run-date status and exposes logs. |
| Quality Assurance | Google BigQuery + AI Agents | Canonical staging tables to manage details and quotes. AI agent is responsible for quality assurance and promotion. |
| Scheduled export | GitHub Actions | BigQuery data to CSV (first data + calculated) and stored into Cloudflare R2. |
| Delivery | Cloudflare R2 / Worker / Pages | Serves the normalized data/CSV via the Worker API and renders it on the static Jekyll site. |
{:.table-full}

---

## 4. Certificate lifecycle summary

1. **Discovery** — an email with an ISIN arrives → extracted, de-duplicated, logged, and turned into a GitHub issue.
2. **Detailing** — an AI agent (Zapier + Gemini) reads the KID document and issuer/CeD web pages to produce structured details, tickers and ex-dates.
3. **Observation** — the batch pipeline (`webclaw` + `geminicert`) begins pulling quotes on a recurring schedule per issuer (BNP, Marex, …).
4. **Lifecycle tracking** — the same scraping/extraction loop picks up status changes over time (e.g. called, reimbursed, expired) as issuer pages and KID data change.
5. **Consolidation** — everything lands in BigQuery, gets exported on a schedule, and is published to the site through the Cloudflare Worker/Pages stack.

