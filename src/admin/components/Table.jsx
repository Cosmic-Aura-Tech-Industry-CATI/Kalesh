export default function Table({ columns, data }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg sm:rounded-xl border border-[#d4af37]/20 overflow-hidden card-shadow">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max sm:min-w-full">
          <thead>
            <tr className="border-b border-[#d4af37]/20">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-[#d4af37] bg-[#0b0b0b]/80 whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#d4af37]/10 hover:bg-[#ff6a00]/5 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-300">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm">No data available</div>
      )}
    </div>
  );
}
