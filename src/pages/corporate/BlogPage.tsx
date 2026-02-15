import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/corporate/SEO';
import { ImagePlaceholder } from '@/components/corporate/ImagePlaceholder';
import { blogPosts } from '@/data/blog-posts';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO titleKey="nav.blog" />

      <div className="pt-24 md:pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        {/* Hero */}
        <section className="container-corporate mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {t('nav.blog')}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl">
            {t('resources.subtitle')}
          </p>
        </section>

        {/* Blog Post Cards */}
        <section className="container-corporate">
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden card-hover group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden bg-gray-800">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.titleKey}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImagePlaceholder
                      aspectRatio="aspect-video"
                      alt={post.titleKey}
                      size="md"
                      className="rounded-none border-0 w-full h-full"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 mb-3 max-w-full overflow-hidden">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-block px-2.5 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.titleKey}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-3 flex-1">
                    {post.descriptionKey}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-sm">
                    <span className="text-white/40">{post.date}</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent/80 transition-colors">
                      {t('resources.readmore')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="text-center py-20 text-white/40">
              No blog posts found.
            </div>
          )}
        </section>
      </div>
    </>
  );
}