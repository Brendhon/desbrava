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

    // Aplicar padding baseado na presença e posição do ícone
    const getPaddingStyles = () => {
      if (!Icon) return '';
      
      if (iconPosition === 'left') {
        return 'form-input-padding-left-icon';
      } else if (iconPosition === 'right') {
        return 'form-input-padding-right-icon';
      }
      
      return '';
    };

    const inputStyles = [
      'form-input-base',
      `form-input-size-${size}`,
      `form-input-variant-${variant}`,
      getPaddingStyles(),
      error && 'form-input-variant-error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

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
              className={`form-input-icon-container form-input-icon-${size} ${
                iconPosition === 'left' ? 'form-input-icon-left' : 'form-input-icon-right'
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
