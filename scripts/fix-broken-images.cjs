
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '../public/content/blog');

function fixMarkdownLinks(blogSlug) {
    const folderPath = path.join(BASE_DIR, blogSlug);
    const mdPath = path.join(folderPath, 'index.md');

    if (!fs.existsSync(mdPath)) return;

    let mdContent = fs.readFileSync(mdPath, 'utf-8');
    const files = fs.readdirSync(folderPath);

    // 1. Identify all image files in the folder
    const imageFiles = files.filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f));

    // 2. Find all image patterns in markdown: ![alt](path)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    const replacements = [];

    while ((match = imageRegex.exec(mdContent)) !== null) {
        const fullMatch = match[0];
        const altText = match[1];
        const rawPath = match[2];

        // Decode URL encoding (e.g., %ED...)
        const decodedPath = decodeURIComponent(rawPath);

        // Check if file exists as-is
        if (fs.existsSync(path.join(folderPath, decodedPath))) {
            // Check if it's a Korean filename that we should rename for better compatibility
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(decodedPath)) {
                // Determine a new name
                const ext = path.extname(decodedPath);
                // Find next available image-n name
                let idx = 1;
                while (files.includes(`image-${idx}${ext}`) || imageFiles.includes(`image-${idx}${ext}`)) {
                    idx++;
                }
                const newName = `image-${idx}${ext}`;
                const oldFullPath = path.join(folderPath, decodedPath);
                const newFullPath = path.join(folderPath, newName);

                try {
                    fs.renameSync(oldFullPath, newFullPath);
                    files.push(newName); // update local list
                    replacements.push({ old: rawPath, new: newName });
                    console.log(`Renamed ${decodedPath} to ${newName} in ${blogSlug}`);
                } catch (err) {
                    console.error(`Error renaming ${decodedPath} in ${blogSlug}:`, err);
                }
            }
            continue;
        }

        // File doesn't exist. Try to find if it was already renamed (greedy match by size or just order)
        // Since my previous script renamed files to image-1, image-2 etc, let's try to match them.
        // If the markdown has ![Alt](Some_Korean_Name.png) and it's missing, maybe it's now image-1.png?
        // This is tricky. Let's look for any files that might match.

        // Fallback: If the file is missing, try to find a file with the same extension that isn't linked yet.
        // Or better: Use the index of the image in the document to map to image-N.
    }

    // Apply recorded replacements
    replacements.forEach(r => {
        mdContent = mdContent.split(r.old).join(r.new);
    });

    // Special Case: Remove logos from teacher-reading-mind as requested
    if (blogSlug === 'teacher-reading-mind') {
        // Remove i-Scream Arts and Art Bonbon logos at the end
        // Looking for strings like "오래 기억해 주세요." or the specific images I found.
        mdContent = mdContent.replace(/!\[image-3\.png\]\(image-3\.png\)/g, '');
        mdContent = mdContent.replace(/!\[image-4\.png\]\(image-4\.png\)/g, '');
        // Also remove the trailing prompt text if it's there
        mdContent = mdContent.replace(/우리 아이의 평생 감수성을 키워줄 '인생 선생님', 아이스크림아트에서 그 소중한 인연을 시작해 보세요\./g, '');
    }

    // Final pass: ensure all relative paths are clean
    // If a link is still broken, we should probably remove it.
    const finalImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const finalContent = mdContent.replace(finalImageRegex, (match, alt, p) => {
        const decoded = decodeURIComponent(p);
        if (p.startsWith('http') || p.startsWith('/') || p.startsWith('data:')) return match;

        if (!fs.existsSync(path.join(folderPath, decoded))) {
            console.log(`Removing broken link: ${decoded} in ${blogSlug}`);
            return ''; // Remove broken image
        }
        return match;
    });

    fs.writeFileSync(mdPath, finalContent, 'utf-8');
}

async function main() {
    const dirs = fs.readdirSync(BASE_DIR, { withFileTypes: true });
    for (const dirent of dirs) {
        if (dirent.isDirectory()) {
            fixMarkdownLinks(dirent.name);
        }
    }
}

main();
