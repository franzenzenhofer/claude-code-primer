const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';
const SCREENSHOT_DIR = './screenshots';

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Test results
const results = {
    passed: [],
    failed: [],
    screenshots: []
};

// Helper to take screenshots
async function takeScreenshot(page, name) {
    const filename = `${name}-${Date.now()}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: filepath, fullPage: true });
    results.screenshots.push(filepath);
    console.log(`📸 Screenshot saved: ${filename}`);
    return filepath;
}

// Test function wrapper
async function test(name, fn) {
    try {
        await fn();
        results.passed.push(name);
        console.log(`✅ ${name}`);
    } catch (error) {
        results.failed.push({ name, error: error.message });
        console.log(`❌ ${name}: ${error.message}`);
    }
}

// Main test suite
async function runTests() {
    const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();
    
    console.log('\n🧪 Running Playwright Tests...\n');
    
    // Test 1: Homepage loads
    await test('Homepage loads correctly', async () => {
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        
        const title = await page.title();
        if (!title.includes('Claude Code Primer')) {
            throw new Error(`Wrong title: ${title}`);
        }
        
        await takeScreenshot(page, 'homepage');
    });
    
    // Test 2: No horizontal scroll on mobile
    await test('No horizontal scroll on mobile', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`${BASE_URL}/index.html`);
        
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        
        if (bodyWidth > viewportWidth) {
            throw new Error(`Horizontal scroll detected: body ${bodyWidth}px > viewport ${viewportWidth}px`);
        }
        
        await takeScreenshot(page, 'mobile-homepage');
    });
    
    // Test 3: Chapter navigation works
    await test('Chapter navigation functional', async () => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(`${BASE_URL}/primer-chapter-01-origins-v2.html`);
        
        // Check for navigation elements
        const hasTopNav = await page.locator('.chapter-nav.top').count() > 0;
        const hasBottomNav = await page.locator('.chapter-nav.bottom').count() > 0;
        
        if (!hasTopNav || !hasBottomNav) {
            throw new Error('Missing chapter navigation');
        }
        
        // Try clicking next chapter
        const nextLink = await page.locator('.nav-next a').first();
        if (await nextLink.count() > 0) {
            await nextLink.click();
            await page.waitForLoadState('networkidle');
            
            const newUrl = page.url();
            if (!newUrl.includes('chapter-02')) {
                throw new Error('Navigation to next chapter failed');
            }
        }
        
        await takeScreenshot(page, 'chapter-navigation');
    });
    
    // Test 4: Responsive design breakpoints
    await test('Responsive design breakpoints', async () => {
        const breakpoints = [
            { name: 'mobile', width: 375, height: 667 },
            { name: 'tablet', width: 768, height: 1024 },
            { name: 'desktop', width: 1920, height: 1080 }
        ];
        
        for (const bp of breakpoints) {
            await page.setViewportSize({ width: bp.width, height: bp.height });
            await page.goto(`${BASE_URL}/index.html`);
            await page.waitForLoadState('networkidle');
            
            // Check no horizontal scroll
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            if (bodyWidth > bp.width) {
                throw new Error(`Horizontal scroll at ${bp.name} breakpoint`);
            }
            
            await takeScreenshot(page, `responsive-${bp.name}`);
        }
    });
    
    // Test 5: All internal links work
    await test('All internal links are valid', async () => {
        await page.goto(`${BASE_URL}/index.html`);
        
        const links = await page.locator('a[href^="primer-"], a[href^="claude-"]').all();
        const brokenLinks = [];
        
        for (const link of links) {
            const href = await link.getAttribute('href');
            const response = await page.request.get(`${BASE_URL}/${href}`);
            
            if (!response.ok()) {
                brokenLinks.push(href);
            }
        }
        
        if (brokenLinks.length > 0) {
            throw new Error(`Broken links: ${brokenLinks.join(', ')}`);
        }
    });
    
    // Test 6: Accessibility - Alt texts
    await test('Images have alt text', async () => {
        await page.goto(`${BASE_URL}/index.html`);
        
        const imagesWithoutAlt = await page.locator('img:not([alt])').count();
        if (imagesWithoutAlt > 0) {
            throw new Error(`${imagesWithoutAlt} images missing alt text`);
        }
    });
    
    // Test 7: Performance - Page load time
    await test('Page loads within 3 seconds', async () => {
        const startTime = Date.now();
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        
        if (loadTime > 3000) {
            throw new Error(`Page took ${loadTime}ms to load (limit: 3000ms)`);
        }
    });
    
    // Test 8: Typography and readability
    await test('Typography is readable', async () => {
        await page.goto(`${BASE_URL}/primer-chapter-01-origins-v2.html`);
        
        const fontSize = await page.evaluate(() => {
            const body = document.body;
            return window.getComputedStyle(body).fontSize;
        });
        
        const fontSizeNum = parseInt(fontSize);
        if (fontSizeNum < 16) {
            throw new Error(`Font size too small: ${fontSize}`);
        }
        
        const lineHeight = await page.evaluate(() => {
            const body = document.body;
            return window.getComputedStyle(body).lineHeight;
        });
        
        await takeScreenshot(page, 'typography-check');
    });
    
    // Test 9: Complete book loads
    await test('Complete book file loads', async () => {
        await page.goto(`${BASE_URL}/claude-code-primer-v2-complete.html`);
        await page.waitForLoadState('networkidle');
        
        const hasContent = await page.locator('.book-cover').count() > 0;
        if (!hasContent) {
            throw new Error('Complete book missing content');
        }
        
        await takeScreenshot(page, 'complete-book');
    });
    
    // Test 10: Print styles work
    await test('Print styles are applied', async () => {
        await page.goto(`${BASE_URL}/index.html`);
        
        // Emulate print media
        await page.emulateMedia({ media: 'print' });
        await takeScreenshot(page, 'print-preview');
        
        // Reset to screen
        await page.emulateMedia({ media: 'screen' });
    });
    
    await browser.close();
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`✅ Passed: ${results.passed.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log(`📸 Screenshots: ${results.screenshots.length}`);
    
    if (results.failed.length > 0) {
        console.log('\nFailed tests:');
        results.failed.forEach(({ name, error }) => {
            console.log(`  - ${name}: ${error}`);
        });
        process.exit(1);
    }
    
    console.log('\n✨ All tests passed!');
    
    // Generate report
    const report = {
        timestamp: new Date().toISOString(),
        url: BASE_URL,
        passed: results.passed.length,
        failed: results.failed.length,
        screenshots: results.screenshots,
        details: {
            passed: results.passed,
            failed: results.failed
        }
    };
    
    fs.writeFileSync('playwright-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Report saved to playwright-test-report.json');
}

// Run tests
runTests().catch(error => {
    console.error('Test suite error:', error);
    process.exit(1);
});