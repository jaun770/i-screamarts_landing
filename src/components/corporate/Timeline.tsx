import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface KeyMilestone {
  year: string;
  highlight: string;
}

export function Timeline() {
  const { language, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Key milestones - 5 highlights only
  const keyMilestones: KeyMilestone[] = language === 'ko' ? [
    { year: '2025', highlight: '광주 AI·SW 축전 참가 & 수출바우처 사업 선정' },
    { year: '2024', highlight: '싱가포르 에듀테크 아시아 참가 & 아트봉봉스쿨 론칭' },
    { year: '2023', highlight: '아트봉봉 New 플랫폼 개발 & 두바이 Gess Awards Finalist' },
    { year: '2022', highlight: '세계 최초 1:1 실시간 화상 미술 수업 론칭' },
    { year: '2021', highlight: "디지털 아트 플랫폼 '아트봉봉' 베타 버전 오픈" },
  ] : [
    { year: '2025', highlight: 'Gwangju AI·SW Festival Participation & Export Voucher Selection' },
    { year: '2024', highlight: 'Singapore EdTech Asia & Art Bon Bon School Launch' },
    { year: '2023', highlight: 'Art Bon Bon New Platform Development & Dubai Gess Awards Finalist' },
    { year: '2022', highlight: "World's First 1:1 Real-time Online Art Class Launch" },
    { year: '2021', highlight: "Digital Art Platform 'Art Bon Bon' Beta Version Open" },
  ];

  // Full detailed milestones (shown when expanded)
  const allMilestones = language === 'ko' ? {
    '2025': [
      { month: '06', item: "광주광역시 금남로 지하도 상가 '빛나는 아이나라' 오픈" },
      { month: '05', item: '광주 AI·SW 축전 참가, 수출바우처 사업 선정' },
      { month: '03', item: '아트봉봉 1:1 클래스 리뉴얼, 대만 교육부 플랫폼 내 아트봉봉 오픈' },
      { month: '02', item: '서울교대 늘봄학교 프로그램 선정' },
    ],
    '2024': [
      { month: '11', item: '싱가포르 에듀테크 아시아 참가' },
      { month: '09', item: '아트봉봉스쿨 론칭' },
      { month: '05', item: '도쿄 Edix 출전' },
      { month: '04', item: 'Nvidia Inception 선정' },
    ],
    '2023': [
      { month: '12', item: '아트봉봉 New 플랫폼 개발' },
      { month: '09', item: '두바이 Gess Awards Finalist 진출' },
      { month: '04', item: '이탈리아 볼로냐 국제아동도서전 출전' },
    ],
    '2022': [
      { month: '11', item: 'AES 글로벌 어워드 은상 수상' },
      { month: '06', item: '세계 최초 1:1 실시간 화상 미술 수업 론칭' },
    ],
    '2021': [
      { month: '11', item: "디지털 아트 플랫폼 '아트봉봉' 베타 버전 오픈" },
    ],
  } : {
    '2025': [
      { month: '06', item: "Gwangju 'Shining Ainara' Gallery Opened" },
      { month: '05', item: 'Gwangju AI·SW Festival, Export Voucher Selection' },
      { month: '03', item: 'Art Bon Bon 1:1 Class Renewal, Taiwan MOE Platform Launch' },
      { month: '02', item: 'Seoul National University Neulbom Program Selection' },
    ],
    '2024': [
      { month: '11', item: 'Singapore EdTech Asia Participation' },
      { month: '09', item: 'Art Bon Bon School Launch' },
      { month: '05', item: 'Tokyo Edix Exhibition' },
      { month: '04', item: 'Nvidia Inception Selection' },
    ],
    '2023': [
      { month: '12', item: 'Art Bon Bon New Platform Development' },
      { month: '09', item: 'Dubai Gess Awards Finalist' },
      { month: '04', item: 'Bologna International Children\'s Book Fair' },
    ],
    '2022': [
      { month: '11', item: 'AES Global Awards Silver' },
      { month: '06', item: 'World\'s First 1:1 Real-time Art Class Launch' },
    ],
    '2021': [
      { month: '11', item: "Digital Art Platform 'Art Bon Bon' Beta Open" },
    ],
  };

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [language, showAll]);

  return (
    <div ref={timelineRef} className="relative max-w-4xl mx-auto pb-4">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-accent/30" />
      
      {keyMilestones.map((milestone, index) => (
        <div key={milestone.year} className="relative mb-6 last:mb-0">
          {/* Main milestone */}
          <div 
            className="timeline-item opacity-0 translate-y-4 transition-all duration-500 relative flex items-start"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Large circle marker */}
            <div className="absolute left-4 md:left-8 w-5 h-5 -translate-x-1/2 rounded-full bg-accent border-4 border-foreground z-10 mt-1" />
            
            {/* Content */}
            <div className="ml-12 md:ml-20 flex-1">
              <div className="bg-background/10 backdrop-blur-sm rounded-xl p-4 md:p-5 hover:bg-background/15 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  {/* Year badge */}
                  <span className="text-2xl md:text-3xl font-bold text-accent shrink-0">
                    {milestone.year}
                  </span>
                  
                  {/* Highlight text */}
                  <p className="text-background text-base md:text-lg font-medium leading-relaxed">
                    {milestone.highlight}
                  </p>
                </div>
              </div>
              
              {/* Expanded details */}
              {showAll && allMilestones[milestone.year as keyof typeof allMilestones] && (
                <div className="mt-3 ml-2 space-y-2">
                  {allMilestones[milestone.year as keyof typeof allMilestones].map((detail, detailIndex) => (
                    <div 
                      key={detailIndex}
                      className="timeline-item opacity-0 translate-y-2 transition-all duration-300 flex items-start gap-3"
                      style={{ transitionDelay: `${detailIndex * 50}ms` }}
                    >
                      {/* Small dot */}
                      <div className="w-2 h-2 rounded-full bg-accent/50 shrink-0 mt-2" />
                      
                      {/* Month badge */}
                      <span className="inline-flex items-center justify-center w-8 h-6 rounded bg-accent/20 text-accent font-medium text-xs shrink-0">
                        {detail.month}
                      </span>
                      
                      {/* Detail text */}
                      <p className="text-background/80 text-sm leading-relaxed">
                        {detail.item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* Show all / Show less button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/10 hover:bg-background/20 text-background text-sm font-medium transition-colors"
        >
          {showAll ? (
            <>
              {t('about.timeline.showless')}
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {t('about.timeline.showall')}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
