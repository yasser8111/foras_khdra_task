import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/articles", label: "المقالات" },
  { href: "/activities", label: "نشاطاتنا" },
  { href: "/opportunities", label: "الفرص" },
  { href: "/network", label: "شبكة المنظمات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 sm:px-6">
      <div className={`relative bg-brand-green rounded-full px-6 flex items-center justify-between transition-all duration-500 origin-center h-20 ${isScrolled ? 'scale-98 shadow-xl mt-4' : 'scale-100 shadow-none mt-8'}`}>
        
        <div className="flex items-center gap-3">
          <a href="/login" className="bg-brand-orange text-white p-2 rounded-xl font-bold text-sm hover:bg-brand-orange/90 transition-colors">
            تسجيل الدخول
          </a>

          <div className="flex items-center w-7 h-5 border border-white/20 rounded overflow-hidden">
            <img 
              src="https://flagcdn.com/ps.svg" 
              alt="PS" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 text-white text-sm font-bold lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gray-200 transition-colors">{link.label}</a>
          ))}
        </div>

        <div className="flex items-center">
          <a href="/" aria-label="الصفحة الرئيسية">
            <img
              src="/logo.svg"
              alt="شعار فرص خضراء"
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute left-4 right-4 bg-brand-green/95 backdrop-blur-md rounded-2xl mt-2 overflow-hidden transition-all duration-300 ease-out shadow-2xl ${
          isMobileMenuOpen
            ? "max-h-[400px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-4 px-6 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-sm font-bold py-3 px-4 rounded-xl hover:bg-white/10 transition-colors text-right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}