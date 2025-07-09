#!/bin/bash

echo "🎭 Setting up Playwright..."

# Install Playwright
npm install --save-dev playwright

# Install browsers
npx playwright install chromium
npx playwright install-deps

echo "✅ Playwright setup complete!"