'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, X } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface DatePickerProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
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
  placeholder = 'dd/MM/aaaa',
  disabled = false,
}: DatePickerProps) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized formatters
  const formatCaption = useCallback((month: Date) => 
    format(month, 'MMMM yyyy', { locale: ptBR }), 
    []
  );

  const formatInputDate = useCallback((date: Date): string => 
    format(date, 'dd/MM/yyyy'), 
    []
  );

  const parseInputDate = useCallback((input: string): Date | undefined => {
    const parsed = parse(input, 'dd/MM/yyyy', new Date());
    return isValid(parsed) ? parsed : undefined;
  }, []);

  // Memoized input ID to prevent recreation on every render
  const inputId = useMemo(() => 
    id || `datepicker-${Math.random().toString(36).substr(2, 9)}`, 
    [id]
  );

  // Memoized styles to prevent recalculation on every render
  const inputStyles = useMemo(() => {
    const baseStyles = [
      'form-input-base',
      `form-input-size-${size}`,
      `form-input-variant-${error ? 'error' : variant}`,
      'form-input-padding-right-icon',
      'cursor-pointer',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return baseStyles;
  }, [size, error, variant, disabled, className]);

  const iconStyles = useMemo(() => {
    return [
      'form-input-icon-container',
      'form-input-icon-right',
      `form-input-icon-size-${size}`,
      'cursor-pointer',
    ].join(' ');
  }, [size]);

  // Update input when date is selected
  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (date) {
      const formattedDate = formatInputDate(date);
      setInputValue(formattedDate);
      setSelectedDate(date);
      
      // Trigger React Hook Form change event
      if (register?.onChange) {
        register.onChange({
          target: {
            name: register.name,
            value: formattedDate,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
      
      setIsOpen(false);
    }
  }, [register, formatInputDate]);

  // Update input when input is typed
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate format and update selected date
    if (newValue.length === 10) {
      const parsedDate = parseInputDate(newValue);
      if (parsedDate) {
        setSelectedDate(parsedDate);
        
        // Trigger React Hook Form change event
        if (register?.onChange) {
          register.onChange({
            target: {
              name: register.name,
              value: newValue,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }
    }
    
    // Always trigger change for React Hook Form
    if (register?.onChange) {
      register.onChange(e);
    }
  }, [register, parseInputDate]);

  // Handle input blur for React Hook Form
  const handleInputBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (register?.onBlur) {
      register.onBlur(e);
    }
  }, [register]);

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
  const defaultMonth = useMemo(() => 
    selectedDate ? new Date(selectedDate) : new Date(), 
    [selectedDate]
  );

  // Memoized formatters object for DayPicker
  const formatters = useMemo(() => ({
    formatCaption
  }), [formatCaption]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="datepicker-container" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          ref={register?.ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={inputStyles}
          disabled={disabled}
          name={register?.name}
        />
        
        <button
          type="button"
          onClick={handleButtonClick}
          className={iconStyles}
          disabled={disabled}
          aria-label="Abrir calendário"
        >
          {isOpen ? <X className="w-full h-full" /> : <Calendar className="w-full h-full" />}
        </button>

        {isOpen && (
          <div className="datepicker-popup">
            <div className="datepicker-calendar">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                formatters={formatters}
                locale={ptBR}
                lang='pt-BR'
                defaultMonth={defaultMonth}
                timeZone='America/Sao_Paulo'
                showOutsideDays={true}
                fixedWeeks={true}
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="form-helper-text">{helperText}</p>
      )}
    </div>
  );
};

export default DatePicker;
