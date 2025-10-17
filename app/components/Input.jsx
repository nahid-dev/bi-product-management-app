import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  icon,
  iconPosition = 'left',
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const baseInputClasses = `
    w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent 
    outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red' : 'border-gray-300'}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${inputClassName}
  `.trim();

  const baseLabelClasses = `
    block text-sm font-medium text-dark mb-2
    ${required ? "after:content-['*'] after:ml-1 after:text-red" : ''}
    ${labelClassName}
  `.trim();

  const baseErrorClasses = `
    mt-1 text-sm text-red
    ${errorClassName}
  `.trim();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={baseLabelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={baseInputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className={baseErrorClasses}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
