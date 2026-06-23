import React from "react";

const BADGE_STYLES = {
  "وظيفة": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "الوظائف": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "تدريب": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "فرص التدريب": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "برنامج": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "المسابقات": "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const DEFAULT_BADGE = "bg-emerald-50 text-emerald-700 border-emerald-100";

export default function OpportunityCard({ opportunity, onViewDetails }) {
  const { title, type, country, description, image, deadline, fundingStatus } = opportunity;
  
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
    <div
      className="group bg-white rounded-2xl flex flex-col h-full justify-between transition-all duration-300 text-right select-none overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-brand-green/10 hover:border-brand-green/20 transform hover:-translate-y-1"
    >
      <div className="w-full h-56 overflow-hidden bg-gray-50">
        <img
          src={image || "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col grow justify-between">
        <div>
          <div className="flex flex-row-reverse items-center justify-between gap-2 mb-4">
            <div className="flex flex-row-reverse items-center gap-1.5">
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${badgeClass}`}>
                {type}
              </span>
              {fundingStatus && (
                <span className="text-xs font-medium px-3 py-1 rounded-full border border-amber-100 bg-amber-50 text-amber-800">
                  {fundingStatus}
                </span>
              )}
            </div>

            <span
              className="text-xs text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full max-w-[150px] truncate"
              title={country || "غير محدد"}
            >
              {country || "غير محدد"}
            </span>
          </div>

          <h3 className="text-base font-bold leading-snug mb-2 line-clamp-2 transition-colors duration-300 text-gray-900 group-hover:text-brand-green">
            {title}
          </h3>
          
          <div className="border-t border-gray-50 pt-3 mb-4 flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium text-gray-400">الموعد النهائي:</span>
            <span className={`font-semibold ${isOpen ? "text-brand-green" : "text-red-500"}`}>
              {deadline || "غير محدد"}
            </span>
          </div>
        </div>
        
        <div className="flex justify-start">
          <button
            onClick={() => onViewDetails(opportunity)}
            className="w-full text-xs font-semibold py-3 px-4 rounded-xl transition-all duration-300 bg-brand-orange hover:bg-brand-orange/80 text-white cursor-pointer"
          >
            اقرأ المزيد
          </button>
        </div>
      </div>
    </div>
  );
}
