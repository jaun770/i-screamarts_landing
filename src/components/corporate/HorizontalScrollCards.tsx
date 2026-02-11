import { ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HorizontalScrollCardsProps {
  children: ReactNode;
  className?: string;
  cardClassName?: string;
  sectionTitle?: string;
}

export function HorizontalScrollCards({ 
  children, 
  className,
  cardClassName,
  sectionTitle = "Cards"
}: HorizontalScrollCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);

  // Count cards on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.scroll-card');
    setTotalCards(cards.length);
  }, [children]);

  // Scroll to specific card index
  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container || isScrolling) return;

    const cards = container.querySelectorAll('.scroll-card');
    if (index < 0 || index >= cards.length) return;

    setIsScrolling(true);
    const card = cards[index] as HTMLElement;
    
    container.scrollTo({
      left: card.offsetLeft - 32, // Account for padding
      behavior: 'smooth'
    });

    setCurrentIndex(index);
    
    // Reset scrolling flag after animation
    setTimeout(() => setIsScrolling(false), 400);
  }, [isScrolling]);

  // IntersectionObserver to detect when section is in viewport center
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Lock when section is mostly visible (70%+)
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            setIsLocked(true);
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.3) {
            setIsLocked(false);
          }
        });
      },
      { 
        threshold: [0, 0.3, 0.7, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Global wheel event handler when section is locked
  useEffect(() => {
    if (!isLocked) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Debounce to prevent rapid scrolling
      if (now - lastScrollTime.current < 300) {
        e.preventDefault();
        return;
      }

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      
      // At first card and scrolling up - release to previous section
      if (currentIndex === 0 && isScrollingUp) {
        setIsLocked(false);
        return; // Allow normal scroll
      }
      
      // At last card and scrolling down - release to next section
      if (currentIndex === totalCards - 1 && isScrollingDown) {
        setIsLocked(false);
        return; // Allow normal scroll
      }

      // Otherwise, navigate cards
      e.preventDefault();
      lastScrollTime.current = now;

      if (isScrollingDown && currentIndex < totalCards - 1) {
        scrollToCard(currentIndex + 1);
      } else if (isScrollingUp && currentIndex > 0) {
        scrollToCard(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLocked, currentIndex, totalCards, scrollToCard]);

  // Arrow button handlers
  const goToPrev = () => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalCards - 1) {
      scrollToCard(currentIndex + 1);
    }
  };

  return (
    <div 
      ref={sectionRef}
      data-scroll-section
      className={cn(
        "relative min-h-[60vh] flex flex-col justify-center py-8",
        isLocked && "scroll-locked",
        className
      )}
    >
      {/* Progress indicator */}
      <div className="absolute top-4 right-4 md:right-8 z-20">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border">
          <span className="text-sm font-medium text-foreground">
            {currentIndex + 1}
          </span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">
            {totalCards}
          </span>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className={cn(
          "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10",
          "w-12 h-12 rounded-full",
          "bg-background/90 shadow-lg border border-border",
          "flex items-center justify-center",
          "transition-all duration-200",
          "hover:bg-background hover:border-accent/50 hover:scale-110",
          "disabled:opacity-30 disabled:pointer-events-none"
        )}
        aria-label="Previous card"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      <button
        onClick={goToNext}
        disabled={currentIndex === totalCards - 1}
        className={cn(
          "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10",
          "w-12 h-12 rounded-full",
          "bg-background/90 shadow-lg border border-border",
          "flex items-center justify-center",
          "transition-all duration-200",
          "hover:bg-background hover:border-accent/50 hover:scale-110",
          "disabled:opacity-30 disabled:pointer-events-none"
        )}
        aria-label="Next card"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Scrollable cards container */}
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-6 overflow-x-auto snap-x snap-mandatory",
          "scrollbar-hide px-8 md:px-16 lg:px-24",
          "scroll-smooth"
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {Array.isArray(children) ? children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "scroll-card flex-shrink-0 snap-center",
              "w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] max-w-[480px]",
              "transition-all duration-300",
              index === currentIndex ? "scale-100 opacity-100" : "scale-95 opacity-60",
              cardClassName
            )}
          >
            {child}
          </div>
        )) : (
          <div className={cn(
            "scroll-card flex-shrink-0 snap-center",
            "w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] max-w-[480px]",
            cardClassName
          )}>
            {children}
          </div>
        )}
      </div>

      {/* Progress dots */}
      {totalCards > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-accent w-8"
                  : "bg-border hover:bg-muted-foreground/50 w-2"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll hint when locked */}
      {isLocked && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-pulse">
          <p className="text-xs text-muted-foreground">
            ↓ Scroll to navigate cards
          </p>
        </div>
      )}
    </div>
  );
}
