#!/bin/bash

# Check if a day number is passed as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <day-number>"
  exit 1
fi

# Extract the day number and format it with leading zeros if necessary
DAY_NUMBER=$(printf "day-%02d" "$1")

# Define the base directory
BASE_DIR="src/days/$DAY_NUMBER"

# Create the folder structure
mkdir -p "$BASE_DIR/inputs"

# Create the empty files
touch "$BASE_DIR/inputs/input.txt"
touch "$BASE_DIR/inputs/sample.txt"
touch "$BASE_DIR/$DAY_NUMBER-part-1.ts"

# Copy the template file contents to the new files
cat src/templates/day/part-1.ts | sed "s/DAY_NUMBER/$DAY_NUMBER/g" > "$BASE_DIR/$DAY_NUMBER-part-1.ts"

echo "Folder and files for $DAY_NUMBER created successfully!"
