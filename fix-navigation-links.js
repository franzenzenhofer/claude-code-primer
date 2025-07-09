#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Map of broken links to correct links
const linkFixes = {
  // Chapter 3
  'primer-chapter-04-building-v2-cited.html': 'primer-chapter-04-building-v2.html',
  
  // Chapter 4
  'primer-chapter-03-constitutional-ai-cited.html': 'primer-chapter-03-constitutional-v2-cited.html',
  'primer-chapter-05-from-api-to-code.html': 'primer-chapter-05-api-to-code-v2.html',
  'primer-chapter-05-api-to-code-cited.html': 'primer-chapter-05-api-to-code-v2.html',
  
  // Chapter 5
  'primer-chapter-04-building-claude-cited.html': 'primer-chapter-04-building-v2.html',
  'primer-chapter-06-mcp-cited.html': 'primer-chapter-06-mcp-v2.html',
  
  // Chapter 6
  'primer-chapter-05-api-to-code-v2-cited.html': 'primer-chapter-05-api-to-code-v2.html',
  'primer-chapter-07-revolutionizing-cited.html': 'primer-chapter-07-revolution-v2.html',
  
  // Chapter 7
  'primer-chapter-06-mcp-v2-cited.html': 'primer-chapter-06-mcp-v2.html',
  'primer-chapter-08-cli-cited.html': 'primer-chapter-08-cli-v2.html',
  
  // Chapter 8
  'primer-chapter-07-revolution-cited.html': 'primer-chapter-07-revolution-v2.html',
  'primer-chapter-09-security-cited.html': 'primer-chapter-09-security-v2.html',
  
  // Chapter 9
  'primer-chapter-08-cli-v2-cited.html': 'primer-chapter-08-cli-v2.html',
  'primer-chapter-10-github-cited.html': 'primer-chapter-10-github-v2.html',
  
  // Chapter 10
  'primer-chapter-09-security-v2-cited.html': 'primer-chapter-09-security-v2.html',
  'primer-chapter-11-cases-cited.html': 'primer-chapter-11-cases-v2.html',
  
  // Chapter 11
  'primer-chapter-10-github-v2-cited.html': 'primer-chapter-10-github-v2.html',
  'primer-chapter-12-ethics-cited.html': 'primer-chapter-12-ethics-v2.html',
  
  // Chapter 12
  'primer-chapter-11-cases-v2-cited.html': 'primer-chapter-11-cases-v2.html'
};

// Process all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));

let totalFixes = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Replace broken links
  Object.entries(linkFixes).forEach(([broken, correct]) => {
    const regex = new RegExp(`href="${broken}"`, 'g');
    if (content.includes(`href="${broken}"`)) {
      content = content.replace(regex, `href="${correct}"`);
      modified = true;
      totalFixes++;
      console.log(`Fixed in ${file}: ${broken} → ${correct}`);
    }
  });
  
  // Write back if modified
  if (modified) {
    fs.writeFileSync(file, content);
  }
});

console.log(`\nTotal fixes applied: ${totalFixes}`);