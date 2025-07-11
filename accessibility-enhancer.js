
// Accessibility Enhancements for WCAG 2.1 AA Compliance
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addSkipLinks();
        this.enhanceFocus();
        this.addARIALabels();
        this.improveKeyboardNavigation();
        this.addScreenReaderSupport();
        this.addHighContrastMode();
        this.enhanceHeadingHierarchy();
        this.addImageAltText();
        this.improveColorContrast();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
            background: #000;
            color: #fff;
            padding: 0.5rem 1rem;
            text-decoration: none;
            z-index: 9999;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.cssText = `
                position: absolute;
                left: 6px;
                top: 7px;
                width: auto;
                height: auto;
                overflow: auto;
                background: #000;
                color: #fff;
                padding: 0.5rem 1rem;
                text-decoration: none;
                z-index: 9999;
                border-radius: 3px;
            `;
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
                background: #000;
                color: #fff;
                padding: 0.5rem 1rem;
                text-decoration: none;
                z-index: 9999;
            `;
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if it doesn't exist
        const main = document.querySelector('main') || document.querySelector('.container');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    enhanceFocus() {
        // Add visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 3px solid #0066cc;
                outline-offset: 2px;
                border-radius: 3px;
            }
            
            .skip-link:focus {
                outline: 3px solid #fff;
            }
            
            .focus-visible {
                outline: 3px solid #0066cc;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    addARIALabels() {
        // Add ARIA labels to interactive elements
        const chapterCards = document.querySelectorAll('.chapter-card');
        chapterCards.forEach((card, index) => {
            const heading = card.querySelector('h3');
            if (heading) {
                card.setAttribute('aria-label', `Chapter ${index + 1}: ${heading.textContent}`);
                card.setAttribute('role', 'link');
            }
        });
        
        // Add ARIA labels to navigation
        const navToggle = document.querySelector('.mobile-nav-toggle');
        if (navToggle) {
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Add ARIA landmarks
        const nav = document.querySelector('.mobile-nav');
        if (nav) {
            nav.setAttribute('role', 'navigation');
            nav.setAttribute('aria-label', 'Main navigation');
        }
        
        const main = document.querySelector('.container');
        if (main) {
            main.setAttribute('role', 'main');
        }
        
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.setAttribute('role', 'contentinfo');
        }
    }

    improveKeyboardNavigation() {
        // Trap focus in mobile menu when open
        const menu = document.querySelector('.mobile-nav-menu');
        const toggle = document.querySelector('.mobile-nav-toggle');
        
        if (menu && toggle) {
            toggle.addEventListener('click', () => {
                if (menu.classList.contains('open')) {
                    this.trapFocus(menu);
                } else {
                    this.releaseFocus();
                }
            });
            
            // Close menu with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.classList.contains('open')) {
                    menu.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                    this.releaseFocus();
                }
            });
        }
    }

    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
        
        firstFocusable.focus();
    }

    releaseFocus() {
        // Remove event listeners for focus trap
        const menu = document.querySelector('.mobile-nav-menu');
        if (menu) {
            menu.removeEventListener('keydown', this.trapFocus);
        }
    }

    addScreenReaderSupport() {
        // Add screen reader announcements
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
        
        // Announce page changes
        window.addEventListener('load', () => {
            const title = document.title;
            announcer.textContent = `Page loaded: ${title}`;
        });
        
        // Announce navigation changes
        const navItems = document.querySelectorAll('.mobile-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                announcer.textContent = `Navigating to ${item.textContent}`;
            });
        });
    }

    addHighContrastMode() {
        // Add high contrast mode toggle
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'High Contrast';
        toggleButton.className = 'high-contrast-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle high contrast mode');
        toggleButton.setAttribute('aria-pressed', 'false');
        
        // Style the toggle button
        toggleButton.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #333;
            color: #fff;
            border: 2px solid #fff;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            z-index: 10000;
            min-height: 44px;
            min-width: 44px;
        `;
        
        // High contrast styles
        const highContrastStyles = `
            .high-contrast-mode {
                background: #000 !important;
                color: #fff !important;
            }
            .high-contrast-mode * {
                background: #000 !important;
                color: #fff !important;
                border-color: #fff !important;
            }
            .high-contrast-mode a {
                color: #ffff00 !important;
                text-decoration: underline !important;
            }
            .high-contrast-mode a:hover,
            .high-contrast-mode a:focus {
                background: #ffff00 !important;
                color: #000 !important;
            }
            .high-contrast-mode button {
                background: #fff !important;
                color: #000 !important;
                border: 2px solid #fff !important;
            }
            .high-contrast-mode .hero {
                background: #000 !important;
                color: #fff !important;
                border-color: #fff !important;
            }
            .high-contrast-mode .chapter-card {
                background: #000 !important;
                color: #fff !important;
                border-color: #fff !important;
            }
            .high-contrast-mode .chapter-card:hover {
                background: #333 !important;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = highContrastStyles;
        document.head.appendChild(styleElement);
        
        // Toggle functionality
        toggleButton.addEventListener('click', () => {
            const isHighContrast = document.body.classList.toggle('high-contrast-mode');
            toggleButton.setAttribute('aria-pressed', isHighContrast.toString());
            
            // Save preference
            localStorage.setItem('high-contrast-mode', isHighContrast.toString());
        });
        
        // Restore saved preference
        const savedPreference = localStorage.getItem('high-contrast-mode');
        if (savedPreference === 'true') {
            document.body.classList.add('high-contrast-mode');
            toggleButton.setAttribute('aria-pressed', 'true');
        }
        
        document.body.appendChild(toggleButton);
    }

    enhanceHeadingHierarchy() {
        // Ensure proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentLevel = 0;
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.substring(1));
            
            // Add unique IDs for heading navigation
            if (!heading.id) {
                const text = heading.textContent.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                heading.id = text || `heading-${index}`;
            }
            
            // Add aria-level for screen readers
            heading.setAttribute('aria-level', level.toString());
            
            // Warn about heading hierarchy issues in console
            if (level > currentLevel + 1) {
                console.warn(`Heading hierarchy warning: ${heading.tagName} follows h${currentLevel}`);
            }
            
            currentLevel = level;
        });
    }

    addImageAltText() {
        // Add alt text to images that don't have it
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.alt) {
                // Try to get alt text from nearby text or context
                const figcaption = img.closest('figure')?.querySelector('figcaption');
                const title = img.getAttribute('title');
                const nearbyText = img.closest('p, div, section')?.textContent?.trim();
                
                if (figcaption) {
                    img.alt = figcaption.textContent.trim();
                } else if (title) {
                    img.alt = title;
                } else if (img.src.includes('icon') || img.src.includes('logo')) {
                    img.alt = 'Logo or icon';
                } else {
                    img.alt = `Image ${index + 1}`;
                    console.warn(`Image missing alt text: ${img.src}`);
                }
            }
            
            // Ensure decorative images are marked
            if (img.alt === '' || img.getAttribute('role') === 'presentation') {
                img.setAttribute('aria-hidden', 'true');
            }
        });
    }

    improveColorContrast() {
        // Check and improve color contrast ratios
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced contrast for better accessibility */
            body {
                color: #1a1a1a;
                background-color: #ffffff;
            }
            
            a {
                color: #0066cc;
            }
            
            a:hover, a:focus {
                color: #004499;
            }
            
            .subtitle {
                color: #333333;
            }
            
            .chapter-card {
                color: #1a1a1a;
                background-color: #f8f9fa;
            }
            
            .chapter-card p {
                color: #333333;
            }
            
            .citations-count {
                background-color: #495057;
                color: #ffffff;
            }
            
            .stat-label {
                color: #333333;
            }
            
            /* Ensure minimum 4.5:1 contrast ratio for normal text */
            /* and 3:1 for large text (18pt+ or 14pt+ bold) */
            .hero .subtitle {
                color: #333333;
            }
            
            .footer a {
                color: #cccccc;
            }
            
            .footer a:hover {
                color: #ffffff;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize accessibility enhancements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AccessibilityEnhancer());
} else {
    new AccessibilityEnhancer();
}
