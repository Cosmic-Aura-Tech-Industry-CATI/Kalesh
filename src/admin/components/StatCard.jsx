export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-[#141420] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-orange-500/50 card-shadow hover-lift cursor-default group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 group-hover:text-gray-400 text-xs sm:text-sm mb-2 transition-colors">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white truncate">{value}</h3>
          {trend && (
            <p className={`text-xs sm:text-sm mt-2 truncate transition-colors ${trendUp ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 group-hover:from-orange-500/30 group-hover:to-yellow-500/30 rounded-lg transition-all">
          <Icon size={20} className="text-orange-400 group-hover:text-orange-300 sm:w-6 sm:h-6 transition-colors" />
        </div>
      </div>
    </div>
  );
}
