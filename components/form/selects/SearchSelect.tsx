import { Dropdown, Input } from '@/components/form';
import { SearchSelectProps, SelectOption } from '@/lib/types';
import { compareStrings, containsString } from '@/lib/utils/string-utils';
import { X } from 'lucide-react';
import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

// Interface for imperative handle
export interface SearchSelectRef {
  clear: () => void;
  focus: () => void;
}

const SearchSelect = forwardRef<SearchSelectRef, SearchSelectProps>(({
  label,
  error,
  size = 'md',
  variant = 'default',
  helperText,
  className = '',
  options,
  defaultValue,
  placeholder,
  icon,
  onInputChange,
  onSelect,
  register,
  position = 'bottom',
}, ref) => {
  // Local state for input value
  const [inputValue, setInputValue] = useState('');

  // Local state for dropdown open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Local state for highlighted index
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Local state for selected value
  const [selectedValue, setSelectedValue] = useState('');

  // Ref for input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    clear: () => handleClearInput(),
    focus: () => inputRef.current?.focus(),
  }), []);

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue.label);
      setSelectedValue(defaultValue.value);
      setHighlightedIndex(-1);
      setIsDropdownOpen(false);
    }
  }, [defaultValue]);

  // Filtered options based on input value
  const filteredOptions = useMemo(() => {
    return !inputValue?.trim()
      ? options
      : options.filter((option: SelectOption) => containsString(option.label, inputValue));
  }, [options, inputValue]);

  // update register value 
  const updateRegisterValue = useCallback((value: string) => {
    register?.onChange({ target: { value: value, name: register?.name } });
  }, [register]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: SelectOption) => {
      setInputValue(option.label);
      setSelectedValue(option.value);
      setHighlightedIndex(-1);
      setIsDropdownOpen(false);
      onSelect?.(option);
      updateRegisterValue(option.value);
    },
    [onSelect, updateRegisterValue]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
    updateRegisterValue('');
    onSelect?.({ label: '', value: '' });
  }, [onSelect, updateRegisterValue]);

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
    (e: KeyboardEvent<HTMLInputElement>) => {
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
        ref={inputRef}
      />

      {/* Dropdown */}
      {isDropdownOpen && filteredOptions.length > 0 && (
        <div className="relative">
          <Dropdown
            isOpen={isDropdownOpen}
            position={position}
            options={filteredOptions}
            highlightedIndex={highlightedIndex}
            selectedValue={selectedValue}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      )}
    </div>
  );
});

SearchSelect.displayName = 'SearchSelect';

const styles = {
  container: 'w-full',
};

export default SearchSelect;
