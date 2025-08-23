import { InputWithIcon } from '@/components/form';
import { useFormStyles } from '@/hooks/useFormStyles';
import { generateRandomId } from '@/lib/utils/string-utils';
import { LucideIcon } from 'lucide-react';
import { forwardRef, InputHTMLAttributes, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

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
  iconAction?: () => void | null;
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
      iconAction,
      ...props
    },
    ref
  ) => {
    // Memoized input ID to prevent recreation on every render
    const inputId = useMemo(
      () => id || generateRandomId('input'),
      [id]
    );

    const inputStyles = useFormStyles({
      size,
      variant,
      hasIcon: !!Icon,
      iconPosition,
      className,
      error,
    });

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
          iconAction={iconAction}
        >
          <input
            id={inputId}
            ref={register ? register.ref : ref}
            className={inputStyles.input}
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
  error: 'form-error',
  helperText: 'form-helper-text',
};
