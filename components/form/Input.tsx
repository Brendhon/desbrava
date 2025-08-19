import { forwardRef, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
  className?: string;
  id?: string;
  // Props para ícones (opcionais)
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      icon: Icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      'w-full transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-midnight-blue';

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

    const iconStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Aplicar padding baseado na presença e posição do ícone
    const getPaddingStyles = () => {
      if (!Icon) return '';
      
      if (iconPosition === 'left') {
        return 'pl-12 pr-4';
      } else if (iconPosition === 'right') {
        return 'pl-4 pr-12';
      }
      
      return '';
    };

    const labelStyles = 'block text-sm font-medium text-parchment-white mb-2';
    const errorStyles = 'mt-2 text-sm text-red-400';
    const helperTextStyles = 'mt-2 text-sm text-mist-gray';
    const iconContainerStyles = 'absolute top-1/2 transform -translate-y-1/2 text-mist-gray';

    const inputStyles = [
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      getPaddingStyles(),
      error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              className={`${iconContainerStyles} ${iconStyles[size]} ${
                iconPosition === 'left' ? 'left-3' : 'right-3'
              }`}
              aria-hidden="true"
            />
          )}
          
          <input
            id={inputId}
            ref={register ? register.ref : ref}
            className={inputStyles}
            {...register}
            {...props}
          />
        </div>

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

Input.displayName = 'Input';

export default Input;
