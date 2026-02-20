import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, ChevronRight, Sparkles, Globe, Heart, Palette, Brain, Users, Search, Brush, Image } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO, OrganizationSchema } from '@/components/corporate/SEO';
import { Footer } from '@/components/corporate/Footer';
import { ImagePlaceholder } from '@/components/corporate/ImagePlaceholder';
import { AnimatedSection, AnimatedTitle, AnimatedCard } from '@/components/corporate/AnimatedSection';
import { getShuffledArtworks } from '@/utils/heroArtworks';
import impactBgImage from '@/assets/impact-background.png';
import heroChildrenImage from '@/assets/hero-children.jpg';

// Animated Counter Component for Impact Section
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  isMillions?: boolean;
  language: string;
}
function AnimatedCounter({
  target,
  suffix = '+',
  duration = 2,
  isMillions = false,
  language
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true
  });
  useEffect(() => {
    if (isInView) {
      const steps = 50;
      const increment = Math.ceil(target / steps);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration * 1000 / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);
  const formatNumber = () => {
    if (isMillions) {
      return language === 'ko' ? `${count}만` : `${count / 10000 >= 1 ? (count / 10000).toFixed(0) : count}${count >= 10000 ? 'M' : 'K'}`;
    }
    return count.toString();
  };
  return <span ref={ref}>
    {isMillions && language === 'ko' ? `${Math.floor(count / 10000)}만` : isMillions ? `${Math.floor(count / 1000).toLocaleString()}K` : count}
    {count >= target ? suffix : ''}
  </span>;
}

const VALUE_COLORS = [
  { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-500', ring: 'ring-orange-200', text: 'text-orange-600' },
  { bg: 'bg-violet-50', icon: 'bg-violet-100 text-violet-500', ring: 'ring-violet-200', text: 'text-violet-600' },
  { bg: 'bg-rose-50', icon: 'bg-rose-100 text-rose-500', ring: 'ring-rose-200', text: 'text-rose-600' },
  { bg: 'bg-sky-50', icon: 'bg-sky-100 text-sky-500', ring: 'ring-sky-200', text: 'text-sky-600' },
  { bg: 'bg-teal-50', icon: 'bg-teal-100 text-teal-500', ring: 'ring-teal-200', text: 'text-teal-600' },
  { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-500', ring: 'ring-amber-200', text: 'text-amber-600' },
  { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-500', ring: 'ring-emerald-200', text: 'text-emerald-600' },
];

function CoreValuesFlow({ coreValues, t, language }: { coreValues: any[], t: (k: string) => string, language: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 py-8">
      {/* Background Decorative Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-10 opacity-20"
        >
          <Sparkles className="w-24 h-24 text-orange-200" />
        </motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-0 opacity-20"
        >
          <Sparkles className="w-32 h-32 text-sky-200" />
        </motion.div>
      </div>

      {/* Central Connector Line (Standard Version) */}
      <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-1 md:w-1.5 bg-slate-100 md:-translate-x-1/2 rounded-full overflow-hidden">
        <motion.div 
          className="w-full h-full bg-gradient-to-b from-accent/20 via-accent to-accent/20 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      <div className="space-y-12 md:space-y-20 relative z-10">
        {coreValues.map((value, index) => {
          const Icon = value.icon;
          const c = VALUE_COLORS[index % VALUE_COLORS.length];
          const isEven = index % 2 === 0;
          
          return (
            <div key={index} className="relative group">
              {/* Connector Dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 200 }}
                className={`absolute left-[29px] md:left-1/2 top-6 md:top-8 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white bg-accent shadow-md -translate-x-1/2 z-20 flex items-center justify-center`}
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse" />
              </motion.div>

              {/* Node Card */}
              <div className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block md:w-1/2" /> {/* Spacer */}
                
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`
                      relative
                      p-6 md:p-8 rounded-[2rem] bg-white border border-slate-100
                      shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
                    `}
                  >
                    {/* Decorative Blob */}
                    <div className={`absolute -top-3 -right-3 w-12 h-12 ${c.bg} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative flex flex-col items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.icon} shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className={`text-xl md:text-2xl font-bold text-slate-900 tracking-tight`}>
                          {t(value.titleKey)}
                        </h3>
                        <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium [word-break:keep-all]">
                          {t(value.descKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Connector Chevron (Arrow pointing DOWN) */}
              {index < coreValues.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="absolute left-[29px] md:left-1/2 bottom-[-45px] md:bottom-[-65px] -translate-x-1/2 text-accent/40"
                >
                  <ChevronDown className="w-8 h-8 md:w-10 md:h-10 animate-bounce duration-[2000ms]" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Goal Indicator at the bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 md:mt-24 text-center relative z-10"
      >
        <div className="inline-flex flex-col items-center">
          <div className="px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-sm md:text-base mb-4">
            {language === 'ko' ? '최종 목표' : 'Final Goal'}
          </div>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const {
    t,
    language
  } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);


  // 7 Core Values data
  const coreValues = [{
    icon: Sparkles,
    titleKey: 'home.values.1.title',
    descKey: 'home.values.1.desc'
  }, {
    icon: Brain,
    titleKey: 'home.values.5.title',
    descKey: 'home.values.5.desc'
  }, {
    icon: Heart,
    titleKey: 'home.values.6.title',
    descKey: 'home.values.6.desc'
  }, {
    icon: Palette,
    titleKey: 'home.values.newlang.title',
    descKey: 'home.values.newlang.desc'
  }, {
    icon: Globe,
    titleKey: 'home.values.2.title',
    descKey: 'home.values.2.desc'
  }, {
    icon: Users,
    titleKey: 'home.values.3.title',
    descKey: 'home.values.3.desc'
  }, {
    icon: Search,
    titleKey: 'home.values.7.title',
    descKey: 'home.values.7.desc'
  }];

  // 4 Solutions data (for tabs)
  const solutions = [{
    icon: Brush,
    titleKey: 'home.solution.creative.title',
    descKey: 'home.solution.creative.desc',
    tags: ['#수채화', '#유화', '#어린이 창작 마당'],
    tagsEn: ['#Watercolor', '#Oil Painting', '#Creative Playground']
  }, {
    icon: Image,
    titleKey: 'home.solution.gallery.title',
    descKey: 'home.solution.gallery.desc',
    tags: ['#전시∙공유', '#재능∙인재 발굴'],
    tagsEn: ['#Exhibition·Share', '#Talent Discovery']
  }, {
    icon: Brain,
    titleKey: 'home.solution.ai.title',
    descKey: 'home.solution.ai.desc',
    tags: ['#그림-심리 빅데이터', '#AI 튜터'],
    tagsEn: ['#Drawing-Psychology Big Data', '#AI Tutor']
  }, {
    icon: Heart,
    titleKey: 'home.solution.care.title',
    descKey: 'home.solution.care.desc',
    tags: ['#그림심리검사', '#SELart'],
    tagsEn: ['#Mind screening', '#SELart']
  }];

  // Impact stats
  const impactStats = [{
    number: '100만+',
    numberEn: '1M+',
    labelKey: 'home.impact.drawings.label',
    subKey: 'home.impact.drawings.sub'
  }, {
    number: '100+',
    numberEn: '100+',
    labelKey: 'home.impact.patents.label',
    subKey: 'home.impact.patents.sub'
  }];

  // Company history data
  const historyData = language === 'ko' ? {
    '2026': [{
      month: '01',
      item: '영국 런던 Bett Show 출전'
    }],
    '2025': [{
      month: '12',
      item: '빗속의 사람 그림검사 논문 게재'
    }, {
      month: '09',
      item: '2025 고등교육 소프트랩 실증 기업 선정'
    }, {
      month: '08',
      item: "광주광역시 금남로 지하도 상가 '빛나는 아이나라' 오픈"
    }, {
      month: '07',
      item: '일본 TBS-아트봉봉 POC 계약 체결'
    }, {
      month: '06',
      item: '경기도 초등학교 5곳 그림심리검사 현장 실증'
    }, {
      month: '05',
      item: '광주 AI.SW 축전 참가, 수출바우처 사업 선정, 아트봉봉 스마트폰 앱 론칭'
    }, {
      month: '03',
      item: '아트봉봉 1:1 클래스 리뉴얼, 연령별 쥬에/몽드/데씨네 커리큘럼 개발 완료, 대만 교육부 플랫폼 내 아트봉봉 오픈, 2025년 서울시교육청 AISW 선정 (2년 연속)'
    }, {
      month: '02',
      item: '서울교대 늘봄학교 프로그램 선정'
    }, {
      month: '01',
      item: '그림심리검사 논문 투고'
    }],
    '2024': [{
      month: '11',
      item: '싱가포르 에듀테크 아시아 참가, 아트봉봉 글로벌 버전 론칭'
    }, {
      month: '09',
      item: '학교용 서비스 아트봉봉스쿨(창작도구, 그림심리검사) 론칭'
    }, {
      month: '08',
      item: '경기도교육청 에듀테크소프트랩 실증 프로그램 선정'
    }, {
      month: '06',
      item: 'AI그림심리검사 페이지 구축, B2C/B2G AI분석 리포트 완성'
    }, {
      month: '05',
      item: '도쿄 Edix 출전, 클로컬 박람회 출전'
    }, {
      month: '04',
      item: 'Nvidia Inception 선정, 아트봉봉 신규 플러스 앱 론칭'
    }, {
      month: '03',
      item: '전남학생교육수당 프로그램, 서울시교육청 2,000명 사용'
    }, {
      month: '01',
      item: 'Bett Show 출전'
    }],
    '2023': [{
      month: '12',
      item: '아트봉봉 New 플랫폼 개발, 서울시교육청 플랫폼 탑재/사용성 평가 진행/교사 연수, 광주 동구 컨소시엄 참여'
    }, {
      month: '09',
      item: '아이스크림홈런 내 아트봉봉 론칭, 두바이 Gess Awards Finalist 진출'
    }, {
      month: '06',
      item: '학교, 교육청 대상 아트봉봉 계약'
    }, {
      month: '05',
      item: '광주 AI·SW 축전 출전'
    }, {
      month: '04',
      item: '미국 ASU+GSV Summit 출전, 이탈리아 볼로냐 국제아동도서전 출전'
    }, {
      month: '03',
      item: '영국 런던 Bett Show 출전'
    }],
    '2022': [{
      month: '11',
      item: '싱가포르 Edutech Asia 참가, AES 글로벌 어워드 은상 수상, ZOOM topia 참가 (실리콘 밸리)'
    }, {
      month: '06',
      item: '세계 최초 1:1 실시간 화상 미술 수업 론칭'
    }, {
      month: '01',
      item: '아트봉봉 드로잉 툴 유화/수채화 CBT 진행'
    }],
    '2021': [{
      month: '11',
      item: "디지털 아트 플랫폼 '아트봉봉' 베타 버전 오픈"
    }]
  } : {
    '2026': [{
      month: '01',
      item: 'Bett Show London Exhibition'
    }],
    '2025': [{
      month: '12',
      item: '"Person in the Rain" Drawing Test Research Paper Published'
    }, {
      month: '09',
      item: '2025 Higher Education SoftLab Pilot Company Selected'
    }, {
      month: '08',
      item: "Gwangju 'Shining Ainara' Gallery Opened"
    }, {
      month: '07',
      item: 'Japan TBS-ART BONBON POC Contract Signed'
    }, {
      month: '06',
      item: 'Field testing of drawing psychology test at 5 Gyeonggi-do elementary schools'
    }, {
      month: '05',
      item: 'Gwangju AI·SW Festival, Export Voucher Selection, ART BONBON Smartphone App Launch'
    }, {
      month: '03',
      item: 'ART BONBON 1:1 Class Renewal, Age-based Curriculum Complete, Taiwan MOE Platform Launch, Seoul MOE AISW Selection (2nd year)'
    }, {
      month: '02',
      item: 'Seoul National University Neulbom Program Selection'
    }, {
      month: '01',
      item: 'Drawing Psychology Research Paper Submission'
    }],
    '2024': [{
      month: '11',
      item: 'Singapore EdTech Asia, ART BONBON Global Version Launch'
    }, {
      month: '09',
      item: 'ART BONBON SCHOOL Launch (Creative Tools, Drawing Psychology Test)'
    }, {
      month: '08',
      item: 'Gyeonggi-do EdTech SoftLab Program Selection'
    }, {
      month: '06',
      item: 'AI Drawing Psychology Test Page, B2C/B2G AI Report Complete'
    }, {
      month: '05',
      item: 'Tokyo Edix Exhibition, Clocal Expo'
    }, {
      month: '04',
      item: 'Nvidia Inception Selection, ART BONBON Plus App Launch'
    }, {
      month: '03',
      item: 'Jeonnam Student Education Program, Seoul MOE 2,000 Users'
    }, {
      month: '01',
      item: 'Bett Show Exhibition'
    }],
    '2023': [{
      month: '12',
      item: 'ART BONBON New Platform Development, Seoul MOE Platform Integration, Teacher Training, Gwangju Dong-gu Consortium'
    }, {
      month: '09',
      item: 'ART BONBON Launch in i-Scream Homelearn, Dubai Gess Awards Finalist'
    }, {
      month: '06',
      item: 'School & Education Office ART BONBON Contracts'
    }, {
      month: '05',
      item: 'Gwangju AI·SW Festival Exhibition'
    }, {
      month: '04',
      item: 'ASU+GSV Summit USA, Bologna Children\'s Book Fair Italy'
    }, {
      month: '03',
      item: 'Bett Show London Exhibition'
    }],
    '2022': [{
      month: '11',
      item: 'Singapore Edutech Asia, AES Global Awards Silver, ZOOMtopia Silicon Valley'
    }, {
      month: '06',
      item: 'World\'s First 1:1 Real-time Online Art Class Launch'
    }, {
      month: '01',
      item: 'ART BONBON Drawing Tool Oil/Watercolor CBT'
    }],
    '2021': [{
      month: '11',
      item: "Digital Art Platform 'ART BONBON' Beta Version Open"
    }]
  };
  const historyYears = Object.keys(historyData).sort((a, b) => Number(b) - Number(a));
  const displayedYears = showAllHistory ? historyYears : historyYears.slice(0, 3);
  // Load and shuffle hero artworks on mount
  const [heroArtworks, setHeroArtworks] = useState<string[]>([]);

  useEffect(() => {
    // Get 30 random artworks from the pool of 51+ images for richer loop variety
    const shuffled = getShuffledArtworks(30);
    setHeroArtworks(shuffled);
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      <SEO />
      <OrganizationSchema />

      {/* ─────────────────────────────────────────────────────────────
          Section 1: Hero — ClassDojo-style: centered copy + artwork stream
      ───────────────────────────────────────────────────────────── */}
      <section className="scroll-snap-section relative overflow-hidden bg-[#FAF8F4] flex flex-col justify-start pt-0 pb-0 min-h-screen">

        {/* ── Blob layer ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-orange-300/75 blur-[80px] blob-animate-slow" />
          <div className="absolute -top-20 right-0 w-[520px] h-[520px] bg-rose-300/65 blur-[75px] blob-animate-medium" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-sky-300/55 blur-[75px] blob-animate-slow-delay" />
          <div className="absolute bottom-0 -left-20 w-[460px] h-[460px] bg-teal-300/60 blur-[75px] blob-animate-medium-delay" />
          <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] bg-violet-300/50 blur-[65px] blob-animate-fast" />
          <div className="absolute top-1/3 right-10 w-[320px] h-[320px] bg-amber-300/60 blur-[65px] blob-animate-slow" />
        </div>

        {/* ── Centered copy ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-8 pt-20 md:pt-24 pb-4">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ring-1 ring-accent/25 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('brand.tagline')}
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.08] [word-break:keep-all] mb-4 max-w-3xl"
          >
            {t('home.headline')}
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-600/90 leading-relaxed mb-5 [word-break:keep-all] max-w-xl"
          >
            {t('home.slogan')}
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-9 py-4 rounded-2xl text-base font-semibold hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('cta.explore_products')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 text-slate-700 border border-white/60 bg-white/60 backdrop-blur-sm px-9 py-4 rounded-2xl text-base font-medium hover:bg-white/80 transition-all duration-200 shadow-sm"
            >
              {t('cta.contact')}
            </Link>
          </motion.div>
        </div>

        {/* ── Student Artwork Stream ── */}
        <div className="relative z-10 w-full min-w-0 mt-auto overflow-hidden pb-0">
          {/* Gallery label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="text-center text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4"
          >
            {language === 'ko' ? '아이들이 만든 작품들' : 'Created by our young artists'}
          </motion.p>

          {/* Infinite scrolling strip with wavy curve */}
          <div className="artwork-strip relative w-full overflow-hidden py-6" style={{ contain: 'paint' }}>
            <div className="artwork-track px-4">
              {[...heroArtworks, ...heroArtworks].map((src, i) => {
                // Wave offset: sine curve gives each card a different Y position
                const waveOffset = Math.sin((i % heroArtworks.length) * 0.72) * 20; // px, ±20px amplitude
                // Height pattern cycles through 5 sizes - Scaled down for laptop fit
                const heights = [140, 115, 165, 130, 155];
                const h = heights[i % heights.length];

                return (
                  <div
                    key={`stream-${i}`}
                    className="group artwork-card-inner relative flex-shrink-0 mx-2 hover:z-50"
                    style={{
                      transform: `translateY(${waveOffset}px)`,
                      // Bouncy float animation: varies duration (3s-4.5s) and delay per item
                      animation: `float-bob ${3 + (i % 4) * 0.5}s ease-in-out infinite`,
                      animationDelay: `-${i * 0.7}s`
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/70 transition-all duration-400 group-hover:shadow-2xl group-hover:scale-[1.2] group-hover:ring-4 group-hover:ring-accent/40 group-hover:-translate-y-4"
                      style={{ width: 140, height: h }}
                    >
                      <img
                        src={src}
                        alt={language === 'ko' ? `학생 작품` : `Student artwork`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 7 Core Values - Dynamic Flow Layout */}
      <section className="scroll-snap-section section-divider bg-[#FAF8F4]/50 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-orange-100/40 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-100/30 blur-[100px] rounded-full" />
        </div>

        <AnimatedSection className="w-full container-corporate relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16 md:mb-24 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-wider"
            >
              CORE VALUES
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight [word-break:keep-all]">
              {t('home.values.section.title')}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed [word-break:keep-all]">
              {language === 'ko'
                ? '아이들에게 전달하고자 하는 7가지 핵심 가치, 최종 목표는 숨은 재능·적성 파악입니다'
                : '7 core values we deliver to children — the pinnacle: identifying hidden talents & aptitudes'}
            </p>
          </div>

          {/* 7 Core Values Dynamic Flow */}
          <CoreValuesFlow coreValues={coreValues} t={t} language={language} />
        </AnimatedSection>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          Sections 3a–3b: Our Solutions — 2 solutions per fullscreen section
      ──────────────────────────────────────────────────────────────── */}
      {
        [[0, 1], [2, 3]].map((pair, sectionIdx) => {
          const sectionBg = sectionIdx === 0 ? 'bg-background' : 'bg-slate-50/70';
          const accentColorsList = [
            { pill: 'bg-orange-50 text-orange-600 ring-orange-200', icon: 'bg-orange-100 text-orange-500', num: 'text-orange-500', bar: 'bg-orange-400' },
            { pill: 'bg-violet-50 text-violet-600 ring-violet-200', icon: 'bg-violet-100 text-violet-500', num: 'text-violet-500', bar: 'bg-violet-400' },
            { pill: 'bg-sky-50 text-sky-600 ring-sky-200', icon: 'bg-sky-100 text-sky-500', num: 'text-sky-500', bar: 'bg-sky-400' },
            { pill: 'bg-rose-50 text-rose-600 ring-rose-200', icon: 'bg-rose-100 text-rose-500', num: 'text-rose-500', bar: 'bg-rose-400' },
          ];
          const videoSlugs = ['creative', 'gallery', 'ai', 'care'];

          return (
            <section
              key={sectionIdx}
              className={`scroll-snap-section section-divider relative overflow-hidden ${sectionBg}`}
            >
              <div className="container-corporate w-full flex flex-col justify-center py-16 md:py-20 px-6 md:px-8 lg:px-12">

                {/* Section eyebrow — only on first section */}
                {sectionIdx === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10 md:mb-12"
                  >
                    <p className="text-xs font-semibold tracking-widest text-accent/70 uppercase mb-3">
                      {t('home.solution.section.title')}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                      {language === 'ko' ? '아이스크림아트의 4가지 솔루션' : '4 Core Solutions'}
                    </h2>
                  </motion.div>
                )}

                {/* Two solution cards */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                  {pair.map((solIdx) => {
                    const solution = solutions[solIdx];
                    const Icon = solution.icon;
                    const tags = language === 'ko' ? solution.tags : solution.tagsEn;
                    const accent = accentColorsList[solIdx];
                    const videoSrc = `/videos/solutions/solution-${solIdx + 1}-${videoSlugs[solIdx]}`;

                    return (
                      <motion.div
                        key={solution.titleKey}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, delay: (solIdx % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-5"
                      >
                        {/* 16:9 Video */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 aspect-video bg-slate-100">
                          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                            <source src={`${videoSrc}.webm`} type="video/webm" />
                            <source src={`${videoSrc}.mp4`} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                          {/* Number badge on video */}
                          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold text-white backdrop-blur-sm bg-black/30`}>
                            0{solIdx + 1} / 04
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="flex flex-col gap-3 px-1">
                          {/* Icon + Title row */}
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent.icon}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug [word-break:keep-all]">
                              {t(solution.titleKey)}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-sm md:text-base text-slate-600 leading-relaxed [word-break:keep-all]">
                            {t(solution.descKey)}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag, ti) => (
                              <span
                                key={ti}
                                className={`text-xs font-semibold px-3 py-1 rounded-full ring-1 ${accent.pill}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })
      }



      {/* Section 4: Impact by Numbers */}
      <section className="scroll-snap-section section-divider px-6 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Background Image with Dimmed Overlay */}
        <div className="absolute inset-0">
          <img
            src={impactBgImage}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay — strong enough for text legibility */}
          <div className="absolute inset-0 bg-black/93" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/60" />
        </div>

        <AnimatedSection className="container-corporate w-full relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <AnimatedTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t('home.impact.section.title')}
            </AnimatedTitle>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Drawing Data Card */}
            <AnimatedCard index={0}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-10 text-center card-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <p className="text-5xl md:text-6xl font-bold text-accent mb-3">
                  <AnimatedCounter target={1000000} suffix="+" duration={2.5} isMillions={true} language={language} />
                </p>
                <p className="text-lg font-semibold text-white mb-2">
                  {t('home.impact.drawings.label')}
                </p>
                <p className="text-sm text-white/70">
                  {t('home.impact.drawings.sub')}
                </p>
              </div>
            </AnimatedCard>

            {/* Patents Card */}
            <AnimatedCard index={1}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-10 text-center card-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <p className="text-5xl md:text-6xl font-bold text-accent mb-3">
                  <AnimatedCounter target={100} suffix="+" duration={2} isMillions={false} language={language} />
                </p>
                <p className="text-lg font-semibold text-white mb-2">
                  {t('home.impact.patents.label')}
                </p>
                <p className="text-sm text-white/70">
                  {t('home.impact.patents.sub')}
                </p>
              </div>
            </AnimatedCard>
          </div>
        </AnimatedSection>
      </section>

      {/* Section 6: Company History */}
      <section className="scroll-snap-section section-divider px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-orange-200/25 blur-3xl blob-animate-slow pointer-events-none" />
        <div className="absolute bottom-1/4 -left-16 w-64 h-64 rounded-full bg-rose-200/20 blur-3xl blob-animate-medium pointer-events-none" />
        <AnimatedSection className="container-corporate w-full relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <AnimatedTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t('home.history.title')}
            </AnimatedTitle>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line - orange */}
            <motion.div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-accent/40 rounded-full origin-top" initial={{
              scaleY: 0
            }} whileInView={{
              scaleY: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 1,
              ease: "easeOut"
            }} />

            {displayedYears.map((year, yearIndex) => <motion.div key={year} className="relative mb-10 last:mb-0" initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: yearIndex * 0.15
            }}>
              {/* Year marker - orange circle badge */}
              <div className="flex items-center mb-5">
                <motion.div className="absolute left-4 md:left-8 w-5 h-5 -translate-x-1/2 rounded-full bg-accent border-4 border-background shadow-lg z-10" initial={{
                  scale: 0
                }} whileInView={{
                  scale: 1
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.3,
                  delay: yearIndex * 0.15 + 0.2
                }} />
                <span className="ml-14 md:ml-24 text-2xl md:text-3xl font-bold text-accent">
                  {year}{language === 'ko' ? '년' : ''}
                </span>
              </div>

              {/* Events - wrapped in cards */}
              <div className="ml-14 md:ml-24 space-y-4">
                {historyData[year as keyof typeof historyData].map((event, eventIndex) => <motion.div key={eventIndex} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-slate-100" initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true,
                  margin: "-30px"
                }} transition={{
                  duration: 0.4,
                  delay: yearIndex * 0.1 + eventIndex * 0.05
                }}>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-12 h-7 rounded-lg bg-accent/10 text-accent font-semibold text-sm shrink-0 border border-accent/20">
                      {language === 'ko' ? `${event.month}월` : event.month}
                    </span>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {event.item}
                    </p>
                  </div>
                </motion.div>)}
              </div>
            </motion.div>)}

            {/* Show more / less button */}
            {historyYears.length > 3 && <motion.div className="mt-10 text-center" initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.5
            }}>
              <button onClick={() => setShowAllHistory(!showAllHistory)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent text-sm font-semibold transition-all duration-200 border border-accent/20 hover:border-accent/40">
                {showAllHistory ? <>
                  {t('about.timeline.showless')}
                  <ChevronUp className="w-4 h-4" />
                </> : <>
                  {t('about.timeline.showall')}
                  <ChevronDown className="w-4 h-4" />
                </>}
              </button>
            </motion.div>}
          </div>
        </AnimatedSection>
      </section>


      {/* Unified Footer inside scroll container */}
      <div className="scroll-snap-section snap-auto">
        <Footer variant="inline" />
      </div>
    </div>
  );
}