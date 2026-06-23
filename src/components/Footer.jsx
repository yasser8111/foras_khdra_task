import { useState, useEffect, useRef } from "react";

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
          const factor = window.innerWidth < 640 ? 0.03 : 0.08;
          setTranslateY(scrolledIntoView * factor);
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
      <div className="w-full overflow-hidden block relative h-[120px] sm:h-[400px]">
        <img
          src="/footer-back.svg"
          alt="Background Layer"
          className="w-full object-cover object-top h-[135%] sm:h-[115%] absolute inset-x-0 bottom-0 will-change-transform"
          style={{ transform: `translateY(${translateY}px)` }}
        />
        <img
          src="/footer-front.svg"
          alt="Front Layer"
          className="w-full object-cover object-top h-full absolute inset-0 z-10 block"
        />
      </div>

      <footer className="bg-[#24572A] text-white pt-24 pb-12 overflow-hidden text-right select-none relative z-20" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            <div className="lg:col-span-4 flex flex-col items-start space-y-6">
              <img
                src="/assets/logo/white.png"
                alt="شعار فرص خضراء الأبيض"
                className="h-16 w-auto object-contain"
              />
              
              <div className="flex flex-col space-y-2 w-full max-w-[200px]">
                <span className="text-xs text-white/40 font-medium">اللغة</span>
                <div className="bg-black/20 px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer hover:bg-black/30 transition-colors">
                  <span>العربية</span>
                  <span className="text-[10px] text-white/60">▼</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse text-lg text-white/60">
                <a href="#" className="hover:text-white transition-colors">𝕏</a>
                <a href="#" className="hover:text-white transition-colors">📸</a>
                <a href="#" className="hover:text-white transition-colors"> Facebook </a>
                <a href="#" className="hover:text-white transition-colors"> YouTube </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="flex flex-col space-y-4">
                <h4 className="text-xs font-bold text-white/40 tracking-wider uppercase">
                  تصفح الفرص
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">كل الفرص</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">المسابقات</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">المؤتمرات</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">فرص التطوع</a></li>
                </ul>
              </div>

              <div className="flex flex-col space-y-4">
                <h4 className="text-xs font-bold text-white/40 tracking-wider uppercase">
                  تصفح الوظائف
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">المنح</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">الزمالات</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">فرص التدريب</a></li>
                </ul>
              </div>

              <div className="flex flex-col space-y-4">
                <h4 className="text-xs font-bold text-white/40 tracking-wider uppercase">
                  روابط إضافية
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">المقالات</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">تواصل معنا</a></li>
                </ul>
              </div>

              <div className="flex flex-col space-y-4">
                <h4 className="text-xs font-bold text-white/40 tracking-wider uppercase">
                  سياساتنا
                </h4>
                <ul className="space-y-3 text-sm text-white/80">
                  <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">سياسة الاستخدام</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="pt-16 pb-4 flex flex-col items-center justify-center text-center overflow-hidden w-full select-none pointer-events-none">
            <h2 className="text-[11vw] font-black tracking-tighter leading-none text-black/10 uppercase whitespace-nowrap">
              فــــرص خضــــراء
            </h2>
          </div>
        </div>
      </footer>
    </div>
  );
}