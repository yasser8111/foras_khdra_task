import { useState, useEffect, useRef } from "react";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: "/assets/icons/facebook.svg" },
  { href: "#", label: "Instagram", icon: "/assets/icons/instgram.svg" },
  { href: "#", label: "LinkedIn", icon: "/assets/icons/linkedin.svg" },
  { href: "#", label: "Email", icon: "/assets/icons/email.svg" },
];

const FOOTER_SECTIONS = [
  {
    title: "تصفح الفرص",
    links: [
      { label: "كل الفرص", href: "#" },
      { label: "المسابقات", href: "#" },
      { label: "المؤتمرات", href: "#" },
      { label: "فرص التطوع", href: "#" },
    ],
  },
  {
    title: "تصفح الوظائف",
    links: [
      { label: "الوظائف", href: "#" },
      { label: "المنح", href: "#" },
      { label: "الزمالات", href: "#" },
      { label: "فرص التدريب", href: "#" },
    ],
  },
  {
    title: "روابط إضافية",
    links: [
      { label: "المقالات", href: "#" },
      { label: "من نحن", href: "#" },
      { label: "تواصل معنا", href: "#" },
    ],
  },
  {
    title: "سياساتنا",
    links: [
      { label: "سياسة الخصوصية", href: "#" },
      { label: "سياسة الاستخدام", href: "#" },
      { label: "الشروط والأحكام", href: "#" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top <= viewportHeight) {
          const scrolledIntoView = viewportHeight - rect.top;
          
          const isMobile = window.innerWidth < 640;
          const factor = isMobile ? 0.05 : 0.1;
          const maxTranslate = isMobile ? 25 : 80;
          
          const calculatedTranslate = scrolledIntoView * factor;
          setTranslateY(Math.min(calculatedTranslate, maxTranslate));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={footerRef} className="w-full relative">
      <div className="w-full overflow-hidden block relative h-[140px] sm:h-[400px]">
        <img
          src="/assets/footer/footer-back.svg"
          alt="Background Layer"
          className="w-full object-cover object-top h-[140%] sm:h-[125%] absolute inset-x-0 bottom-0 will-change-transform"
          style={{ transform: `translateY(${translateY}px)` }}
        />
        <img
          src="/assets/footer/footer-front.svg"
          alt="Front Layer"
          className="w-full object-cover object-top h-full absolute inset-0 z-10 block"
        />
      </div>

      <footer
        className="bg-linear-to-t from-brand-green to-[#24572A] text-white py-20 overflow-hidden text-right select-none relative z-20"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 pb-20">
            <div className="lg:col-span-5 flex flex-col items-start space-y-10">
              <img
                src="/assets/logo/logoWhitoutText.svg"
                alt="شعار فرص خضراء الأبيض"
                className="h-14 w-auto object-contain"
              />

              <div className="flex items-center gap-6">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    aria-label={link.label}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-10 h-10 invert"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-4">
              {FOOTER_SECTIONS.map((section) => (
                <div key={section.title} className="flex flex-col space-y-4">
                  <h4 className="text-sm font-normal text-white/40 tracking-wide">
                    {section.title}
                  </h4>
                  <ul className="space-y-3 text-sm font-normal text-white">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="hover:underline transition-all duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 pb-4 flex flex-col items-center justify-center text-center overflow-hidden w-full select-none pointer-events-none border-t border-white/10">
            <img 
              src="/assets/footer/text-footer.svg" 
              alt="Footer Text" 
              className="w-full max-w-5xl h-auto" 
            />
          </div>
        </div>
      </footer>
    </div>
  );
}