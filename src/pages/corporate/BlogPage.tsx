import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/corporate/SEO';
import { ImagePlaceholder } from '@/components/corporate/ImagePlaceholder';

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

        {/* Featured Resources Cards Only */}
        <section className="container-corporate">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Teacher Guides */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden card-hover group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Thumbnail placeholder */}
              <ImagePlaceholder 
                aspectRatio="aspect-video" 
                alt="Teacher Guides"
                size="md"
                className="rounded-none border-0"
              />
              {/* Content */}
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-info/20 text-info rounded-full mb-3">
                  {t('resources.featured.card1.badge')}
                </span>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {t('resources.featured.card1.title')}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {t('resources.featured.card1.desc')}
                </p>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  {t('resources.readmore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Use Cases */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden card-hover group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Thumbnail placeholder */}
              <ImagePlaceholder 
                aspectRatio="aspect-video" 
                alt="Use Cases"
                size="md"
                className="rounded-none border-0"
              />
              {/* Content */}
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full mb-3">
                  {t('resources.featured.card2.badge')}
                </span>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {t('resources.featured.card2.title')}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {t('resources.featured.card2.desc')}
                </p>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  {t('resources.readmore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Art & SEL */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden card-hover group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* Thumbnail placeholder */}
              <ImagePlaceholder 
                aspectRatio="aspect-video" 
                alt="Art & SEL"
                size="md"
                className="rounded-none border-0"
              />
              {/* Content */}
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-pink-500/20 text-pink-400 rounded-full mb-3">
                  {t('resources.featured.card3.badge')}
                </span>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {t('resources.featured.card3.title')}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {t('resources.featured.card3.desc')}
                </p>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  {t('resources.readmore')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}