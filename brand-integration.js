/**
 * Brand Integration System for Claude Code Primer
 * Integrates all brand identity components and enhances existing pages
 */

class BrandIntegration {
    constructor() {
        this.isInitialized = false;
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Load CSS files
        this.loadCSS();
        
        // Enhance existing elements
        this.enhanceExistingElements();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Add social sharing
        this.addSocialSharing();
        
        // Enhance navigation
        this.enhanceNavigation();
        
        // Add reading progress
        this.addReadingProgress();
        
        this.isInitialized = true;
    }
    
    loadCSS() {
        const cssFiles = [
            'brand-identity.css',
            'animations-system.css',
            'visual-hierarchy.css',
            'social-media-assets.css'
        ];
        
        cssFiles.forEach(file => {
            if (!document.querySelector(`link[href="${file}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = file;
                document.head.appendChild(link);
            }
        });
    }
    
    enhanceExistingElements() {
        // Enhance headings
        this.enhanceHeadings();
        
        // Enhance cards
        this.enhanceCards();
        
        // Enhance buttons
        this.enhanceButtons();
        
        // Enhance links
        this.enhanceLinks();
        
        // Enhance lists
        this.enhanceLists();
        
        // Enhance code blocks
        this.enhanceCodeBlocks();
    }
    
    enhanceHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            // Add appropriate heading classes
            if (heading.tagName === 'H1') {
                heading.classList.add('heading-primary');
            } else if (heading.tagName === 'H2') {
                heading.classList.add('heading-secondary');
            } else if (heading.tagName === 'H3') {
                heading.classList.add('heading-tertiary');
            } else if (heading.tagName === 'H4') {
                heading.classList.add('heading-quaternary');
            }
            
            // Add scroll reveal animation
            heading.classList.add('scroll-reveal');
            
            // Add stagger delay
            heading.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    enhanceCards() {
        const cards = document.querySelectorAll('.chapter-card, .feature, .stat');
        cards.forEach(card => {
            card.classList.add('brand-card', 'hover-lift', 'scroll-reveal');
            
            // Add ripple effect to clickable cards
            if (card.tagName === 'A' || card.onclick) {
                card.classList.add('btn-ripple');
            }
        });
    }
    
    enhanceButtons() {
        const buttons = document.querySelectorAll('button, .btn, .download-btn');
        buttons.forEach(button => {
            button.classList.add('brand-button');
            
            // Determine button type based on existing classes
            if (button.classList.contains('download-btn')) {
                button.classList.add('brand-button-primary');
            } else {
                button.classList.add('brand-button-secondary');
            }
            
            // Add ripple effect
            button.classList.add('btn-ripple');
            
            // Add focus ring
            button.classList.add('brand-focus-ring');
        });
    }
    
    enhanceLinks() {
        const links = document.querySelectorAll('a:not(.chapter-card):not(.btn):not(.download-btn)');
        links.forEach(link => {
            // Add external link icon if it's an external link
            if (link.href && !link.href.includes(window.location.hostname)) {
                const icon = document.createElement('span');
                icon.setAttribute('data-icon', 'external-link');
                icon.classList.add('icon', 'icon-xs');
                link.appendChild(icon);
                
                // Process the icon
                if (window.iconSystem) {
                    window.iconSystem.renderIcon(icon, 'external-link', { size: 'xs' });
                }
            }
        });
    }
    
    enhanceLists() {
        const lists = document.querySelectorAll('ul:not(.chapter-list)');
        lists.forEach(list => {
            list.classList.add('list-enhanced');
        });
        
        const orderedLists = document.querySelectorAll('ol');
        orderedLists.forEach(list => {
            list.classList.add('list-numbered');
        });
    }
    
    enhanceCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            block.classList.add('code-enhanced');
            
            // Add language indicator if possible
            const code = block.querySelector('code');
            if (code && code.className) {
                const lang = code.className.replace('language-', '');
                block.setAttribute('data-lang', lang);
            }
        });
    }
    
    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, this.observerOptions);
        
        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }
    
    addSocialSharing() {
        const socialContainer = document.createElement('div');
        socialContainer.className = 'social-sharing';
        socialContainer.innerHTML = `
            <h3>Share this page</h3>
            <button class="social-btn social-btn-twitter" onclick="brandIntegration.shareOnTwitter()">
                <span data-icon="twitter" class="icon icon-sm"></span>
                Share on Twitter
            </button>
            <button class="social-btn social-btn-linkedin" onclick="brandIntegration.shareOnLinkedIn()">
                <span data-icon="linkedin" class="icon icon-sm"></span>
                Share on LinkedIn
            </button>
            <button class="social-btn social-btn-copy" onclick="brandIntegration.copyToClipboard()">
                <span data-icon="copy" class="icon icon-sm"></span>
                Copy Link
            </button>
        `;
        
        // Process icons
        if (window.iconSystem) {
            socialContainer.querySelectorAll('[data-icon]').forEach(icon => {
                const iconName = icon.getAttribute('data-icon');
                window.iconSystem.renderIcon(icon, iconName, { size: 'sm' });
            });
        }
        
        // Insert before footer
        const footer = document.querySelector('.footer, footer');
        if (footer) {
            footer.parentNode.insertBefore(socialContainer, footer);
        }
    }
    
    enhanceNavigation() {
        const navElements = document.querySelectorAll('.chapter-nav a');
        navElements.forEach(nav => {
            // Add icons to navigation
            if (nav.classList.contains('nav-prev')) {
                const icon = document.createElement('span');
                icon.setAttribute('data-icon', 'arrow-left');
                icon.classList.add('icon', 'icon-sm');
                nav.insertBefore(icon, nav.firstChild);
                
                if (window.iconSystem) {
                    window.iconSystem.renderIcon(icon, 'arrow-left', { size: 'sm' });
                }
            } else if (nav.classList.contains('nav-next')) {
                const icon = document.createElement('span');
                icon.setAttribute('data-icon', 'arrow-right');
                icon.classList.add('icon', 'icon-sm');
                nav.appendChild(icon);
                
                if (window.iconSystem) {
                    window.iconSystem.renderIcon(icon, 'arrow-right', { size: 'sm' });
                }
            } else if (nav.classList.contains('nav-home')) {
                const icon = document.createElement('span');
                icon.setAttribute('data-icon', 'home');
                icon.classList.add('icon', 'icon-sm');
                nav.insertBefore(icon, nav.firstChild);
                
                if (window.iconSystem) {
                    window.iconSystem.renderIcon(icon, 'home', { size: 'sm' });
                }
            }
            
            // Add hover effects
            nav.classList.add('hover-lift');
        });
    }
    
    addReadingProgress() {
        // Only add reading progress on chapter pages
        if (document.querySelector('.chapter-content')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .reading-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: var(--background-tertiary);
                    z-index: var(--z-fixed);
                }
                
                .reading-progress-bar {
                    height: 100%;
                    background: var(--gradient-primary);
                    width: 0%;
                    transition: width 0.3s ease;
                }
            `;
            document.head.appendChild(style);
            
            // Insert progress bar
            document.body.insertBefore(progressBar, document.body.firstChild);
            
            // Update progress on scroll
            let ticking = false;
            const updateProgress = () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                const progressBarElement = progressBar.querySelector('.reading-progress-bar');
                progressBarElement.style.width = Math.min(scrollPercent, 100) + '%';
                
                ticking = false;
            };
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateProgress);
                    ticking = true;
                }
            });
        }
    }
    
    // Social sharing methods
    shareOnTwitter() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        const hashtags = 'AI,ClaudeCode,Programming,Book';
        const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
    
    shareOnLinkedIn() {
        const url = encodeURIComponent(window.location.href);
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        window.open(linkedinUrl, '_blank', 'width=550,height=420');
    }
    
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            this.showNotification('Link copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Link copied to clipboard!', 'success');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius-md);
                color: white;
                z-index: var(--z-tooltip);
                box-shadow: var(--shadow-lg);
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                background: var(--accent-success);
            }
            
            .notification-info {
                background: var(--accent-info);
            }
            
            .notification-warning {
                background: var(--accent-warning);
            }
            
            .notification-error {
                background: var(--accent-error);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Method to manually trigger enhancements on dynamically added content
    enhanceElement(element) {
        if (!element) return;
        
        // Enhance based on element type
        if (element.matches('h1, h2, h3, h4, h5, h6')) {
            this.enhanceHeadings();
        } else if (element.matches('.chapter-card, .feature, .stat')) {
            this.enhanceCards();
        } else if (element.matches('button, .btn, .download-btn')) {
            this.enhanceButtons();
        }
        
        // Setup scroll animations for new elements
        if (element.classList.contains('scroll-reveal')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        entry.target.classList.add('animate-fade-in');
                    }
                });
            }, this.observerOptions);
            
            observer.observe(element);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.brandIntegration = new BrandIntegration();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandIntegration;
}