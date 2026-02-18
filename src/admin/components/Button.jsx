export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) {
  const baseStyles = 'font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-[#ff2a2a] to-[#ff6a00] hover:shadow-lg hover:shadow-[#ff6a00]/50 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-[#ffd700] hover:bg-[#e6c200] text-black',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-[#1a1a1a] hover:bg-[#242424] text-gray-300 border border-[#d4af37]/30 hover:border-[#ff6a00]/50',
  };

  const sizes = {
    sm: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
    md: 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm',
    lg: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6a00]/50`}
    >
      {children}
    </button>
  );
}
