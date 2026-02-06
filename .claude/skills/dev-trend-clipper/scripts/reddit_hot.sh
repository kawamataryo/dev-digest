#!/usr/bin/env bash
set -euo pipefail

# Fetch Reddit /hot posts via OAuth (refresh token grant).
#
# Required env:
#   REDDIT_CLIENT_ID
#   REDDIT_CLIENT_SECRET
#   REDDIT_REFRESH_TOKEN
#
# Optional env:
#   REDDIT_USER_AGENT (default: "dev-digest/1.0 (trend analysis tool)")
#
# Usage:
#   bash reddit_hot.sh <subreddit> [limit] [t]
# Example:
#   bash reddit_hot.sh programming 10 day

SUBREDDIT="${1:-}"
LIMIT="${2:-10}"
TIME_RANGE="${3:-day}"

if [[ -z "${SUBREDDIT}" ]]; then
  echo "Usage: bash reddit_hot.sh <subreddit> [limit] [t]" >&2
  exit 2
fi

if [[ -z "${REDDIT_CLIENT_ID:-}" || -z "${REDDIT_CLIENT_SECRET:-}" || -z "${REDDIT_REFRESH_TOKEN:-}" ]]; then
  echo "Missing env. Set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_REFRESH_TOKEN" >&2
  exit 2
fi

USER_AGENT="${REDDIT_USER_AGENT:-dev-digest/1.0 (trend analysis tool)}"

ACCESS_TOKEN="$(
  curl -sS \
    -u "${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}" \
    -H "User-Agent: ${USER_AGENT}" \
    -d "grant_type=refresh_token" \
    --data-urlencode "refresh_token=${REDDIT_REFRESH_TOKEN}" \
    "https://www.reddit.com/api/v1/access_token" \
  | jq -r '.access_token'
)"

if [[ -z "${ACCESS_TOKEN}" || "${ACCESS_TOKEN}" == "null" ]]; then
  echo "Failed to get access token. Response did not include .access_token" >&2
  exit 1
fi

curl -sS \
  -H "Authorization: bearer ${ACCESS_TOKEN}" \
  -H "User-Agent: ${USER_AGENT}" \
  "https://oauth.reddit.com/r/${SUBREDDIT}/hot?t=${TIME_RANGE}&limit=${LIMIT}" \
| jq -r '.data.children[]
  | "\(.data.title)|\(.data.ups)|\(.data.num_comments)|https://www.reddit.com\(.data.permalink)"'

