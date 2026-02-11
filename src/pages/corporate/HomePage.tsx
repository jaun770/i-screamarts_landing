import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, ChevronRight, Sparkles, Globe, Heart, Palette, Brain, Users, Search, Brush, Image } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO, OrganizationSchema } from '@/components/corporate/SEO';
import { Footer } from '@/components/corporate/Footer';
import { ImagePlaceholder } from '@/components/corporate/ImagePlaceholder';
import { AnimatedSection, AnimatedTitle, AnimatedCard } from '@/components/corporate/AnimatedSection';
import impactBgImage from '@/assets/impact-background.png';

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

// Pyramid Value Card Component - Consistent heights for all languages
interface PyramidValueCardProps {
  value: {
    icon: React.ComponentType<{
      className?: string;
    }>;
    titleKey: string;
    descKey: string;
  };
  t: (key: string) => string;
  isPinnacle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
function PyramidValueCard({
  value,
  t,
  isPinnacle,
  size = 'md'
}: PyramidValueCardProps) {
  const Icon = value.icon;
  
  // Size-based styling for vertical stack layout
  const sizeStyles = {
    sm: {
      padding: 'p-4 pb-5',
      iconWrapper: 'w-10 h-10',
      icon: 'w-5 h-5',
      title: 'text-sm font-semibold',
      desc: 'text-xs'
    },
    md: {
      padding: 'p-5 pb-6',
      iconWrapper: 'w-12 h-12',
      icon: 'w-6 h-6',
      title: 'text-base font-semibold',
      desc: 'text-sm'
    },
    lg: {
      padding: 'p-6 pb-7',
      iconWrapper: 'w-14 h-14',
      icon: 'w-7 h-7',
      title: 'text-lg font-bold',
      desc: 'text-sm'
    }
  };

  const styles = sizeStyles[size];

  return (
    <div className={`
      h-full flex flex-col items-center text-center
      bg-[#1A1A1A] rounded-xl shadow-lg 
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
      border border-white/10 
      ${styles.padding}
      ${isPinnacle ? 'border-accent/30 bg-gradient-to-br from-accent/10 to-[#1A1A1A] ring-2 ring-accent/20 animate-pulse-glow' : ''}
    `}>
      {/* Icon at top */}
      <div className={`
        ${styles.iconWrapper} 
        rounded-xl flex items-center justify-center mb-3
        ${isPinnacle ? 'bg-accent/20' : 'bg-accent/10'}
      `}>
        <Icon className={`${styles.icon} text-accent`} />
      </div>
      
      {/* Text content */}
      <div className="flex-1 flex flex-col">
        <h3 className={`${styles.title} text-white mb-2 leading-snug`}>
          {t(value.titleKey)}
        </h3>
        <p className={`${styles.desc} text-white/60 leading-relaxed`}>
          {t(value.descKey)}
        </p>
      </div>
    </div>
  );
}

// SVG Connecting Lines Component for pyramid visual flow
interface ConnectingLinesProps {
  isVisible: boolean;
}
function ConnectingLines({
  isVisible
}: ConnectingLinesProps) {
  return <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="line-gradient-up" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      {/* Lines from Level 3 (base) to Level 2 */}
      {/* Left side lines */}
      <motion.path d="M 150 380 Q 150 320 250 280" stroke="url(#line-gradient-up)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={isVisible ? {
      pathLength: 1,
      opacity: 1
    } : {
      pathLength: 0,
      opacity: 0
    }} transition={{
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut"
    }} />
      <motion.path d="M 300 380 Q 300 320 300 280" stroke="url(#line-gradient-up)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={isVisible ? {
      pathLength: 1,
      opacity: 1
    } : {
      pathLength: 0,
      opacity: 0
    }} transition={{
      duration: 0.6,
      delay: 0.35,
      ease: "easeOut"
    }} />
      
      {/* Right side lines */}
      <motion.path d="M 500 380 Q 500 320 500 280" stroke="url(#line-gradient-up)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={isVisible ? {
      pathLength: 1,
      opacity: 1
    } : {
      pathLength: 0,
      opacity: 0
    }} transition={{
      duration: 0.6,
      delay: 0.35,
      ease: "easeOut"
    }} />
      <motion.path d="M 650 380 Q 650 320 550 280" stroke="url(#line-gradient-up)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={isVisible ? {
      pathLength: 1,
      opacity: 1
    } : {
      pathLength: 0,
      opacity: 0
    }} transition={{
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut"
    }} />
      
      {/* Lines from Level 2 to Pinnacle */}
      <motion.path d="M 280 220 Q 320 160 400 120" stroke="url(#line-gradient-up)" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={isVisible ? {
      pathLength: 1,
      opacity: 1
    } : {
      pathLength: 0,
      opacity: 0
    }} transition={{
      duration: 0.5,
      delay: 0.5,
      ease: "easeOut"
    }} />
      <motion.path d="M 520 220 Q 480 160 400 120" stroke="url(#line-gradient-up)" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={isVisible ? {
      pathLength: 1,
      opacity: 1
    } : {
      pathLength: 0,
      opacity: 0
    }} transition={{
      duration: 0.5,
      delay: 0.5,
      ease: "easeOut"
    }} />
    </svg>;
}

// Pyramid Layout with animated connecting lines
interface PyramidWithLinesProps {
  coreValues: Array<{
    icon: React.ComponentType<{
      className?: string;
    }>;
    titleKey: string;
    descKey: string;
  }>;
  t: (key: string) => string;
  language: string;
}
function PyramidWithLines({
  coreValues,
  t,
  language
}: PyramidWithLinesProps) {
  const pyramidRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pyramidRef, {
    once: true,
    margin: "-100px"
  });
  return <div ref={pyramidRef} className="relative max-w-5xl mx-auto px-4">
      {/* Desktop/Tablet: Pyramid Grid Layout with SVG Lines */}
      <div className="hidden md:block relative">
        {/* SVG Connecting Lines - Behind cards */}
        <div className="absolute inset-0 z-0">
          <ConnectingLines isVisible={isInView} />
        </div>
        
        {/* Cards Grid */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Level 1 - Pinnacle (Top): 숨은 재능∙적성 파악 */}
          <motion.div className="w-full max-w-md" initial={{
          opacity: 0,
          y: -30,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}>
            <PyramidValueCard value={coreValues[6]} t={t} isPinnacle size="lg" />
          </motion.div>
          
          {/* Converging arrow indicator */}
          <motion.div className="flex items-center justify-center gap-2 text-accent/60" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.4,
          delay: 0.5
        }}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <ChevronUp className="w-5 h-5" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </motion.div>
          
          {/* Level 2 (2 cards): 글로벌 인재 발굴, 글로벌 소통 */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <motion.div initial={{
            opacity: 0,
            x: -30,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            x: 0,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}>
              <PyramidValueCard value={coreValues[5]} t={t} size="md" />
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            x: 30,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            x: 0,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}>
              <PyramidValueCard value={coreValues[4]} t={t} size="md" />
            </motion.div>
          </div>
          
          {/* Converging arrow indicator */}
          <motion.div className="flex items-center justify-center gap-2 text-accent/60" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.4,
          delay: 0.3
        }}>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <ChevronUp className="w-5 h-5" />
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </motion.div>
          
          {/* Level 3 (4 cards in 2x2 or 4 across): 마음 건강, 드로잉 스킬, 빅데이터, 창의력 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[coreValues[0], coreValues[1], coreValues[2], coreValues[3]].map((value, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1 + index * 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}>
                <PyramidValueCard value={value} t={t} size="sm" />
              </motion.div>)}
          </div>
        </div>
      </div>
      
      {/* Mobile: Vertical Stacked Layout with connectors */}
      <div className="md:hidden flex flex-col gap-3">
        {/* Pinnacle card first */}
        <motion.div initial={{
        opacity: 0,
        y: 20,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0
      }}>
          <PyramidValueCard value={coreValues[6]} t={t} isPinnacle size="md" />
        </motion.div>
        
        {/* Vertical connector */}
        <motion.div className="flex flex-col items-center gap-1 py-1" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.1
      }}>
          <div className="w-px h-4 bg-gradient-to-b from-accent/40 to-accent/10" />
          <ChevronUp className="w-4 h-4 text-accent/40" />
        </motion.div>
        
        {/* All other cards with connectors */}
        {[coreValues[5], coreValues[4], coreValues[2], coreValues[3], coreValues[1], coreValues[0]].map((value, index) => <div key={index}>
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.4,
          delay: 0.1 * (index + 1)
        }}>
              <PyramidValueCard value={value} t={t} size="sm" />
            </motion.div>
            {index < 5 && <motion.div className="flex flex-col items-center gap-1 py-1" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1 * (index + 1)
        }}>
                <ChevronUp className="w-3 h-3 text-accent/30" />
              </motion.div>}
          </div>)}
      </div>
    </div>;
}
export default function HomePage() {
  const {
    t,
    language
  } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
  return <>
      <SEO />
      <OrganizationSchema />
      
      <div ref={containerRef} className="scroll-snap-container bg-background">
        {/* Section 1: Hero - Fullscreen Video Background with Glass Strip */}
        <section className="scroll-snap-section relative overflow-hidden min-h-screen flex flex-col">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/videos/hero-background.webm" type="video/webm" />
              <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Gradient Overlay - Bottom-up for video visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          
          {/* Spacer to push content down */}
          <div className="flex-1" />
          
          {/* Glass Strip at Bottom - Subtle transparency */}
          <div className="relative z-10 w-full bg-black/15 backdrop-blur-lg border-t border-white/5 opacity-0 animate-[hero-slide-up_0.6s_ease-out_forwards]">
            <div className="container-corporate py-8 md:py-10 px-6 md:px-8 lg:px-12">
              {/* Desktop Layout: Flex row with text left, CTAs right */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
                {/* Text Content */}
                <div className="text-center lg:text-left">
                  {/* H1 - Main headline */}
                  <h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight [word-break:keep-all] opacity-0 animate-[hero-fade-in_0.6s_ease-out_0.2s_forwards]"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                  >
                    {t('home.headline')}
                  </h1>
                  
                  {/* Slogan */}
                  <p 
                    className="mt-3 md:mt-4 text-xl md:text-2xl font-semibold text-accent [word-break:keep-all] opacity-0 animate-[hero-fade-in_0.6s_ease-out_0.4s_forwards]"
                    style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}
                  >
                    {t('home.slogan')}
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end opacity-0 animate-[hero-fade-in_0.6s_ease-out_0.6s_forwards]">
                  {/* Primary CTA */}
                  <Link 
                    to="/products" 
                    className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {t('cta.explore_products')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  {/* Secondary CTA - Ghost */}
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center gap-2 text-white border border-white/40 px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                  >
                    {t('cta.contact')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 7 Core Values - Pyramid Layout */}
        <section className="scroll-snap-section section-divider bg-[#0A0A0A] py-16 md:py-24">
          <AnimatedSection className="w-full container-corporate">
            {/* Section Title */}
            <div className="text-center mb-12 md:mb-16 px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t('home.values.section.title')}
              </h2>
            </div>
            
            {/* Pyramid Layout */}
            <PyramidWithLines coreValues={coreValues} t={t} language={language} />
          </AnimatedSection>
        </section>

        {/* Section 3: Our Solutions - Tab Design (Desktop) / Accordion (Mobile) */}
        <section className="scroll-snap-section section-divider px-6 md:px-8 lg:px-12 bg-[#111111]">
          <AnimatedSection className="container-corporate w-full">
            <div className="text-center mb-12 md:mb-16">
              <AnimatedTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t('home.solution.section.title')}
              </AnimatedTitle>
            </div>
            
            {/* Mobile: Accordion Layout */}
            <div className="lg:hidden max-w-2xl mx-auto space-y-3">
              {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const tags = language === 'ko' ? solution.tags : solution.tagsEn;
              const isOpen = activeTab === index;
              return <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-[#1A1A1A]">
                    <button onClick={() => setActiveTab(isOpen ? -1 : index)} className={`w-full text-left p-4 transition-all duration-300 ${isOpen ? 'bg-accent/10' : 'hover:bg-white/5'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-accent/20' : 'bg-white/5'}`}>
                          <Icon className={`w-5 h-5 ${isOpen ? 'text-accent' : 'text-white/60'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-base font-semibold transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>
                            {t(solution.titleKey)}
                          </h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && <motion.div initial={{
                    height: 0,
                    opacity: 0
                  }} animate={{
                    height: 'auto',
                    opacity: 1
                  }} exit={{
                    height: 0,
                    opacity: 0
                  }} transition={{
                    duration: 0.3,
                    ease: 'easeOut'
                  }} className="overflow-hidden">
                          <div className="px-4 pb-4 pt-2">
                            {/* Description & Tags - First */}
                            <p className="text-sm text-white/70 mb-3 leading-relaxed">
                              {t(solution.descKey)}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {tags.map((tag, tagIndex) => <span key={tagIndex} className="text-xs px-2 py-0.5 rounded text-accent bg-accent/10">
                                  {tag}
                                </span>)}
                            </div>
                            
                            {/* Video Area - Last */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-xl overflow-hidden border border-white/10">
                              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                                <source src={`/videos/solutions/solution-${index + 1}-${['creative', 'gallery', 'ai', 'care'][index]}.webm`} type="video/webm" />
                                <source src={`/videos/solutions/solution-${index + 1}-${['creative', 'gallery', 'ai', 'care'][index]}.mp4`} type="video/mp4" />
                                {/* Fallback icon */}
                                <div className="flex items-center justify-center h-full">
                                  <Icon className="w-16 h-16 text-accent/30" strokeWidth={1} />
                                </div>
                              </video>
                            </div>
                          </div>
                        </motion.div>}
                    </AnimatePresence>
                  </div>;
            })}
            </div>
            
            {/* Desktop: Tab Layout - 2 columns */}
            <div className="hidden lg:grid grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Left: Tab Menu */}
              <div className="space-y-3">
                {solutions.map((solution, index) => {
                const Icon = solution.icon;
                const tags = language === 'ko' ? solution.tags : solution.tagsEn;
                const isActive = activeTab === index;
                return <button key={index} onClick={() => setActiveTab(index)} className={`w-full text-left p-5 rounded-xl transition-all duration-300 border-l-4 ${isActive ? 'border-l-accent bg-accent/10 shadow-md' : 'border-l-transparent bg-white/5 hover:bg-white/10'}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-accent/20' : 'bg-white/5'}`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-white/60'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-1 transition-colors ${isActive ? 'text-white' : 'text-white/80'}`}>
                            {t(solution.titleKey)}
                          </h3>
                          <p className="text-sm text-white/70 mb-2 leading-relaxed">
                            {t(solution.descKey)}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag, tagIndex) => <span key={tagIndex} className={`text-xs px-2 py-0.5 rounded transition-colors ${isActive ? 'text-accent bg-accent/10' : 'text-white/60 bg-white/5'}`}>
                                {tag}
                              </span>)}
                          </div>
                        </div>
                        {isActive && <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-1" />}
                      </div>
                    </button>;
              })}
              </div>
              
              {/* Right: Tab Video */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{
                  opacity: 0,
                  scale: 0.98
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} exit={{
                  opacity: 0,
                  scale: 0.98
                }} transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }} className="absolute inset-0">
                    <video key={activeTab} autoPlay muted loop playsInline className="w-full h-full object-cover">
                      <source src={`/videos/solutions/solution-${(activeTab >= 0 ? activeTab : 0) + 1}-${['creative', 'gallery', 'ai', 'care'][activeTab >= 0 ? activeTab : 0]}.webm`} type="video/webm" />
                      <source src={`/videos/solutions/solution-${(activeTab >= 0 ? activeTab : 0) + 1}-${['creative', 'gallery', 'ai', 'care'][activeTab >= 0 ? activeTab : 0]}.mp4`} type="video/mp4" />
                    </video>
                  </motion.div>
                </AnimatePresence>
                
                {/* Tab indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {solutions.map((_, index) => <button key={index} onClick={() => setActiveTab(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeTab ? 'bg-accent w-6' : 'bg-white/60'}`} />)}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Section 4: Impact by Numbers */}
        <section className="scroll-snap-section section-divider px-6 md:px-8 lg:px-12 relative overflow-hidden">
          {/* Background Image with Dimmed Overlay */}
          <div className="absolute inset-0">
            <img 
              src={impactBgImage}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay - 85% opacity for readability */}
            <div className="absolute inset-0 bg-black/85" />
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
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/10 rounded-2xl p-8 md:p-10 text-center card-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                  <p className="text-5xl md:text-6xl font-bold text-accent mb-3">
                    <AnimatedCounter target={1000000} suffix="+" duration={2.5} isMillions={true} language={language} />
                  </p>
                  <p className="text-lg font-semibold text-white mb-2">
                    {t('home.impact.drawings.label')}
                  </p>
                  <p className="text-sm text-white/60">
                    {t('home.impact.drawings.sub')}
                  </p>
                </div>
              </AnimatedCard>
              
              {/* Patents Card */}
              <AnimatedCard index={1}>
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/10 rounded-2xl p-8 md:p-10 text-center card-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                  <p className="text-5xl md:text-6xl font-bold text-accent mb-3">
                    <AnimatedCounter target={100} suffix="+" duration={2} isMillions={false} language={language} />
                  </p>
                  <p className="text-lg font-semibold text-white mb-2">
                    {t('home.impact.patents.label')}
                  </p>
                  <p className="text-sm text-white/60">
                    {t('home.impact.patents.sub')}
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </AnimatedSection>
        </section>

        {/* Section 6: Company History - Dark Style */}
        <section className="scroll-snap-section section-divider px-6 md:px-8 lg:px-12 bg-[#111111]">
          <AnimatedSection className="container-corporate w-full">
            <div className="text-center mb-12 md:mb-16">
              <AnimatedTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
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
                    {historyData[year as keyof typeof historyData].map((event, eventIndex) => <motion.div key={eventIndex} className="bg-[#1A1A1A] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-white/10" initial={{
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
                          <p className="text-sm md:text-base text-white/70 leading-relaxed">
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
        <Footer variant="inline" />
      </div>
    </>;
}