// Simple Mobile Navigation for Claude Code Primer
document.addEventListener('DOMContentLoaded', function() {
    // Get current chapter info
    const currentPath = window.location.pathname;
    const match = currentPath.match(/primer-chapter-(\d+)/);
    const currentChapter = match ? parseInt(match[1]) : 0;
    const totalChapters = 12;
    
    // Create sticky navigation
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.innerHTML = `
        <a href="${currentChapter > 1 ? `primer-chapter-${String(currentChapter - 1).padStart(2, '0')}-${getChapterSlug(currentChapter - 1)}.html` : 'index.html'}" 
           class="nav-arrow ${currentChapter === 0 ? 'disabled' : ''}" 
           aria-label="Previous chapter">
            ←
        </a>
        <div class="nav-title">Table of Contents</div>
        <a href="${currentChapter < totalChapters ? `primer-chapter-${String(currentChapter + 1).padStart(2, '0')}-${getChapterSlug(currentChapter + 1)}.html` : '#'}" 
           class="nav-arrow ${currentChapter >= totalChapters ? 'disabled' : ''}" 
           aria-label="Next chapter">
            →
        </a>
    `;
    
    // Insert at the beginning of body
    document.body.insertBefore(nav, document.body.firstChild);
    
    // Helper function to get chapter slugs
    function getChapterSlug(chapter) {
        const slugs = {
            1: 'origins-v2',
            2: 'transformer-v2-cited',
            3: 'constitutional-v2-cited',
            4: 'building-v2',
            5: 'api-to-code-v2',
            6: 'mcp-v2',
            7: 'revolution-v2',
            8: 'cli-v2',
            9: 'security-v2',
            10: 'github-v2',
            11: 'cases-v2',
            12: 'ethics-v2'
        };
        return slugs[chapter] || '';
    }
});