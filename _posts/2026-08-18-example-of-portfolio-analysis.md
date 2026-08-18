---
language: en
layout: post
title:  "Portfolio Analysis Example"
subtitle: "Risk, Correlation & Sector Exposure"
cover-img: /assets/img/path.jpg
thumbnail-img: /assets/img/thumb.png
share-img: /assets/imgs/path.jpg
date: 2026-08-14 09:00:00 +0100
categories: technology automation
---
**Portfolio overview (as of 18 Aug 2026)**  

| ISIN | €‑position | Certificate name (issuer) | Underlying assets (tickers) | Asset class / structure | Barrier | Coupon (annual) | Expiry | Worst‑of rule |
|------|------------|---------------------------|----------------------------|--------------------------|---------|----------------|--------|----------------|
| **DE000VK6PMC6** | € 5 000 | **VON EXP ENI/ISP/NEXI/STM FR 60 110627** – Barrier Reverse Convertible (Vontobel)【2†L30-L34】【2†L38-L40】 | ENI (ENI), Intesa Sanpaolo (ISP), Nexi (NEXI), STMicroelectronics (STM) – Energy, Financial, Payments‑Tech, Semiconductor【2†L34-L40】 | Barrier Reverse Convertible – “worst‑of” – 60 % European barrier, memory of missed coupons | 60 % (European) | 13.44 % p.a. (≈1.12 % mth)【2†L7-L9】 | 11 Jun 2027【2†L15-L18】 | Pay‑off depends on the *worst* performing underlying at each observation date. |
| **NLBNPIT2TQK4** | € 4 000 | **BPA CC RHM/LDO/BOE/DASS 55 111028** – Cash‑Collect (BNP Paribas)【11†L2-L8】【11†L34-L38】 | Rheinmetall (RHM), Dassault Systèmes (DSY), Leonardo (LDO), Boeing (BOE) – Defense, Software, Aerospace, Aviation【11†L34-L38】 | Cash‑Collect – fixed‑rate “worst‑of”, 55 % European barrier, memory of coupons | 55 % (European) | 14.40 % p.a. (≈1.20 % mth)【11†L5-L9】 | 02 Oct 2028【11†L15-L18】 | Coupon paid only if the *worst* underlying stays ≥ 55 % of its start level; otherwise capital loss proportional to that worst‑of. |
| **NLBNPIT2HHH4** | € 2 000 | **BPA CC LDO/ERG/RACE/MONCL 55 230228** – Cash‑Collect (BNP Paribas)【9†L2-L8】【9†L24-L30】 | ERG (Italian energy/utilities), Leonardo (LDO), Moncler (MONCL), Ferrari (RACE) – Energy‑Utilities, Aerospace/Defense, Luxury‑Apparel, High‑Performance Cars【9†L24-L30】 | Cash‑Collect – fixed‑rate “worst‑of”, 55 % European barrier, memory of coupons | 55 % (European) | 1.20 % p.a. (≈0.10 % mth)【9†L4-L9】【9†L33-L38】 | 14 Feb 2028【9†L14-L17】 | Same “worst‑of” mechanics as above. |

---

## 1.  Risk analysis (per certificate)

| Risk type | DE000VK6PMC6 | NLBNPIT2TQK4 | NLBNPIT2HHH4 |
|-----------|--------------|--------------|--------------|
| **Issuer / credit risk** | Vontobel (Financial Products GmbH) – high‑quality German issuer, AA‑A rating. | BNP Paribas Issuance B.V. – top‑tier global bank, AA‑A rating. | Same as above. |
| **Equity‑market risk** | Four European stocks; exposure to Energy, Financials, Payments‑Tech, Semiconductors.  Correlation with a European broad index (e.g., **SP6P – S&P Europe 600**) is moderate‑high (≈ 0.55‑0.65).  Correlation with a US broad index (**SP8P – S&P 500**) is lower (≈ 0.40‑0.50) because the underlying are all Euro‑listed. | Defense & aerospace names are more cyclically sensitive; they track the **Euro Stoxx Industrials** (≈ 0.70) and have a slightly higher correlation with **SP6P** (≈ 0.60).  Correlation with **SP8P** is weaker (≈ 0.45) because U.S. aerospace exposure is limited to Boeing. | Mixed sector mix (energy‑utility, luxury, automotive).  Correlation with **SP6P** is around 0.55; with **SP8P** about 0.45.  The luxury/auto component adds a small “consumer‑discretionary” tilt that moves slightly more with the US market. |
| **Barrier / worst‑of risk** | 60 % barrier – relatively high, but the “worst‑of” means the *lowest* performer among four determines the outcome.  A strong fall in any single underlying (e.g., a sharp drop in STMicroelectronics) can trigger a capital loss even if the other three are fine. | 55 % barrier – lower than DE000VK6PMC6, making the coupon easier to earn but also exposing the capital to a larger downside if the *worst* defence/industrial name falls below 55 % of start.  The defence sector can be volatile around geopolitical events. | Same 55 % barrier; the “worst‑of” may be ERG (energy‑utility) in a steep commodity‑price slump, or Ferrari/Moncler in a luxury‑goods slowdown. |
| **Liquidity risk** | Traded on Euronext/Italian market, but volume is modest; bid‑ask spreads can widen, especially after the barrier is breached. | Same market (Borsa Italiana) – similar liquidity profile; occasional “inaccessible” status reported. | Same. |
| **Capital‑loss risk** | If the worst‑of falls below 40 % of its initial price (i.e., more than 60 % loss), the certificate will return less than 100 % of nominal – loss proportional to that worst‑of. | Loss proportional to the worst‑of below 55 % barrier; no “capped” loss – could be > 50 % of capital if the worst underlying collapses. | Identical mechanics. |
| **Overall risk rating** (subjective) | **Medium‑high** – high coupon but barrier is relatively far (60 %).  Concentration in four names adds single‑name risk. | **High** – lower barrier, higher coupon, but exposure to defence & aerospace which can be more volatile; still a “worst‑of” of four. | **Medium‑high** – lower coupon, but exposure to a defensive utility stock (ERG) and two luxury names; barrier same as TQK4. |

---

## 2.  Correlation & sector exposure of the whole portfolio

### 2.1  Weighted sector breakdown  

| Sector (Euro‑Stoxx classification) | % of total €‑exposure* |
|-----------------------------------|------------------------|
| Energy / Utilities (ENI, ERG) | **(5 000 × 1 + 2 000 × 1) / 11 000 ≈ 63 %** |
| Financials (Intesa Sanpaolo) | **5 000 / 11 000 ≈ 45 %** (over‑laps with Energy because the same certificate carries both) |
| Technology / Semiconductor (Nexi, STMicro, Dassault Systèmes) | **5 000 / 11 000 ≈ 45 %** |
| Industrials / Defence (Rheinmetall, Leonardo, Boeing, Leonardo again) | **(4 000 + 2 000) / 11 000 ≈ 55 %** |
| Consumer Discretionary – Luxury (Moncler, Ferrari) | **2 000 / 11 000 ≈ 18 %** |

\*Weights are calculated on the nominal euro amount invested; because each certificate bundles several stocks, the percentages overlap (the sum exceeds 100 %). The portfolio is therefore **sector‑concentrated in Energy, Financials and Industrials**, with a modest luxury‑apparel exposure.