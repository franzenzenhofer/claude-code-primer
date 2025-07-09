#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
const url = require('url');

// Test results storage
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

// Utility function to log test results
function logTest(testName, status, message = '') {
  const symbol = status === 'pass' ? '✓' : status === 'fail' ? '✗' : '⚠';
  const color = status === 'pass' ? '\x1b[32m' : status === 'fail' ? '\x1b[31m' : '\x1b[33m';
  console.log(`${color}${symbol}\x1b[0m ${testName} ${message}`);
  
  if (status === 'pass') results.passed++;
  else if (status === 'fail') results.failed++;
  else results.warnings++;
  
  results.details.push({ testName, status, message });
}

// Test 1: Check all HTML files exist
function testHTMLFilesExist() {
  console.log('\n### Testing HTML File Existence ###');
  
  const expectedFiles = [
    'index.html',
    'claude-code-primer-v2-complete.html',
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
  
  expectedFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logTest(`File exists: ${file}`, 'pass');
    } else {
      logTest(`File exists: ${file}`, 'fail', '- File not found');
    }
  });
}

// Test 2: Check internal links
function testInternalLinks() {
  console.log('\n### Testing Internal Links ###');
  
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href');
      
      // Skip external links, anchors, and mailto
      if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) {
        return;
      }
      
      // Check if local file exists
      if (href.endsWith('.html') || href.endsWith('.pdf') || href.endsWith('.epub')) {
        const linkPath = path.join(path.dirname(file), href);
        if (fs.existsSync(linkPath)) {
          logTest(`Link in ${file}: ${href}`, 'pass');
        } else {
          logTest(`Link in ${file}: ${href}`, 'fail', '- Target not found');
        }
      }
    });
  });
}

// Test 3: Check external links (limited to avoid rate limiting)
async function testExternalLinks() {
  console.log('\n### Testing External Links (Sample) ###');
  
  const externalLinks = new Set();
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));
  
  // Collect external links
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    $('a[href^="http"]').each((i, elem) => {
      const href = $(elem).attr('href');
      externalLinks.add(href);
    });
  });
  
  // Test a sample of external links
  const linksToTest = Array.from(externalLinks).slice(0, 5);
  
  for (const link of linksToTest) {
    try {
      const isValid = await checkLink(link);
      if (isValid) {
        logTest(`External link: ${link}`, 'pass');
      } else {
        logTest(`External link: ${link}`, 'fail', '- Unreachable');
      }
    } catch (error) {
      logTest(`External link: ${link}`, 'warning', `- Error: ${error.message}`);
    }
  }
  
  if (externalLinks.size > 5) {
    console.log(`\nNote: Tested 5 of ${externalLinks.size} external links to avoid rate limiting`);
  }
}

// Helper function to check if a link is valid
function checkLink(linkUrl) {
  return new Promise((resolve) => {
    const parsedUrl = url.parse(linkUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      method: 'HEAD',
      host: parsedUrl.hostname,
      path: parsedUrl.path,
      timeout: 5000
    };
    
    const req = protocol.request(options, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Test 4: Check for required assets
function testRequiredAssets() {
  console.log('\n### Testing Required Assets ###');
  
  const requiredAssets = [
    'package.json',
    'server.js'
  ];
  
  requiredAssets.forEach(asset => {
    if (fs.existsSync(asset)) {
      logTest(`Asset exists: ${asset}`, 'pass');
    } else {
      logTest(`Asset exists: ${asset}`, 'fail', '- File not found');
    }
  });
}

// Test 5: Validate HTML structure
function testHTMLStructure() {
  console.log('\n### Testing HTML Structure ###');
  
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    // Check for basic HTML structure
    const hasTitle = $('title').length > 0;
    const hasH1 = $('h1').length > 0;
    const hasBody = $('body').length > 0;
    
    if (hasTitle && hasH1 && hasBody) {
      logTest(`HTML structure: ${file}`, 'pass');
    } else {
      const missing = [];
      if (!hasTitle) missing.push('title');
      if (!hasH1) missing.push('h1');
      if (!hasBody) missing.push('body');
      logTest(`HTML structure: ${file}`, 'fail', `- Missing: ${missing.join(', ')}`);
    }
  });
}

// Test 6: Check chapter numbering consistency
function testChapterNumbering() {
  console.log('\n### Testing Chapter Numbering ###');
  
  const chapterFiles = fs.readdirSync('.')
    .filter(f => f.match(/primer-chapter-\d+-.*\.html/))
    .sort();
  
  let expectedNumber = 1;
  let allCorrect = true;
  
  chapterFiles.forEach(file => {
    const match = file.match(/primer-chapter-(\d+)-/);
    if (match) {
      const fileNumber = parseInt(match[1]);
      if (fileNumber !== expectedNumber) {
        logTest(`Chapter numbering: ${file}`, 'warning', `- Expected chapter ${expectedNumber}, got ${fileNumber}`);
        allCorrect = false;
      }
      expectedNumber = Math.max(expectedNumber, fileNumber) + 1;
    }
  });
  
  if (allCorrect && chapterFiles.length > 0) {
    logTest('Chapter numbering consistency', 'pass', `- All ${chapterFiles.length} chapters numbered correctly`);
  }
}

// Test 7: Check for JavaScript errors
function testJavaScriptErrors() {
  console.log('\n### Testing for JavaScript Errors ###');
  
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    // Check for inline scripts with common error patterns
    let hasErrors = false;
    $('script').each((i, elem) => {
      const scriptContent = $(elem).html();
      if (scriptContent) {
        // Look for common error patterns
        if (scriptContent.includes('console.error') || 
            scriptContent.includes('throw new Error') ||
            scriptContent.match(/undefined\s+is\s+not/)) {
          hasErrors = true;
        }
      }
    });
    
    if (!hasErrors) {
      logTest(`JavaScript check: ${file}`, 'pass');
    } else {
      logTest(`JavaScript check: ${file}`, 'warning', '- Contains error handling code');
    }
  });
}

// Test 8: Check image references
function testImageReferences() {
  console.log('\n### Testing Image References ###');
  
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('node_modules'));
  let imageCount = 0;
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);
    
    $('img[src]').each((i, elem) => {
      const src = $(elem).attr('src');
      imageCount++;
      
      // Skip external images
      if (src.startsWith('http')) {
        logTest(`Image in ${file}: ${src}`, 'pass', '- External image');
        return;
      }
      
      // Check if local image exists
      const imagePath = path.join(path.dirname(file), src);
      if (fs.existsSync(imagePath)) {
        logTest(`Image in ${file}: ${src}`, 'pass');
      } else {
        logTest(`Image in ${file}: ${src}`, 'fail', '- Image not found');
      }
    });
  });
  
  if (imageCount === 0) {
    console.log('No images found in HTML files');
  }
}

// Main test runner
async function runTests() {
  console.log('=== Claude Code Primer Test Suite ===\n');
  console.log(`Running tests in: ${process.cwd()}`);
  console.log(`Date: ${new Date().toISOString()}\n`);
  
  // Run all tests
  testHTMLFilesExist();
  testInternalLinks();
  testRequiredAssets();
  testHTMLStructure();
  testChapterNumbering();
  testJavaScriptErrors();
  testImageReferences();
  
  // Run async tests
  await testExternalLinks();
  
  // Summary
  console.log('\n=== Test Summary ===');
  console.log(`Total tests: ${results.passed + results.failed + results.warnings}`);
  console.log(`\x1b[32mPassed: ${results.passed}\x1b[0m`);
  console.log(`\x1b[31mFailed: ${results.failed}\x1b[0m`);
  console.log(`\x1b[33mWarnings: ${results.warnings}\x1b[0m`);
  
  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(console.error);