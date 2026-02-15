export interface BlogPost {
  slug: string;
  titleKey: string; // We can use translation keys or direct strings
  descriptionKey: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'welcome',
    titleKey: 'Welcome to i-Scream Arts',
    descriptionKey: 'An introduction to our global AI digital art platform for children.',
    date: '2024-05-20',
    author: 'i-Scream Arts Team',
    image: '/images/blog/sample.png', // Placeholder or actual image path
    tags: ['Announcement', 'Platform'],
  },
  // Add more posts here
];
