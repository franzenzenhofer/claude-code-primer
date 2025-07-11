const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Simple Markdown to HTML converter for the book
class SimpleBookConverter {
    constructor() {
        this.bookDir = './book-final';
        this.outputDir = './';
        this.chapters = [];
        
        // Configure marked for simple output
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }

    // Get list of chapter files
    getChapterFiles() {
        const files = fs.readdirSync(this.bookDir)
            .filter(file => file.match(/^\d+\.md$/))
            .sort((a, b) => {
                const aNum = parseInt(a.split('.')[0]);
                const bNum = parseInt(b.split('.')[0]);
                return aNum - bNum;
            });
        
        return files;
    }

    // Create navigation HTML
    createNavigation(currentChapter, totalChapters) {
        const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
        const nextChapter = currentChapter < totalChapters ? currentChapter + 1 : null;
        
        let nav = '<div class="navigation">';
        
        if (prevChapter) {
            nav += `<a href="simple-chapter-${prevChapter.toString().padStart(2, '0')}.html" class="nav-link">← Chapter ${prevChapter}</a>`;
        }
        
        nav += '<a href="simple-index.html" class="nav-home">📖 Table of Contents</a>';
        
        if (nextChapter) {
            nav += `<a href="simple-chapter-${nextChapter.toString().padStart(2, '0')}.html" class="nav-link">Chapter ${nextChapter} →</a>`;
        }
        
        nav += '</div>';
        
        return nav;
    }

    // Create HTML template
    createHTMLTemplate(title, content, navigation) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Claude Code Primer</title>
    <link rel="stylesheet" href="simple-book.css">
</head>
<body>
    ${navigation}
    <main>
        ${content}
    </main>
    ${navigation}
</body>
</html>`;
    }

    // Convert single chapter
    convertChapter(filename, chapterNumber, totalChapters) {
        const filePath = path.join(this.bookDir, filename);
        const markdownContent = fs.readFileSync(filePath, 'utf8');
        
        // Convert markdown to HTML
        const htmlContent = marked(markdownContent);
        
        // Extract title from first h1
        const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : `Chapter ${chapterNumber}`;
        
        // Create navigation
        const navigation = this.createNavigation(chapterNumber, totalChapters);
        
        // Create full HTML
        const fullHTML = this.createHTMLTemplate(title, htmlContent, navigation);
        
        // Write file
        const outputFilename = `simple-chapter-${chapterNumber.toString().padStart(2, '0')}.html`;
        const outputPath = path.join(this.outputDir, outputFilename);
        fs.writeFileSync(outputPath, fullHTML);
        
        console.log(`Created: ${outputFilename}`);
        
        return {
            number: chapterNumber,
            title: title,
            filename: outputFilename
        };
    }

    // Create table of contents
    createTableOfContents(chapters) {
        let tocHTML = '<div class="chapter-title"><h1>Claude Code Primer</h1></div>';
        tocHTML += '<p style="text-align: center; font-style: italic;">A Simple Book About AI-Assisted Development</p>';
        tocHTML += '<div class="table-of-contents">';
        
        chapters.forEach(chapter => {
            tocHTML += `<a href="${chapter.filename}" class="toc-item">`;
            tocHTML += `<span class="chapter-number">Chapter ${chapter.number}:</span> ${chapter.title.replace(/^Chapter \d+:\s*/, '')}`;
            tocHTML += '</a>';
        });
        
        tocHTML += '</div>';
        
        const fullHTML = this.createHTMLTemplate('Claude Code Primer', tocHTML, '');
        const outputPath = path.join(this.outputDir, 'simple-index.html');
        fs.writeFileSync(outputPath, fullHTML);
        
        console.log('Created: simple-index.html');
    }

    // Convert all chapters
    convertAll() {
        console.log('Converting book to simple HTML format...\n');
        
        const chapterFiles = this.getChapterFiles();
        const totalChapters = chapterFiles.length;
        const chapters = [];
        
        // Convert each chapter
        chapterFiles.forEach((filename, index) => {
            const chapterNumber = index + 1;
            const chapter = this.convertChapter(filename, chapterNumber, totalChapters);
            chapters.push(chapter);
        });
        
        // Create table of contents
        this.createTableOfContents(chapters);
        
        console.log(`\n✅ Simple book conversion complete!`);
        console.log(`📖 Open simple-index.html to read the book`);
        console.log(`📄 ${chapters.length} chapters converted`);
        
        return chapters;
    }
}

// Run the converter if called directly
if (require.main === module) {
    const converter = new SimpleBookConverter();
    converter.convertAll();
}

module.exports = SimpleBookConverter;