import { forwardRef, TextareaHTMLAttributes, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useFormStyles } from '../../hooks/useFormStyles';

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
    const textareaId = useMemo(() => 
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`, 
      [id]
    );

    const styles = useFormStyles({
      size,
      variant,
      hasIcon: false,
      iconPosition: 'left',
      className,
      error
    });

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="form-label">
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={register ? register.ref : ref}
          className={styles.input}
          {...register}
          {...props}
        />

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

Textarea.displayName = 'Textarea';

export default Textarea;
