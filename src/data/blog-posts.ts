import { BlogPost } from './types'; // types.ts가 없다면 그냥 interface 정의 포함

export interface BlogPost {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    "slug": "why-learn-digital-art",
    "titleKey": "스케치북 밖 무한한 세상, 우리 아이가 디지털 아트를 배워야 하는 진짜 이유",
    "descriptionKey": "최근 초·중·고교에 AI 디지털 교과서(AIDT)가 전면 도입되면서 교실 풍경이 완전히 달라졌습니다.",
    "date": "2024-05-25",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/why-learn-digital-art/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "thinking-muscle",
    "titleKey": "창의성, 타고나지 않아도 괜찮아! 우리 아이 생각 근육 키우는 법",
    "descriptionKey": "\"창의성은 타고나는 걸까요, 아니면 길러지는 걸까요?\"",
    "date": "2024-05-23",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/thinking-muscle/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "teacher-reading-mind",
    "titleKey": "그림 그리는 아이의 마음을 읽어주는 사람, 선생님",
    "descriptionKey": "아이의 스케치북을 유심히 보신 적 있나요?",
    "date": "2024-05-21",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/teacher-reading-mind/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "storytelling-art",
    "titleKey": "빈 도화지가 두려운 아이, 이야기가 붓을 들게 합니다",
    "descriptionKey": "\"오늘 뭐 그릴 거야?\"라고 물었을 때, \"몰라요\"라며 빈 도화지만 멍하니 바라보는 아이. 그림 실력이 부족해서가 아닙니다. **그릴 '이야기'가 없기 때문입니다.**",
    "date": "2024-05-19",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/storytelling-art/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "reading-mind-through-drawing",
    "titleKey": "말수 줄어든 초등 1·2학년, 그림으로 마음을 읽어야 하는 이유",
    "descriptionKey": "\"아이가 학교 가기 싫다고 아침마다 울어요.\"",
    "date": "2024-05-17",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/reading-mind-through-drawing/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "digital-drawing-start",
    "titleKey": "그림 좀 그려본 아이들의 필살기, 디지털 드로잉 제대로 시작하는 법 🎨",
    "descriptionKey": "우리 아이들, 이제 종이와 붓만큼이나 태블릿과 스타일러스 펜이 익숙한 세대입니다. \"웹툰 작가가 되고 싶어요\", \"아이패드로 멋진 캐릭터를 그리고 싶어요\"라고 말하는 아이에게 단순히 유튜브 영상만 보여주고 계셨나요?",
    "date": "2024-05-15",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/digital-drawing-start/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "data-based-art-thinking",
    "titleKey": "그림 실력 그 이상 우리 아이 잠재력을 깨우는 데이터 기반 아트 씽킹의 힘",
    "descriptionKey": "최근 교육 현장에는 큰 지각 변동이 일어나고 있습니다. **2025년부터 AI 디지털 교과서가 본격 도입**되면서, 이제 학교 수업에서도 태블릿과 디지털 도구를 능숙하게 다루는 것이 국어, 영어만큼 중요한 기초 역량이 되었습니다.",
    "date": "2024-05-13",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/data-based-art-thinking/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "art-career-path",
    "titleKey": "“미술 전공 안 해도 괜찮습니다” 초등 고학년, 그림으로 찾는 의외의 진로 적성",
    "descriptionKey": "“우리 아이는 공부 머리는 아닌 것 같은데, 뭘 시켜야 할까요?”",
    "date": "2024-05-11",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/art-career-path/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "art-bonbon-ai-analysis",
    "titleKey": "우리 아이의 도화지는 데이터로 된 편지입니다 아트봉봉 AI 그림분석",
    "descriptionKey": "부모님들은 아이가 그린 그림 한 점을 보며 수많은 생각을 합니다. \"왜 갑자기 검은색을 썼을까?\", \"이 구도는 아이의 자신감을 나타내는 걸까?\" 하지만 전문가가 아닌 이상 그 속마음을 정확히 읽어내기란 쉽지 않죠.",
    "date": "2024-05-09",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/art-bonbon-ai-analysis/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "algorithm-creativity",
    "titleKey": "우리 아이 창의성, 맞춤형 알고리즘으로 깨우다",
    "descriptionKey": "최근 교육계의 가장 큰 변화는 AI를 활용한 '개인화 학습'입니다.",
    "date": "2024-05-07",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/algorithm-creativity/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "ai-psychology-test-reason",
    "titleKey": "말로 다 못 하는 우리 아이 마음, AI 그림심리검사가 답이 되는 이유",
    "descriptionKey": "부모라면 누구나 아이의 갑작스러운 행동 변화에 당황하곤 합니다. \"갑자기 왜 저럴까?\" 싶은 순간, 아이가 보내는 무언의 신호를 놓치고 있는 건 아닌지 덜컥 겁이 나기도 하죠. 아이들의 마음속에 쌓이는 스트레스는 눈에 보이지 않아 더 세심한 관찰이 필요합니다.",
    "date": "2024-05-05",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/ai-psychology-test-reason/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "ai-art-education-2026",
    "titleKey": "2026 AI 시대, 우리 아이 미술 교육은 어떻게 달라져야 할까요?",
    "descriptionKey": "최근 노벨 물리학상과 화학상을 AI 연구자들이 석권하고, 소더비 경매에서 AI 로봇의 작품이 고가에 낙찰되었다는 소식은 전 세계에 큰 울림을 주었습니다. 이제 AI는 단순한 기술을 넘어 인간의 고유 영역이라 믿었던 '예술'과 '창의성'의 경계마저 확장하고 있습니다. \ud83c...",
    "date": "2024-05-03",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/ai-art-education-2026/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  },
  {
    "slug": "10-ai-psychology-tests",
    "titleKey": "말하지 않는 아이 속마음, 10가지 ‘AI 그림심리검사’로 정확하게 읽는 법",
    "descriptionKey": "\"오늘 학교에서 별일 없었어?\"라고 물으면 \"그냥 그랬어\"라고 답하는 우리 아이. 겉으로는 평온해 보여도 마음속에는 말 못 할 스트레스나 불안이 자리 잡고 있을 수 있습니다.",
    "date": "2024-05-01",
    "author": "i-Scream Arts Team",
    "image": "/content/blog/10-ai-psychology-tests/image-1.png",
    "tags": [
      "AI Education",
      "Art Therapy",
      "Creative"
    ]
  }
];
