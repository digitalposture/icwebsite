#!/usr/bin/env bash
set -euo pipefail

SYSTEM_PROMPT=$(cat system.txt)
USER_PROMPT=$(cat user.txt)

payload=$(jq -n \
  --arg system "$SYSTEM_PROMPT" \
  --arg user "$USER_PROMPT" \
  '{
    messages: [
      { role: "system", content: $system },
      { role: "user", content: $user }
    ],
    model: "groq/compound-mini",
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    stream: false,
    stop: null,
    compound_custom: {
      tools: {
        enabled_tools: ["web_search", "visit_website"]
      }
    }
  }')

response=$(curl -s "https://api.groq.com/openai/v1/chat/completions" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${GROQ_API_KEY}" \
  -d "$payload")

content=$(echo "$response" | jq -r '.choices[0].message.content')

if [ -z "$content" ] || [ "$content" == "null" ]; then
  echo "Groq API call failed or returned no content" >&2
  echo "$response" >&2
  exit 1
fi

# Slugify TITLE: lowercase, spaces/underscores -> hyphens, strip anything
# that's not alphanumeric or hyphen, collapse repeats, trim edges.
SLUG=$(echo "${TITLE}" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')

DATE=$(date +%Y-%m-%d)
FILENAME="${DATE}-${SLUG}.md"

echo "$content" > "$FILENAME"
echo "Saved response to filename: ${FILENAME}"