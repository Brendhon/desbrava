import { LucideIcon } from 'lucide-react';
import { forwardRef, InputHTMLAttributes, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import InputWithIcon from './InputWithIcon';

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
    const inputId = useMemo(
      () => id || `input-${Math.random().toString(36).slice(2, 11)}`,
      [id]
    );

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <InputWithIcon
          icon={Icon}
          iconPosition={iconPosition}
          size={size}
          variant={variant}
          error={error}
          className={className}
        >
          <input
            id={inputId}
            ref={register ? register.ref : ref}
            className={styles.input}
            {...register}
            {...props}
          />
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

Input.displayName = 'Input';

export default Input;

const styles = {
  label: 'form-label',
  input: 'form-input-base form-input-size-md form-input-variant-default w-full',
  error: 'form-error',
  helperText: 'form-helper-text',
};
