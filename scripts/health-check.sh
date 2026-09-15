#!/usr/bin/env bash

set -euo pipefail

URL="${1:-}"
EXPECTED_TEXT="${2:-}"
MAX_ATTEMPTS="${3:-12}"
DELAY_SECONDS="${4:-5}"

if [[ -z "${URL}" ]]; then
  echo "Usage: $0 <url> [expected-text] [max-attempts] [delay-seconds]"
  exit 2
fi

echo "Health-check target: ${URL}"
echo "Maximum attempts: ${MAX_ATTEMPTS}"

for ((attempt=1; attempt<=MAX_ATTEMPTS; attempt++)); do
  echo "Attempt ${attempt}/${MAX_ATTEMPTS}"

  RESPONSE_FILE="$(mktemp)"

  HTTP_CODE="$(
    curl \
      --silent \
      --show-error \
      --output "${RESPONSE_FILE}" \
      --write-out "%{http_code}" \
      --max-time 5 \
      "${URL}" || true
  )"

  RESPONSE="$(cat "${RESPONSE_FILE}")"
  rm -f "${RESPONSE_FILE}"

  echo "HTTP status: ${HTTP_CODE}"

  if [[ "${HTTP_CODE}" =~ ^2[0-9][0-9]$ ]]; then
    if [[ -n "${EXPECTED_TEXT}" ]] &&
       ! grep -Fq "${EXPECTED_TEXT}" <<< "${RESPONSE}"; then

      echo "Endpoint responded successfully, but expected content was not found."
      echo "Expected: ${EXPECTED_TEXT}"
      echo "Response: ${RESPONSE}"
    else
      echo "Health check passed."
      echo "Response: ${RESPONSE}"
      exit 0
    fi
  else
    echo "Endpoint is not healthy yet."
  fi

  if (( attempt < MAX_ATTEMPTS )); then
    sleep "${DELAY_SECONDS}"
  fi
done

echo "Health check failed after ${MAX_ATTEMPTS} attempts."
exit 1
