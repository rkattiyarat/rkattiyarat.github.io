#!/bin/bash


# Iterate over all the HTML files in the current directory
for file in input/*.html; do
  # Copy the HTML file to the output directory
  cp "$file" "$(basename $file)"

  # Generate the navigation bar
  navbar="<nav class='menu'>"
  navbar="$navbar <a href="index.html">home</a>\n"
  for html_file in *.html; do
    if [ "$html_file" = "index.html" ]; then
    continue
    fi
    navbar="$navbar<a href='$html_file'>${html_file%.*}</a>\n"
  done
  navbar="$navbar</nav>"

  # Insert the navigation bar into the HTML file
  sed -i "1i$navbar" "$(basename $file)"
done

