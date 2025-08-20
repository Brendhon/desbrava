import { useMemo } from 'react';

interface UseFormStylesProps {
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'error' | 'success';
  hasIcon: boolean;
  iconPosition: 'left' | 'right';
  className?: string;
  error?: string;
}

export const useFormStyles = ({
  size,
  variant,
  hasIcon,
  iconPosition,
  className = '',
  error,
}: UseFormStylesProps) => {
  const inputStyles = useMemo(() => {
    return [
      'form-input-base',
      `form-input-size-${size}`,
      `form-input-variant-${variant}`,
      hasIcon && `form-input-padding-${iconPosition}-icon`,
      error && 'form-input-variant-error',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [size, variant, hasIcon, iconPosition, error, className]);

  const iconStyles = useMemo(() => {
    if (!hasIcon) return '';

    return [
      'form-input-icon-container',
      `form-input-icon-${size}`,
      `form-input-icon-${iconPosition}`,
    ].join(' ');
  }, [hasIcon, size, iconPosition]);

  return {
    input: inputStyles,
    icon: iconStyles,
  };
};
