import React from "react";

const BADGE_STYLES = {
  منحة: "bg-emerald-100 text-emerald-800",
  وظيفة: "bg-emerald-100 text-emerald-800",
  تدريب: "bg-emerald-100 text-emerald-800",
  برنامج: "bg-emerald-100 text-emerald-800",
  المسابقات: "bg-emerald-100 text-emerald-800",
};

const DEFAULT_BADGE = "bg-emerald-100 text-emerald-800";

export default function OpportunityCard({ opportunity, onViewDetails }) {
  const { title, type, country, description, image, deadline, fundingStatus } =
    opportunity;

  let isOpen = true;
  if (deadline && deadline !== "لم يحدد") {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    if (deadlineDate < today) {
      isOpen = false;
    }
  }

  const badgeClass = BADGE_STYLES[type] || DEFAULT_BADGE;

  return (
    <div className="bg-white rounded-3xl flex flex-col h-full justify-between transition-all duration-300 text-right select-none overflow-hidden border border-gray-100 hover:shadow-xl transform hover:-translate-y-1">
      <div className="h-1/2 overflow-hidden bg-brand-green flex items-center justify-center">
        <img
          src={image || "/placeholder.png"}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col grow justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
            <div className="flex flex-row-reverse items-center justify-between w-full">
              <span
                className="text-sky-900 bg-sky-100 px-2 py-1 rounded-full max-w-[120px] truncate"
                title={country || "كل دول العالم"}
              >
                {country || "كل دول العالم"}
              </span>

              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2 py-1 rounded-full truncate max-w-[100px] ${badgeClass}`}
                >
                  {type}
                </span>
                {fundingStatus && (
                  <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 truncate max-w-[100px]">
                    {fundingStatus}
                  </span>
                )}
              </div>
            </div>
          </div>

          <h3 className="h-14 text-xl font-bold leading-snug my-6 line-clamp-2 text-gray-950">
            {title}
          </h3>

          <div className="mb-3 flex items-center justify-start gap-3 text-sm">
            <span
              className={`font-semibold px-4 py-1.5 rounded-full ${isOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}
            >
              {isOpen ? "متاح التقديم" : "انتهى التقديم"}
            </span>

            <span className="font-semibold text-gray-500">
              {deadline || "لم محدد"}
            </span>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            onClick={() => onViewDetails(opportunity)}
            className="w-full text-md font-extrabold py-3 px-6 rounded-2xl transition-all duration-300 bg-brand-orange hover:bg-brand-orange/90 text-white cursor-pointer"
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
}
