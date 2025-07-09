# Claude Code Primer - Test Suite Documentation

## Overview
Comprehensive testing framework for the Claude Code Primer project, ensuring quality, accessibility, and performance.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Quick test report
npm run test:quick

# Fix common issues
npm run fix:links

# Start local server
npm run serve
```

## Test Categories

### 1. File Structure Tests
- Validates all required files exist
- Checks directory structure
- Ensures chapter files are present

### 2. HTML Validation
- DOCTYPE validation
- Meta tags verification
- Title tag checks
- Image reference validation

### 3. Link Validation
- Internal link checking
- Navigation link verification
- Anchor link validation
- External link status (sample)

### 4. CSS Validation
- Syntax error detection
- Common CSS mistakes
- Stylesheet loading verification

### 5. JavaScript Tests
- Syntax validation
- Console.log detection
- Debugger statement checks

### 6. Accessibility Tests
- Alt text for images
- Heading hierarchy
- Form labels
- ARIA attributes

### 7. Performance Tests
- File size monitoring
- Image optimization checks
- Large file warnings

### 8. Security Tests
- Inline event handler detection
- eval() usage detection
- Hardcoded credential scanning
- innerHTML usage warnings

### 9. SEO Tests
- Meta description validation
- Open Graph tags
- Canonical URL checks

### 10. Content Tests
- Lorem Ipsum detection
- TODO comment scanning
- Word count validation
- Markdown syntax in HTML

### 11. Git Repository Tests
- Repository status
- Uncommitted changes
- .gitignore validation

### 12. Build & Dependencies
- package.json validation
- Test script presence
- Lock file verification

## Using Make

```bash
make help          # Show all commands
make test          # Run comprehensive tests
make test-quick    # Quick status check
make clean         # Remove generated files
make serve         # Start local server
make watch         # Auto-test on changes
make hooks         # Setup git hooks
```

## CI/CD Integration

Place `test-ci.yml` in `.github/workflows/` for GitHub Actions:
- Runs on push, PR, and daily
- Tests multiple Node versions
- Accessibility testing with pa11y
- Performance testing with Lighthouse
- Auto-deploy to GitHub Pages

## Git Hooks

Enable pre-commit testing:
```bash
git config core.hooksPath .githooks
```

## Test Output

- ✅ Green: Tests passed
- ⚠️ Yellow: Warnings (non-critical)
- ❌ Red: Failed tests (must fix)

## Contributing

1. Run tests before committing
2. Fix all red errors
3. Address yellow warnings when possible
4. Add tests for new features

## License

CC-BY-SA 4.0