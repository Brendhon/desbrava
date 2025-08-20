import { useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface UseFormFieldProps {
  register?: UseFormRegisterReturn;
  onValueChange?: (value: string) => void;
}

export const useFormField = ({
  register,
  onValueChange,
}: UseFormFieldProps) => {
  const handleChange = useCallback(
    (value: string) => {
      // Call custom onValueChange if provided
      onValueChange?.(value);

      // Update React Hook Form if register is provided
      if (register?.onChange) {
        const syntheticEvent = {
          target: {
            name: register.name,
            value: value,
          },
        };
        register.onChange(syntheticEvent as any);
      }
    },
    [onValueChange, register]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [handleChange]
  );

  return {
    handleChange,
    handleInputChange,
    register,
  };
};
