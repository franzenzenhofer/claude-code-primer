#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Map all chapter files including -cited versions
const allChapterFiles = [
    'primer-chapter-01-origins-v2.html',
    'primer-chapter-02-transformer-v2.html',
    'primer-chapter-02-transformer-v2-cited.html',
    'primer-chapter-03-constitutional-v2.html',
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

// Chapter order for navigation
const chapterOrder = [
    { file: 'primer-chapter-01-origins-v2.html', title: 'Chapter 1: Origins', num: 1 },
    { file: 'primer-chapter-02-transformer-v2.html', title: 'Chapter 2: The Transformer Revolution', num: 2 },
    { file: 'primer-chapter-02-transformer-v2-cited.html', title: 'Chapter 2: The Transformer Revolution (Cited)', num: 2 },
    { file: 'primer-chapter-03-constitutional-v2.html', title: 'Chapter 3: Constitutional AI', num: 3 },
    { file: 'primer-chapter-03-constitutional-v2-cited.html', title: 'Chapter 3: Constitutional AI (Cited)', num: 3 },
    { file: 'primer-chapter-04-building-v2.html', title: 'Chapter 4: Building Claude', num: 4 },
    { file: 'primer-chapter-05-api-to-code-v2.html', title: 'Chapter 5: From API to Code', num: 5 },
    { file: 'primer-chapter-06-mcp-v2.html', title: 'Chapter 6: Model Context Protocol', num: 6 },
    { file: 'primer-chapter-07-revolution-v2.html', title: 'Chapter 7: Revolutionizing Development', num: 7 },
    { file: 'primer-chapter-08-cli-v2.html', title: 'Chapter 8: Command Line Interface', num: 8 },
    { file: 'primer-chapter-09-security-v2.html', title: 'Chapter 9: Security & Safety', num: 9 },
    { file: 'primer-chapter-10-github-v2.html', title: 'Chapter 10: GitHub Integration', num: 10 },
    { file: 'primer-chapter-11-cases-v2.html', title: 'Chapter 11: Real-World Cases', num: 11 },
    { file: 'primer-chapter-12-ethics-v2.html', title: 'Chapter 12: Ethics & Future', num: 12 }
];

function createNavHTML(currentFile) {
    const currentIndex = chapterOrder.findIndex(ch => ch.file === currentFile);
    
    // For cited versions, use neighboring non-cited chapters
    let prevChapter = null;
    let nextChapter = null;
    
    // Find previous non-cited chapter
    for (let i = currentIndex - 1; i >= 0; i--) {
        if (!chapterOrder[i].file.includes('-cited')) {
            prevChapter = chapterOrder[i];
            break;
        }
    }
    
    // Find next non-cited chapter
    for (let i = currentIndex + 1; i < chapterOrder.length; i++) {
        if (!chapterOrder[i].file.includes('-cited')) {
            nextChapter = chapterOrder[i];
            break;
        }
    }
    
    let navHTML = `
    <nav class="chapter-nav top" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5em 0; border-bottom: 1px solid #dee2e6; margin-bottom: 2em;">
        <div class="nav-prev" style="flex: 1;">`;
    
    if (prevChapter) {
        navHTML += `
            <a href="${prevChapter.file}" style="text-decoration: none; color: #333; border-bottom: 1px solid #333;">
                <div style="font-size: 0.9em; color: #666;">← Previous Chapter</div>
                <div style="font-size: 1.1em; font-weight: 600;">${prevChapter.title}</div>
            </a>`;
    }
    
    navHTML += `
        </div>
        <div class="nav-home" style="text-align: center;">
            <a href="index.html" style="text-decoration: none; color: #666; border-bottom: 1px solid #999;">Table of Contents</a>
        </div>
        <div class="nav-next" style="flex: 1; text-align: right;">`;
    
    if (nextChapter) {
        navHTML += `
            <a href="${nextChapter.file}" style="text-decoration: none; color: #333; border-bottom: 1px solid #333;">
                <div style="font-size: 0.9em; color: #666;">Next Chapter →</div>
                <div style="font-size: 1.1em; font-weight: 600;">${nextChapter.title}</div>
            </a>`;
    }
    
    navHTML += `
        </div>
    </nav>`;
    
    return navHTML;
}

console.log('🔧 Fixing navigation on ALL chapter files...\n');

allChapterFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  Skipping ${file} - not found`);
        return;
    }
    
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    // Remove any existing navigation
    $('.chapter-nav').remove();
    $('nav').each((i, elem) => {
        const $nav = $(elem);
        if ($nav.text().includes('Previous Chapter') || $nav.text().includes('Next Chapter')) {
            $nav.remove();
        }
    });
    
    // Add CSS links if not present
    if (!$('link[href="chapter-nav-style.css"]').length) {
        $('head').append('<link rel="stylesheet" href="chapter-nav-style.css">');
    }
    if (!$('link[href="word-break-fix.css"]').length) {
        $('head').append('<link rel="stylesheet" href="word-break-fix.css">');
    }
    
    // Create navigation HTML
    const topNav = createNavHTML(file);
    const bottomNav = topNav.replace('chapter-nav top', 'chapter-nav bottom')
                           .replace('margin-bottom: 2em', 'margin-top: 3em')
                           .replace('border-bottom:', 'border-top:');
    
    // Find insertion points
    const $body = $('body');
    const $h1 = $('h1').first();
    
    // Add top navigation after h1 or at beginning of body
    if ($h1.length > 0) {
        // Look for chapter-meta or first paragraph after h1
        const $meta = $('.chapter-meta').first();
        if ($meta.length > 0) {
            $meta.after(topNav);
        } else {
            $h1.after(topNav);
        }
    } else {
        $body.prepend(topNav);
    }
    
    // Add bottom navigation at end of body
    $body.append(bottomNav);
    
    // Save the file
    fs.writeFileSync(file, $.html());
    console.log(`✅ Fixed navigation in ${file}`);
});

console.log('\n✨ Navigation fixed on all chapter files!');