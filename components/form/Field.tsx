import { useFormStyles } from '@/hooks/useFormStyles';
import { FieldProps } from '@/lib/types';
import { cn, generateRandomId } from '@/lib/utils';
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useMemo,
} from 'react';

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
    <>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        {/* Left Icon */}
        {Icon && iconPosition === 'left' && (
          <Icon
            className={cn(
              inputStyles.icon,
              !iconAction ? styles.noPointer : styles.pointer
            )}
            aria-hidden="true"
            onClick={iconAction}
          />
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

        {/* Right Icon */}
        {Icon && iconPosition === 'right' && (
          <Icon
            className={cn(
              inputStyles.icon,
              !iconAction ? styles.noPointer : styles.pointer
            )}
            aria-hidden="true"
            onClick={iconAction}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <p className={styles.helperText}>{helperText}</p>
      )}
    </>
  );
}

const styles = {
  container: 'w-full',
  inputContainer: 'relative mb-0',
  label: 'form-label',
  helperText: 'form-helper-text',
  error: 'form-error',
  noPointer: 'pointer-events-none',
  pointer: 'cursor-pointer',
};
