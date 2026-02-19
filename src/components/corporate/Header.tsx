import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import logoIscreamarts from '@/assets/logo-iscreamarts.png';

type Language = 'ko' | 'en';

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (code: Language) => {
    setLanguage(code);
  };

  return (
    <div
      className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5"
      role="radiogroup"
      aria-label="Select language"
    >
      <button
        onClick={() => handleToggle('en')}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          language === 'en'
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        )}
        role="radio"
        aria-checked={language === 'en'}
        aria-label="English"
      >
        EN
      </button>
      <button
        onClick={() => handleToggle('ko')}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          language === 'ko'
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        )}
        role="radio"
        aria-checked={language === 'ko'}
        aria-label="한국어"
      >
        한국어
      </button>
    </div>
  );
}

export function Header() {
  const { language, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/news', label: t('nav.news') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname === path;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-[12px] border-b border-slate-200/80"
      >
        <div className="container-corporate">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => {
                // Scroll snap container back to top (hero section)
                const snapContainer = document.querySelector('.scroll-snap-container') as HTMLElement | null;
                if (snapContainer) {
                  snapContainer.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gentle-animation hover:opacity-80"
            >
              <img
                src={logoIscreamarts}
                alt={language === 'ko' ? '아이스크림아트 로고' : 'i-Scream arts logo'}
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    isActive(item.path)
                      ? 'text-accent'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Language + Mobile menu */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <LanguageToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 -mr-2 text-slate-700"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-background border-l border-border z-50 md:hidden transition-transform duration-300 ease-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                  isActive(item.path)
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
