
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 1. 매핑 테이블 (폴더명 -> slug)
const FOLDER_MAP = {
    "'우리 아이의 도화지는 데이터로 된 편지입니다' 아트봉봉 AI 그림분석": "art-bonbon-ai-analysis",
    "2026 AI 시대, 우리 아이 미술 교육은 어떻게 달라져야 할까요": "ai-art-education-2026",
    "“미술 전공 안 해도 괜찮습니다” 초등 고학년, 그림으로 찾는 의외의 진로 적성": "art-career-path",
    "그림 그리는 아이의 마음을 읽어주는 사람, '선생님'": "teacher-reading-mind",
    "그림 실력 그 이상 우리 아이 잠재력을 깨우는 데이터 기반 '아트 씽킹'의 힘": "data-based-art-thinking",
    "그림 좀 그려본 아이들 의 필살기, 디지털 드로잉 제대로 시작하는 법": "digital-drawing-start",
    "말로 다 못 하는 우리 아이 마음, 'AI 그림심리검사'가 답이 되는 이유": "ai-psychology-test-reason",
    "말수 줄어든 초등 1·2학년, '그림'으로 마음을 읽어야 하는 이유": "reading-mind-through-drawing",
    "말하지 않는 아이 속마음, 10가지 ‘AI 그림심리검사’로 정확하게 읽는 법": "10-ai-psychology-tests",
    "빈 도화지가 두려운 아이, '이야기'가 붓을 들게 합니다": "storytelling-art",
    "스케치북 밖 무한한 세상, 우리 아이가 '디지털 아트'를 배워야 하는 진짜 이유": "why-learn-digital-art",
    "우리 아이 창의성, '맞춤형 알고리즘'으로 깨우다": "algorithm-creativity",
    "창의성, 타고나지 않아도 괜찮아! 우리 아이 '생각 근육' 키우는 법": "thinking-muscle"
};

const BASE_DIR = path.resolve(__dirname, '../public/content/blog');

function fixMarkdownImageLinks(markdownContent, oldToNewImageMap) {
    let newContent = markdownContent;
    for (const [oldName, newName] of Object.entries(oldToNewImageMap)) {
        // 1. URL 인코딩된 이름 (예: %20)
        // 2. 그냥 이름 (예: image.png)
        const encodedOldName = encodeURIComponent(oldName).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16));
        
        // 정규식으로 안전하게 교체 (이미지 문법 ![alt](path) 에서 path 부분)
        // 일단 단순 replaceAll로 시도하되, encoded와 raw 둘 다 시도
        newContent = newContent.replaceAll(oldName, newName);
        newContent = newContent.replaceAll(encodedOldName, newName);
    }
    return newContent;
}

function extractDescription(markdownContent) {
    // 첫 번째 문단이나, '#' 헤더 다음의 텍스트를 추출
    const lines = markdownContent.split('\n');
    let desc = '';
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('![') && !trimmed.startsWith('<')) {
            desc = trimmed;
            break;
        }
    }
    return desc.substring(0, 150) + (desc.length > 150 ? '...' : '');
}

async function main() {
    const blogPosts = [];
    const dirs = fs.readdirSync(BASE_DIR, { withFileTypes: true });

    for (const dirent of dirs) {
        if (!dirent.isDirectory()) continue;

        const oldFolderName = dirent.name;
        const newSlug = FOLDER_MAP[oldFolderName];

        if (!newSlug) {
            console.log(`Skipping unknown folder: ${oldFolderName}`);
            continue;
        }

        console.log(`Processing: ${oldFolderName} -> ${newSlug}`);

        const oldFolderPath = path.join(BASE_DIR, oldFolderName);
        const newFolderPath = path.join(BASE_DIR, newSlug);

        // 1. Rename folder (if needed, sometimes rename fails if locked, but let's try)
        // 먼저 새 폴더가 있으면 에러 날 수 있음. 없다고 가정.
        if (fs.existsSync(newFolderPath) && oldFolderPath !== newFolderPath) {
            console.log(`Target folder ${newSlug} already exists.`);
        } else if (oldFolderPath !== newFolderPath) {
            fs.renameSync(oldFolderPath, newFolderPath);
        }

        // 이제 작업 경로는 newFolderPath
        const files = fs.readdirSync(newFolderPath);
        
        // .md 파일 찾기
        const mdFile = files.find(f => f.endsWith('.md') && !f.startsWith('index.')); // 이미 index.md이면 패스
        let mdContent = '';
        let mdFileName = 'index.md';

        if (mdFile) {
            const oldMdPath = path.join(newFolderPath, mdFile);
            mdContent = fs.readFileSync(oldMdPath, 'utf-8');
            const newMdPath = path.join(newFolderPath, 'index.md');
            fs.renameSync(oldMdPath, newMdPath);
            mdFileName = 'index.md'; 
        } else if (files.includes('index.md')) {
            mdContent = fs.readFileSync(path.join(newFolderPath, 'index.md'), 'utf-8');
        }

        // 이미지 파일 처리
        const imageFiles = files.filter(f => /\.(png|jpg|jpeg|gif|webp)$/i.test(f) && f !== mdFile);
        const oldToNewImageMap = {};
        let mainImage = '';

        let imgIndex = 1;
        imageFiles.forEach(imgFile => {
            const ext = path.extname(imgFile);
            const newImgName = `image-${imgIndex}${ext}`;
            const oldImgPath = path.join(newFolderPath, imgFile);
            const newImgPath = path.join(newFolderPath, newImgName);
            
            // 이미 index.md 처럼 정리가 되어있는 경우를 대비해, 이름이 이미 image-X 형식이면 건너뜀
            if (!/^image-\d+\.(png|jpg|jpeg|gif|webp)$/.test(imgFile)) {
                 fs.renameSync(oldImgPath, newImgPath);
                 oldToNewImageMap[imgFile] = newImgName;
            } else {
                 oldToNewImageMap[imgFile] = imgFile;
            }
            
            if (imgIndex === 1) mainImage = `/content/blog/${newSlug}/${newImgName}`;
            imgIndex++;
        });

        // Markdown 내용 업데이트 (이미지 경로 수정)
        if (mdContent) {
            const newMdContent = fixMarkdownImageLinks(mdContent, oldToNewImageMap);
            fs.writeFileSync(path.join(newFolderPath, 'index.md'), newMdContent, 'utf-8');
            
             // Create Data Entry
            const title = oldFolderName; // 폴더명을 제목으로 사용 (원래 파일명이었음)
            const description = extractDescription(newMdContent) || "블로그 포스트 내용입니다.";
            
            blogPosts.push({
                slug: newSlug,
                titleKey: title.replace(/'/g, "\\'"), // Escape quotes for JS string
                descriptionKey: description.replace(/'/g, "\\'").replace(/\n/g, ' '),
                date: new Date().toISOString().split('T')[0], // 오늘 날짜
                author: 'i-Scream Arts Team',
                image: mainImage || '/images/blog/sample.png',
                tags: ['Education', 'AI Art'], // 기본 태그
            });
        }
    }

    console.log('--- GENERATED DATA ---');
    console.log(JSON.stringify(blogPosts, null, 2));
}

main().catch(console.error);
