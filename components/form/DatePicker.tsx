'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
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
  value?: string;
  onChange?: (value: string) => void;
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
  value,
  onChange,
  disabled = false,
}: DatePickerProps) => {
  // Get default class names
  const defaultClassNames = getDefaultClassNames();
  
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? parse(value, 'dd/MM/yyyy', new Date()) : undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Format month for calendar
  const formatCaption = (month: Date) => {
    return format(month, 'MMMM yyyy', { locale: ptBR });
  };

  // Format date for input
  const formatInputDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy');
  };

  // Parse date from input
  const parseInputDate = (input: string): Date | undefined => {
    const parsed = parse(input, 'dd/MM/yyyy', new Date());
    return isValid(parsed) ? parsed : undefined;
  };

  // Update input when date is selected
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatInputDate(date);
      setInputValue(formattedDate);
      setSelectedDate(date);
      onChange?.(formattedDate);
      setIsOpen(false);
    }
  };

  // Update input when input is typed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate format and update selected date
    if (newValue.length === 10) {
      const parsedDate = parseInputDate(newValue);
      if (parsedDate) {
        setSelectedDate(parsedDate);
        onChange?.(newValue);
      }
    }
  };

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

  // Sync with external value
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
      setSelectedDate(value ? parse(value, 'dd/MM/yyyy', new Date()) : undefined);
    }
  }, [value]);

  const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;

  const getInputStyles = () => {
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
  };

  const getIconStyles = () => {
    return [
      'form-input-icon-container',
      'form-input-icon-right',
      `form-input-icon-size-${size}`,
      'pointer-events-auto',
    ].join(' ');
  };

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
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={getInputStyles()}
          disabled={disabled}
          {...register}
        />
        
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={getIconStyles()}
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
                formatters={{ formatCaption }}
                locale={ptBR}
                lang='pt-BR'
                defaultMonth={selectedDate ? new Date(selectedDate) : new Date()}
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
