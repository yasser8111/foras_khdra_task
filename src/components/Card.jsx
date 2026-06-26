import React from "react";

const BADGE_STYLES = {
  منحة: "bg-emerald-100 text-emerald-800",
  وظيفة: "bg-emerald-100 text-emerald-800",
  تدريب: "bg-emerald-100 text-emerald-800",
  برنامج: "bg-emerald-100 text-emerald-800",
  المسابقات: "bg-emerald-100 text-emerald-800",
};

const DEFAULT_BADGE = "bg-emerald-100 text-emerald-800";

export default function OpportunityCard({ opportunity }) {
  const { id, title, type, country, deadline, fundingStatus } = opportunity;

  let isOpen = true;
  if (deadline && deadline !== "لم يحدد") {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    if (deadlineDate < today) {
      isOpen = false;
    }
  }

  const badgeClass = BADGE_STYLES[type] || DEFAULT_BADGE;
  const countriesText = Array.isArray(country) ? country.join("، ") : country;
  const imageUrl = id ? `opportunites-imges/${id}.png` : "/placeholder.png";

  const typeAndFunding = fundingStatus ? `${type} - ${fundingStatus}` : type;

  return (
    <div className="bg-white rounded-xl md:rounded-3xl flex flex-col h-full justify-between transition-all duration-300 text-right select-none overflow-hidden border border-gray-100 hover:shadow-xl transform hover:-translate-y-1">
      <div className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden bg-brand-green flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col grow justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-xs font-medium">
            <div className="flex flex-col-reverse sm:flex-row-reverse items-start sm:items-center justify-between w-full gap-1.5 sm:gap-2">
              <span
                className="text-sky-900 bg-sky-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full max-w-full sm:max-w-[150px] truncate"
                title={countriesText || "كل دول العالم"}
              >
                {countriesText || "كل دول العالم"}
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5 w-full sm:w-auto">
                <span
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full truncate max-w-full sm:max-w-[180px] ${badgeClass}`}
                >
                  {typeAndFunding}
                </span>
              </div>
            </div>
          </div>

          <h3 className="h-auto sm:h-12 md:h-14 text-base sm:text-lg md:text-xl font-bold leading-snug my-2 sm:my-4 md:my-6 line-clamp-2 text-gray-950">
            {title}
          </h3>

          <div className="mb-1.5 sm:mb-2 md:mb-3 flex flex-wrap items-center justify-start gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm">
            <span
              className={`font-semibold px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full ${isOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}
            >
              {isOpen ? "متاح التقديم" : "انتهى التقديم"}
            </span>

            <span className="hidden sm:inline font-semibold text-gray-500">
              {deadline || "لم محدد"}
            </span>
          </div>
        </div>

        <div className="flex justify-start w-full">
          <a
            href={`https://foraskhadra.com/Opportunity/Details/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-xs sm:text-sm md:text-md font-extrabold py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 bg-brand-orange hover:bg-brand-orange/90 text-white cursor-pointer"
          >
            عرض التفاصيل
          </a>
        </div>
      </div>
    </div>
  );
}