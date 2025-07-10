const { test, expect } = require('@playwright/test');

test.describe('Claude Code Primer Deployment Tests', () => {
  const baseUrls = [
    'https://claude-code-primer.pages.dev'
    // 'https://claude-code-primer.franzai.com' // Will be added once DNS propagates
  ];

  baseUrls.forEach(baseUrl => {
    test.describe(`Testing ${baseUrl}`, () => {
      test('should load homepage successfully', async ({ page }) => {
        await page.goto(baseUrl);
        await expect(page).toHaveTitle(/Claude Code Primer/);
        
        // Check main heading
        const heading = await page.locator('h1').first();
        await expect(heading).toBeVisible();
        
        // Take screenshot
        await page.screenshot({ 
          path: `screenshots/deployment-${baseUrl.replace(/https?:\/\//, '').replace(/\//g, '-')}-homepage.png`,
          fullPage: true 
        });
      });

      test('should have working navigation', async ({ page }) => {
        await page.goto(baseUrl);
        
        // Check navigation menu exists
        const nav = await page.locator('nav, .navigation, .nav-menu').first();
        await expect(nav).toBeVisible();
        
        // Check chapter links
        const chapterLinks = await page.locator('a[href*="chapter"]');
        expect(await chapterLinks.count()).toBeGreaterThan(0);
      });

      test('should be responsive', async ({ page }) => {
        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(baseUrl);
        await page.screenshot({ 
          path: `screenshots/deployment-${baseUrl.replace(/https?:\/\//, '').replace(/\//g, '-')}-mobile.png` 
        });
        
        // Test tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto(baseUrl);
        await page.screenshot({ 
          path: `screenshots/deployment-${baseUrl.replace(/https?:\/\//, '').replace(/\//g, '-')}-tablet.png` 
        });
        
        // Test desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto(baseUrl);
        await page.screenshot({ 
          path: `screenshots/deployment-${baseUrl.replace(/https?:\/\//, '').replace(/\//g, '-')}-desktop.png` 
        });
      });

      test('should have proper SSL certificate', async ({ page }) => {
        const response = await page.goto(baseUrl);
        expect(response.status()).toBe(200);
        expect(response.url()).toMatch(/^https:/);
      });

      test('should load quickly', async ({ page }) => {
        const startTime = Date.now();
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        const loadTime = Date.now() - startTime;
        
        // Should load in under 3 seconds
        expect(loadTime).toBeLessThan(3000);
      });

      test('should navigate to chapter pages', async ({ page }) => {
        await page.goto(baseUrl);
        
        // Click on Chapter 1 link
        const chapter1Link = await page.locator('a[href*="chapter-01"]').first();
        if (await chapter1Link.count() > 0) {
          await chapter1Link.click();
          await page.waitForLoadState('domcontentloaded');
          
          // Verify we're on chapter page
          const chapterHeading = await page.locator('h1, h2').first();
          await expect(chapterHeading).toContainText(/Chapter|Origins/i);
          
          await page.screenshot({ 
            path: `screenshots/deployment-${baseUrl.replace(/https?:\/\//, '').replace(/\//g, '-')}-chapter1.png` 
          });
        }
      });
    });
  });

  test('generate deployment report', async ({ page }) => {
    const report = {
      timestamp: new Date().toISOString(),
      deploymentUrls: baseUrls,
      status: 'tested',
      tests: [
        'Homepage loading',
        'Navigation functionality',
        'Responsive design',
        'SSL certificate',
        'Performance',
        'Chapter navigation'
      ]
    };
    
    // Save report
    const fs = require('fs');
    fs.writeFileSync(
      'playwright-deployment-report.json', 
      JSON.stringify(report, null, 2)
    );
  });
});