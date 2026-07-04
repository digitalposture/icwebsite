---
layout: page
title:  "BNP Paribas"
date:   2026-02-24 17:26:40 +0100
categories: issuers
ext-css: //cdn.datatables.net/2.3.7/css/dataTables.dataTables.min.css
footer-extra: dtable-init.html
comments: false
wsDatatableIds: [ certs_list ]
wsDatatableCols: [
  ['Website','Specializations', 'Headquarters', 'Rating'],
  ['ISIN','Issuer','Name','Type','Issued','Expires','Currency','Coupon','Coupon Type']
]
wsDatatableRespCols: [
  ['website','specialization', 'geo_region', 'issuer_rating_class'],
   ['isin','issuer','name','certificate_type_tags','issue_date','rembursement_date','currency','coupon_amount','coupon_type']
]
wsDatatablePaths: [/details/*?issuer=bnp]
wsDatatableAutoLoad: true
---
{{ page.title}} is...

## {{ site.issuers_par1_title }}
The website provides clear information regarding: 
- calendar, 
- coupon ex-date, 
- levels and barriers

**Rating**: 4/5

## {{ site.issuers_par2_title }}
{{ site.issuers_par2_content }}
Note: If you would like to add your own certificate, please send us a [message](../request)

<div>
<!--  /certificates?issuer=[issuer] -->

<!-- <table id="dTable" data-mdt-path="/details/{{page.slug}}"> -->
{% include dtable-th.html tablePos=0 %}
</div>
