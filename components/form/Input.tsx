import { Field } from '@/components/form';
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
  loading,
  ...props
}: InputProps) {
  return (
    <Field
      idPrefix="input"
      icon={Icon}
      iconPosition={iconPosition}
      size={size}
      label={label}
      loading={loading}
      helperText={helperText}
      variant={variant}
      error={error}
      className={className}
      iconAction={iconAction}
    >
      <input {...register} {...props} disabled={loading} />
    </Field>
  );
}
