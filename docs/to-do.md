# /details/index.html

modify the Detail page /details/index.html about the Digital Certificate. The page will manage requests like /details/<ISIN>. ISIN is needed otherwise it is a 404.

It is composed by 2 sections
1. Detail section by using a request like 
- https://icwebsvc.digital-posture.workers.dev/details/<ISIN>
which payload like this:
[
    "isin;issuer;name;certificate_type_tags;memory_effect;phase;currency;industry;callable;strike_date;issue_date;rembursement_date;autocallable_date;capital_barrier;airbag;risk_level;coupon_amount;coupon_recurrence;coupon_next_ex_date;coupon_type;coupon_barrier;leverage;exchange_risk",
    "CH1550424670;Leonteq Securities AG;Target One Autocallable (Anglogold Ashanti ADR, Colgate-Palmolive, Moderna);Express Certificate, Autocallable, Memory Coupon;Yes;Issued;EUR;Multi-asset;Yes;30.04.2026;05.05.2026;05.05.2028;27.07.2026 to 27.03.2028;60.00%;No;6/7;EUR 10.00;Monthly;N/A;Conditional;60.00%;N/A;Quanto"
]

2. then add a section named 'Underlyings' that contains a DataTables with data from the following request:
https://icwebsvc.digital-posture.workers.dev/tickers/<ISIN>
response payload example:
[
    "certificate_isin;certificate_name;stock_name;stock_google_finance_ticker;stock_exchange;stock_isin;stock_industry;stock_sector",
    "CH1550424670;Target One Autocallable (Anglogold Ashanti ADR, Colgate-Palmolive, Moderna);Moderna Inc;MRNA;NASDAQ;US60770K1079;Biotechnology;Healthcare",
    "CH1550424670;Target One Autocallable (Anglogold Ashanti ADR, Colgate-Palmolive, Moderna);Anglogold Ashanti ADR;AU;NYSE;GB00BRXH2664;Gold Mining;Basic Materials",
    "CH1550424670;Target One Autocallable (Anglogold Ashanti ADR, Colgate-Palmolive, Moderna);Colgate-Palmolive;CL;NYSE;US1941621039;Household and Personal Products;Consumer Defensive"
]



# links to /details
in pages:
- all /issuers/<issuer name>, make the ISIN column (1st col) of table #certs_list a link to /details/?ISIN=<1st col value>