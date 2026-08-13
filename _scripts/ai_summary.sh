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
    "model": "openai/gpt-oss-120b",
    "temperature": 1,
    "max_completion_tokens": 2048,
    "top_p": 1,
    "stream": false,
    "reasoning_effort": "medium",
    "stop": null,
    "tools": [
      {
        "type": "browser_search"
      }
    ]
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

echo "$content" > "result.md"