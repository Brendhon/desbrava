import { forwardRef, SelectHTMLAttributes, useMemo, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import { SelectOption } from '@/lib/types';
import { useFormStyles } from '../../hooks/useFormStyles';
import InputWithIcon from './InputWithIcon';

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
    const selectId = useMemo(
      () => id || `select-${Math.random().toString(36).substr(2, 9)}`,
      [id]
    );

    // Use custom hook for styles
    const styles = useFormStyles({
      size,
      variant,
      hasIcon: !!Icon,
      iconPosition,
      className: `${className} form-select-base`,
      error,
    });

    // Memoized dropdown icon styles
    const dropdownIconStyles = useMemo(() => {
      return [
        'form-select-dropdown-icon',
        `form-select-dropdown-icon-${size}`,
        'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mist-gray',
      ].join(' ');
    }, [size]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
          </label>
        )}

        <InputWithIcon
          icon={Icon as any}
          iconPosition={iconPosition}
          size={size}
          variant={variant}
          error={error}
          className={className}
        >
          <select
            id={selectId}
            ref={register ? register.ref : ref}
            className={styles.input}
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
          <ChevronDown className={dropdownIconStyles} aria-hidden="true" />
        </InputWithIcon>

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
