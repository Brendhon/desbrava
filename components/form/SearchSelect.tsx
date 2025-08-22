import { Dropdown, Input } from '@/components/form';
import { useDropdown } from '@/hooks/useDropdown';
import { useFormField } from '@/hooks/useFormField';
import { SelectOption } from '@/lib/types';
import { normalizeString } from '@/lib/utils/string-utils';
import { LucideIcon, X } from 'lucide-react';
import { InputHTMLAttributes, useCallback, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SearchSelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSelect'> {
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
  icon?: LucideIcon;
  onSelect?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export default function SearchSelect({
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
  icon,
  onSelect,
  onValueChange,
}: SearchSelectProps) {
  // State
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  // Memoized
  const searchSelectId = useMemo(
    () => id || `search-select-${Math.random().toString(36).slice(2, 11)}`,
    [id]
  );

  // Memoized filtered options based on search value
  const filteredOptions = useMemo(() => {
    if (!searchValue.trim()) return options;

    return options.filter((option) => {
      const labelText =
        typeof option.label === 'string'
          ? option.label
          : option.label?.toString() || '';
      return normalizeString(labelText).includes(normalizeString(searchValue));
    });
  }, [options, searchValue]);

  // Use custom hooks
  const { handleChange, handleInputChange } = useFormField({
    register,
    onValueChange,
  });

  const handleOptionSelect = useCallback(
    (option: SelectOption) => {
      setSelectedValue(option.value);
      setSearchValue(
        typeof option.label === 'string' ? option.label : option.value
      );
      handleChange(option.value);
      onSelect?.(option.value);
      closeDropdown();
    },
    [handleChange]
  );

  const { isOpen, highlightedIndex, dropdownRef, openDropdown, closeDropdown } =
    useDropdown({
      options: filteredOptions,
      onOptionSelect: handleOptionSelect,
    });

  const handleInputChangeWrapper = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setSelectedValue('');
      openDropdown();
      handleInputChange(e);
    },
    [openDropdown]
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
    setSelectedValue('');
    closeDropdown();
    handleChange('');
    onSelect?.('');
  }, [closeDropdown, handleChange, onSelect]);

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={searchSelectId} className={styles.label}>
          {label}
        </label>
      )}

      <Input
        id={searchSelectId}
        size={size}
        variant={variant}
        register={register}
        placeholder={placeholder}
        autoComplete="off"
        name={register?.name}
        onChange={handleInputChangeWrapper}
        error={error}
        className={className}
        icon={searchValue ? X : icon}
        iconPosition="right"
        iconAction={handleClearSearch}
      />

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
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className={styles.helperText}>{helperText}</p>
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
