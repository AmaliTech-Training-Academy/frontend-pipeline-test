#!/bin/bash

# Production-ready entrypoint script for frontend
ENV_JSON_FILE="/mnt/secrets/frontend-env.json"

# List of environment variables to ignore (already hardcoded in deployment)
IGNORE_VARS="NODE_ENV PORT ENV_CONFIG_FILE"

echo "=== Frontend Service Entrypoint ==="
echo "Loading environment variables from: $ENV_JSON_FILE"

if [ -f "$ENV_JSON_FILE" ]; then
  # Create a temporary file to store the export commands
  temp_exports=$(mktemp)
  
  # First, validate and format the JSON
  echo "Validating and formatting JSON..."
  if ! jq . "$ENV_JSON_FILE" > /tmp/formatted.json 2>/dev/null; then
    echo "WARNING: Invalid JSON format in $ENV_JSON_FILE. Attempting to fix common issues..."
    # Try to fix common JSON issues (extra commas, missing quotes, etc.)
    cat "$ENV_JSON_FILE" | tr -d '\n\r' | sed 's/,\s*}/}/' > /tmp/fixed.json
    if ! jq . /tmp/fixed.json > /tmp/formatted.json 2>/dev/null; then
      echo "ERROR: Could not parse JSON, even after attempting fixes. Using original file."
      cp "$ENV_JSON_FILE" /tmp/formatted.json
    else
      echo "JSON fixed successfully."
    fi
  fi
  
  # Use jq to extract key-value pairs
  echo "Extracting environment variables..."
  jq -r 'to_entries | .[] | "\(.key)=\(.value)"' /tmp/formatted.json > /tmp/json_pairs.tmp
  
  while IFS= read -r line; do
    # Skip empty lines
    [ -z "$line" ] && continue
    
    # Extract key and value (format from jq is "key=value")
    key=$(echo "$line" | cut -d'=' -f1)
    value=$(echo "$line" | cut -d'=' -f2-)
    
    # Skip empty key or value
    [ -z "$key" ] || [ -z "$value" ] && continue
    
    # Check if should ignore
    should_ignore=false
    for ignore_var in $IGNORE_VARS; do
      if [ "$key" = "$ignore_var" ]; then
        should_ignore=true
        echo "  [IGNORED] $key (hardcoded in deployment)"
        break
      fi
    done
    
    # Export if not ignored and not already set
    if [ "$should_ignore" = false ] && [ -z "$(printenv "$key")" ]; then
      echo "export $key=\"$value\"" >> "$temp_exports"
      echo "  [LOADED] $key"
    elif [ "$should_ignore" = false ]; then
      echo "  [SKIPPED] $key (already set)"
    fi
  done < /tmp/json_pairs.tmp
  
  # Source the exports if any were created
  if [ -s "$temp_exports" ]; then
    echo "Sourcing $(wc -l < "$temp_exports") environment variables..."
    . "$temp_exports"
    echo "Environment variables loaded successfully!"
  else
    echo "No new environment variables to load."
  fi
  
  # Clean up temporary files
  rm -f "$temp_exports" /tmp/json_pairs.tmp /tmp/formatted.json /tmp/fixed.json 2>/dev/null
  
else
  echo "WARNING: Environment JSON file not found: $ENV_JSON_FILE"
  echo "Continuing with existing environment variables..."
fi

echo "=== Starting Application ==="
echo "Available environment variables:"
env | grep -E "(AUTH_|NODE_|PORT|NEXT_|REACT_)" | sort

# Execute the main command (replace this with your actual Node.js start command)
# In a real Docker container, this would be something like:
# exec npm start
echo "Would now start the application with: $@"
exec "$@"
