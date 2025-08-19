import { forwardRef, InputHTMLAttributes, useMemo } from 'react';
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
    // Memoized input ID to prevent recreation on every render
    const inputId = useMemo(() => 
      id || `input-${Math.random().toString(36).substr(2, 9)}`, 
      [id]
    );

    // Memoized padding styles based on icon presence and position
    const paddingStyles = useMemo(() => {
      if (!Icon) return '';
      
      if (iconPosition === 'left') {
        return 'form-input-padding-left-icon';
      } else if (iconPosition === 'right') {
        return 'form-input-padding-right-icon';
      }
      
      return '';
    }, [Icon, iconPosition]);

    // Memoized input styles to prevent recalculation on every render
    const inputStyles = useMemo(() => {
      return [
        'form-input-base',
        `form-input-size-${size}`,
        `form-input-variant-${variant}`,
        paddingStyles,
        error && 'form-input-variant-error',
        className,
      ]
        .filter(Boolean)
        .join(' ');
    }, [size, variant, paddingStyles, error, className]);

    // Memoized icon styles to prevent string recreation on every render
    const iconStyles = useMemo(() => {
      return [
        'form-input-icon-container',
        `form-input-icon-${size}`,
        iconPosition === 'left' ? 'form-input-icon-left' : 'form-input-icon-right'
      ].join(' ');
    }, [size, iconPosition]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              className={iconStyles}
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
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="form-helper-text">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
