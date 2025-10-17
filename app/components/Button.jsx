import { forwardRef } from 'react';
import { cn } from '../lib/utils.js';

const Button = forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  const variants = {
    default: 'bg-green text-light hover:bg-green/90 focus:ring-green shadow-lg hover:shadow-xl',
    secondary: 'bg-beige text-dark hover:bg-beige/90 focus:ring-beige shadow-lg hover:shadow-xl',
    outline: 'border border-beige text-dark hover:bg-beige/10 focus:ring-beige',
    ghost: 'text-light hover:text-beige hover:bg-beige/10 focus:ring-beige',
    destructive: 'bg-red text-light hover:bg-red/90 focus:ring-red shadow-lg hover:shadow-xl',
    link: 'text-green hover:text-green/80 underline-offset-4 hover:underline focus:ring-green',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg',
    xl: 'h-14 px-8 text-xl',
    icon: 'h-10 w-10 p-0',
  };

  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  const iconElement = icon && (
    <span className={cn(
      'flex-shrink-0',
      iconPosition === 'left' ? 'mr-2' : 'ml-2'
    )}>
      {icon}
    </span>
  );

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && iconElement}
          {children}
          {icon && iconPosition === 'right' && iconElement}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
