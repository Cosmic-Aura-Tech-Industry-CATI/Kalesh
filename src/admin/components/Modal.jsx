import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-[#1a1a1a] rounded-lg sm:rounded-xl border border-[#d4af37]/20 w-full max-w-md max-h-[90vh] overflow-y-auto card-shadow animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#d4af37]/20 bg-[#0b0b0b]/50">
          <h3 className="text-lg sm:text-xl font-semibold gradient-text">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/10 rounded-lg transition-colors group"
          >
            <X size={18} className="text-gray-400 group-hover:text-red-400 sm:w-5 sm:h-5 transition-colors" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
