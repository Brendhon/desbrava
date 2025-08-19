import { forwardRef, TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      size = 'md',
      variant = 'default',
      register,
      helperText,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      'w-full transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-midnight-blue resize-none';

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const variantStyles = {
      default:
        'border-slate-dark/20 bg-slate-dark text-parchment-white placeholder-mist-gray focus:ring-royal-purple focus:border-royal-purple',
      error:
        'border-red-500 bg-slate-dark text-parchment-white placeholder-mist-gray focus:ring-red-500 focus:border-red-500',
      success:
        'border-green-500 bg-slate-dark text-parchment-white placeholder-mist-gray focus:ring-green-500 focus:border-green-500',
    };

    const labelStyles = 'block text-sm font-medium text-parchment-white mb-2';
    const errorStyles = 'mt-2 text-sm text-red-400';
    const helperTextStyles = 'mt-2 text-sm text-mist-gray';

    const textareaStyles = [
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className={labelStyles}>
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={register ? register.ref : ref}
          className={textareaStyles}
          {...register}
          {...props}
        />

        {error && (
          <p className={errorStyles} role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className={helperTextStyles}>{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
