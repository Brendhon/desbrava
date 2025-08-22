import { useFormStyles } from '@/hooks/useFormStyles';
import { forwardRef, TextareaHTMLAttributes, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
  className?: string;
  id?: string;
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
    const textareaId = useMemo(
      () => id || `textarea-${Math.random().toString(36).slice(2, 11)}`,
      [id]
    );

    const inputStyles = useFormStyles({
      size,
      variant,
      hasIcon: false,
      iconPosition: 'left',
      className,
      error,
    });

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={register ? register.ref : ref}
          className={inputStyles.input}
          {...register}
          {...props}
        />

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

Textarea.displayName = 'Textarea';

export default Textarea;

const styles = {
  container: 'w-full',
  label: 'form-label',
  helperText: 'form-helper-text',
  error: 'form-error',
};
