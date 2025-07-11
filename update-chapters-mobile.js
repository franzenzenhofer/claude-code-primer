#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of chapter files
const chapterFiles = [
    'primer-chapter-01-origins-v2.html',
    'primer-chapter-02-transformer-v2-cited.html',
    'primer-chapter-03-constitutional-v2-cited.html',
    'primer-chapter-04-building-v2.html',
    'primer-chapter-05-api-to-code-v2.html',
    'primer-chapter-06-mcp-v2.html',
    'primer-chapter-07-revolution-v2.html',
    'primer-chapter-08-cli-v2.html',
    'primer-chapter-09-security-v2.html',
    'primer-chapter-10-github-v2.html',
    'primer-chapter-11-cases-v2.html',
    'primer-chapter-12-ethics-v2.html'
];

function updateChapterFile(filename) {
    console.log(`Updating ${filename}...`);
    
    try {
        let content = fs.readFileSync(filename, 'utf8');
        
        // Check if viewport meta tag exists
        if (!content.includes('viewport')) {
            // Add viewport meta tag after charset
            content = content.replace(
                /<meta charset="UTF-8">/,
                '<meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">'
            );
        }
        
        // Check if mobile-first.css is already included
        if (!content.includes('mobile-first.css')) {
            // Add mobile-first CSS before book-style.css
            if (content.includes('book-style.css')) {
                content = content.replace(
                    /<link rel="stylesheet" href="book-style.css">/,
                    '<link rel="stylesheet" href="mobile-first.css">\n    <link rel="stylesheet" href="book-style.css">'
                );
            } else {
                // Add before closing head tag
                content = content.replace(
                    /<\/head>/,
                    '    <link rel="stylesheet" href="mobile-first.css">\n    <link rel="stylesheet" href="book-style.css">\n</head>'
                );
            }
        }
        
        // Write updated content
        fs.writeFileSync(filename, content, 'utf8');
        console.log(`✓ Updated ${filename}`);
        
    } catch (error) {
        console.error(`✗ Error updating ${filename}:`, error.message);
    }
}

// Update all chapter files
console.log('Updating all chapter files for mobile-first design...\n');

chapterFiles.forEach(file => {
    if (fs.existsSync(file)) {
        updateChapterFile(file);
    } else {
        console.log(`⚠ File not found: ${file}`);
    }
});

console.log('\n✓ All chapter files updated!');