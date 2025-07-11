/**
 * Icon System for Claude Code Primer
 * SVG-based icon library with consistent styling
 */

class IconSystem {
    constructor() {
        this.icons = {
            // Navigation icons
            'arrow-left': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            `,
            'arrow-right': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            `,
            'home': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
            `,
            
            // Theme icons
            'sun': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
            `,
            'moon': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            `,
            
            // Action icons
            'download': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            `,
            'share': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
            `,
            'copy': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            `,
            'external-link': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
            `,
            
            // Content icons
            'book': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
            `,
            'bookmark': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
            `,
            'file-text': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                </svg>
            `,
            
            // Social icons
            'twitter': `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
            `,
            'linkedin': `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
            `,
            'github': `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
            `,
            
            // Status icons
            'check': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                </svg>
            `,
            'x': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            `,
            'info': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
            `,
            'alert': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            `,
            
            // Claude-specific icons
            'claude': `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
            `,
            'code': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="16,18 22,12 16,6"/>
                    <polyline points="8,6 2,12 8,18"/>
                </svg>
            `,
            'terminal': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="4,17 10,11 4,5"/>
                    <line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
            `
        };
        
        this.init();
    }
    
    init() {
        // Add icon styles to document
        this.addIconStyles();
        
        // Process existing icons on page
        this.processExistingIcons();
    }
    
    addIconStyles() {
        const iconStyles = `
            .icon {
                display: inline-block;
                width: 1em;
                height: 1em;
                vertical-align: middle;
                flex-shrink: 0;
                color: inherit;
                transition: all var(--transition-fast);
            }
            
            .icon svg {
                width: 100%;
                height: 100%;
                display: block;
            }
            
            /* Icon sizes */
            .icon-xs { width: 0.75em; height: 0.75em; }
            .icon-sm { width: 1em; height: 1em; }
            .icon-md { width: 1.25em; height: 1.25em; }
            .icon-lg { width: 1.5em; height: 1.5em; }
            .icon-xl { width: 2em; height: 2em; }
            .icon-2xl { width: 3em; height: 3em; }
            
            /* Icon colors */
            .icon-primary { color: var(--primary-color); }
            .icon-secondary { color: var(--text-secondary); }
            .icon-success { color: var(--accent-success); }
            .icon-warning { color: var(--accent-warning); }
            .icon-error { color: var(--accent-error); }
            .icon-info { color: var(--accent-info); }
            
            /* Icon animations */
            .icon-spin {
                animation: spin 1s linear infinite;
            }
            
            .icon-pulse {
                animation: pulse 2s infinite;
            }
            
            .icon-bounce {
                animation: bounce 1s infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0,0,0);
                }
                40%, 43% {
                    transform: translate3d(0,-8px,0);
                }
                70% {
                    transform: translate3d(0,-4px,0);
                }
                90% {
                    transform: translate3d(0,-1px,0);
                }
            }
            
            /* Button with icon */
            .btn-with-icon {
                display: inline-flex;
                align-items: center;
                gap: var(--spacing-2);
            }
            
            .btn-with-icon .icon {
                margin-right: 0;
            }
            
            /* Accessible focus states */
            .icon-button:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
            
            /* High contrast mode */
            @media (prefers-contrast: high) {
                .icon {
                    filter: contrast(1.2);
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = iconStyles;
        document.head.appendChild(styleSheet);
    }
    
    processExistingIcons() {
        // Find all elements with data-icon attribute
        const iconElements = document.querySelectorAll('[data-icon]');
        iconElements.forEach(element => {
            const iconName = element.getAttribute('data-icon');
            this.renderIcon(element, iconName);
        });
    }
    
    renderIcon(element, iconName, options = {}) {
        const iconSvg = this.icons[iconName];
        if (!iconSvg) {
            console.warn(`Icon "${iconName}" not found`);
            return;
        }
        
        // Set up element
        element.classList.add('icon');
        
        // Add size class if specified
        if (options.size) {
            element.classList.add(`icon-${options.size}`);
        }
        
        // Add color class if specified
        if (options.color) {
            element.classList.add(`icon-${options.color}`);
        }
        
        // Add animation class if specified
        if (options.animation) {
            element.classList.add(`icon-${options.animation}`);
        }
        
        // Add ARIA attributes for accessibility
        element.setAttribute('aria-hidden', 'true');
        if (options.label) {
            element.setAttribute('aria-label', options.label);
            element.setAttribute('aria-hidden', 'false');
        }
        
        // Insert SVG
        element.innerHTML = iconSvg.trim();
        
        return element;
    }
    
    createIcon(iconName, options = {}) {
        const element = document.createElement('span');
        element.setAttribute('data-icon', iconName);
        return this.renderIcon(element, iconName, options);
    }
    
    // Helper method to create icon with text
    createIconWithText(iconName, text, options = {}) {
        const container = document.createElement('span');
        container.className = 'btn-with-icon';
        
        const icon = this.createIcon(iconName, options);
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        
        container.appendChild(icon);
        container.appendChild(textSpan);
        
        return container;
    }
    
    // Method to update existing icons
    updateIcon(element, iconName, options = {}) {
        if (!element) return;
        
        element.setAttribute('data-icon', iconName);
        return this.renderIcon(element, iconName, options);
    }
    
    // Method to get all available icons
    getAvailableIcons() {
        return Object.keys(this.icons);
    }
    
    // Method to add custom icons
    addIcon(name, svg) {
        this.icons[name] = svg;
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.iconSystem = new IconSystem();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IconSystem;
}