import { Field } from '@/components/form';
import { InputHTMLAttributes } from 'react';
import { InputProps } from '@/lib/types';

export default function Input({
  label,
  error,
  size = 'md',
  variant = 'default',
  register,
  helperText,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  iconAction,
  ...props
}: InputProps) {
  return (
    <Field
      idPrefix="input"
      icon={Icon}
      iconPosition={iconPosition}
      size={size}
      label={label}
      helperText={helperText}
      variant={variant}
      error={error}
      className={className}
      iconAction={iconAction}
    >
      <input {...register} {...props} />
    </Field>
  );
}
