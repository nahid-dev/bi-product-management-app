import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  placeholder = 'Select an option',
  error,
  className = '',
  labelClassName = '',
  selectClassName = '',
  errorClassName = '',
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const baseSelectClasses = `
    w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent 
    outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red' : 'border-gray-300'}
    ${selectClassName}
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
      
      <select
        ref={ref}
        disabled={disabled}
        className={baseSelectClasses}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className={baseErrorClasses}>
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
