import { useState, useEffect, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import {
  X,
  Briefcase,
  GraduationCap,
  Trophy,
  Filter,
  CircleDollarSign,
  Users,
  Building2,
} from "lucide-react";

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================
const CATEGORIES_DATA = [
  { key: "منحة", icon: GraduationCap },
  { key: "تدريب", icon: Briefcase },
  { key: "زمالة", icon: Users },
  { key: "مسابقة", icon: Trophy },
  { key: "وظيفة", icon: Building2 },
];

const FUNDING_STATUSES = ["كامل", "جزئي", "غير ممول"];

const CATEGORIES_PER_COLUMN = 3;
function chunkIntoColumns(items, size) {
  const columns = [];
  for (let i = 0; i < items.length; i += size) {
    columns.push(items.slice(i, i + size));
  }
  return columns;
}

export default function SmartSearchBar({
  opportunities = [],
  onFilterResults,
}) {
  // ==========================================
  // STATE & REFS
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const searchContainerRef = useRef(null);

  // ==========================================
  // FILTERING LOGIC FUNCTIONS
  // ==========================================

  // Handles typo-tolerant and partial text search using Fuse.js
  const performFuzzySearch = useCallback((data, query) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return data;

    const fuse = new Fuse(data, {
      keys: ["title", "description", "publisher"],
      threshold: 0.4, // Controls the balance between strictness and typo tolerance
      distance: 100,
      ignoreLocation: true,
    });

    return fuse.search(cleanQuery).map((result) => result.item);
  }, []);

  // Handles exact-match dropdown filtering for categories and funding status
  const applyStaticFilters = useCallback((data, category, funding) => {
    return data.filter((opp) => {
      const matchesCategory = !category || opp.type === category;
      const matchesFunding = !funding || opp.fundingStatus === funding;
      return matchesCategory && matchesFunding;
    });
  }, []);

  // Sync and trigger data update to parent component whenever search or filters change
  useEffect(() => {
    if (!onFilterResults) return;

    const searchResults = performFuzzySearch(opportunities, searchQuery);
    const fullyFiltered = applyStaticFilters(
      searchResults,
      selectedCategory,
      selectedFunding,
    );

    onFilterResults(fullyFiltered);
  }, [
    searchQuery,
    selectedCategory,
    selectedFunding,
    opportunities,
    onFilterResults,
    performFuzzySearch,
    applyStaticFilters,
  ]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  // Resets all state values back to their default empty configurations
  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedFunding(null);
  }, []);

  // Removes active category/funding badges step-by-step when pressing Backspace on an empty text input
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && searchQuery === "") {
      if (selectedFunding) {
        setSelectedFunding(null);
      } else if (selectedCategory) {
        setSelectedCategory(null);
      }
    }
  };

  // ==========================================
  // INTERACTION EFFECTS (CLICK OUTSIDE / SCROLL CLOSING)
  // ==========================================
  useEffect(() => {
    if (!showFilters) return;

    const initialScrollTop = window.scrollY;

    // Closes the panel if the user clicks anywhere outside the component container
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    // Closes the panel automatically if the user scrolls significantly away
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

  // Pre-split once per render into columns of CATEGORIES_PER_COLUMN items each
  const categoryColumns = chunkIntoColumns(
    CATEGORIES_DATA,
    CATEGORIES_PER_COLUMN,
  );

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <div
      ref={searchContainerRef}
      className="w-full max-w-2xl mx-auto relative z-10"
    >
      {/* Wrapper with dynamic height styles depending on filter expand state */}
      <div
        className={`absolute top-0 inset-x-0 bg-white border rounded-2xl p-2 transition-all duration-300 ease-out overflow-hidden ${
          showFilters
            ? "border-brand-green bg-white shadow-xl max-h-[60vh]"
            : "border-slate-200/80 max-h-[54px] focus-within:bg-white focus-within:border-brand-green"
        }`}
      >
        {/* Main Search Input & Badge Area */}
        <div className="flex items-center gap-2 h-[36px]">
          <div className="grow flex items-center gap-1.5 px-1.5 overflow-x-auto no-scrollbar">
            {/* Selected Category Badge — hidden on small screens so it doesn't shrink the input */}
            {selectedCategory && (
              <div className="hidden sm:flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg shrink-0">
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

            {/* Selected Funding Badge — hidden on small screens so it doesn't shrink the input */}
            {selectedFunding && (
              <div className="hidden sm:flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg shrink-0">
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

            {/* Native Text Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ابحث فورياً في الفرص..."
              aria-label="البحث في الفرص"
              className="grow bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1 font-normal"
            />
          </div>

          {/* Action Control Buttons (Clear text / Toggle Panel) */}
          <div className="flex items-center gap-0.5 pe-0.5 shrink-0">
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

        {/* Dropdown Filters Panel Container */}
        <div
          className={`transition-all duration-300 ease-out origin-top ${
            showFilters
              ? "opacity-100 mt-4 pt-4 border-t border-slate-100 translate-y-0 visible"
              : "opacity-0 h-0 pointer-events-none -translate-y-2 invisible"
          }`}
        >
          <div className="grid grid-cols-3 gap-4 pb-3">
            {/* Category Columns: each holds up to CATEGORIES_PER_COLUMN items */}
            {categoryColumns.map((column, columnIndex) => (
              <div key={`category-column-${columnIndex}`} className="space-y-2">
                {/* Header only on the first category column to avoid repeating the label */}
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                  <span>
                    {columnIndex === 0 ? "التصنيف الرئيسي" : "\u00A0"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {column.map(({ key, icon: Icon }) => {
                    const isCurrent = selectedCategory === key;
                    return (
                      <button
                        key={key}
                        onClick={() =>
                          setSelectedCategory(isCurrent ? null : key)
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
                        <span>{key}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Funding Status Column */}
            <div className="space-y-2 border-s border-slate-100 ps-3">
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

          {/* Panel Footer Action (Reset Settings Trigger) */}
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

      {/* Structural Spacer Element to preserve content document flow under absolute search bar positioning */}
      <div className="h-[54px] w-full pointer-events-none" />
    </div>
  );
}
