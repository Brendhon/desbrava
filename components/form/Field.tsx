import { useFormStyles } from '@/hooks/useFormStyles';
import { cn, generateRandomId } from '@/lib/utils';
import { Children, cloneElement, isValidElement, ReactElement, useMemo } from 'react';
import { FieldProps } from '@/lib/types';

export default function Field({
  idPrefix,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  error,
  className = '',
  label,
  children,
  iconAction,
  helperText,
}: FieldProps) {
  // Use custom hook for styles
  const inputStyles = useFormStyles({
    size,
    variant,
    hasIcon: !!Icon,
    iconPosition,
    className,
    error,
  });

  // Memoized input ID to prevent recreation on every render
  const inputId = useMemo(() => generateRandomId(idPrefix), [idPrefix]);

  return (
    <div className="relative">
      {/* Left Icon */}
      {Icon && iconPosition === 'left' && (
        <Icon
          className={cn(
            inputStyles.icon,
            !iconAction ? 'pointer-events-none' : 'cursor-pointer'
          )}
          aria-hidden="true"
          onClick={iconAction}
        />
      )}

      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      {/* Children - Clone the element and add the id and className */}
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const childElement = child as ReactElement<any>;
          return cloneElement(childElement, {
            className: cn(inputStyles.input, childElement.props.className),
            id: inputId,
            ...childElement.props,
          });
        }
        return child;
      })}

      {/* Error */}
      {error && <p className={styles.error} role="alert">{error}</p>}

      {/* Helper text */}
      {helperText && !error && <p className={styles.helperText}>{helperText}</p>}

      {/* Right Icon */}
      {Icon && iconPosition === 'right' && (
        <Icon
          className={cn(
            inputStyles.icon,
            !iconAction ? 'pointer-events-none' : 'cursor-pointer'
          )}
          aria-hidden="true"
          onClick={iconAction}
        />
      )}
    </div>
  );
}

const styles = {
  container: 'w-full',
  label: 'form-label',
  helperText: 'form-helper-text',
  error: 'form-error',
};