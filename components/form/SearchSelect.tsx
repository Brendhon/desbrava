import { forwardRef, InputHTMLAttributes, useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { X } from 'lucide-react';

interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

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
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        return labelText.toLowerCase().includes(searchValue.toLowerCase());
      });
    }, [options, searchValue]);

    // Memoized padding styles based on icon presence and position
    const paddingStyles = useMemo(() => {
      if (!Icon) return '';
      
      if (iconPosition === 'left') {
        return 'form-input-padding-left-icon';
      } else if (iconPosition === 'right') {
        return 'form-input-padding-right-icon';
      }
      
      return '';
    }, [Icon, iconPosition]);

    // Memoized input styles to prevent recalculation on every render
    const inputStyles = useMemo(() => {
      return [
        'form-input-base',
        `form-input-size-${size}`,
        `form-input-variant-${variant}`,
        paddingStyles,
        error && 'form-input-variant-error',
        'form-search-select-input', // Additional styles specific to search select
        className,
      ]
        .filter(Boolean)
        .join(' ');
    }, [size, variant, paddingStyles, error, className]);

    // Memoized icon styles to prevent string recreation on every render
    const iconStyles = useMemo(() => {
      return [
        'form-input-icon-container',
        `form-input-icon-${size}`,
        iconPosition === 'left' ? 'form-input-icon-left' : 'form-input-icon-right'
      ].join(' ');
    }, [size, iconPosition]);



    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    }, [isOpen, filteredOptions, highlightedIndex]);

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && dropdownRef.current) {
        const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex]);



    const handleOptionSelect = useCallback((option: SelectOption) => {
      setSelectedValue(option.value);
      setSearchValue(typeof option.label === 'string' ? option.label : option.value);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onValueChange?.(option.value);
      
      // Update React Hook Form if register is provided
      if (register?.onChange) {
        const syntheticEvent = {
          target: {
            name: register.name,
            value: option.value
          }
        };
        register.onChange(syntheticEvent as any);
      }
    }, [onValueChange, register]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setSelectedValue('');
      setIsOpen(true);
      setHighlightedIndex(-1);
      
      // Update React Hook Form if register is provided
      if (register?.onChange) {
        const syntheticEvent = {
          target: {
            name: register.name,
            value: value
          }
        };
        register.onChange(syntheticEvent as any);
      }
    }, [register]);

    const handleInputFocus = useCallback(() => {
      setIsOpen(true);
      setHighlightedIndex(-1);
    }, []);

    const handleClearSearch = useCallback(() => {
      setSearchValue('');
      setSelectedValue('');
      setIsOpen(false);
      setHighlightedIndex(-1);
      
      // Update React Hook Form if register is provided
      if (register?.onChange) {
        const syntheticEvent = {
          target: {
            name: register.name,
            value: ''
          }
        };
        register.onChange(syntheticEvent as any);
      }
      
      inputRef.current?.focus();
    }, [register]);

    const getSelectedOptionLabel = useCallback(() => {
      if (!selectedValue) return '';
      const option = options.find(opt => opt.value === selectedValue);
      return option ? (typeof option.label === 'string' ? option.label : option.value) : '';
    }, [selectedValue, options]);

    return (
      <div className="w-full" ref={containerRef}>
        {label && (
          <label htmlFor={searchSelectId} className="form-label">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <Icon
              className={iconStyles}
              aria-hidden="true"
            />
          )}
          
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
            className={inputStyles}
            value={searchValue}
            onChange={handleInputChange}
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
              className="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}



          {Icon && iconPosition === 'right' && (
            <Icon
              className={iconStyles}
              aria-hidden="true"
            />
          )}

          {/* Dropdown */}
          {isOpen && (
            <div 
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-midnight-blue border border-slate-dark/20 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-center">
                  Nenhuma opção encontrada
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      w-full px-4 py-3 text-left hover:bg-slate-dark/70 focus:bg-slate-dark/70 focus:outline-none transition-colors
                      ${highlightedIndex === index ? 'bg-slate-dark/70' : ''}
                      ${option.disabled ? 'text-gray-400 cursor-not-allowed' : ''}
                      ${option.value === selectedValue ? 'bg-slate-dark/70 text-parchment-white' : ''}
                    `}
                    onClick={() => !option.disabled && handleOptionSelect(option)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </button>
                ))
              )}
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
  }
);

SearchSelect.displayName = 'SearchSelect';

export default SearchSelect;
