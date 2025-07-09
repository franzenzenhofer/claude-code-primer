#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('=== Claude Code Primer Quick Test Report ===\n');

// Check for missing files
const requiredFiles = [
  'index.html',
  'claude-code-primer-v2-complete.html',
  'server.js',
  'package.json'
];

const missingFiles = [];
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing Required Files:');
  missingFiles.forEach(f => console.log(`   - ${f}`));
} else {
  console.log('✅ All required files present');
}

// Check for broken internal links
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));
const brokenLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content);
  
  $('a[href]').each((i, elem) => {
    const href = $(elem).attr('href');
    
    // Check only local HTML, PDF, and EPUB links
    if (!href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#')) {
      if (href.endsWith('.html') || href.endsWith('.pdf') || href.endsWith('.epub')) {
        const linkPath = path.join(path.dirname(file), href);
        if (!fs.existsSync(linkPath)) {
          brokenLinks.push({ file, href });
        }
      }
    }
  });
});

if (brokenLinks.length > 0) {
  console.log('\n❌ Broken Internal Links:');
  brokenLinks.forEach(({ file, href }) => {
    console.log(`   ${file} → ${href}`);
  });
} else {
  console.log('\n✅ All internal links valid');
}

// Count chapters
const chapterFiles = fs.readdirSync('.')
  .filter(f => f.match(/primer-chapter-\d+-.*-v2.*\.html/));

console.log(`\n📚 Chapter Files: ${chapterFiles.length} v2 chapters found`);

// Check server status
try {
  const serverLog = fs.existsSync('server.log');
  console.log(`\n🖥️  Server: ${serverLog ? 'Log file exists' : 'No log file'}`);
} catch (e) {
  console.log('\n🖥️  Server: Unable to check status');
}

// Summary
console.log('\n=== Summary ===');
console.log(`HTML Files: ${htmlFiles.length}`);
console.log(`Broken Links: ${brokenLinks.length}`);
console.log(`Missing Files: ${missingFiles.length}`);

// Recommendations
if (brokenLinks.length > 0 || missingFiles.length > 0) {
  console.log('\n💡 Recommendations:');
  if (brokenLinks.length > 0) {
    console.log('   - Fix broken internal links');
  }
  if (missingFiles.some(f => f.endsWith('.pdf') || f.endsWith('.epub'))) {
    console.log('   - Generate PDF and EPUB versions');
  }
}