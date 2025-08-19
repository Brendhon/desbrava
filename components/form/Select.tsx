import { forwardRef, SelectHTMLAttributes, useMemo, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import { SelectOption } from '@/lib/types';

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
  className?: string;
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
      options,
      placeholder,
      icon: Icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    // Memoized select ID to prevent recreation on every render
    const selectId = useMemo(() => 
      id || `select-${Math.random().toString(36).substr(2, 9)}`, 
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

    // Memoized select styles to prevent recalculation on every render
    const selectStyles = useMemo(() => {
      return [
        'form-input-base',
        `form-input-size-${size}`,
        `form-input-variant-${variant}`,
        paddingStyles,
        error && 'form-input-variant-error',
        'form-select-base', // Additional styles specific to select
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

    // Memoized dropdown icon styles
    const dropdownIconStyles = useMemo(() => {
      return [
        'form-select-dropdown-icon',
        `form-select-dropdown-icon-${size}`,
        'pointer-events-none' // Prevents interference with select functionality
      ].join(' ');
    }, [size]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <Icon
              className={iconStyles}
              aria-hidden="true"
            />
          )}
          
          <select
            id={selectId}
            ref={register ? register.ref : ref}
            className={selectStyles}
            {...register}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown indicator icon (always on the right) */}
          <ChevronDown
            className={dropdownIconStyles}
            aria-hidden="true"
          />

          {Icon && iconPosition === 'right' && (
            <Icon
              className={iconStyles}
              aria-hidden="true"
            />
          )}
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

Select.displayName = 'Select';

export default Select;
