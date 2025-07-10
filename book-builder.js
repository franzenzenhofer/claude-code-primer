const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked for clean output
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

// Book configuration
const BOOK_CONFIG = {
    title: "Claude Code Primer",
    subtitle: "The Story of AI's Greatest Leap Into Software Development",
    author: "Anthropic",
    chapters: [
        { id: "01", title: "Origins", subtitle: "From Language Models to Living Code", file: "chapter-01-language-revolution.md" },
        { id: "02", title: "The Transformer Revolution", subtitle: "Attention Is Indeed All You Need", file: "chapter-02-attention-is-all.md" },
        { id: "03", title: "Constitutional AI", subtitle: "Teaching AI to Be Good", file: "chapter-05-constitutional-ai.md" },
        { id: "04", title: "Building Claude", subtitle: "From Theory to Practice", file: "chapter-06-claude-birth.md" },
        { id: "05", title: "From API to Code", subtitle: "The Evolution of Interface", file: "chapter-07-birth-claude-code.md" },
        { id: "06", title: "Model Context Protocol", subtitle: "The Universal Language", file: "chapter-10-model-context-protocol.md" },
        { id: "07", title: "Revolutionizing Development", subtitle: "The New Way We Code", file: "chapter-11-new-pair-programming.md" },
        { id: "08", title: "Command Line Interface", subtitle: "Where AI Meets Terminal", file: "chapter-08-terminal-prophets.md" },
        { id: "09", title: "Security Architecture", subtitle: "Building Trustworthy AI Systems", file: "chapter-09-understanding-codebases.md" },
        { id: "10", title: "GitHub and CI/CD Integration", subtitle: "Seamless Development Workflows", file: "chapter-10-real-world-trials.md" },
        { id: "11", title: "Real-World Case Studies", subtitle: "Success Stories and Lessons Learned", file: "chapter-12-real-world-development.md" },
        { id: "12", title: "Ethics and Responsibility", subtitle: "The Moral Imperatives of AI Development", file: "chapter-13-ethical-reckonings.md" }
    ]
};

// HTML template for chapters
const chapterTemplate = (chapter, content, prevChapter, nextChapter) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chapter ${chapter.id}: ${chapter.title} - Claude Code Primer</title>
    <link rel="stylesheet" href="book-style.css">
</head>
<body>
    <nav class="chapter-nav">
        <div class="nav-prev">
            ${prevChapter ? `<a href="chapter-${prevChapter.id}.html">← Prev</a>` : ''}
        </div>
        <div class="nav-home">
            <a href="index.html">ToC</a>
        </div>
        <div class="nav-next">
            ${nextChapter ? `<a href="chapter-${nextChapter.id}.html">Next →</a>` : ''}
        </div>
    </nav>
    
    <article class="chapter">
        <header class="chapter-header">
            <h1>Chapter ${chapter.id}: ${chapter.title}</h1>
            <p class="chapter-subtitle">${chapter.subtitle}</p>
        </header>
        
        <div class="chapter-content">
            ${content}
        </div>
    </article>
    
    <nav class="chapter-nav bottom">
        <div class="nav-prev">
            ${prevChapter ? `<a href="chapter-${prevChapter.id}.html">← Prev</a>` : ''}
        </div>
        <div class="nav-home">
            <a href="index.html">ToC</a>
        </div>
        <div class="nav-next">
            ${nextChapter ? `<a href="chapter-${nextChapter.id}.html">Next →</a>` : ''}
        </div>
    </nav>
</body>
</html>`;

// Index page template
const indexTemplate = (chapters) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${BOOK_CONFIG.title}</title>
    <link rel="stylesheet" href="book-style.css">
</head>
<body>
    <header class="book-header">
        <h1>${BOOK_CONFIG.title}</h1>
        <p class="subtitle">${BOOK_CONFIG.subtitle}</p>
    </header>
    
    <main class="book-toc">
        <h2>Table of Contents</h2>
        <ol class="chapter-list">
            ${chapters.map(ch => `
            <li>
                <a href="chapter-${ch.id}.html">
                    <span class="chapter-number">${ch.id}</span>
                    <span class="chapter-title">${ch.title}</span>
                    <span class="chapter-subtitle">${ch.subtitle}</span>
                </a>
            </li>
            `).join('')}
        </ol>
    </main>
    
    <footer class="book-footer">
        <p>© 2024 ${BOOK_CONFIG.author}. Released under Creative Commons BY-SA 4.0</p>
    </footer>
</body>
</html>`;

// Build the book
function buildBook() {
    console.log('📚 Building Claude Code Primer...\n');
    
    // Create output directory
    const outputDir = './build';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    // Process each chapter
    BOOK_CONFIG.chapters.forEach((chapter, index) => {
        const mdPath = path.join('./', chapter.file);
        
        if (!fs.existsSync(mdPath)) {
            console.log(`⚠️  Missing: ${chapter.file}`);
            return;
        }
        
        const markdown = fs.readFileSync(mdPath, 'utf8');
        const html = marked(markdown);
        
        const prevChapter = index > 0 ? BOOK_CONFIG.chapters[index - 1] : null;
        const nextChapter = index < BOOK_CONFIG.chapters.length - 1 ? BOOK_CONFIG.chapters[index + 1] : null;
        
        const fullHtml = chapterTemplate(chapter, html, prevChapter, nextChapter);
        fs.writeFileSync(path.join(outputDir, `chapter-${chapter.id}.html`), fullHtml);
        
        console.log(`✓ Built Chapter ${chapter.id}: ${chapter.title}`);
    });
    
    // Build index
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexTemplate(BOOK_CONFIG.chapters));
    console.log('✓ Built index.html');
    
    // Copy CSS
    const cssContent = fs.readFileSync('./book-style.css', 'utf8');
    fs.writeFileSync(path.join(outputDir, 'book-style.css'), cssContent);
    console.log('✓ Copied book-style.css');
    
    console.log('\n✅ Build complete! Open build/index.html to view the book.');
}

// Run the builder
if (require.main === module) {
    buildBook();
}

module.exports = { buildBook };