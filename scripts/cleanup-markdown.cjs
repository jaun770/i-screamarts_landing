
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '../public/content/blog');

function cleanupMarkdown(blogSlug) {
    const folderPath = path.join(BASE_DIR, blogSlug);
    const mdPath = path.join(folderPath, 'index.md');

    if (!fs.existsSync(mdPath)) return;

    let content = fs.readFileSync(mdPath, 'utf-8');

    // 1. Remove broken image remnants like ".png)" on its own line
    content = content.replace(/^\s*\.?png\s*\)\s*$/gm, '');
    content = content.replace(/^\s*\.?jpg\s*\)\s*$/gm, '');
    content = content.replace(/^\s*!\s*$/gm, '');

    // 2. Fix Korean filenames that might still be in the link part but we renamed the file
    const files = fs.readdirSync(folderPath);
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

    content = content.replace(imgRegex, (match, alt, p) => {
        const decoded = decodeURIComponent(p);
        if (p.startsWith('http') || p.startsWith('/') || p.startsWith('data:')) return match;

        // If file exists, great
        if (fs.existsSync(path.join(folderPath, decoded))) return match;

        // If not, maybe we renamed it? 
        // Try to match by index? No, too risky.
        // Let's see if the alt text contains clues like "image-1"
        // Or if the folder has files image-1.png...

        console.log(`Still broken in ${blogSlug}: ${decoded}`);
        return ''; // Remove broken link
    });

    // 3. Remove logos from teacher-reading-mind (and any other place they might appear)
    const logoPatterns = [/image-3\.png/i, /image-4\.png/i];
    if (blogSlug === 'teacher-reading-mind') {
        content = content.replace(/!\[([^\]]*)\]\((image-3\.png|image-4\.png)\)/gi, '');
        content = content.replace(/우리 아이의 평생 감수성을 키워줄 '인생 선생님'.*/g, '');
    }

    // 4. Cleanup excessive newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(mdPath, content.trim() + '\n', 'utf-8');
}

const blogs = fs.readdirSync(BASE_DIR).filter(f => fs.statSync(path.join(BASE_DIR, f)).isDirectory());
blogs.forEach(cleanupMarkdown);
console.log('Cleanup done.');
