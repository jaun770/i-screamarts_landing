
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '../public/content/blog');

// slug -> date 매핑 (임의로 날짜 다르게 분배)
// 날짜를 하루씩 다르게 해서 리스트에 예쁘게 보이게.
const baseDate = new Date('2024-05-01');

function extractInfo(slug, mdContent) {
    const lines = mdContent.split('\n');
    let title = slug;
    let description = '';

    for (const line of lines) {
        const trimmed = line.trim();
        if (!title && trimmed.startsWith('# ')) {
            title = trimmed.substring(2).trim();
        } else if (title === slug && trimmed.startsWith('# ')) { // If title is still slug
            title = trimmed.substring(2).trim();
        }

        if (!description && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('![') && !trimmed.startsWith('<')) {
            description = trimmed;
        }
    }

    // 제목에서 따옴표 처리
    title = title.replace(/^#\s+/, '').replace(/['"]/g, '');

    return { title, description: description.substring(0, 150) + (description.length > 150 ? '...' : '') };
}

async function main() {
    const blogPosts = [];
    const dirs = fs.readdirSync(BASE_DIR, { withFileTypes: true });

    let dayOffset = 0;

    for (const dirent of dirs) {
        if (!dirent.isDirectory()) continue;
        const slug = dirent.name;
        const folderPath = path.join(BASE_DIR, slug);

        let mdContent = '';
        if (fs.existsSync(path.join(folderPath, 'index.md'))) {
            mdContent = fs.readFileSync(path.join(folderPath, 'index.md'), 'utf-8');
        } else {
            console.log(`Skipping ${slug}: No index.md found`);
            continue;
        }

        const { title, description } = extractInfo(slug, mdContent);

        // 이미지 찾기
        const files = fs.readdirSync(folderPath);
        const imageFile = files.find(f => /^image-1\.(png|jpg|jpeg|gif|webp)$/i.test(f));
        const imagePath = imageFile ? `/content/blog/${slug}/${imageFile}` : '/images/blog/sample.png';

        // 날짜 생성
        const postDate = new Date(baseDate);
        postDate.setDate(baseDate.getDate() + dayOffset);
        dayOffset += 2; // 2일 간격

        blogPosts.push({
            slug: slug,
            titleKey: title,
            descriptionKey: description.replace(/\r?\n|\r/g, ' '),
            date: postDate.toISOString().split('T')[0],
            author: 'i-Scream Arts Team',
            image: imagePath,
            tags: ['AI Education', 'Art Therapy', 'Creative'],
        });
    }


    // 날짜 역순 정렬 (최신글 위로)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // TypeScript 파일 내용 생성
    const tsContent = `import { BlogPost } from './types'; // types.ts가 없다면 그냥 interface 정의 포함

export interface BlogPost {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};
`;

    // src/data/blog-posts.ts 경로
    const targetPath = path.resolve(__dirname, '../src/data/blog-posts.ts');
    fs.writeFileSync(targetPath, tsContent, 'utf-8');
    console.log(`Generated ${targetPath}`);
}

main();
