
// Accessibility Enhancements for Mobile
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
}

// Initialize accessibility enhancements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AccessibilityEnhancer());
} else {
    new AccessibilityEnhancer();
}
