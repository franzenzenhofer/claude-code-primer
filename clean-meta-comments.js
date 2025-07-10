const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to clean`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalLength = content.length;
    
    // Remove version banner divs with fact-checking info
    content = content.replace(/<div class="version-banner">[\s\S]*?<\/div>\s*(?=<h1|<nav|<div class="container")/g, '');
    
    // Remove chapter-meta divs that contain version info
    content = content.replace(/<div class="chapter-meta">\s*Version 2\.0.*?<\/div>\s*/g, '');
    
    // Remove version-info sections from index
    content = content.replace(/<div class="version-info">[\s\S]*?<h2>Claude Code Primer - Version.*?<\/ul>\s*<\/div>/g, '');
    
    // Remove standalone version headings
    content = content.replace(/<h2>Claude Code Primer - Version 2\.0.*?<\/h2>\s*/g, '');
    
    // Remove fact-checking lists that appear outside of version banners
    content = content.replace(/<ul>\s*<li>✓ All claims verified.*?<\/li>[\s\S]*?<li>✓.*?cross-referenced.*?<\/li>\s*<\/ul>/g, '');
    
    // Clean up extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (content.length !== originalLength) {
        fs.writeFileSync(file, content);
        console.log(`✓ Cleaned ${file} (removed ${originalLength - content.length} characters)`);
    } else {
        console.log(`- No changes needed for ${file}`);
    }
});

console.log('\nDone! All meta comments removed.');