import { Dropdown, Input } from '@/components/form';
import { SearchSelectProps, SelectOption } from '@/lib/types';
import { generateRandomId, normalizeString } from '@/lib/utils/string-utils';
import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function SearchSelect({
  label,
  error,
  size = 'md',
  variant = 'default',
  helperText,
  className = '',
  id,
  options,
  defaultValue,
  placeholder,
  icon,
  onInputChange,
  onSelect,
  register,
}: SearchSelectProps) {
  // Local state for input value
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue.label as string);
      setSelectedValue(defaultValue.value as string);
      setHighlightedIndex(-1);
      setIsDropdownOpen(false);
    }
  }, [defaultValue]);

  // Memoized ID
  const searchSelectId = useMemo(() => id || generateRandomId('search-select'), [id]);

  // Filtered options based on input value
  const filteredOptions = useMemo(() => {
    // If input value is empty, return all options
    if (!inputValue?.trim()) return options;

    return options.filter((option) => {
      // If option label is a string, return the label
      const labelText =
        typeof option.label === 'string'
          ? option.label
          : option.label?.toString() || '';
      return normalizeString(labelText).includes(normalizeString(inputValue));
    });
  }, [options, inputValue]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: SelectOption) => {
      const displayValue = typeof option.label === 'string' ? option.label : option.value;
      setInputValue(displayValue);
      setSelectedValue(option.value);
      setHighlightedIndex(-1);
      setIsDropdownOpen(false);
      onSelect?.(option);
      register?.onChange({ target: { value: option.value, name: register?.name } });
    },
    [onSelect, register]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setSelectedValue('');
      setHighlightedIndex(-1);
      setIsDropdownOpen(true);
      onInputChange?.(value);
    },
    [onInputChange]
  );

  // Handle clear input
  const handleClearInput = useCallback(() => {
    setInputValue('');
    setSelectedValue('');
    setHighlightedIndex(-1);
    setIsDropdownOpen(false);
    register?.onChange({ target: { value: '', name: register?.name } });
    onSelect?.({ label: '', value: '' });
  }, [onSelect]);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
  }, []);

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    // Delay closing to allow dropdown selection
    setTimeout(() => {
      setIsDropdownOpen(false);
      setHighlightedIndex(-1);
    }, 150);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownOpen || filteredOptions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isDropdownOpen, filteredOptions, highlightedIndex, handleOptionSelect]
  );

  return (
    <div className={styles.container}>
      <Input
        id={searchSelectId}
        label={label}
        size={size}
        variant={variant}
        placeholder={placeholder}
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        helperText={helperText}
        error={error}
        className={className}
        icon={inputValue ? X : icon}
        iconPosition="right"
        iconAction={handleClearInput}
      />

      {/* Dropdown */}
      {isDropdownOpen && filteredOptions.length > 0 && (
        <div className="relative">
          <Dropdown
            isOpen={isDropdownOpen}
            options={filteredOptions}
            highlightedIndex={highlightedIndex}
            selectedValue={selectedValue}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: 'w-full',
};
