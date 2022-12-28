#!/bin/bash


# Iterate over all the HTML files in the current directory
for file in input/*.html; do
  # Copy the HTML file to the output directory
  cp "input/$file" "$file"

  # Generate the navigation bar
  navbar="<nav>"
  for html_file in *.html; do
    navbar="$navbar<a href='$html_file'>$html_file</a>"
  done
  navbar="$navbar</nav>"

  # Insert the navigation bar into the HTML file
  sed -i "1i$navbar" "output/$file"
done

