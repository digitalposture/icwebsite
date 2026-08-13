#!/usr/bin/env bash
set -euo pipefail

TITLE=$1
ARTICLE_URL=$2

# Slugify TITLE: lowercase, spaces/underscores -> hyphens, strip anything
# that's not alphanumeric or hyphen, collapse repeats, trim edges.
SLUG=$(echo "${TITLE}" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')

DATE=$(date +%Y-%m-%d)
FILENAME="${DATE}-${SLUG}.md"
echo "Filename: $FILENAME"

SUB_TITLE=$(sed -n '1{/^#/s/^#\s*//p}' result.md)

sed -i '1{/^#/d}; 1{/^$/d}' result.md

SUB_TITLE=${SUB_TITLE} DATE=${DATE} envsubst '${TITLE} ${SUB_TITLE} ${DATE}' < header_template.md > header.md
ARTICLE_URL=${ARTICLE_URL} envsubst '${ARTICLE_URL}' < footer_template.md > footer.md

cat header.md result.md footer.md > temp.md
mv temp.md "../_posts/$FILENAME"

# rm header.md footer.md user.txt result.md

echo "Saved article to: ../_posts/${FILENAME}"
cat "../_posts/$FILENAME"
git status
