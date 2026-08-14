#!/usr/bin/env bash
if [ -z "${TITLE// }" ]; then
    echo "::error::TITLE is empty"
    exit 1
fi

if [ -z "${ARTICLE_URL// }" ]; then
    echo "::error::ARTICLE_URL is empty"
    exit 1
fi

# Check the URL exists and is reachable (HEAD request, follow redirects)
status=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "${ARTICLE_URL}")

if [[ ! "$status" =~ ^(200|301|302)$ ]]; then
echo "::error::ARTICLE_URL returned HTTP ${status}: ${ARTICLE_URL}"
exit 1
fi

echo "Inputs OK — TITLE='${TITLE}', ARTICLE_URL='${ARTICLE_URL}' (HTTP ${status})"
