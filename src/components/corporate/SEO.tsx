import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  customTitle?: string;
  customDescription?: string;
}

export function SEO({ titleKey, descriptionKey, customTitle, customDescription }: SEOProps) {
  const { t, language } = useLanguage();

  useEffect(() => {
    const baseTitle = language === 'ko' 
      ? '아이스크림아트 - 글로벌 AI 디지털 아트 플랫폼' 
      : 'i-Scream arts | Global Leader in AI-Powered Digital Art for Children';
    const title = customTitle || (titleKey ? `${t(titleKey)} | ${language === 'ko' ? '아이스크림아트' : 'i-Scream arts'}` : baseTitle);
    
    // Long definition for SEO meta description
    const defaultDesc = language === 'ko' 
      ? '아이스크림아트는 AI 기반 디지털 아트 플랫폼 \'아트봉봉\'을 통해 전 세계 아이들에게 창의적 드로잉 경험을 제공합니다. 아이들의 숨은 재능을 발견하고 글로벌 문화 교류를 이끄는 디지털 미술 교육의 표준을 제시합니다.'
      : 'i-Scream arts empowers children worldwide through \'Art Bonbon,\' the world\'s first AI-driven digital art platform. We nurture creativity and global connection, helping young artists discover their talents and share their unique stories through digital drawing.';
    
    const description = customDescription || (descriptionKey ? t(descriptionKey) : defaultDesc);

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OG tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:type', 'website');
    updateOGTag('og:locale', language === 'ko' ? 'ko_KR' : 'en_US');

  }, [titleKey, descriptionKey, customTitle, customDescription, t, language]);

  return null;
}

// Organization Schema Component
export function OrganizationSchema() {
  const { language } = useLanguage();

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: language === 'ko' ? '아이스크림아트' : 'i-Scream arts',
      url: window.location.origin,
      // Long definition for schema description
      description: language === 'ko'
        ? '아이스크림아트는 AI 기반 디지털 아트 플랫폼 \'아트봉봉\'을 통해 전 세계 아이들에게 창의적 드로잉 경험을 제공합니다. 아이들의 숨은 재능을 발견하고 글로벌 문화 교류를 이끄는 디지털 미술 교육의 표준을 제시합니다.'
        : 'i-Scream arts empowers children worldwide through \'Art Bonbon,\' the world\'s first AI-driven digital art platform. We nurture creativity and global connection, helping young artists discover their talents and share their unique stories through digital drawing.',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Korean', 'English'],
      },
    };

    let script = document.querySelector('#organization-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'organization-schema';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      script?.remove();
    };
  }, [language]);

  return null;
}
