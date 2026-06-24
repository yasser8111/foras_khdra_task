import { useState, useEffect, useRef } from "react";
import { UserRound, ArrowLeft } from "lucide-react";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      const timer = setTimeout(
        () => {
          setIsAnimating(false);
        },
        NAV_LINKS.length * 40 + 200,
      );
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 sm:px-6"
      dir="rtl"
    >
      <div
        className={`relative bg-brand-green rounded-full px-4 sm:px-6 flex items-center justify-between transition-all duration-500 origin-center h-14 sm:h-16 lg:h-20 ${
          isScrolled
            ? "scale-98 shadow-xl mt-2 sm:mt-4"
            : "scale-100 shadow-none mt-4 sm:mt-8"
        }`}
      >
        <div className="flex items-center shrink-0">
          <a href="/" aria-label="الصفحة الرئيسية">
            <img
              src="/assets/logo/logo.svg"
              alt="شعار فرص خضراء"
              className="h-7 sm:h-8 lg:h-10 w-auto object-contain"
            />
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-white text-sm font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gray-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center w-6 h-4 sm:w-7 sm:h-5 border border-white/20 rounded overflow-hidden">
            <img
              src="https://flagcdn.com/ps.svg"
              alt="PS"
              className="w-full h-full object-cover"
            />
          </div>

          <a
            href="/login"
            aria-label="تسجيل الدخول"
            className="bg-brand-orange text-white p-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2"
          >
            <UserRound />
            <span className="hidden sm:inline">تسجيل الدخول</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden w-8 h-8 flex flex-col justify-center items-end p-1.5 gap-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <span
              className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out w-5 ${
                isMobileMenuOpen
                  ? "-rotate-45 translate-y-[4px] origin-center"
                  : ""
              }`}
            />
            <span
              className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? "w-5 rotate-45 translate-y-[-4px] origin-center"
                  : "w-3"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute left-4 right-4 bg-brand-green/95 backdrop-blur-md rounded-2xl mt-2 overflow-hidden transition-all duration-300 ease-out shadow-xl border border-white/10 ${
          isMobileMenuOpen
            ? "max-h-[450px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-4 px-3 gap-1">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                transitionDelay:
                  isAnimating && isMobileMenuOpen ? `${index * 40}ms` : "0ms",
              }}
              className={`text-white text-sm font-medium py-3 px-4 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all duration-200 text-right flex items-center justify-between group ${
                isMobileMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{link.label}</span>
              <ArrowLeft className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
