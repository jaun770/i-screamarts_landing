import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone } from 'lucide-react';
import logoIscreamartsColor from '@/assets/logo-iscreamarts-color.png';
interface FooterProps {
  /** Use inline variant for scroll-snap containers (no outer wrapper) */
  variant?: 'default' | 'inline';
}
export function Footer({
  variant = 'default'
}: FooterProps) {
  const {
    t,
    language
  } = useLanguage();
  const companyLinks = [{
    path: '/news',
    labelKey: 'nav.news'
  }, {
    path: '/contact',
    labelKey: 'nav.contact'
  }, {
    url: 'https://www.jobkorea.co.kr/Recruit/Co_Read/Recruit/C/33685064',
    labelKey: 'footer.careers',
    external: true
  }];
  const productLinks = [{
    url: 'https://art-bonbon.com/',
    labelKey: 'home.products.b2c.name'
  }, {
    url: 'https://school-teacher.art-bonbon.com/',
    labelKey: 'home.products.school.name'
  }, {
    url: 'https://www.bonbonecole.com/',
    labelKey: 'home.products.ecole.name'
  }];
  const familySiteLinks = [
    {
      labelKo: '아이스크림미디어',
      labelEn: 'i-Scream media',
      urlKo: 'https://www.i-screammedia.com/',
      urlEn: 'https://www.i-screammedia.com/en/'
    },
    {
      labelKo: '아이스크림에듀',
      labelEn: 'i-Scream edu',
      urlKo: 'https://www.home-learn.co.kr/',
      urlEn: 'https://www.home-learn.co.kr/'
    },
    {
      labelKo: '시공테크',
      labelEn: 'SIGONGtech',
      urlKo: 'https://www.sigongtech.co.kr/',
      urlEn: 'https://www.sigongtech.com/en/'
    },
    {
      labelKo: '시공문화',
      labelEn: 'SIGONGmunhwa',
      urlKo: 'http://sigongmunhwa.co.kr/',
      urlEn: 'http://sigongmunhwa.co.kr/'
    }
  ];
  const footerContent = <>
    {/* 3-Column Link Area */}
    <div className="grid grid-cols-12 gap-y-8 gap-x-4 md:gap-x-8 mb-12">
      {/* Company - 1/3 on tablet */}
      <div className="col-span-12 md:col-span-4">
        <h4 className="font-semibold text-sm mb-3 md:mb-4 text-background/80">{t('footer.company')}</h4>
        <ul className="space-y-2">
          {companyLinks.map(link => <li key={(link as any).path || (link as any).url + link.labelKey}>
            {(link as any).external ? <a href={(link as any).url} target="_blank" rel="noopener noreferrer" className="text-sm text-background/50 hover:text-background transition-colors">
              {t(link.labelKey)}
            </a> : <Link to={(link as any).path} className="text-sm text-background/50 hover:text-background transition-colors">
              {t(link.labelKey)}
            </Link>}
          </li>)}
        </ul>
      </div>

      {/* Products - 1/3 on tablet */}
      <div className="col-span-6 md:col-span-4">
        <h4 className="font-semibold text-sm mb-3 md:mb-4 text-background/80">{t('footer.products')}</h4>
        <ul className="space-y-2">
          {productLinks.map(link => <li key={link.labelKey}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-background/50 hover:text-background transition-colors">
              {t(link.labelKey)}
            </a>
          </li>)}
        </ul>
      </div>

      {/* Family Site - 1/3 on tablet */}
      <div className="col-span-6 md:col-span-4">
        <h4 className="font-semibold text-sm mb-3 md:mb-4 text-background/80">{language === 'ko' ? '패밀리 사이트' : 'Family Site'}</h4>
        <ul className="space-y-2">
          {familySiteLinks.map(link => <li key={link.labelEn}>
            <a
              href={language === 'ko' ? link.urlKo : link.urlEn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-background/50 hover:text-background transition-colors"
            >
              {language === 'ko' ? link.labelKo : link.labelEn}
            </a>
          </li>)}
        </ul>
      </div>
    </div>

    {/* Company Info Block */}
    <div className="pt-10 border-t border-background/15">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Brand Logo & Address */}
        <div className="space-y-3 md:max-w-lg">
          <Link to="/" className="inline-block gentle-animation hover:opacity-80 mb-1">
            <img
              src={logoIscreamartsColor}
              alt={language === 'ko' ? '아이스크림아트 로고' : 'i-Scream arts logo'}
              className="h-7 md:h-8 w-auto"
            />
          </Link>
          <p className="text-sm text-background/60 leading-relaxed whitespace-pre-line">
            {language === 'ko'
              ? '경기도 성남시 분당구 대왕판교로 660, B1F 패스트파이브 121호 (유스페이스1)\n대표 박기석'
              : '660 Daewangpangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, B1F FastFive #121 (U-SPACE 1)\nCEO Park Ki-seok'}
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2 text-sm text-background/60 items-start md:items-end justify-center">
          <a href="mailto:support@i-screamarts.com" className="inline-flex items-center gap-2 hover:text-background transition-colors duration-200 underline-offset-4 hover:underline py-1">
            <Mail className="w-4 h-4" />
            support@i-screamarts.com
          </a>
          <a href={language === 'ko' ? 'tel:1833-2477' : 'tel:+82-1833-2477'} className="inline-flex items-center gap-2 hover:text-background transition-colors duration-200 underline-offset-4 hover:underline py-1">
            <Phone className="w-4 h-4" />
            {language === 'ko' ? '1833-2477' : '+82-1833-2477'}
          </a>
        </div>
      </div>

      {/* Policy Note & Product Sites */}
      <div className="mt-8 pt-6 border-t border-background/10 space-y-3">
        <p className="text-sm text-background/50">
          {language === 'ko' ? '개인정보처리방침 및 이용약관은 각 제품 사이트에서 제공됩니다.' : 'Privacy Policy and Terms are provided on each product site.'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-background/50">

          <span className="text-background/60">{t('home.products.school.name')}</span>
          <span className="text-background/30">·</span>
          <span className="text-background/60">{t('home.products.b2c.name')}</span>
          <span className="text-background/30">·</span>
          <span className="text-background/60">{t('home.products.ecole.name')}</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8">
        <p className="text-sm text-background/50">
          © {new Date().getFullYear()} i-Scream arts Co., Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  </>;

  // Inline variant for scroll-snap containers
  if (variant === 'inline') {
    return <div className="bg-foreground text-background border-t border-background/10">
      <div className="container-corporate py-12 md:py-16 pt-14 md:pt-20">
        {footerContent}
      </div>
    </div>;
  }

  // Default variant with footer wrapper
  return <footer className="bg-foreground text-background">
    {/* Top border accent */}
    <div className="h-px bg-background/15" />

    <div className="container-corporate py-12 md:py-16 pt-14 md:pt-20">
      {footerContent}
    </div>
  </footer>;
}