'use client';

import { Input, InputWithIcon } from '@/components/form';
import { useFormField } from '@/hooks';
import { useFormStyles } from '@/hooks/useFormStyles';
import { cn } from '@/lib/utils';
import { generateRandomId } from '@/lib/utils/string-utils';
import { parseDateToPtBr, parsePtBrToDate } from '@/lib/utils/trip';
import { ptBR } from 'date-fns/locale';
import { Calendar, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker, Matcher } from 'react-day-picker';
import { UseFormRegisterReturn } from 'react-hook-form';

interface DatePickerProps {
  /** Label text displayed above the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Size variant of the input */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant of the input */
  variant?: 'default' | 'error' | 'success';
  /** React Hook Form register object */
  register?: UseFormRegisterReturn;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Input ID attribute */
  id?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Position of the calendar popup relative to the input */
  popupPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Default value for the date picker (string in dd/MM/yyyy format or Date object) */
  defaultValue?: string;
  /** Minimum date for the date picker */
  minDate?: Date;
  /** Maximum date for the date picker */
  maxDate?: Date;
  /** Value to be displayed in the input */
  value: string;
}

export default function DatePicker({
  label,
  error,
  size = 'md',
  variant = 'default',
  register,
  helperText,
  className = '',
  id,
  placeholder = 'dd/mm/aaaa',
  disabled = false,
  popupPosition = 'bottom',
  defaultValue,
  minDate,
  maxDate,
  value,
}: DatePickerProps) {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized input ID to prevent recreation on every render
  const inputId = useMemo(() => id || generateRandomId('datepicker'), [id]);

  // Use custom styles
  const inputStyles = useFormStyles({
    size,
    variant: error ? 'error' : variant,
    hasIcon: true,
    iconPosition: 'right',
    className,
    error,
  });

  // Memoized popup position styles
  const popupStyles = useMemo(() => cn(styles.popup, `datepicker-popup-${popupPosition}`), [popupPosition]);

  // Update input when date is selected
  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      // If no date is selected, return
      if (!date) return;

      // Update local state
      setSelectedDate(date);

      // Update React Hook Form if register is provided
      register?.onChange({
        target: { value: parseDateToPtBr(date), name: register?.name },
      });

      // Close popup
      setIsOpen(false);
    },
    [register]
  );

  // Handle button click to toggle calendar
  const handleButtonClick = useCallback(() => {
    if (!disabled) setIsOpen(!isOpen);
  }, [disabled]);

  // Memoized default month for DayPicker
  const defaultMonth = useMemo(() => (selectedDate ? new Date(selectedDate) : new Date()), [selectedDate]);

  // Close popup when clicking outside
  useEffect(() => {
    // Close popup when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const current = containerRef.current;
      if (current && !current.contains(event.target as Node)) setIsOpen(false);
    };

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set initial value if defaultValue is provided
  useEffect(() => {
    setSelectedDate(parsePtBrToDate(defaultValue));
  }, [defaultValue]);

  // Memoized disabled days for DayPicker
  const disabledDays = useMemo(() => {
    // If minDate is provided, add it to the disabled days
    const disabledDays: Matcher[] = [{ before: minDate || new Date() }];

    // If maxDate is provided, add it to the disabled days
    if (maxDate) disabledDays.push({ after: maxDate });

    // Return disabled days
    return disabledDays;
  }, [minDate, maxDate]);

  return (
    <div className={styles.container} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <InputWithIcon
        icon={isOpen ? X : Calendar}
        iconAction={!disabled ? handleButtonClick : undefined}
        iconPosition="right"
        size={size}
        variant={error ? 'error' : variant}
        error={error}
        className={className}
      >
        <Input
          id={inputId}
          type="text"
          value={value}
          placeholder={placeholder}
          className={inputStyles.input}
          disabled={true}
          name={register?.name}
        />
      </InputWithIcon>

      {isOpen && (
        <div className={popupStyles}>
          <div className={styles.calendar}>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              locale={ptBR}
              lang="pt-BR"
              defaultMonth={minDate || defaultMonth}
              timeZone="America/Sao_Paulo"
              showOutsideDays={true}
              fixedWeeks={true}
              disabled={disabledDays}
            />
          </div>
        </div>
      )}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
}

const styles = {
  container: 'datepicker-container',
  label: 'form-label',
  input: 'form-input',
  error: 'form-error',
  helperText: 'form-helper-text',
  popup: 'datepicker-popup',
  calendar: 'datepicker-calendar',
};
