#!/usr/bin/env node

const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

// Mobile devices to validate
const testDevices = [
    { name: 'iPhone-SE-Small', device: devices['iPhone SE'] },
    { name: 'iPhone-12-Standard', device: devices['iPhone 12'] },
    { name: 'Pixel-5-Android', device: devices['Pixel 5'] },
    { name: 'iPad-Mini-Tablet', device: devices['iPad Mini'] }
];

async function validateMobile() {
    console.log('📱 Mobile-First Validation\n');
    
    const browser = await chromium.launch({ headless: true });
    const results = [];
    
    for (const { name, device } of testDevices) {
        console.log(`Testing ${name}...`);
        
        const context = await browser.newContext(device);
        const page = await context.newPage();
        
        try {
            // Test homepage
            await page.goto('http://localhost:8000/index.html');
            
            // Core mobile checks
            const mobileChecks = await page.evaluate(() => {
                const viewport = document.querySelector('meta[name="viewport"]');
                const hasViewport = viewport && viewport.content.includes('width=device-width');
                
                const bodyWidth = document.body.scrollWidth;
                const windowWidth = window.innerWidth;
                const hasHorizontalScroll = bodyWidth > windowWidth;
                
                const firstParagraph = document.querySelector('p');
                const fontSize = firstParagraph ? 
                    parseFloat(window.getComputedStyle(firstParagraph).fontSize) : 0;
                
                const links = Array.from(document.querySelectorAll('a'));
                const touchTargets = links.map(link => {
                    const rect = link.getBoundingClientRect();
                    return { width: rect.width, height: rect.height };
                });
                const smallTargets = touchTargets.filter(t => t.width < 44 || t.height < 44);
                
                return {
                    hasViewport,
                    hasHorizontalScroll,
                    bodyWidth,
                    windowWidth,
                    fontSize,
                    totalLinks: links.length,
                    smallTargets: smallTargets.length
                };
            });
            
            // Take screenshot
            const screenshotDir = 'mobile-validation';
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir);
            }
            
            await page.screenshot({ 
                path: path.join(screenshotDir, `${name}.png`),
                fullPage: false 
            });
            
            results.push({
                device: name,
                ...mobileChecks,
                status: !mobileChecks.hasHorizontalScroll && mobileChecks.fontSize >= 16 ? 'PASS' : 'FAIL'
            });
            
            console.log(`  ✓ Complete`);
            
        } catch (error) {
            console.log(`  ✗ Error: ${error.message}`);
            results.push({
                device: name,
                error: error.message,
                status: 'ERROR'
            });
        }
        
        await context.close();
    }
    
    await browser.close();
    
    // Display results
    console.log('\n📊 Mobile Validation Results:');
    console.log('================================\n');
    
    results.forEach(result => {
        console.log(`${result.device}:`);
        console.log(`  Status: ${result.status}`);
        if (!result.error) {
            console.log(`  Viewport meta: ${result.hasViewport ? '✓' : '✗'}`);
            console.log(`  No horizontal scroll: ${!result.hasHorizontalScroll ? '✓' : '✗'}`);
            console.log(`  Font size: ${result.fontSize}px ${result.fontSize >= 16 ? '✓' : '✗'}`);
            console.log(`  Touch targets: ${result.totalLinks - result.smallTargets}/${result.totalLinks} adequate`);
        }
        console.log('');
    });
    
    // Save results
    fs.writeFileSync('mobile-validation-results.json', JSON.stringify(results, null, 2));
    console.log('Full results saved to: mobile-validation-results.json');
    console.log('Screenshots saved to: mobile-validation/');
}

validateMobile().catch(console.error);