
// Mobile Navigation Enhancement
class MobileNavigation {
    constructor() {
        this.init();
        this.createProgressIndicator();
        this.addCollapsibleSections();
        this.enhanceTouchTargets();
    }

    init() {
        // Create mobile navigation if it doesn't exist
        if (!document.querySelector('.mobile-nav')) {
            this.createMobileNav();
        }
        
        // Add swipe navigation
        this.addSwipeNavigation();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }

    createMobileNav() {
        const nav = document.createElement('nav');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
            <button class="mobile-nav-toggle" aria-label="Toggle navigation">
                ☰
            </button>
            <div class="mobile-nav-menu" id="mobile-menu">
                <a href="index.html" class="mobile-nav-item">📚 Home</a>
                <a href="primer-chapter-01-origins-v2.html" class="mobile-nav-item">Ch 1: Origins</a>
                <a href="primer-chapter-02-transformer-v2-cited.html" class="mobile-nav-item">Ch 2: Transformers</a>
                <a href="primer-chapter-03-constitutional-v2-cited.html" class="mobile-nav-item">Ch 3: Constitutional AI</a>
                <a href="primer-chapter-04-building-v2.html" class="mobile-nav-item">Ch 4: Building Claude</a>
                <a href="primer-chapter-05-api-to-code-v2.html" class="mobile-nav-item">Ch 5: API to Code</a>
                <a href="primer-chapter-06-mcp-v2.html" class="mobile-nav-item">Ch 6: MCP</a>
                <a href="primer-chapter-07-revolution-v2.html" class="mobile-nav-item">Ch 7: Revolution</a>
                <a href="primer-chapter-08-cli-v2.html" class="mobile-nav-item">Ch 8: CLI</a>
                <a href="primer-chapter-09-security-v2.html" class="mobile-nav-item">Ch 9: Security</a>
                <a href="primer-chapter-10-github-v2.html" class="mobile-nav-item">Ch 10: GitHub</a>
                <a href="primer-chapter-11-cases-v2.html" class="mobile-nav-item">Ch 11: Case Studies</a>
                <a href="primer-chapter-12-ethics-v2.html" class="mobile-nav-item">Ch 12: Ethics</a>
            </div>
        `;
        
        document.body.insertBefore(nav, document.body.firstChild);
        
        // Add body padding for fixed nav
        document.body.style.paddingTop = '60px';
        
        // Toggle functionality
        const toggle = nav.querySelector('.mobile-nav-toggle');
        const menu = nav.querySelector('.mobile-nav-menu');
        
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    createProgressIndicator() {
        const progress = document.createElement('div');
        progress.className = 'reading-progress';
        document.body.appendChild(progress);
        
        window.addEventListener('scroll', () => {
            const winScroll = window.pageYOffset;
            const height = document.body.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progress.style.width = Math.min(scrolled, 100) + '%';
        });
    }

    addCollapsibleSections() {
        // Make long sections collapsible on mobile
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, index) => {
            if (section.children.length > 3 && window.innerWidth < 768) {
                const header = section.querySelector('h2');
                if (header) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'collapsible';
                    
                    const headerBtn = document.createElement('button');
                    headerBtn.className = 'collapsible-header';
                    headerBtn.innerHTML = `
                        ${header.textContent}
                        <span class="collapsible-arrow">▼</span>
                    `;
                    
                    const content = document.createElement('div');
                    content.className = 'collapsible-content';
                    
                    // Move all content except header to collapsible content
                    const children = Array.from(section.children).slice(1);
                    children.forEach(child => content.appendChild(child));
                    
                    wrapper.appendChild(headerBtn);
                    wrapper.appendChild(content);
                    
                    section.appendChild(wrapper);
                    header.remove();
                    
                    // Toggle functionality
                    headerBtn.addEventListener('click', () => {
                        content.classList.toggle('open');
                        headerBtn.querySelector('.collapsible-arrow').classList.toggle('open');
                    });
                }
            }
        });
    }

    enhanceTouchTargets() {
        // Ensure all interactive elements meet 44px minimum
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.height < 44 || rect.width < 44) {
                element.style.minHeight = '44px';
                element.style.minWidth = '44px';
                element.style.display = 'inline-flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
                element.style.padding = '0.5rem';
            }
        });
    }

    addSwipeNavigation() {
        let startX = null;
        let startY = null;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next chapter
                    this.navigateToNext();
                } else {
                    // Swipe right - previous chapter
                    this.navigateToPrevious();
                }
            }
            
            startX = null;
            startY = null;
        });
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.navigateToPrevious();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.navigateToNext();
                        break;
                }
            }
        });
    }

    getCurrentChapterNumber() {
        const path = window.location.pathname;
        const match = path.match(/chapter-(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    navigateToNext() {
        const current = this.getCurrentChapterNumber();
        if (current > 0 && current < 12) {
            const next = current + 1;
            const nextChapter = this.getChapterFilename(next);
            if (nextChapter) {
                window.location.href = nextChapter;
            }
        }
    }

    navigateToPrevious() {
        const current = this.getCurrentChapterNumber();
        if (current > 1) {
            const prev = current - 1;
            const prevChapter = this.getChapterFilename(prev);
            if (prevChapter) {
                window.location.href = prevChapter;
            }
        } else if (current > 0) {
            window.location.href = 'index.html';
        }
    }

    getChapterFilename(num) {
        const chapterFiles = {
            1: 'primer-chapter-01-origins-v2.html',
            2: 'primer-chapter-02-transformer-v2-cited.html',
            3: 'primer-chapter-03-constitutional-v2-cited.html',
            4: 'primer-chapter-04-building-v2.html',
            5: 'primer-chapter-05-api-to-code-v2.html',
            6: 'primer-chapter-06-mcp-v2.html',
            7: 'primer-chapter-07-revolution-v2.html',
            8: 'primer-chapter-08-cli-v2.html',
            9: 'primer-chapter-09-security-v2.html',
            10: 'primer-chapter-10-github-v2.html',
            11: 'primer-chapter-11-cases-v2.html',
            12: 'primer-chapter-12-ethics-v2.html'
        };
        return chapterFiles[num];
    }
}

// Initialize mobile navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MobileNavigation());
} else {
    new MobileNavigation();
}
