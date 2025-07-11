#!/usr/bin/env node

const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

// Create screenshots directory
const screenshotDir = path.join(__dirname, 'mobile-screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

// Mobile devices to test
const mobileDevices = [
    { name: 'iPhone-SE', device: devices['iPhone SE'] },
    { name: 'iPhone-12', device: devices['iPhone 12'] },
    { name: 'Pixel-5', device: devices['Pixel 5'] },
    { name: 'iPad-Mini', device: devices['iPad Mini'] }
];

// Test results
const testResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    passed: 0,
    failed: 0
};

async function runMobileTests() {
    console.log('🚀 Starting Mobile Tests...\n');
    
    const browser = await chromium.launch({ headless: true });
    
    for (const { name, device } of mobileDevices) {
        console.log(`📱 Testing on ${name}...`);
        
        const context = await browser.newContext({
            ...device,
            locale: 'en-US',
            timezoneId: 'America/New_York'
        });
        
        const page = await context.newPage();
        
        try {
            // Test 1: Homepage loads correctly
            await page.goto('http://localhost:8000/index.html');
            await page.waitForSelector('.hero h1', { timeout: 5000 });
            
            // Test 2: No horizontal scroll
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.body.scrollWidth > window.innerWidth;
            });
            
            if (hasHorizontalScroll) {
                throw new Error('Horizontal scroll detected!');
            }
            
            // Test 3: Touch targets are large enough
            const touchTargetsSizes = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a'));
                return links.map(link => {
                    const rect = link.getBoundingClientRect();
                    return {
                        width: rect.width,
                        height: rect.height,
                        text: link.textContent.trim().substring(0, 30)
                    };
                });
            });
            
            const smallTargets = touchTargetsSizes.filter(t => t.width < 44 || t.height < 44);
            if (smallTargets.length > 0) {
                console.warn(`  ⚠ Small touch targets found:`, smallTargets.length);
            }
            
            // Test 4: Font size is readable
            const fontSize = await page.evaluate(() => {
                const p = document.querySelector('p');
                return p ? parseFloat(window.getComputedStyle(p).fontSize) : 0;
            });
            
            if (fontSize < 16) {
                throw new Error(`Font size too small: ${fontSize}px`);
            }
            
            // Test 5: Navigation works
            const navLink = await page.$('.chapter-card');
            if (navLink) {
                await navLink.click();
                await page.waitForTimeout(500);
                const url = page.url();
                if (!url.includes('chapter')) {
                    throw new Error('Navigation failed');
                }
                
                // Go back to homepage
                await page.goto('http://localhost:8000/index.html');
            }
            
            // Take screenshots
            await page.screenshot({ 
                path: path.join(screenshotDir, `${name}-homepage.png`),
                fullPage: true 
            });
            
            // Test a chapter page
            await page.goto('http://localhost:8000/primer-chapter-01-origins-v2.html');
            await page.waitForSelector('.chapter-content', { timeout: 5000 });
            
            await page.screenshot({ 
                path: path.join(screenshotDir, `${name}-chapter.png`),
                fullPage: false 
            });
            
            console.log(`  ✅ All tests passed for ${name}`);
            testResults.passed++;
            testResults.tests.push({
                device: name,
                status: 'passed',
                screenshots: [
                    `${name}-homepage.png`,
                    `${name}-chapter.png`
                ]
            });
            
        } catch (error) {
            console.error(`  ❌ Test failed for ${name}: ${error.message}`);
            testResults.failed++;
            testResults.tests.push({
                device: name,
                status: 'failed',
                error: error.message
            });
        }
        
        await context.close();
    }
    
    await browser.close();
    
    // Save test results
    fs.writeFileSync(
        path.join(__dirname, 'mobile-test-results.json'),
        JSON.stringify(testResults, null, 2)
    );
    
    console.log('\n📊 Test Summary:');
    console.log(`  ✅ Passed: ${testResults.passed}`);
    console.log(`  ❌ Failed: ${testResults.failed}`);
    console.log(`  📸 Screenshots: ${screenshotDir}`);
    console.log(`  📄 Report: mobile-test-results.json`);
    
    return testResults.failed === 0;
}

// Run tests
runMobileTests()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });