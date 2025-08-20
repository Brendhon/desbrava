import { forwardRef, InputHTMLAttributes, useMemo, useState, useRef, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { X } from 'lucide-react';
import { useDropdown } from '../../hooks/useDropdown';
import { useFormField } from '../../hooks/useFormField';
import { SelectOption } from '@/lib/types';
import InputWithIcon from './InputWithIcon';
import Dropdown from './Dropdown';
import { normalizeString } from '@/lib/utils/string-utils';

interface SearchSelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  register?: UseFormRegisterReturn;
  helperText?: string;
  className?: string;
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  onValueChange?: (value: string) => void;
}

const SearchSelect = forwardRef<HTMLInputElement, SearchSelectProps>(
  (
    {
      label,
      error,
      size = 'md',
      variant = 'default',
      register,
      helperText,
      className = '',
      id,
      options,
      placeholder,
      icon: Icon,
      iconPosition = 'left',
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Memoized search select ID to prevent recreation on every render
    const searchSelectId = useMemo(() =>
      id || `search-select-${Math.random().toString(36).substr(2, 9)}`,
      [id]
    );

    // Memoized filtered options based on search value
    const filteredOptions = useMemo(() => {
      if (!searchValue.trim()) return options;

      return options.filter(option => {
        const labelText = typeof option.label === 'string'
          ? option.label
          : option.label?.toString() || '';
        return normalizeString(labelText).includes(normalizeString(searchValue));
      });
    }, [options, searchValue]);

    // Use custom hooks
    const { handleChange, handleInputChange } = useFormField({ register, onValueChange });

    const handleOptionSelect = useCallback((option: SelectOption) => {
      setSelectedValue(option.value);
      setSearchValue(typeof option.label === 'string' ? option.label : option.value);
      handleChange(option.value);
      closeDropdown();
    }, [handleChange]);

    const { isOpen, highlightedIndex, dropdownRef, openDropdown, closeDropdown } = useDropdown({
      options: filteredOptions,
      onOptionSelect: handleOptionSelect
    });

    const handleInputChangeWrapper = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setSelectedValue('');
      openDropdown();
      handleInputChange(e);
    }, [openDropdown]);

    const handleInputFocus = useCallback(() => {
      openDropdown();
    }, [openDropdown]);

    const handleClearSearch = useCallback(() => {
      setSearchValue('');
      setSelectedValue('');
      closeDropdown();
      handleChange('');
      inputRef.current?.focus();
    }, [closeDropdown, handleChange]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={searchSelectId} className="form-label">
            {label}
          </label>
        )}

        <InputWithIcon
          icon={Icon as any}
          iconPosition={iconPosition}
          size={size}
          variant={variant}
          error={error}
          className={className}
        >
          <input
            id={searchSelectId}
            ref={(node) => {
              // Handle both refs
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
              if (register?.ref) {
                register.ref(node);
              }
            }}
            className="form-input-base form-input-size-md form-input-variant-default w-full"
            value={searchValue}
            onChange={handleInputChangeWrapper}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            autoComplete="off"
            name={register?.name}
            {...props}
          />

          {/* Clear button */}
          {searchValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-mist-gray hover:text-mist-gray/70 transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </InputWithIcon>

        {/* Dropdown */}
        <div className="relative">
          <Dropdown
            ref={dropdownRef}
            isOpen={isOpen}
            options={filteredOptions}
            highlightedIndex={highlightedIndex}
            selectedValue={selectedValue}
            onOptionSelect={handleOptionSelect}
          />
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
  }
);

SearchSelect.displayName = 'SearchSelect';

export default SearchSelect;
