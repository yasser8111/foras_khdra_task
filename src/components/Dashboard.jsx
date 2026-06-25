import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLenis } from "lenis/react";
import SearchBar from "./SearchBar";
import OpportunityCard from "./Card";
import NoResults from "./NoResults";
import opportunitiesData from "../data/opportunities.json";

const ITEMS_PER_PAGE = 12;

export default function Dashboard() {
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunitiesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBarKey, setSearchBarKey] = useState(0);
  const lenisRef = useRef(null);

  useLenis((lenis) => {
    lenisRef.current = lenis;
  });

  const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE);

  const displayedOpportunities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOpportunities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOpportunities, currentPage]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [currentPage, filteredOpportunities.length]);

  const handleFilterResults = useCallback((results) => {
    setFilteredOpportunities(results);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = () => {
    setSearchBarKey((prev) => prev + 1);
    setFilteredOpportunities(opportunitiesData);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-juman font-bold text-brand-dark flex items-center justify-center gap-2">
          <span className="text-brand-green">🌱</span>
          اكتشف الفرص الخضراء
        </h1>
      </div>

      <SearchBar
        key={searchBarKey}
        opportunities={opportunitiesData}
        onFilterResults={handleFilterResults}
      />

      {displayedOpportunities.length > 0 ? (
        <div className="flex flex-col items-center gap-8 mt-10 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full animate-fade-in">
            {displayedOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onViewDetails={(item) => {
                  if (item.link)
                    window.open(item.link, "_blank", "noopener");
                }}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6 dir-rtl">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:hover:bg-white hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-brand-green text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:hover:bg-white hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <NoResults onResetFilters={handleResetFilters} />
      )}
    </div>
  );
}