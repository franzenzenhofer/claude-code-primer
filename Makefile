# Claude Code Primer Makefile
# Comprehensive build and test automation

.PHONY: all test test-quick test-links test-comprehensive clean serve install lint fix help

# Default target
all: test

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Run comprehensive test suite
test: test-comprehensive

# Run comprehensive tests
test-comprehensive:
	@echo "Running comprehensive test suite..."
	@node test-suite-comprehensive.js

# Run quick test report
test-quick:
	@echo "Running quick test report..."
	@node test-report.js

# Run link validation tests
test-links:
	@echo "Testing internal links..."
	@node test-suite.js

# Fix navigation links
fix: fix-links

fix-links:
	@echo "Fixing navigation links..."
	@node fix-navigation-links.js

# Clean generated files
clean:
	@echo "Cleaning generated files..."
	@rm -f *.pdf *.epub *.mobi
	@rm -rf .cache/
	@rm -f *.log
	@find . -name "*.backup" -delete
	@find . -name "*.bak" -delete
	@find . -name "*~" -delete

# Serve the primer locally
serve:
	@echo "Starting local server on http://localhost:8000"
	@python3 -m http.server 8000

# Lint HTML files
lint:
	@echo "Linting HTML files..."
	@for file in *.html; do \
		echo "Checking $$file..."; \
		tidy -q -e $$file 2>/dev/null || true; \
	done

# Watch for changes and run tests
watch:
	@echo "Watching for changes..."
	@while true; do \
		inotifywait -q -e modify,create,delete -r . --exclude 'node_modules|\.git' && \
		clear && \
		make test-quick; \
	done

# Git hooks setup
hooks:
	@echo "Setting up Git hooks..."
	@git config core.hooksPath .githooks
	@chmod +x .githooks/*
	@echo "Git hooks configured!"

# Build production version
build:
	@echo "Building production version..."
	@make clean
	@make test
	@echo "Build complete!"

# Generate documentation
docs:
	@echo "Generating documentation..."
	@echo "# Claude Code Primer Test Documentation" > TEST_DOCS.md
	@echo "" >> TEST_DOCS.md
	@echo "## Available Tests" >> TEST_DOCS.md
	@echo "" >> TEST_DOCS.md
	@echo "1. **File Structure Tests** - Validates required files and directories" >> TEST_DOCS.md
	@echo "2. **HTML Validation** - Checks HTML syntax and structure" >> TEST_DOCS.md
	@echo "3. **Link Validation** - Verifies all internal and external links" >> TEST_DOCS.md
	@echo "4. **CSS Validation** - Checks for CSS syntax errors" >> TEST_DOCS.md
	@echo "5. **JavaScript Tests** - Validates JS syntax and common issues" >> TEST_DOCS.md
	@echo "6. **Accessibility Tests** - Checks WCAG compliance basics" >> TEST_DOCS.md
	@echo "7. **Performance Tests** - File size and optimization checks" >> TEST_DOCS.md
	@echo "8. **Security Tests** - Basic security vulnerability scanning" >> TEST_DOCS.md
	@echo "9. **SEO Tests** - Search engine optimization checks" >> TEST_DOCS.md
	@echo "10. **Content Tests** - Content quality validation" >> TEST_DOCS.md
	@echo "11. **Git Tests** - Repository health checks" >> TEST_DOCS.md
	@echo "12. **Build Tests** - Dependencies and build configuration" >> TEST_DOCS.md
	@echo "" >> TEST_DOCS.md
	@echo "## Usage" >> TEST_DOCS.md
	@echo "" >> TEST_DOCS.md
	@echo "\`\`\`bash" >> TEST_DOCS.md
	@echo "make test           # Run all tests" >> TEST_DOCS.md
	@echo "make test-quick     # Quick status report" >> TEST_DOCS.md
	@echo "make test-links     # Test links only" >> TEST_DOCS.md
	@echo "make fix            # Fix common issues" >> TEST_DOCS.md
	@echo "make serve          # Start local server" >> TEST_DOCS.md
	@echo "\`\`\`" >> TEST_DOCS.md
	@echo "Documentation generated in TEST_DOCS.md"

# Help command
help:
	@echo "Claude Code Primer - Build & Test System"
	@echo ""
	@echo "Available commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make test        - Run comprehensive test suite"
	@echo "  make test-quick  - Run quick test report"
	@echo "  make test-links  - Test internal links only"
	@echo "  make fix         - Fix common issues"
	@echo "  make clean       - Remove generated files"
	@echo "  make serve       - Start local web server"
	@echo "  make lint        - Lint HTML files"
	@echo "  make watch       - Watch for changes and test"
	@echo "  make hooks       - Setup git hooks"
	@echo "  make build       - Build production version"
	@echo "  make docs        - Generate documentation"
	@echo "  make help        - Show this help message"