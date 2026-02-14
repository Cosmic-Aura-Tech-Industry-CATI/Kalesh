export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#d4af37]/30 hover:border-[#ff6a00]/50 card-shadow hover-lift cursor-default group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[#d4af37]/70 group-hover:text-[#d4af37] text-xs sm:text-sm mb-2 transition-colors">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white truncate">{value}</h3>
          {trend && (
            <p className={`text-xs sm:text-sm mt-2 truncate transition-colors ${trendUp ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-[#ff6a00]/20 to-[#ffd700]/20 group-hover:from-[#ff6a00]/30 group-hover:to-[#ffd700]/30 rounded-lg transition-all">
          <Icon size={20} className="text-[#ffd700] group-hover:text-[#ff6a00] sm:w-6 sm:h-6 transition-colors" />
        </div>
      </div>
    </div>
  );
}
