import { InputWithIcon } from '@/components/form';
import { useFormStyles } from '@/hooks/useFormStyles';
import { SelectOption } from '@/lib/types';
import { generateRandomId } from '@/lib/utils/string-utils';
import { LucideIcon } from 'lucide-react';
import { forwardRef, ReactNode, SelectHTMLAttributes, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

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
      () => id || generateRandomId('select'),
      [id]
    );

    // Use custom hook for styles
    const inputStyles = useFormStyles({
      size,
      variant,
      hasIcon: !!Icon,
      iconPosition,
      className: `${className} form-select-base`,
      error,
    });

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}

        <InputWithIcon
          icon={Icon as LucideIcon}
          iconPosition={iconPosition}
          size={size}
          variant={variant}
          error={error}
          className={className}
        >
          <select
            id={selectId}
            ref={register ? register.ref : ref}
            className={inputStyles.input}
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
        </InputWithIcon>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

const styles = {
  container: 'w-full',
  label: 'form-label',
  helperText: 'form-helper-text',
  error: 'form-error',
};
