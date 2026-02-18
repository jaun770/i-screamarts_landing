import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPosts, BlogPost } from '@/data/blog-posts';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import remarkGfm from 'remark-gfm';
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
                // Helper to check if response is valid Markdown
                const isValidMarkdown = (text: string) => !text.trim().startsWith('<!doctype html') && !text.trim().startsWith('<html');

                // 1. Try language-specific file inside folder (e.g., index.en.md)
                const langResponse = await fetch(`/content/blog/${slug}/index.${language}.md`);
                if (langResponse.ok) {
                    const text = await langResponse.text();
                    if (isValidMarkdown(text)) {
                        setContent(text);
                        setLoading(false);
                        return;
                    }
                }

                // 2. Fallback to default index.md inside folder
                const defaultResponse = await fetch(`/content/blog/${slug}/index.md`);
                if (defaultResponse.ok) {
                    const text = await defaultResponse.text();
                    if (isValidMarkdown(text)) {
                        setContent(text);
                        setLoading(false);
                        return;
                    }
                }

                // 3. Fallback to legacy single file (rare but keep for safety)
                const legacyResponse = await fetch(`/content/blog/${slug}.md`);
                if (legacyResponse.ok) {
                    const text = await legacyResponse.text();
                    if (isValidMarkdown(text)) {
                        setContent(text);
                        setLoading(false);
                        return;
                    }
                }

                setContent('Post content not found.');
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

    // Custom renderer to fix relative image paths and style content
    const MarkdownComponents = {
        img: (props: any) => {
            let src = props.src;
            // If src is relative (doesn't start with / or http), prepend the blog post path
            if (src && !src.startsWith('/') && !src.startsWith('http') && !src.startsWith('data:')) {
                src = `/content/blog/${slug}/${src}`;
            }
            return (
                <figure className="my-10 group">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#1A1A1A]">
                        <img
                            {...props}
                            src={src}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                        />
                    </div>
                    {props.alt && !props.alt.toLowerCase().includes('image') && !props.alt.toLowerCase().includes('.png') && (
                        <figcaption className="text-center text-sm text-white/40 mt-3 font-medium">
                            {props.alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
        h1: ({ node, ...props }: any) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-16 mb-8 leading-tight tracking-tight border-b border-white/10 pb-6" {...props} />,
        h2: ({ node, ...props }: any) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-16 mb-6 leading-snug tracking-tight" {...props} />,
        h3: ({ node, ...props }: any) => <h3 className="text-xl md:text-2xl font-bold text-white/90 mt-10 mb-5 leading-snug" {...props} />,
        h4: ({ node, ...props }: any) => <h4 className="text-lg md:text-xl font-semibold text-white/90 mt-8 mb-4" {...props} />,
        p: ({ node, ...props }: any) => <p className="text-lg text-white/70 mb-6 leading-relaxed loose-tracking" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-white/70 marker:text-accent/70" {...props} />,
        ol: ({ node, ...props }: any) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-lg text-white/70 marker:text-accent/70" {...props} />,
        li: ({ node, ...props }: any) => <li className="pl-2" {...props} />,
        blockquote: ({ node, ...props }: any) => (
            <blockquote className="border-l-4 border-accent bg-gradient-to-r from-accent/10 to-transparent py-6 px-8 my-10 rounded-r-xl italic text-xl text-white/90 shadow-inner" {...props} />
        ),
        a: ({ node, ...props }: any) => (
            <a
                className="text-accent font-medium hover:text-accent/80 border-b border-accent/30 hover:border-accent transition-all pb-0.5"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
            return inline ? (
                <code className="bg-white/10 rounded px-1.5 py-0.5 text-sm font-mono text-accent" {...props}>{children}</code>
            ) : (
                <div className="bg-[#151515] rounded-xl overflow-hidden border border-white/10 my-8 shadow-lg">
                    <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                    </div>
                    <pre className="p-5 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <code className="text-sm font-mono text-white/80 leading-relaxed" {...props}>{children}</code>
                    </pre>
                </div>
            )
        },
        hr: ({ node, ...props }: any) => <hr className="border-white/10 my-16 opacity-50" {...props} />,
        strong: ({ node, ...props }: any) => <strong className="font-bold text-white" {...props} />,
        table: ({ node, ...props }: any) => (
            <div className="my-10 rounded-xl border border-white/10 shadow-lg overflow-hidden">
                <table className="w-full divide-y divide-white/10 text-white/70" {...props} />
            </div>
        ),
        thead: ({ node, ...props }: any) => <thead className="bg-white/5" {...props} />,
        th: ({ node, ...props }: any) => <th className="px-4 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider break-words" {...props} />,
        tbody: ({ node, ...props }: any) => <tbody className="bg-[#1A1A1A] divide-y divide-white/5" {...props} />,
        tr: ({ node, ...props }: any) => <tr className="hover:bg-white/5 transition-colors" {...props} />,
        td: ({ node, ...props }: any) => <td className="px-4 py-4 text-sm break-words leading-relaxed align-top" {...props} />,
    };

    return (
        <>
            <SEO titleKey={post.titleKey} descriptionKey={post.descriptionKey} />
            <div className="pt-24 md:pt-32 pb-20 bg-[#0A0A0A] min-h-screen text-white">
                <article className="container-corporate max-w-4xl mx-auto px-6">
                    {/* Back to Blog */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-white/60 hover:text-accent transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('nav.blog')}
                    </Link>

                    {/* Header */}
                    <header className="mb-16 text-left max-w-4xl mx-auto">
                        <div className="flex items-center justify-start gap-4 text-sm text-white/40 mb-6">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/5">
                                <User className="w-3.5 h-3.5" />
                                {post.author}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight tracking-tight">
                            {post.titleKey}
                        </h1>
                        <div className="flex flex-wrap justify-start gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent hover:bg-accent/20 transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Main Image (if it exists and user wants it, but usually handled by mardown itself or we can add hero logic here if needed. For now keeping it simple as per request to fix content view) */}


                    <div className="max-w-4xl mx-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                            {content}
                        </ReactMarkdown>
                    </div>

                    <hr className="border-white/10 my-20" />

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
