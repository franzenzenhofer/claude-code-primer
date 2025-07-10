const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function testMobileNavigation() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 }, // iPhone SE size
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    });
    
    const page = await context.newPage();
    
    // Create screenshots directory
    await fs.mkdir('screenshots/mobile-nav', { recursive: true });
    
    // All chapter files to test
    const chapters = [
        'index.html',
        'primer-chapter-01-origins-v2.html',
        'primer-chapter-02-transformer-v2.html',
        'primer-chapter-02-transformer-v2-cited.html',
        'primer-chapter-03-constitutional-v2.html',
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
    
    console.log('📱 Testing Mobile Navigation on All Pages\n');
    
    const issues = [];
    
    for (const chapter of chapters) {
        console.log(`\n📄 Testing: ${chapter}`);
        
        try {
            await page.goto(`http://localhost:8000/${chapter}`, { waitUntil: 'networkidle' });
            
            // Full page screenshot
            const fullPagePath = `screenshots/mobile-nav/${chapter.replace('.html', '')}-full.png`;
            await page.screenshot({ 
                path: fullPagePath,
                fullPage: true 
            });
            console.log(`  ✅ Full page screenshot: ${fullPagePath}`);
            
            // Check for top navigation
            const topNav = await page.$('.chapter-nav.top');
            if (topNav) {
                await page.evaluate(() => {
                    document.querySelector('.chapter-nav.top').scrollIntoView();
                });
                await page.waitForTimeout(500);
                
                const topNavPath = `screenshots/mobile-nav/${chapter.replace('.html', '')}-nav-top.png`;
                await topNav.screenshot({ path: topNavPath });
                console.log(`  ✅ Top navigation screenshot: ${topNavPath}`);
                
                // Check if navigation is visible
                const topNavVisible = await topNav.isVisible();
                if (!topNavVisible) {
                    issues.push(`${chapter}: Top navigation not visible`);
                }
                
                // Check navigation links
                const prevLink = await topNav.$('.nav-prev a');
                const nextLink = await topNav.$('.nav-next a');
                const homeLink = await topNav.$('.nav-home a');
                
                if (!prevLink && !nextLink && !homeLink) {
                    issues.push(`${chapter}: No navigation links found in top nav`);
                }
            } else if (chapter !== 'index.html') {
                issues.push(`${chapter}: No top navigation found`);
            }
            
            // Scroll to bottom for bottom navigation
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(1000);
            
            // Check for bottom navigation
            const bottomNav = await page.$('.chapter-nav.bottom');
            if (bottomNav) {
                const bottomNavPath = `screenshots/mobile-nav/${chapter.replace('.html', '')}-nav-bottom.png`;
                await bottomNav.screenshot({ path: bottomNavPath });
                console.log(`  ✅ Bottom navigation screenshot: ${bottomNavPath}`);
                
                // Check if navigation is visible
                const bottomNavVisible = await bottomNav.isVisible();
                if (!bottomNavVisible) {
                    issues.push(`${chapter}: Bottom navigation not visible`);
                }
            } else if (chapter !== 'index.html') {
                issues.push(`${chapter}: No bottom navigation found`);
            }
            
            // Check for horizontal scroll
            const hasHorizontalScroll = await page.evaluate(() => {
                return document.documentElement.scrollWidth > document.documentElement.clientWidth;
            });
            
            if (hasHorizontalScroll) {
                issues.push(`${chapter}: Has horizontal scroll on mobile`);
            }
            
            // Check text readability
            const bodyFontSize = await page.evaluate(() => {
                const body = document.querySelector('body');
                return window.getComputedStyle(body).fontSize;
            });
            
            if (parseInt(bodyFontSize) < 14) {
                issues.push(`${chapter}: Font size too small for mobile (${bodyFontSize})`);
            }
            
        } catch (error) {
            console.error(`  ❌ Error testing ${chapter}: ${error.message}`);
            issues.push(`${chapter}: Error - ${error.message}`);
        }
    }
    
    await browser.close();
    
    // Report results
    console.log('\n📊 Mobile Navigation Test Results:');
    console.log('================================');
    
    if (issues.length === 0) {
        console.log('✅ All pages have proper mobile navigation!');
    } else {
        console.log(`❌ Found ${issues.length} issues:\n`);
        issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    // Save report
    const report = {
        timestamp: new Date().toISOString(),
        totalPages: chapters.length,
        issues: issues,
        screenshotCount: chapters.length * 3 // full, top nav, bottom nav
    };
    
    await fs.writeFile(
        'screenshots/mobile-nav/report.json',
        JSON.stringify(report, null, 2)
    );
    
    return issues;
}

// Run the test
testMobileNavigation().catch(console.error);