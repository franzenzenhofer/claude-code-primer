#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Test results storage
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: []
};

// Helper functions
function log(message, type = 'info') {
    const prefix = {
        info: `${colors.blue}ℹ${colors.reset}`,
        success: `${colors.green}✓${colors.reset}`,
        warning: `${colors.yellow}⚠${colors.reset}`,
        error: `${colors.red}✗${colors.reset}`
    };
    console.log(`${prefix[type]} ${message}`);
}

function testPass(testName) {
    testResults.passed++;
    log(`${testName}`, 'success');
}

function testFail(testName, reason) {
    testResults.failed++;
    testResults.errors.push({ test: testName, reason });
    log(`${testName}: ${reason}`, 'error');
}

function testWarn(testName, reason) {
    testResults.warnings++;
    log(`${testName}: ${reason}`, 'warning');
}

// Test Suite Categories
console.log(`\n${colors.bright}Claude Code Primer - Comprehensive Test Suite${colors.reset}\n`);

// 1. FILE STRUCTURE TESTS
console.log(`${colors.cyan}1. File Structure Tests${colors.reset}`);

function testFileStructure() {
    const requiredFiles = [
        'index.html',
        'claude-code-primer-v2-complete.html',
        'package.json',
        'test-suite.js',
        'test-report.js'
    ];

    const requiredDirs = [
        'node_modules'
    ];

    // Test required files
    requiredFiles.forEach(file => {
        if (fs.existsSync(file)) {
            testPass(`Required file exists: ${file}`);
        } else {
            testFail(`Required file missing: ${file}`, 'File not found');
        }
    });

    // Test required directories
    requiredDirs.forEach(dir => {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            testPass(`Required directory exists: ${dir}`);
        } else {
            testFail(`Required directory missing: ${dir}`, 'Directory not found');
        }
    });

    // Test for chapter files
    const chapterPattern = /^(primer-)?chapter-\d{2}/;
    const files = fs.readdirSync('.');
    const chapterFiles = files.filter(f => chapterPattern.test(f) && f.endsWith('.html'));
    
    if (chapterFiles.length >= 12) {
        testPass(`Found ${chapterFiles.length} chapter files`);
    } else {
        testFail('Chapter files', `Expected at least 12 chapters, found ${chapterFiles.length}`);
    }
}

// 2. HTML VALIDATION TESTS
console.log(`\n${colors.cyan}2. HTML Validation Tests${colors.reset}`);

function testHTMLValidation() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            // Check for proper DOCTYPE
            if (content.trim().toLowerCase().startsWith('<!doctype html>')) {
                testPass(`Valid DOCTYPE: ${file}`);
            } else {
                testFail(`Invalid DOCTYPE: ${file}`, 'Missing or invalid DOCTYPE');
            }
            
            // Check for required meta tags
            const hasCharset = $('meta[charset]').length > 0;
            const hasViewport = $('meta[name="viewport"]').length > 0;
            const hasTitle = $('title').length > 0 && $('title').text().trim() !== '';
            
            if (hasCharset) testPass(`Has charset meta: ${file}`);
            else testFail(`Missing charset: ${file}`, 'No charset meta tag');
            
            if (hasViewport) testPass(`Has viewport meta: ${file}`);
            else testWarn(`Missing viewport: ${file}`, 'No viewport meta tag (mobile compatibility)');
            
            if (hasTitle) testPass(`Has title: ${file}`);
            else testFail(`Missing title: ${file}`, 'No title tag or empty title');
            
            // Check for broken image references
            $('img').each((i, elem) => {
                const src = $(elem).attr('src');
                if (src && !src.startsWith('http') && !fs.existsSync(src)) {
                    testWarn(`Broken image: ${file}`, `Image not found: ${src}`);
                }
            });
        } catch (error) {
            testFail(`HTML parsing: ${file}`, error.message);
        }
    });
}

// 3. LINK VALIDATION TESTS
console.log(`\n${colors.cyan}3. Link Validation Tests${colors.reset}`);

function testLinks() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    const linkMap = new Map();
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);
        
        $('a[href]').each((i, elem) => {
            const href = $(elem).attr('href');
            const text = $(elem).text().trim();
            
            if (!linkMap.has(file)) {
                linkMap.set(file, []);
            }
            linkMap.get(file).push({ href, text });
        });
    });
    
    // Check internal links
    linkMap.forEach((links, file) => {
        links.forEach(({ href, text }) => {
            if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                const linkPath = path.resolve(path.dirname(file), href.split('#')[0]);
                const relativePath = path.relative('.', linkPath);
                
                if (!fs.existsSync(relativePath)) {
                    testFail(`Broken link in ${file}`, `"${text}" -> ${href}`);
                }
            }
        });
    });
    
    const totalInternalLinks = Array.from(linkMap.values()).flat().filter(l => !l.href.startsWith('http')).length;
    if (testResults.failed === 0) {
        testPass(`All ${totalInternalLinks} internal links valid`);
    }
}

// 4. CSS VALIDATION TESTS
console.log(`\n${colors.cyan}4. CSS Validation Tests${colors.reset}`);

function testCSS() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);
        
        // Check for embedded styles
        const styleBlocks = $('style').length;
        if (styleBlocks > 0) {
            testPass(`Found ${styleBlocks} style blocks in ${file}`);
            
            // Basic CSS validation
            $('style').each((i, elem) => {
                const css = $(elem).text();
                
                // Check for common CSS errors
                if (css.includes(';;')) {
                    testWarn(`Double semicolon in ${file}`, 'CSS contains ;;');
                }
                if (css.match(/:\s*;/)) {
                    testWarn(`Empty CSS value in ${file}`, 'CSS property with no value');
                }
                if (css.match(/{[^}]*{/)) {
                    testWarn(`Nested braces in ${file}`, 'Possible CSS syntax error');
                }
            });
        }
        
        // Check for external stylesheets
        $('link[rel="stylesheet"]').each((i, elem) => {
            const href = $(elem).attr('href');
            if (href && !href.startsWith('http')) {
                if (!fs.existsSync(href)) {
                    testFail(`Missing stylesheet in ${file}`, href);
                } else {
                    testPass(`Valid stylesheet link in ${file}: ${href}`);
                }
            }
        });
    });
}

// 5. JAVASCRIPT TESTS
console.log(`\n${colors.cyan}5. JavaScript Tests${colors.reset}`);

function testJavaScript() {
    const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js'));
    
    jsFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            
            // Basic syntax check using Node's parser
            new Function(content);
            testPass(`Valid JavaScript syntax: ${file}`);
            
            // Check for common issues
            if (content.includes('console.log') && !file.includes('test')) {
                testWarn(`Console.log in ${file}`, 'Remove console.log from production code');
            }
            
            if (content.includes('debugger')) {
                testFail(`Debugger statement in ${file}`, 'Remove debugger statements');
            }
            
        } catch (error) {
            testFail(`JavaScript syntax error: ${file}`, error.message);
        }
    });
    
    // Check for script tags in HTML
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);
        
        $('script').each((i, elem) => {
            const src = $(elem).attr('src');
            if (src && !src.startsWith('http')) {
                if (!fs.existsSync(src)) {
                    testFail(`Missing script in ${file}`, src);
                }
            }
        });
    });
}

// 6. ACCESSIBILITY TESTS
console.log(`\n${colors.cyan}6. Accessibility Tests${colors.reset}`);

function testAccessibility() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);
        
        // Check images for alt text
        $('img').each((i, elem) => {
            const alt = $(elem).attr('alt');
            const src = $(elem).attr('src');
            if (alt === undefined) {
                testWarn(`Missing alt text in ${file}`, `Image: ${src || 'unknown'}`);
            }
        });
        
        // Check for proper heading hierarchy
        const headings = [];
        $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
            headings.push(parseInt(elem.name.charAt(1)));
        });
        
        let lastLevel = 0;
        let hasSkippedLevel = false;
        headings.forEach(level => {
            if (level > lastLevel + 1) {
                hasSkippedLevel = true;
            }
            lastLevel = level;
        });
        
        if (hasSkippedLevel) {
            testWarn(`Heading hierarchy issue in ${file}`, 'Skipped heading levels');
        }
        
        // Check for form labels
        $('input:not([type="hidden"]), select, textarea').each((i, elem) => {
            const id = $(elem).attr('id');
            const label = id ? $(`label[for="${id}"]`).length : 0;
            const ariaLabel = $(elem).attr('aria-label');
            
            if (!label && !ariaLabel) {
                testWarn(`Form input without label in ${file}`, `Input type: ${$(elem).attr('type') || 'text'}`);
            }
        });
    });
}

// 7. PERFORMANCE TESTS
console.log(`\n${colors.cyan}7. Performance Tests${colors.reset}`);

function testPerformance() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const stats = fs.statSync(file);
        const sizeKB = stats.size / 1024;
        
        if (sizeKB > 500) {
            testWarn(`Large file: ${file}`, `${sizeKB.toFixed(2)} KB`);
        } else {
            testPass(`File size OK: ${file} (${sizeKB.toFixed(2)} KB)`);
        }
    });
    
    // Check for uncompressed images
    const imageFiles = fs.readdirSync('.').filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    imageFiles.forEach(file => {
        const stats = fs.statSync(file);
        const sizeMB = stats.size / (1024 * 1024);
        
        if (sizeMB > 1) {
            testWarn(`Large image: ${file}`, `${sizeMB.toFixed(2)} MB - consider compression`);
        }
    });
}

// 8. SECURITY TESTS
console.log(`\n${colors.cyan}8. Security Tests${colors.reset}`);

function testSecurity() {
    const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js'));
    
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for inline event handlers
        if (/<[^>]+on\w+\s*=/i.test(content)) {
            testWarn(`Inline event handler in ${file}`, 'Consider using addEventListener instead');
        }
        
        // Check for eval usage
        if (/\beval\s*\(/.test(content)) {
            testFail(`eval() usage in ${file}`, 'Avoid using eval() for security');
        }
        
        // Check for innerHTML usage
        if (/\.innerHTML\s*=/.test(content)) {
            testWarn(`innerHTML usage in ${file}`, 'Consider using textContent or createElement');
        }
        
        // Check for hardcoded credentials
        const credentialPatterns = [
            /password\s*[:=]\s*["'][^"']+["']/i,
            /api[_-]?key\s*[:=]\s*["'][^"']+["']/i,
            /secret\s*[:=]\s*["'][^"']+["']/i
        ];
        
        credentialPatterns.forEach(pattern => {
            if (pattern.test(content)) {
                testFail(`Possible hardcoded credentials in ${file}`, 'Remove sensitive data');
            }
        });
    });
}

// 9. SEO TESTS
console.log(`\n${colors.cyan}9. SEO Tests${colors.reset}`);

function testSEO() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);
        
        // Check meta description
        const metaDesc = $('meta[name="description"]').attr('content');
        if (!metaDesc) {
            testWarn(`Missing meta description: ${file}`, 'Add for better SEO');
        } else if (metaDesc.length < 50 || metaDesc.length > 160) {
            testWarn(`Meta description length: ${file}`, `${metaDesc.length} chars (ideal: 50-160)`);
        } else {
            testPass(`Good meta description: ${file}`);
        }
        
        // Check Open Graph tags
        const ogTitle = $('meta[property="og:title"]').length > 0;
        const ogDesc = $('meta[property="og:description"]').length > 0;
        const ogImage = $('meta[property="og:image"]').length > 0;
        
        if (!ogTitle || !ogDesc) {
            testWarn(`Missing Open Graph tags: ${file}`, 'Add for social media sharing');
        }
        
        // Check canonical URL
        const canonical = $('link[rel="canonical"]').length > 0;
        if (!canonical && file === 'index.html') {
            testWarn(`Missing canonical URL: ${file}`, 'Add to prevent duplicate content');
        }
    });
}

// 10. CONTENT TESTS
console.log(`\n${colors.cyan}10. Content Tests${colors.reset}`);

function testContent() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(content);
        
        // Check for Lorem Ipsum
        if (/lorem\s+ipsum/i.test(content)) {
            testWarn(`Lorem Ipsum found in ${file}`, 'Replace with real content');
        }
        
        // Check for TODO comments
        if (/TODO|FIXME|XXX/i.test(content)) {
            testWarn(`TODO comment in ${file}`, 'Address TODO items');
        }
        
        // Check for broken markdown-style links
        if (/\[([^\]]+)\]\(([^)]+)\)/.test($.text())) {
            testWarn(`Markdown syntax in HTML: ${file}`, 'Convert to proper HTML links');
        }
        
        // Check word count for chapters
        if (file.includes('chapter')) {
            const text = $('body').text();
            const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
            
            if (wordCount < 500) {
                testWarn(`Short chapter: ${file}`, `Only ${wordCount} words`);
            } else {
                testPass(`Good chapter length: ${file} (${wordCount} words)`);
            }
        }
    });
}

// 11. GIT TESTS
console.log(`\n${colors.cyan}11. Git Repository Tests${colors.reset}`);

function testGit() {
    try {
        // Check if it's a git repository
        execSync('git rev-parse --git-dir', { stdio: 'ignore' });
        testPass('Valid Git repository');
        
        // Check for uncommitted changes
        const status = execSync('git status --porcelain').toString();
        if (status.trim()) {
            testWarn('Uncommitted changes', 'Consider committing your changes');
        } else {
            testPass('Working directory clean');
        }
        
        // Check .gitignore
        if (fs.existsSync('.gitignore')) {
            testPass('.gitignore exists');
            const gitignore = fs.readFileSync('.gitignore', 'utf8');
            
            // Check for common patterns
            if (!gitignore.includes('node_modules')) {
                testWarn('.gitignore missing node_modules', 'Add node_modules to .gitignore');
            }
            if (!gitignore.includes('.DS_Store')) {
                testWarn('.gitignore missing .DS_Store', 'Add .DS_Store for macOS');
            }
        } else {
            testWarn('No .gitignore', 'Consider adding a .gitignore file');
        }
        
    } catch (error) {
        testWarn('Not a Git repository', 'Consider initializing with git init');
    }
}

// 12. BUILD TESTS
console.log(`\n${colors.cyan}12. Build & Dependencies Tests${colors.reset}`);

function testBuild() {
    // Check package.json
    if (fs.existsSync('package.json')) {
        try {
            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            testPass('Valid package.json');
            
            // Check for test script
            if (packageJson.scripts && packageJson.scripts.test) {
                testPass('Test script defined');
            } else {
                testWarn('No test script', 'Add "test" script to package.json');
            }
            
            // Check for outdated dependencies
            if (packageJson.dependencies || packageJson.devDependencies) {
                testPass('Dependencies defined');
            }
            
        } catch (error) {
            testFail('Invalid package.json', error.message);
        }
    }
    
    // Check for lock file
    if (fs.existsSync('package-lock.json')) {
        testPass('package-lock.json exists');
    } else if (fs.existsSync('yarn.lock')) {
        testPass('yarn.lock exists');
    } else {
        testWarn('No lock file', 'Run npm install to generate package-lock.json');
    }
}

// Run all tests
function runAllTests() {
    const startTime = Date.now();
    
    testFileStructure();
    testHTMLValidation();
    testLinks();
    testCSS();
    testJavaScript();
    testAccessibility();
    testPerformance();
    testSecurity();
    testSEO();
    testContent();
    testGit();
    testBuild();
    
    const duration = Date.now() - startTime;
    
    // Summary
    console.log(`\n${colors.bright}Test Summary${colors.reset}`);
    console.log(`${colors.green}Passed: ${testResults.passed}${colors.reset}`);
    console.log(`${colors.yellow}Warnings: ${testResults.warnings}${colors.reset}`);
    console.log(`${colors.red}Failed: ${testResults.failed}${colors.reset}`);
    console.log(`Duration: ${duration}ms`);
    
    if (testResults.failed > 0) {
        console.log(`\n${colors.red}Failed Tests:${colors.reset}`);
        testResults.errors.forEach(({ test, reason }) => {
            console.log(`  - ${test}: ${reason}`);
        });
        process.exit(1);
    } else if (testResults.warnings > 0) {
        console.log(`\n${colors.yellow}⚠ Tests passed with warnings${colors.reset}`);
        process.exit(0);
    } else {
        console.log(`\n${colors.green}✅ All tests passed!${colors.reset}`);
        process.exit(0);
    }
}

// Run tests
runAllTests();