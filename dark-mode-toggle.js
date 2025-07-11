/**
 * Dark Mode Toggle System for Claude Code Primer
 * Professional implementation with proper accessibility and persistence
 */

class DarkModeToggle {
    constructor() {
        this.currentTheme = 'light';
        this.toggleButton = null;
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        this.init();
    }
    
    init() {
        // Load saved theme or use system preference
        this.loadTheme();
        
        // Create toggle button
        this.createToggleButton();
        
        // Listen for system preference changes
        this.prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('claude-code-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Apply theme immediately to prevent flash
        this.applyTheme();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('claude-code-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Use system preference
            this.currentTheme = this.prefersDarkScheme.matches ? 'dark' : 'light';
        }
    }
    
    createToggleButton() {
        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'theme-toggle brand-button brand-button-secondary';
        this.toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        this.toggleButton.setAttribute('role', 'switch');
        this.toggleButton.setAttribute('aria-checked', this.currentTheme === 'dark');
        
        // Add icon and text
        this.updateToggleButton();
        
        // Add event listener
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Add keyboard support
        this.toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Insert button into page
        this.insertToggleButton();
    }
    
    updateToggleButton() {
        const isDark = this.currentTheme === 'dark';
        const icon = isDark ? '☀️' : '🌙';
        const text = isDark ? 'Light Mode' : 'Dark Mode';
        
        this.toggleButton.innerHTML = `
            <span class="theme-icon" aria-hidden="true">${icon}</span>
            <span class="theme-text">${text}</span>
        `;
        
        this.toggleButton.setAttribute('aria-checked', isDark);
    }
    
    insertToggleButton() {
        // Try to insert in navigation area first
        const nav = document.querySelector('.chapter-nav');
        if (nav) {
            const navHome = nav.querySelector('.nav-home');
            if (navHome) {
                navHome.appendChild(this.toggleButton);
                return;
            }
        }
        
        // Fallback: insert in hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                const toggleContainer = document.createElement('div');
                toggleContainer.className = 'theme-toggle-container';
                toggleContainer.appendChild(this.toggleButton);
                heroContent.appendChild(toggleContainer);
                return;
            }
        }
        
        // Final fallback: insert at top of body
        document.body.insertBefore(this.toggleButton, document.body.firstChild);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme();
        this.updateToggleButton();
        
        // Save preference
        localStorage.setItem('claude-code-theme', theme);
        
        // Announce change to screen readers
        this.announceThemeChange();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Also set class for backwards compatibility
        document.documentElement.classList.toggle('dark-theme', this.currentTheme === 'dark');
        
        // Update meta theme-color for mobile browsers
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }
        
        themeColorMeta.content = this.currentTheme === 'dark' ? '#1a1a1a' : '#0066cc';
    }
    
    announceThemeChange() {
        // Create or use existing announcement element
        let announcement = document.getElementById('theme-announcement');
        if (!announcement) {
            announcement = document.createElement('div');
            announcement.id = 'theme-announcement';
            announcement.className = 'sr-only';
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcement);
        }
        
        const themeName = this.currentTheme === 'dark' ? 'Dark' : 'Light';
        announcement.textContent = `${themeName} mode activated`;
        
        // Clear announcement after delay
        setTimeout(() => {
            announcement.textContent = '';
        }, 1000);
    }
}

// Styles for the dark mode toggle
const toggleStyles = `
    .theme-toggle {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2);
        margin: var(--spacing-2);
        font-size: var(--font-size-sm);
        min-width: 120px;
        justify-content: center;
    }
    
    .theme-toggle:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .theme-icon {
        font-size: 1.2em;
        transition: transform var(--transition-fast);
    }
    
    .theme-toggle:hover .theme-icon {
        transform: scale(1.1);
    }
    
    .theme-text {
        font-weight: 500;
    }
    
    .theme-toggle-container {
        display: flex;
        justify-content: center;
        margin-top: var(--spacing-4);
    }
    
    /* Screen reader only class */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .theme-toggle {
            min-width: 100px;
            font-size: var(--font-size-xs);
        }
        
        .theme-toggle-container {
            margin-top: var(--spacing-2);
        }
    }
    
    /* High contrast mode adjustments */
    @media (prefers-contrast: high) {
        .theme-toggle {
            border: 2px solid var(--text-primary);
        }
        
        .theme-toggle:focus {
            outline: 3px solid var(--primary-color);
            outline-offset: 3px;
        }
    }
`;

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add toggle styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = toggleStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize toggle
    new DarkModeToggle();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}