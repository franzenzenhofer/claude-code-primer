const { chromium } = require('playwright');

async function validateMobileImprovements() {
    console.log('🔍 Final Mobile Navigation Validation\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    
    const page = await context.newPage();
    
    // Test the specific page user mentioned
    const testUrl = 'http://localhost:8000/primer-chapter-02-transformer-v2-cited.html';
    
    console.log(`Testing: ${testUrl}`);
    await page.goto(testUrl, { waitUntil: 'networkidle' });
    
    // Validation checks
    const validations = {
        'Navigation exists': async () => {
            const topNav = await page.$('.chapter-nav.top');
            const bottomNav = await page.$('.chapter-nav.bottom');
            return topNav !== null && bottomNav !== null;
        },
        
        'Touch targets are adequate': async () => {
            const links = await page.$$eval('.chapter-nav a', links => 
                links.map(link => {
                    const rect = link.getBoundingClientRect();
                    return rect.height >= 44; // iOS minimum
                })
            );
            return links.every(isAdequate => isAdequate);
        },
        
        'No horizontal scroll': async () => {
            return await page.evaluate(() => {
                return document.documentElement.scrollWidth <= document.documentElement.clientWidth;
            });
        },
        
        'Navigation is visible': async () => {
            const topNavVisible = await page.isVisible('.chapter-nav.top');
            const bottomNavVisible = await page.evaluate(() => {
                const elem = document.querySelector('.chapter-nav.bottom');
                if (!elem) return false;
                const rect = elem.getBoundingClientRect();
                return rect.bottom <= window.innerHeight + window.scrollY;
            });
            return topNavVisible;
        },
        
        'Links are properly styled': async () => {
            const linkStyles = await page.$$eval('.chapter-nav a', links =>
                links.map(link => {
                    const styles = window.getComputedStyle(link);
                    return {
                        hasBorder: styles.borderBottomWidth !== '0px',
                        isReadable: parseInt(styles.fontSize) >= 14
                    };
                })
            );
            return linkStyles.every(style => style.hasBorder && style.isReadable);
        },
        
        'Visual arrows present': async () => {
            const hasArrows = await page.evaluate(() => {
                const prevLabel = document.querySelector('.nav-prev .nav-label');
                const nextLabel = document.querySelector('.nav-next .nav-label');
                if (!prevLabel || !nextLabel) return false;
                
                const prevContent = window.getComputedStyle(prevLabel, '::before').content;
                const nextContent = window.getComputedStyle(nextLabel, '::after').content;
                
                return prevContent.includes('←') && nextContent.includes('→');
            });
            return hasArrows;
        }
    };
    
    console.log('\n📋 Validation Results:');
    console.log('====================');
    
    let allPassed = true;
    
    for (const [test, validator] of Object.entries(validations)) {
        try {
            const passed = await validator();
            console.log(`${passed ? '✅' : '❌'} ${test}`);
            if (!passed) allPassed = false;
        } catch (error) {
            console.log(`❌ ${test} - Error: ${error.message}`);
            allPassed = false;
        }
    }
    
    // Take final screenshots
    await page.screenshot({ 
        path: 'screenshots/mobile-nav/final-validation-full.png',
        fullPage: true 
    });
    
    const topNav = await page.$('.chapter-nav.top');
    if (topNav) {
        await topNav.screenshot({ 
            path: 'screenshots/mobile-nav/final-validation-nav.png' 
        });
    }
    
    await browser.close();
    
    console.log('\n' + (allPassed ? '🎉 All validations passed!' : '⚠️  Some validations failed'));
    
    return allPassed;
}

validateMobileImprovements().catch(console.error);