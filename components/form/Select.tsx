import { Field } from '@/components/form';
import { SelectHTMLAttributes } from 'react';
import { SelectProps } from '@/lib/types';

export default function Select({
  label,
  error,
  size = 'md',
  variant = 'default',
  register,
  helperText,
  className = '',
  options,
  placeholder,
  icon: Icon,
  iconPosition = 'left',
  ...props
}: SelectProps) {
  // Render the select component
  return (
    <Field
      idPrefix="select"
      label={label}
      helperText={helperText}
      icon={Icon}
      iconPosition={iconPosition}
      size={size}
      variant={variant}
      error={error}
      className={className}
    >
      <select {...register} {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}

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
    </Field>
  );
}
