#!/bin/bash

# Function to remove version banners and simplify navigation
process_file() {
    local file=$1
    local prev_link=$2
    local next_link=$3
    
    echo "Processing: $file"
    
    # Create temp file
    temp_file="${file}.tmp"
    
    # Read file and process
    awk -v prev="$prev_link" -v next="$next_link" '
    BEGIN { skip = 0; nav_section = 0 }
    
    # Skip version banner sections
    /<div class="version-banner">/ { skip = 1; next }
    /<\/div>/ && skip && /^    <\/div>$/ { skip = 0; next }
    skip { next }
    
    # Skip chapter-meta divs
    /<div class="chapter-meta">/ { skip = 1; next }
    
    # Detect navigation sections
    /<nav class="chapter-nav/ { nav_section = 1; print; next }
    /<\/nav>/ && nav_section { nav_section = 0; print; next }
    
    # Replace navigation content
    nav_section && /<div class="nav-prev"/ {
        print "        <div class=\"nav-prev\" style=\"flex: 1;\">"
        print "            <a href=\"" prev "\" style=\"text-decoration: none; color: #333;\">← Prev</a>"
        print "        </div>"
        print "        <div class=\"nav-home\" style=\"text-align: center;\">"
        print "            <a href=\"index.html\" style=\"text-decoration: none; color: #666;\">ToC</a>"
        print "        </div>"
        print "        <div class=\"nav-next\" style=\"flex: 1; text-align: right;\">"
        print "            <a href=\"" next "\" style=\"text-decoration: none; color: #333;\">Next →</a>"
        print "        </div>"
        # Skip until end of navigation block
        while (getline > 0 && !/<\/nav>/) {}
        nav_section = 0
        print "    </nav>"
        next
    }
    
    # Print non-skipped lines
    !skip && !nav_section { print }
    ' "$file" > "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$file"
}

# Process each chapter file
process_file "primer-chapter-01-origins-v2.html" "index.html" "primer-chapter-02-transformer-v2-cited.html"
process_file "primer-chapter-02-transformer-v2-cited.html" "primer-chapter-01-origins-v2.html" "primer-chapter-03-constitutional-v2-cited.html"
process_file "primer-chapter-03-constitutional-v2-cited.html" "primer-chapter-02-transformer-v2-cited.html" "primer-chapter-04-building-v2.html"
process_file "primer-chapter-04-building-v2.html" "primer-chapter-03-constitutional-v2-cited.html" "primer-chapter-05-api-to-code-v2.html"
process_file "primer-chapter-05-api-to-code-v2.html" "primer-chapter-04-building-v2.html" "primer-chapter-06-mcp-v2.html"
process_file "primer-chapter-06-mcp-v2.html" "primer-chapter-05-api-to-code-v2.html" "primer-chapter-07-revolution-v2.html"
process_file "primer-chapter-07-revolution-v2.html" "primer-chapter-06-mcp-v2.html" "primer-chapter-08-cli-v2.html"
process_file "primer-chapter-08-cli-v2.html" "primer-chapter-07-revolution-v2.html" "primer-chapter-09-security-v2.html"
process_file "primer-chapter-09-security-v2.html" "primer-chapter-08-cli-v2.html" "primer-chapter-10-github-v2.html"
process_file "primer-chapter-10-github-v2.html" "primer-chapter-09-security-v2.html" "primer-chapter-11-cases-v2.html"
process_file "primer-chapter-11-cases-v2.html" "primer-chapter-10-github-v2.html" "primer-chapter-12-ethics-v2.html"
process_file "primer-chapter-12-ethics-v2.html" "primer-chapter-11-cases-v2.html" "index.html"

echo "All files processed!"