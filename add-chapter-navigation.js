#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Chapter mapping
const chapters = [
    { file: 'primer-chapter-01-origins-v2.html', title: 'Origins', num: 1 },
    { file: 'primer-chapter-02-transformer-v2.html', title: 'The Transformer Revolution', num: 2 },
    { file: 'primer-chapter-03-constitutional-v2.html', title: 'Constitutional AI', num: 3 },
    { file: 'primer-chapter-04-building-v2.html', title: 'Building Claude', num: 4 },
    { file: 'primer-chapter-05-api-to-code-v2.html', title: 'From API to Code', num: 5 },
    { file: 'primer-chapter-06-mcp-v2.html', title: 'Model Context Protocol', num: 6 },
    { file: 'primer-chapter-07-revolution-v2.html', title: 'Revolutionizing Development', num: 7 },
    { file: 'primer-chapter-08-cli-v2.html', title: 'Command Line Interface', num: 8 },
    { file: 'primer-chapter-09-security-v2.html', title: 'Security & Safety', num: 9 },
    { file: 'primer-chapter-10-github-v2.html', title: 'GitHub Integration', num: 10 },
    { file: 'primer-chapter-11-cases-v2.html', title: 'Real-World Cases', num: 11 },
    { file: 'primer-chapter-12-ethics-v2.html', title: 'Ethics & Future', num: 12 }
];

function createNavHTML(currentChapter) {
    const currentIndex = chapters.findIndex(ch => ch.file === currentChapter);
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
    
    let navHTML = '<nav class="chapter-nav">';
    
    // Previous chapter
    if (prevChapter) {
        navHTML += `
        <div class="nav-prev">
            <a href="${prevChapter.file}">
                <div class="nav-label">← Previous Chapter</div>
                <div class="nav-title">Chapter ${prevChapter.num}: ${prevChapter.title}</div>
            </a>
        </div>`;
    } else {
        navHTML += '<div class="nav-prev"></div>';
    }
    
    // Home link
    navHTML += `
        <div class="nav-home">
            <a href="index.html">Table of Contents</a>
        </div>`;
    
    // Next chapter
    if (nextChapter) {
        navHTML += `
        <div class="nav-next">
            <a href="${nextChapter.file}">
                <div class="nav-label">Next Chapter →</div>
                <div class="nav-title">Chapter ${nextChapter.num}: ${nextChapter.title}</div>
            </a>
        </div>`;
    } else {
        navHTML += '<div class="nav-next"></div>';
    }
    
    navHTML += '</nav>';
    
    return navHTML;
}

function addNavigationToChapter(filepath) {
    if (!fs.existsSync(filepath)) {
        console.log(`Skipping ${filepath} - file not found`);
        return;
    }
    
    const content = fs.readFileSync(filepath, 'utf8');
    const $ = cheerio.load(content);
    
    // Add CSS link if not present
    if (!$('link[href="chapter-nav-style.css"]').length) {
        $('head').append('<link rel="stylesheet" href="chapter-nav-style.css">');
    }
    
    // Remove any existing navigation
    $('.chapter-nav').remove();
    
    // Get the filename
    const filename = path.basename(filepath);
    const navHTML = createNavHTML(filename);
    
    // Find main content container
    const contentContainers = $('.chapter, .container, main, article, body');
    
    if (contentContainers.length > 0) {
        const container = contentContainers.first();
        
        // Add navigation at top (after any h1/h2)
        const firstHeading = container.find('h1, h2').first();
        if (firstHeading.length > 0) {
            firstHeading.after(navHTML.replace('class="chapter-nav"', 'class="chapter-nav top"'));
        } else {
            container.prepend(navHTML.replace('class="chapter-nav"', 'class="chapter-nav top"'));
        }
        
        // Add navigation at bottom
        container.append(navHTML.replace('class="chapter-nav"', 'class="chapter-nav bottom"'));
    }
    
    // Add viewport meta if missing
    if (!$('meta[name="viewport"]').length) {
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    }
    
    // Save the updated file
    fs.writeFileSync(filepath, $.html());
    console.log(`✓ Added navigation to ${filename}`);
}

// Process all chapter files
console.log('Adding chapter navigation to all files...\n');

chapters.forEach(chapter => {
    addNavigationToChapter(chapter.file);
});

// Also add navigation to the complete book file
const completeBookFile = 'claude-code-primer-v2-complete.html';
if (fs.existsSync(completeBookFile)) {
    const content = fs.readFileSync(completeBookFile, 'utf8');
    const $ = cheerio.load(content);
    
    // Add CSS link if not present
    if (!$('link[href="chapter-nav-style.css"]').length) {
        $('head').append('<link rel="stylesheet" href="chapter-nav-style.css">');
    }
    
    // Add viewport meta if missing
    if (!$('meta[name="viewport"]').length) {
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    }
    
    // Add simple navigation at top and bottom
    const simpleNav = `
    <nav class="chapter-nav">
        <div class="nav-home" style="width: 100%; text-align: center;">
            <a href="index.html">← Back to Table of Contents</a>
        </div>
    </nav>`;
    
    // Remove existing nav
    $('.chapter-nav').remove();
    
    // Add at top after book cover
    $('.book-cover').after(simpleNav.replace('class="chapter-nav"', 'class="chapter-nav top"'));
    
    // Add at bottom
    $('body').append(simpleNav.replace('class="chapter-nav"', 'class="chapter-nav bottom"'));
    
    fs.writeFileSync(completeBookFile, $.html());
    console.log(`✓ Added navigation to ${completeBookFile}`);
}

console.log('\n✅ Chapter navigation added successfully!');