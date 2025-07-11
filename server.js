const http = require('http');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const PORT = 80;

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true
});

// Get all markdown files in order
const chapters = [
  'introduction.md',
  'chapter-01-language-revolution.md',
  'chapter-02-mathematics-attention.md',
  'chapter-03-token-prophets.md',
  'chapter-04-scaling-dynasties.md',
  'chapter-05-constitutional-philosophers.md',
  'chapter-06-birth-claude.md',
  'chapter-07-agentic-transformation.md',
  'chapter-08-terminal-prophets.md',
  'chapter-09-reading-code-chronicles.md',
  'chapter-10-real-world-trials.md',
  'chapter-11-new-pair-programming.md',
  'chapter-12-democratization.md',
  'chapter-13-ethical-reckonings.md',
  'chapter-14-new-era.md',
  'epilogue-human-future.md',
  'glossary.md'
];

function generateHTML(content, title = 'Claude Code: A Primer') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Georgia, 'Times New Roman', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fefefe;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 40px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
        }
        h3 {
            color: #7f8c8d;
        }
        .chapter-nav {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .chapter-nav h2 {
            margin-top: 0;
            color: #2c3e50;
        }
        .chapter-nav ul {
            list-style-type: none;
            padding: 0;
        }
        .chapter-nav li {
            margin: 8px 0;
        }
        .chapter-nav a {
            color: #3498db;
            text-decoration: none;
            padding: 5px 10px;
            border-radius: 4px;
            display: block;
            transition: background-color 0.3s;
        }
        .chapter-nav a:hover {
            background-color: #bdc3c7;
        }
        .intro-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-left: 4px solid #3498db;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        blockquote {
            border-left: 4px solid #95a5a6;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #f4f4f4;
            font-style: italic;
        }
        code {
            background-color: #f1f2f6;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
        pre code {
            background-color: transparent;
            color: #ecf0f1;
            padding: 0;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
            border-top: 1px solid #bdc3c7;
            color: #7f8c8d;
        }
        .book-title {
            text-align: center;
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .book-subtitle {
            text-align: center;
            color: #7f8c8d;
            font-size: 1.2em;
            margin-bottom: 30px;
            font-style: italic;
        }
        strong {
            color: #2c3e50;
        }
        em {
            color: #7f8c8d;
        }
        hr {
            border: none;
            height: 2px;
            background: linear-gradient(to right, #3498db, #ecf0f1, #3498db);
            margin: 30px 0;
        }
    </style>
</head>
<body>
    ${content}
    <div class="footer">
        <p><strong>Claude Code: A Primer</strong> - The Story of AI's Greatest Leap Into Software Development</p>
        <p><em>Written in collaboration with Claude Code - July 2025</em></p>
    </div>
</body>
</html>`;
}

function generateTableOfContents() {
  const tocHTML = `
    <div class="book-title">Claude Code: A Primer</div>
    <div class="book-subtitle">The Story of AI's Greatest Leap Into Software Development</div>
    
    <div class="intro-section">
        <p><strong>About This Book:</strong> This is the comprehensive story of how artificial intelligence transformed from simple text prediction to autonomous software development partners. From the transformer breakthrough through constitutional AI to the birth of Claude Code, we trace the most significant revolution in programming since the invention of high-level languages.</p>
        
        <p><strong>Written</strong> in collaboration between human creativity and artificial intelligence, this book demonstrates the collaborative future it describes.</p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
        <a href="/introduction.md" style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-size: 1.2em; font-weight: bold; display: inline-block; transition: background-color 0.3s; margin-right: 20px;">Start Reading</a>
        <a href="/download-pdf" style="background-color: #27ae60; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-size: 1.2em; font-weight: bold; display: inline-block; transition: background-color 0.3s;">Download PDF</a>
    </div>

    <div class="chapter-nav">
        <h2>Contents</h2>
        <ul>
            <li><a href="/introduction.md">Introduction: The Revolution We Didn't See Coming</a></li>
            <li><a href="/chapter-01-language-revolution.md">Chapter 1: The Language Revolution</a></li>
            <li><a href="/chapter-02-mathematics-attention.md">Chapter 2: The Mathematics of Attention</a></li>
            <li><a href="/chapter-03-token-prophets.md">Chapter 3: Breaking Language into Numbers</a></li>
            <li><a href="/chapter-04-scaling-dynasties.md">Chapter 4: The Scaling Dynasties</a></li>
            <li><a href="/chapter-05-constitutional-philosophers.md">Chapter 5: Teaching Machines to Be Good</a></li>
            <li><a href="/chapter-06-birth-claude.md">Chapter 6: The Birth of Claude</a></li>
            <li><a href="/chapter-07-agentic-transformation.md">Chapter 7: The Agentic Transformation</a></li>
            <li><a href="/chapter-08-terminal-prophets.md">Chapter 8: The Terminal Prophets</a></li>
            <li><a href="/chapter-09-reading-code-chronicles.md">Chapter 9: Reading the Code Chronicles</a></li>
            <li><a href="/chapter-10-real-world-trials.md">Chapter 10: The Real-World Trials</a></li>
            <li><a href="/chapter-11-new-pair-programming.md">Chapter 11: The New Pair Programming</a></li>
            <li><a href="/chapter-12-democratization.md">Chapter 12: The Democratization</a></li>
            <li><a href="/chapter-13-ethical-reckonings.md">Chapter 13: The Ethical Reckonings</a></li>
            <li><a href="/chapter-14-new-era.md">Chapter 14: The New Era (July 2025)</a></li>
            <li><a href="/epilogue-human-future.md">Epilogue: The Human Future</a></li>
            <li><a href="/glossary.md">Glossary</a></li>
        </ul>
    </div>
  `;

  return tocHTML;
}

// Security configuration
const securityHeaders = {
  // HSTS - Force HTTPS for 1 year
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // XSS Protection
  'X-XSS-Protection': '1; mode=block',
  
  // Content type sniffing protection
  'X-Content-Type-Options': 'nosniff',
  
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
    "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '),
  
  // Security headers
  'X-Powered-By': 'Claude Code Security',
  'Server': 'Claude Code Primer'
};

// Rate limiting configuration
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute per IP

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return true;
}

const server = http.createServer((req, res) => {
  const clientIP = req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
  
  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });
  
  // Rate limiting check
  if (!checkRateLimit(clientIP)) {
    res.writeHead(429, { 'Content-Type': 'text/html' });
    res.end(generateHTML('<h1>Rate Limit Exceeded</h1><p>Too many requests. Please try again later.</p>', 'Rate Limit Exceeded'));
    return;
  }
  
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from ${clientIP}`);
  let filePath = req.url === '/' ? '/' : req.url;
  
  // Serve table of contents for root
  if (filePath === '/') {
    // Check if index.html exists
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
    
    // Otherwise serve the generated table of contents
    const tocHTML = generateTableOfContents();
    const html = generateHTML(tocHTML, 'Claude Code: A Primer - Table of Contents');
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Serve complete book as single HTML page for PDF download
  if (filePath === '/download-pdf') {
    let fullBookContent = '<h1 style="text-align: center; margin: 50px 0;">Claude Code: A Primer</h1>\n';
    fullBookContent += '<h2 style="text-align: center; margin-bottom: 100px;">The Story of AI\'s Greatest Leap Into Software Development</h2>\n';
    
    // Add all chapters
    const allFiles = ['introduction.md', ...chapters];
    
    for (const file of allFiles) {
      try {
        const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        const htmlContent = marked(content);
        fullBookContent += '<div style="page-break-before: always;">' + htmlContent + '</div>\n';
      } catch (err) {
        console.error(`Error reading ${file}:`, err);
      }
    }
    
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Code: A Primer - Complete Book</title>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
        body {
            font-family: Georgia, 'Times New Roman', serif;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
        }
        h1 { color: #2c3e50; margin-top: 50px; }
        h2 { color: #34495e; margin-top: 30px; }
        h3 { color: #7f8c8d; }
        blockquote {
            border-left: 4px solid #95a5a6;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #f4f4f4;
            font-style: italic;
        }
        code {
            background-color: #f1f2f6;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
        pre code {
            background-color: transparent;
            color: #ecf0f1;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="no-print" style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #ecf0f1; border-radius: 8px;">
        <p><strong>To save as PDF:</strong> Use your browser's Print function (Ctrl+P or Cmd+P) and select "Save as PDF"</p>
        <button onclick="window.print()" style="background-color: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">Print / Save as PDF</button>
    </div>
    ${fullBookContent}
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fullHTML);
    return;
  }

  // Remove leading slash and serve file
  filePath = filePath.substring(1);
  const fullPath = path.join(__dirname, filePath);

  // Check if it's an HTML file
  if (filePath.endsWith('.html')) {
    if (fs.existsSync(fullPath)) {
      const html = fs.readFileSync(fullPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
    }
  }

  // Check if file exists and is a markdown file
  if (!fs.existsSync(fullPath) || !filePath.endsWith('.md')) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(generateHTML('<h1>404 - Chapter Not Found</h1><p><a href="/">← Back to Table of Contents</a></p>'));
    return;
  }

  try {
    const markdown = fs.readFileSync(fullPath, 'utf8');
    const html = marked(markdown);
    
    // Find current chapter index
    const currentIndex = chapters.indexOf(filePath);
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
    
    // Generate navigation
    const topNav = `
      <div style="margin-bottom: 20px; text-align: center; border-bottom: 1px solid #bdc3c7; padding-bottom: 15px;">
        <a href="/" style="color: #3498db; text-decoration: none; font-weight: bold;">Table of Contents</a>
      </div>
    `;
    
    const bottomNav = `
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #3498db; text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="flex: 1; text-align: left;">
            ${prevChapter ? `<a href="/${prevChapter}" style="color: #3498db; text-decoration: none; font-weight: bold;">← Previous Chapter</a>` : ''}
          </div>
          <div style="flex: 1; text-align: center;">
            <a href="/" style="color: #3498db; text-decoration: none; font-weight: bold;">Table of Contents</a>
          </div>
          <div style="flex: 1; text-align: right;">
            ${nextChapter ? `<a href="/${nextChapter}" style="color: #3498db; text-decoration: none; font-weight: bold;">Next Chapter →</a>` : ''}
          </div>
        </div>
      </div>
    `;
    
    const navHTML = topNav + html + bottomNav;
    
    const pageTitle = filePath.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const fullHTML = generateHTML(navHTML, `${pageTitle} - Claude Code: A Primer`);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fullHTML);
  } catch (error) {
    console.error('Error reading file:', error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(generateHTML('<h1>Error</h1><p>Could not load chapter. <a href="/">← Back to Table of Contents</a></p>'));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Claude Code: A Primer server running at http://localhost:${PORT}`);
  console.log(`Open your browser and navigate to http://localhost:${PORT} to read the book`);
  console.log(`The complete story of AI's transformation of software development awaits!`);
  console.log(`Server accessible on all network interfaces at port ${PORT}`);
});