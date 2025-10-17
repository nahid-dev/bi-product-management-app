import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  placeholder,
  error,
  className = '',
  labelClassName = '',
  textareaClassName = '',
  errorClassName = '',
  required = false,
  disabled = false,
  rows = 4,
  ...props
}, ref) => {
  const baseTextareaClasses = `
    w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green focus:border-transparent 
    outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none
    ${error ? 'border-red' : 'border-gray-300'}
    ${textareaClassName}
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
      
      <textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={baseTextareaClasses}
        {...props}
      />
      
      {error && (
        <p className={baseErrorClasses}>
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
