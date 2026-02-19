import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/corporate/SEO';

export default function NewsroomPage() {
  const { t, language } = useLanguage();

  const newsItems = [
    {
      date: '2025.08.14',
      titleKo: "아트봉봉, 광주 '빛나는 아이나라'에 디지털드로잉 플랫폼 적용…아이들의 소통 창구로",
      titleEn: "ART BONBON Digital Drawing Platform Applied to Gwangju 'Shining Ainara'... A Communication Channel for Children",
      url: 'https://edu.donga.com/news/articleView.html?idxno=93467',
    },
    {
      date: '2025.08.07',
      titleKo: '도봉아이나라 도서관, 아트봉봉과 함께하는 창의 영어 미술 수업 운영',
      titleEn: 'Dobong Ainara Library Runs Creative English Art Classes with ART BONBON',
      url: 'https://edu.donga.com/news/articleView.html?idxno=93134',
    },
    {
      date: '2025.07.31',
      titleKo: '아트봉봉×꾸그, 디지털드로잉 온라인클래스 이벤트',
      titleEn: 'ART BONBON × Gguge Digital Drawing Online Class Event',
      url: 'https://www.sentv.co.kr/article/view/sentv202507310156#rs',
    },
    {
      date: '2025.07.23',
      titleKo: "'AI 교육 플랫폼' 아트봉봉, 세종 디지털 교육 박람회 참여",
      titleEn: 'AI Education Platform ART BONBON Participates in Sejong Digital Education Expo',
      url: 'https://www.sentv.co.kr/article/view/sentv202507230177',
    },
    {
      date: '2025.07.17',
      titleKo: "미디어아트 전시 '갤러리봉봉', 금남지하도상가 개관…디지털갤러리 시대 열려",
      titleEn: "Media Art Exhibition 'Gallery Bonbon' Opens in Geumnam Underground Mall... Digital Gallery Era Begins",
      url: 'https://edu.donga.com/news/articleView.html?idxno=91934',
    },
  ];

  return (
    <>
      <SEO titleKey="nav.newsroom" />

      <div className="pt-24 md:pt-32 pb-20 bg-background min-h-screen">
        {/* Hero */}
        <section className="container-corporate mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            {language === 'ko' ? '뉴스' : 'News'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            {t('newsroom.subtitle')}
          </p>
        </section>

        {/* News List */}
        <section className="container-corporate">
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white border border-slate-100 rounded-xl p-6 md:p-8 hover:shadow-md hover:border-accent/30 transition-all duration-200"
              >
                {/* Date */}
                <div className="shrink-0">
                  <p className="text-sm text-slate-400 font-mono tabular-nums">
                    {item.date}
                  </p>
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-slate-800 group-hover:text-accent transition-colors leading-snug [word-break:keep-all]">
                    {language === 'ko' ? item.titleKo : item.titleEn}
                  </h2>
                </div>

                {/* External icon */}
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-accent transition-all shrink-0 hidden md:block" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}