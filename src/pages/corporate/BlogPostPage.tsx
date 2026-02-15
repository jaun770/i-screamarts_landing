import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPosts, BlogPost } from '@/data/blog-posts';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { SEO } from '@/components/corporate/SEO';

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [content, setContent] = useState<string>('');
    const [post, setPost] = useState<BlogPost | null>(null);
    const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
    const [nextPost, setNextPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    const { language } = useLanguage();

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            const outputPostIndex = blogPosts.findIndex((p) => p.slug === slug);
            if (outputPostIndex === -1) {
                navigate('/blog');
                return;
            }

            const currentPost = blogPosts[outputPostIndex];
            setPost(currentPost);
            setPrevPost(blogPosts[outputPostIndex - 1] || null);
            setNextPost(blogPosts[outputPostIndex + 1] || null);

            try {
                // 1. Try language-specific file inside folder (e.g., index.en.md)
                const langResponse = await fetch(`/content/blog/${slug}/index.${language}.md`);
                if (langResponse.ok) {
                    const text = await langResponse.text();
                    setContent(text);
                } else {
                    // 2. Fallback to default index.md inside folder
                    const defaultResponse = await fetch(`/content/blog/${slug}/index.md`);
                    if (defaultResponse.ok) {
                        const text = await defaultResponse.text();
                        setContent(text);
                    } else {
                        // 3. Fallback to legacy single file
                        const legacyResponse = await fetch(`/content/blog/${slug}.md`);
                        if (legacyResponse.ok) {
                            const text = await legacyResponse.text();
                            setContent(text);
                        } else {
                            setContent('Post content not found.');
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading markdown:', error);
                setContent('Error loading post content.');
            } finally {
                setLoading(false);
            }
        };

        if (slug && language) {
            fetchPost();
        }
    }, [slug, navigate, language]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    if (!post) return null;

    // Custom renderer to fix relative image paths
    const MarkdownComponents = {
        img: (props: any) => {
            let src = props.src;
            // If src is relative (doesn't start with / or http), prepend the blog post path
            if (src && !src.startsWith('/') && !src.startsWith('http')) {
                src = `/content/blog/${slug}/${src}`;
            }
            return (
                <img
                    {...props}
                    src={src}
                    className="rounded-xl my-8 border border-white/10 w-full"
                />
            );
        }
    };

    return (
        <>
            <SEO titleKey={post.titleKey} descriptionKey={post.descriptionKey} />
            <div className="pt-24 md:pt-32 pb-20 bg-[#0A0A0A] min-h-screen text-white">
                <article className="container-corporate max-w-3xl mx-auto px-4">
                    {/* Back to Blog */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-white/60 hover:text-accent transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('nav.blog')}
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                {post.author}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            {post.titleKey}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-white/60"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Markdown Content */}
                    <div className="prose prose-invert prose-lg max-w-none mb-16 prose-headings:text-white/90 prose-p:text-white/70 prose-a:text-accent prose-strong:text-white prose-code:text-accent">
                        <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
                    </div>

                    <hr className="border-white/10 mb-12" />

                    {/* Navigation */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        {prevPost ? (
                            <Link
                                to={`/blog/${prevPost.slug}`}
                                className="flex-1 p-6 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-white/20 transition-all group text-left"
                            >
                                <div className="text-sm text-white/40 mb-2 flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Previous Post
                                </div>
                                <div className="font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">
                                    {prevPost.titleKey}
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1" /> // Spacer
                        )}

                        {nextPost ? (
                            <Link
                                to={`/blog/${nextPost.slug}`}
                                className="flex-1 p-6 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:border-white/20 transition-all group text-right"
                            >
                                <div className="text-sm text-white/40 mb-2 flex items-center justify-end gap-2">
                                    Next Post
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">
                                    {nextPost.titleKey}
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1" /> // Spacer
                        )}
                    </div>
                </article>
            </div>
        </>
    );
}
