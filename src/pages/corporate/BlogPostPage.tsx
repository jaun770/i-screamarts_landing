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
                const isValidMarkdown = (text: string) =>
                    !text.trim().startsWith('<!doctype html') && !text.trim().startsWith('<html');

                // 1. Language-specific file
                const langResponse = await fetch(`/content/blog/${slug}/index.${language}.md`);
                if (langResponse.ok) {
                    const text = await langResponse.text();
                    if (isValidMarkdown(text)) { setContent(text); setLoading(false); return; }
                }

                // 2. Default index.md
                const defaultResponse = await fetch(`/content/blog/${slug}/index.md`);
                if (defaultResponse.ok) {
                    const text = await defaultResponse.text();
                    if (isValidMarkdown(text)) { setContent(text); setLoading(false); return; }
                }

                // 3. Legacy single file
                const legacyResponse = await fetch(`/content/blog/${slug}.md`);
                if (legacyResponse.ok) {
                    const text = await legacyResponse.text();
                    if (isValidMarkdown(text)) { setContent(text); setLoading(false); return; }
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
            <div className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center text-slate-500">
                Loading...
            </div>
        );
    }

    if (!post) return null;

    // Light-mode Markdown renderers
    const MarkdownComponents = {
        img: (props: any) => {
            let src = props.src;
            if (src && !src.startsWith('/') && !src.startsWith('http') && !src.startsWith('data:')) {
                src = `/content/blog/${slug}/${src}`;
            }
            return (
                <figure className="my-10 group">
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-md bg-slate-50">
                        <img
                            {...props}
                            src={src}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                        />
                    </div>
                    {props.alt && !props.alt.toLowerCase().includes('image') && !props.alt.toLowerCase().includes('.png') && (
                        <figcaption className="text-center text-sm text-slate-400 mt-3 font-medium">
                            {props.alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
        h1: ({ node, ...props }: any) => <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-16 mb-8 leading-tight tracking-tight border-b border-slate-200 pb-6" {...props} />,
        h2: ({ node, ...props }: any) => <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-16 mb-6 leading-snug tracking-tight" {...props} />,
        h3: ({ node, ...props }: any) => <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-10 mb-5 leading-snug" {...props} />,
        h4: ({ node, ...props }: any) => <h4 className="text-lg md:text-xl font-semibold text-slate-800 mt-8 mb-4" {...props} />,
        p: ({ node, ...props }: any) => <p className="text-lg text-slate-600 mb-6 leading-relaxed" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-slate-600 marker:text-accent/70" {...props} />,
        ol: ({ node, ...props }: any) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-lg text-slate-600 marker:text-accent/70" {...props} />,
        li: ({ node, ...props }: any) => <li className="pl-2" {...props} />,
        blockquote: ({ node, ...props }: any) => (
            <blockquote className="border-l-4 border-accent bg-gradient-to-r from-accent/8 to-transparent py-6 px-8 my-10 rounded-r-xl italic text-xl text-slate-700 shadow-sm" {...props} />
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
                <code className="bg-slate-100 rounded px-1.5 py-0.5 text-sm font-mono text-accent" {...props}>{children}</code>
            ) : (
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-200 my-8 shadow-lg">
                    <div className="flex items-center px-4 py-2 border-b border-white/10 bg-slate-800">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        </div>
                    </div>
                    <pre className="p-5 overflow-x-auto">
                        <code className="text-sm font-mono text-slate-200 leading-relaxed" {...props}>{children}</code>
                    </pre>
                </div>
            );
        },
        hr: ({ node, ...props }: any) => <hr className="border-slate-200 my-16" {...props} />,
        strong: ({ node, ...props }: any) => <strong className="font-bold text-slate-900" {...props} />,
        table: ({ node, ...props }: any) => (
            <div className="my-10 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full divide-y divide-slate-200 text-slate-700" {...props} />
            </div>
        ),
        thead: ({ node, ...props }: any) => <thead className="bg-slate-50" {...props} />,
        th: ({ node, ...props }: any) => <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider break-words" {...props} />,
        tbody: ({ node, ...props }: any) => <tbody className="bg-white divide-y divide-slate-100" {...props} />,
        tr: ({ node, ...props }: any) => <tr className="hover:bg-slate-50 transition-colors" {...props} />,
        td: ({ node, ...props }: any) => <td className="px-4 py-4 text-sm break-words leading-relaxed align-top" {...props} />,
    };

    return (
        <>
            <SEO titleKey={post.titleKey} descriptionKey={post.descriptionKey} />
            <div className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
                <article className="container-corporate max-w-4xl mx-auto px-6">
                    {/* Back to Blog */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-slate-500 hover:text-accent transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('nav.blog')}
                    </Link>

                    {/* Header */}
                    <header className="mb-16 text-left max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                                <User className="w-3.5 h-3.5" />
                                {post.author}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-slate-900 leading-tight tracking-tight [word-break:keep-all]">
                            {post.titleKey}
                        </h1>
                        <div className="flex flex-wrap gap-2">
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

                    {/* Markdown Content */}
                    <div className="max-w-4xl mx-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                            {content}
                        </ReactMarkdown>
                    </div>

                    <hr className="border-slate-200 my-20" />

                    {/* Prev / Next navigation */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        {prevPost ? (
                            <Link
                                to={`/blog/${prevPost.slug}`}
                                className="flex-1 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-left"
                            >
                                <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Previous Post
                                </div>
                                <div className="font-semibold text-slate-700 group-hover:text-accent transition-colors line-clamp-2">
                                    {prevPost.titleKey}
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {nextPost ? (
                            <Link
                                to={`/blog/${nextPost.slug}`}
                                className="flex-1 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-right"
                            >
                                <div className="text-sm text-slate-400 mb-2 flex items-center justify-end gap-2">
                                    Next Post
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="font-semibold text-slate-700 group-hover:text-accent transition-colors line-clamp-2">
                                    {nextPost.titleKey}
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}
                    </div>
                </article>
            </div>
        </>
    );
}
