import { SearchX } from "lucide-react";

export default function NoResults({ onResetFilters }) {
  return (
    <div className="mt-16 py-16 px-6 text-center max-w-md mx-auto select-none">
      <div className="flex justify-center mb-4 text-gray-300">
        <SearchX className="w-12 h-12 stroke-[1.5]" />
      </div>

      <h3 className="font-juman text-lg font-bold text-brand-dark mb-2">
        لم نجد أي نتائج تطابق بحثك
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        جرّب تغيير كلمات البحث أو إعادة تعيين الفلاتر لاستكشاف الفرص المتاحة.
      </p>
      
      <button
        onClick={onResetFilters}
        className="bg-brand-orange hover:bg-brand-orange/80 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer text-sm shadow-sm"
      >
        إعادة ضبط الفلاتر
      </button>
    </div>
  );
}