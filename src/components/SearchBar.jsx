import { useState, useEffect, useRef } from "react";
import {
  X,
  Briefcase,
  GraduationCap,
  Trophy,
  Filter,
  CircleDollarSign,
} from "lucide-react";

const CATEGORIES_DATA = {
  منحة: { icon: GraduationCap },
  تدريب: { icon: Briefcase },
  مسابقة: { icon: Trophy },
};

const FUNDING_STATUSES = ["ممكّنة بالكامل", "تمويل جزئي", "غير ممكّنة"];

export default function SmartSearchBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedFunding,
  setSelectedFunding,
  clearAllFilters,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (!showFilters) return;

    const initialScrollTop = window.scrollY;

    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - initialScrollTop);
      if (scrollDelta > 40) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showFilters]);

  const isFiltered = searchQuery || selectedCategory || selectedFunding;

  return (
    <div
      ref={searchContainerRef}
      className="w-full max-w-2xl mx-auto relative z-10"
    >
      {/* Main Container */}
      <div
        className={`absolute top-0 inset-x-0 bg-slate-50 border rounded-2xl p-2 transition-all duration-300 ease-out overflow-hidden shadow-sm ${
          showFilters
            ? "border-brand-green bg-white shadow-xl max-h-[60vh]"
            : "border-slate-200/80 max-h-[54px] focus-within:bg-white focus-within:border-brand-green"
        }`}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-2 h-[36px]">
          <div className="flex-grow flex items-center gap-1.5 px-1.5 overflow-x-auto no-scrollbar">
            {selectedCategory && (
              <div className="flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg flex-shrink-0">
                <span>{selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  aria-label="إزالة فلتر التصنيف"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {selectedFunding && (
              <div className="flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg flex-shrink-0">
                <span>{selectedFunding}</span>
                <button
                  onClick={() => setSelectedFunding(null)}
                  aria-label="إزالة فلتر التمويل"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث فورياً في الفرص..."
              aria-label="البحث في الفرص"
              className="flex-grow bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1 font-normal"
            />
          </div>

          <div className="flex items-center gap-0.5 pe-0.5 flex-shrink-0">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="مسح البحث"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-label="فتح الفلاتر"
              aria-expanded={showFilters}
              className={`p-1.5 rounded-lg transition-all duration-200 relative ${
                showFilters || isFiltered
                  ? "text-brand-orange bg-brand-orange/10"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimalist Filter Panel Grid */}
        <div
          className={`transition-all duration-300 ease-out origin-top ${
            showFilters
              ? "opacity-100 mt-4 pt-4 border-t border-slate-100 translate-y-0 visible"
              : "opacity-0 h-0 pointer-events-none -translate-y-2 invisible"
          }`}
        >
          <div className="grid grid-cols-2 gap-4 pb-3">
            {/* Categories Segment */}
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                <span>التصنيف الرئيسي</span>
              </div>
              <div className="flex flex-col gap-1">
                {Object.keys(CATEGORIES_DATA).map((catName) => {
                  const isCurrent = selectedCategory === catName;
                  const Icon = CATEGORIES_DATA[catName].icon;
                  return (
                    <button
                      key={catName}
                      onClick={() =>
                        setSelectedCategory(isCurrent ? null : catName)
                      }
                      className={`flex items-center gap-2 text-xs w-full px-2.5 py-2 rounded-xl transition-all duration-150 ${
                        isCurrent
                          ? "bg-brand-green/10 text-brand-green font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 ${isCurrent ? "text-brand-green" : "text-slate-400"}`}
                      />
                      <span>{catName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Funding Segment */}
            <div className="space-y-2 border-s border-slate-100 ps-4">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                <span>حالة التمويل</span>
              </div>
              <div className="flex flex-col gap-1">
                {FUNDING_STATUSES.map((status) => {
                  const isCurrent = selectedFunding === status;
                  return (
                    <button
                      key={status}
                      onClick={() =>
                        setSelectedFunding(isCurrent ? null : status)
                      }
                      className={`flex items-center gap-2 text-xs w-full px-2.5 py-2 rounded-xl transition-all duration-150 ${
                        isCurrent
                          ? "bg-brand-green/10 text-brand-green font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <CircleDollarSign
                        className={`w-3.5 h-3.5 ${isCurrent ? "text-brand-green" : "text-slate-400"}`}
                      />
                      <span>{status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {isFiltered && (
            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-500 hover:text-red-600 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                تصفير الإعدادات
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ghost Spacer */}
      <div className="h-[54px] w-full pointer-events-none" />
    </div>
  );
}
