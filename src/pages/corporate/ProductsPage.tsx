import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/corporate/SEO';
import productArtbonbon from '@/assets/product-artbonbon.png';
import productSchool from '@/assets/product-school.png';
import productGallery from '@/assets/product-gallery.png';

interface ProductData {
  nameKey: string;
  descKey: string;
  link?: string;
  comingSoon?: boolean;
  image: string;
}

export default function ProductsPage() {
  const { t, language } = useLanguage();

  const products: ProductData[] = [
    {
      nameKey: 'products.artbonbon.name',
      descKey: 'products.artbonbon.desc',
      link: 'https://art-bonbon.com/',
      image: productArtbonbon,
    },
    {
      nameKey: 'products.school.name',
      descKey: 'products.school.desc',
      link: 'https://school-teacher.art-bonbon.com/',
      image: productSchool,
    },
    {
      nameKey: 'products.gallery.name',
      descKey: 'products.gallery.desc',
      comingSoon: true,
      image: productGallery,
    },
  ];

  return (
    <>
      <SEO titleKey="nav.products" />

      <div className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        {/* Hero */}
        <section className="container-corporate mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            {t('products.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            {t('products.subtitle')}
          </p>
        </section>

        {/* Product Cards */}
        <section className="container-corporate">
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden card-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col shadow-sm"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={t(product.nameKey)}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product info */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold mb-3 text-slate-800">
                    {t(product.nameKey)}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                    {t(product.descKey)}
                  </p>

                  {product.comingSoon ? (
                    <span className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-400 px-5 py-2.5 rounded-lg font-medium cursor-not-allowed">
                      {t('products.comingsoon')}
                    </span>
                  ) : (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    >
                      {t('products.viewdetails')}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}