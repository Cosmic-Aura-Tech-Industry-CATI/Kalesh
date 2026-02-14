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
    primary: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-[#1a1a2e] hover:bg-[#252538] text-gray-300 border border-gray-700',
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
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500/50`}
    >
      {children}
    </button>
  );
}
