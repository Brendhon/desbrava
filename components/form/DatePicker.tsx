'use client';

import { InputWithIcon } from '@/components/form';
import { useFormField } from '@/hooks/useFormField';
import { useFormStyles } from '@/hooks/useFormStyles';
import { generateRandomId } from '@/lib/utils/string-utils';
import { format, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
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
  /** Callback function called when the date value changes */
  onValueChange?: (value: string) => void;
}

const DatePicker = ({
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
  onValueChange,
}: DatePickerProps) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized input ID to prevent recreation on every render
  const inputId = useMemo(() => id || generateRandomId('datepicker'), [id]);

  // Use custom hooks
  const { handleChange } = useFormField({ register });
  const styles = useFormStyles({
    size,
    variant: error ? 'error' : variant,
    hasIcon: true,
    iconPosition: 'right',
    className: `${className} cursor-pointer`,
    error,
  });

  // Memoized formatters
  const formatCaption = useCallback(
    (month: Date) => format(month, 'MMMM yyyy', { locale: ptBR }),
    []
  );

  const formatInputDate = useCallback(
    (date: Date): string => format(date, 'dd/MM/yyyy'),
    []
  );

  const parseInputDate = useCallback((input: string): Date | undefined => {
    const parsed = parse(input, 'dd/MM/yyyy', new Date());
    return isValid(parsed) ? parsed : undefined;
  }, []);

  // Memoized popup position styles
  const popupStyles = useMemo(() => {
    const baseStyles = ['datepicker-popup'];

    switch (popupPosition) {
      case 'top':
        baseStyles.push('datepicker-popup-top');
        break;
      case 'left':
        baseStyles.push('datepicker-popup-left');
        break;
      case 'right':
        baseStyles.push('datepicker-popup-right');
        break;
      case 'bottom':
      default:
        baseStyles.push('datepicker-popup-bottom');
        break;
    }

    return baseStyles.join(' ');
  }, [popupPosition]);

  // Update input when date is selected
  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const formattedDate = formatInputDate(date);
        setInputValue(formattedDate);
        setSelectedDate(date);

        // Use the hook for form integration
        handleChange(formattedDate);

        // Call external callback if provided (convert to ISO format for compatibility)
        onValueChange?.(formattedDate);

        setIsOpen(false);
      }
    },
    [handleChange, formatInputDate, onValueChange]
  );

  // Update input when input is typed
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Validate format and update selected date
      if (newValue.length === 10) {
        const parsedDate = parseInputDate(newValue);
        if (parsedDate) {
          setSelectedDate(parsedDate);
          handleChange(newValue);
          onValueChange?.(newValue);
        }
      }

      // Always trigger change for React Hook Form
      handleChange(newValue);
    },
    [handleChange, parseInputDate, onValueChange]
  );

  // Handle input blur for React Hook Form
  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (register?.onBlur) {
        register.onBlur(e);
      }
    },
    [register]
  );

  // Handle input focus to open calendar
  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Handle button click to toggle calendar
  const handleButtonClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  }, [disabled, isOpen]);

  // Memoized default month for DayPicker
  const defaultMonth = useMemo(
    () => (selectedDate ? new Date(selectedDate) : new Date()),
    [selectedDate]
  );

  // Memoized formatters object for DayPicker
  const formatters = useMemo(
    () => ({
      formatCaption,
    }),
    [formatCaption]
  );

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set initial value if defaultValue is provided
  useEffect(() => {
    if (defaultValue) {
      let date: Date | undefined;
      let formattedValue: string;

      if (typeof defaultValue === 'string') {
        // Try to parse as ISO format first, then as Brazilian format
        date = parseInputDate(defaultValue);
        formattedValue = defaultValue;
      } else {
        date = defaultValue;
        formattedValue = formatInputDate(defaultValue);
      }

      if (date) {
        setSelectedDate(date);
        setInputValue(formattedValue);
        handleChange(formattedValue);
      }
    }
  }, [defaultValue, parseInputDate, formatInputDate, handleChange]);

  return (
    <div className="datepicker-container" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}

      <InputWithIcon
        icon={isOpen ? X : Calendar}
        iconAction={handleButtonClick}
        iconPosition="right"
        size={size}
        variant={error ? 'error' : variant}
        error={error}
        className={className}
      >
        <input
          id={inputId}
          ref={register?.ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={`${styles.input} cursor-pointer`}
          disabled={disabled}
          name={register?.name}
        />
      </InputWithIcon>

      {isOpen && (
        <div className={popupStyles}>
          <div className="datepicker-calendar">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              formatters={formatters}
              locale={ptBR}
              lang="pt-BR"
              defaultMonth={defaultMonth}
              timeZone="America/Sao_Paulo"
              showOutsideDays={true}
              fixedWeeks={true}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && <p className="form-helper-text">{helperText}</p>}
    </div>
  );
};

export default DatePicker;
