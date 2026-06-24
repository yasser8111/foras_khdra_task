import { useState, useMemo, useCallback } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import OpportunityCard from "./components/Card";
import NoResults from "./components/NoResults";
import Footer from "./components/Footer";
import opportunitiesData from "./data/opportunities.json";
import { ReactLenis } from "lenis/react";

function App() {
  const [filteredOpportunities, setFilteredOpportunities] =
    useState(opportunitiesData);
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchBarKey, setSearchBarKey] = useState(0);

  const displayedOpportunities = useMemo(() => {
    return filteredOpportunities.slice(0, visibleCount);
  }, [filteredOpportunities, visibleCount]);

  const handleFilterResults = useCallback((results) => {
    setFilteredOpportunities(results);
    setVisibleCount(12);
  }, []);

  const handleResetFilters = () => {
    setSearchBarKey((prev) => prev + 1);
    setFilteredOpportunities(opportunitiesData);
    setVisibleCount(12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col bg-brand-bg relative overflow-x-hidden pt-20">
        <Navbar />

        <main className="grow pt-24 pb-16 relative">
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

                {filteredOpportunities.length > visibleCount && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 9)}
                    className="bg-brand-green hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-colors cursor-pointer text-sm"
                  >
                    عرض المزيد من الفرص
                  </button>
                )}
              </div>
            ) : (
              <NoResults onResetFilters={handleResetFilters} />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
