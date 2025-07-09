#!/usr/bin/env node

const fs = require('fs');
const cheerio = require('cheerio');

// HTML files to update
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('Applying word-break fix to all HTML files...\n');

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    // Add word-break CSS link if not present
    if (!$('link[href="word-break-fix.css"]').length) {
        // Add after other CSS links or in head
        const existingCSS = $('link[rel="stylesheet"]').last();
        if (existingCSS.length) {
            existingCSS.after('<link rel="stylesheet" href="word-break-fix.css">');
        } else {
            $('head').append('<link rel="stylesheet" href="word-break-fix.css">');
        }
    }
    
    // Add inline critical CSS for immediate effect
    if (!$('style#word-break-critical').length) {
        const criticalCSS = `
    <style id="word-break-critical">
        /* Critical word-break rules for immediate render */
        * { max-width: 100%; box-sizing: border-box; }
        body { overflow-x: hidden; word-wrap: break-word; overflow-wrap: break-word; }
        p, h1, h2, h3, h4, h5, h6, a, span, div, li { 
            word-wrap: break-word; 
            overflow-wrap: break-word; 
        }
        @media (max-width: 768px) {
            body { hyphens: auto; -webkit-hyphens: auto; }
            .container { max-width: calc(100vw - 2rem); }
        }
    </style>`;
        $('head').append(criticalCSS);
    }
    
    // Save updated file
    fs.writeFileSync(file, $.html());
    console.log(`✓ Updated ${file}`);
});

console.log('\n✅ Word-break fix applied to all files!');