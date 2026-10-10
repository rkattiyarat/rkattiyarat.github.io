#!/bin/bash
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

# With no arguments, regenerate every page. Pass index.html for homepage only.
if [ "$#" -eq 0 ]; then
  set -- input/*.html
fi

navbar="<nav class='menu' aria-label='Main navigation'><a href='index.html'>Home</a>"
for html_file in input/*.html; do
  page="$(basename -- "$html_file")"
  if [ "$page" != "index.html" ]; then
    navbar+="<a href='$page'>${page%.*}</a>"
  fi
done
navbar+="</nav>"

for file in "$@"; do
  page="$(basename -- "$file")"
  source="input/$page"
  if [ ! -f "$source" ]; then
    echo "Source page not found: $source" >&2
    exit 1
  fi

  if [ "$page" = "index.html" ]; then
    # The homepage provides its own section navigation.
    cp -- "$source" "$page"
  else
    # Insert once, immediately after the opening body tag, preserving doctype.
    awk -v navbar="$navbar" '
      !inserted && match($0, /<body[^>]*>/) {
        print substr($0, 1, RSTART + RLENGTH - 1)
        print navbar
        print substr($0, RSTART + RLENGTH)
        inserted = 1
        next
      }
      { print }
    ' "$source" > "$page"
  fi
done
