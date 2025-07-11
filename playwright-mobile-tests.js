#!/usr/bin/env node

const { test, expect, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Mobile devices to test
const mobileDevices = [
    { name: 'iPhone SE', device: devices['iPhone SE'] },
    { name: 'iPhone 12', device: devices['iPhone 12'] },
    { name: 'iPhone 14 Pro Max', device: devices['iPhone 14 Pro Max'] },
    { name: 'Pixel 5', device: devices['Pixel 5'] },
    { name: 'Galaxy S9+', device: devices['Galaxy S9+'] },
    { name: 'iPad Mini', device: devices['iPad Mini'] },
    { name: 'iPad Pro 11', device: devices['iPad Pro 11'] }
];

// Chapter files to test
const chapters = [
    { file: 'index.html', title: 'Claude Code Primer' },
    { file: 'primer-chapter-01-origins-v2.html', title: 'Chapter 1' },
    { file: 'primer-chapter-02-transformer-v2-cited.html', title: 'Chapter 2' },
    { file: 'primer-chapter-03-constitutional-v2-cited.html', title: 'Chapter 3' },
    { file: 'primer-chapter-04-building-v2.html', title: 'Chapter 4' },
    { file: 'primer-chapter-05-api-to-code-v2.html', title: 'Chapter 5' },
    { file: 'primer-chapter-06-mcp-v2.html', title: 'Chapter 6' },
    { file: 'primer-chapter-07-revolution-v2.html', title: 'Chapter 7' },
    { file: 'primer-chapter-08-cli-v2.html', title: 'Chapter 8' },
    { file: 'primer-chapter-09-security-v2.html', title: 'Chapter 9' },
    { file: 'primer-chapter-10-github-v2.html', title: 'Chapter 10' },
    { file: 'primer-chapter-11-cases-v2.html', title: 'Chapter 11' },
    { file: 'primer-chapter-12-ethics-v2.html', title: 'Chapter 12' }
];

// Create screenshots directory
const screenshotDir = path.join(__dirname, 'mobile-screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

// Test configuration
test.describe.configure({ mode: 'parallel' });

// Run tests for each device
mobileDevices.forEach(({ name, device }) => {
    test.describe(`Mobile Tests - ${name}`, () => {
        test.use({ ...device });
        
        test.beforeEach(async ({ page }) => {
            // Set up page error handling
            page.on('pageerror', error => {
                console.error(`Page error on ${name}:`, error);
            });
        });
        
        // Test homepage
        test(`Homepage renders correctly on ${name}`, async ({ page }) => {
            await page.goto('http://localhost:8000/index.html');
            
            // Wait for content to load
            await page.waitForSelector('.hero h1');
            
            // Check viewport meta tag
            const viewport = await page.$('meta[name="viewport"]');
            expect(viewport).toBeTruthy();
            
            // Check that no horizontal scroll exists
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const viewportWidth = await page.evaluate(() => window.innerWidth);
            expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
            
            // Test touch interactions
            const firstChapter = await page.$('.chapter-card');
            if (firstChapter) {
                await firstChapter.tap();
                await page.waitForTimeout(300);
            }
            
            // Take screenshot
            await page.screenshot({ 
                path: path.join(screenshotDir, `${name.replace(/\s+/g, '-')}-homepage.png`),
                fullPage: true 
            });
        });
        
        // Test navigation
        test(`Navigation works on ${name}`, async ({ page }) => {
            await page.goto('http://localhost:8000/primer-chapter-01-origins-v2.html');
            
            // Check navigation elements
            const navPrev = await page.$('.nav-prev');
            const navNext = await page.$('.nav-next');
            const navHome = await page.$('.nav-home');
            
            // Test touch targets are large enough (44x44 minimum)
            if (navNext) {
                const nextBox = await navNext.boundingBox();
                expect(nextBox.height).toBeGreaterThanOrEqual(44);
                expect(nextBox.width).toBeGreaterThanOrEqual(44);
            }
            
            // Test navigation tap
            if (navHome) {
                await navHome.tap();
                await page.waitForURL('**/index.html');
            }
        });
        
        // Test readability
        test(`Text is readable on ${name}`, async ({ page }) => {
            await page.goto('http://localhost:8000/primer-chapter-01-origins-v2.html');
            
            // Check font size
            const fontSize = await page.evaluate(() => {
                const p = document.querySelector('.chapter-content p');
                return p ? window.getComputedStyle(p).fontSize : null;
            });
            
            // Mobile font size should be at least 16px
            if (fontSize) {
                const size = parseFloat(fontSize);
                expect(size).toBeGreaterThanOrEqual(16);
            }
            
            // Check line height for readability
            const lineHeight = await page.evaluate(() => {
                const p = document.querySelector('.chapter-content p');
                return p ? window.getComputedStyle(p).lineHeight : null;
            });
            
            if (lineHeight && fontSize) {
                const lh = parseFloat(lineHeight);
                const fs = parseFloat(fontSize);
                const ratio = lh / fs;
                expect(ratio).toBeGreaterThanOrEqual(1.5); // Good readability
            }
        });
        
        // Test code blocks
        test(`Code blocks are scrollable on ${name}`, async ({ page }) => {
            await page.goto('http://localhost:8000/primer-chapter-04-building-v2.html');
            
            const codeBlock = await page.$('.chapter-content pre');
            if (codeBlock) {
                const overflow = await page.evaluate(el => {
                    return window.getComputedStyle(el).overflowX;
                }, codeBlock);
                
                expect(['auto', 'scroll']).toContain(overflow);
            }
        });
        
        // Test performance
        test(`Page loads quickly on ${name}`, async ({ page }) => {
            const startTime = Date.now();
            await page.goto('http://localhost:8000/index.html', { waitUntil: 'domcontentloaded' });
            const loadTime = Date.now() - startTime;
            
            // Should load in under 3 seconds on mobile
            expect(loadTime).toBeLessThan(3000);
        });
        
        // Test offline capabilities
        test(`Service worker caches content on ${name}`, async ({ page, context }) => {
            await page.goto('http://localhost:8000/index.html');
            
            // Wait for service worker
            await page.waitForTimeout(1000);
            
            // Go offline
            await context.setOffline(true);
            
            // Try to navigate
            await page.goto('http://localhost:8000/primer-chapter-01-origins-v2.html');
            
            // Should still show content (from cache)
            const title = await page.title();
            expect(title).toBeTruthy();
            
            await context.setOffline(false);
        });
    });
});

// Accessibility tests for mobile
test.describe('Mobile Accessibility', () => {
    test.use({ ...devices['iPhone 12'] });
    
    test('Touch targets meet WCAG standards', async ({ page }) => {
        await page.goto('http://localhost:8000/index.html');
        
        // Check all interactive elements
        const interactiveElements = await page.$$('a, button, input, select, textarea');
        
        for (const element of interactiveElements) {
            const box = await element.boundingBox();
            if (box) {
                // WCAG recommends minimum 44x44 pixels for touch targets
                expect(box.width).toBeGreaterThanOrEqual(44);
                expect(box.height).toBeGreaterThanOrEqual(44);
            }
        }
    });
    
    test('Text has sufficient contrast', async ({ page }) => {
        await page.goto('http://localhost:8000/index.html');
        
        // Check text contrast
        const textContrast = await page.evaluate(() => {
            const getContrast = (rgb1, rgb2) => {
                const getLuminance = (r, g, b) => {
                    const [rs, gs, bs] = [r, g, b].map(c => {
                        c = c / 255;
                        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                    });
                    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
                };
                
                const l1 = getLuminance(...rgb1);
                const l2 = getLuminance(...rgb2);
                return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            };
            
            const p = document.querySelector('p');
            if (!p) return null;
            
            const styles = window.getComputedStyle(p);
            const color = styles.color.match(/\d+/g).map(Number);
            const bgColor = styles.backgroundColor.match(/\d+/g).map(Number);
            
            return getContrast(color, bgColor);
        });
        
        // WCAG AA requires 4.5:1 for normal text
        if (textContrast) {
            expect(textContrast).toBeGreaterThanOrEqual(4.5);
        }
    });
});

// Orientation tests
test.describe('Orientation Changes', () => {
    test.use({ ...devices['iPad Mini'] });
    
    test('Content adapts to landscape orientation', async ({ page }) => {
        await page.goto('http://localhost:8000/index.html');
        
        // Switch to landscape
        await page.setViewportSize({ width: 1024, height: 768 });
        
        // Check no horizontal scroll
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(1024);
        
        // Take landscape screenshot
        await page.screenshot({ 
            path: path.join(screenshotDir, 'ipad-landscape.png'),
            fullPage: false 
        });
    });
});

// Generate test report
test.afterAll(async () => {
    const report = {
        timestamp: new Date().toISOString(),
        devices: mobileDevices.map(d => d.name),
        chapters: chapters.length,
        screenshotDir: screenshotDir,
        tests: [
            'Viewport rendering',
            'No horizontal scroll',
            'Touch interactions',
            'Navigation functionality',
            'Text readability',
            'Code block scrolling',
            'Performance (< 3s load)',
            'Offline capabilities',
            'WCAG touch targets',
            'Text contrast',
            'Orientation changes'
        ]
    };
    
    fs.writeFileSync(
        path.join(__dirname, 'mobile-test-report.json'),
        JSON.stringify(report, null, 2)
    );
    
    console.log('✅ Mobile tests completed!');
    console.log(`📸 Screenshots saved to: ${screenshotDir}`);
    console.log(`📊 Report saved to: mobile-test-report.json`);
});