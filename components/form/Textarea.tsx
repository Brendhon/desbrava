import { TextareaHTMLAttributes } from 'react';
import Field from './Field';
import { TextareaProps } from '@/lib/types';

export default function Textarea({
  label,
  error,
  size = 'md',
  variant = 'default',
  register,
  helperText,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}: TextareaProps) {
  // Render the textarea component
  return (
    <Field
      idPrefix="textarea"
      label={label}
      helperText={helperText}
      icon={Icon}
      iconPosition={iconPosition}
      size={size}
      variant={variant}
      error={error}
      className={className}
    >
      <textarea
        {...register}
        {...props}
      />
    </Field>

  );
}

