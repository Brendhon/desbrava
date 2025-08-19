import { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  isOpen: boolean;
  options: SelectOption[];
  highlightedIndex: number;
  selectedValue?: string;
  onOptionSelect: (option: SelectOption) => void;
  emptyMessage?: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      isOpen,
      options,
      highlightedIndex,
      selectedValue,
      onOptionSelect,
      emptyMessage = 'Nenhuma opção encontrada'
    },
    ref
  ) => {
    if (!isOpen) return null;

    return (
      <div 
        ref={ref}
        className="absolute z-50 w-full mt-1 bg-midnight-blue border border-slate-dark/20 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        style={{
          maxWidth: '100%',
          minWidth: '100%',
          width: '100%'
        }}
      >
        {options.length === 0 ? (
          <div className="px-4 py-3 text-mist-gray text-center">
            {emptyMessage}
          </div>
        ) : (
          options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={`
                w-full px-4 py-3 text-left hover:bg-slate-dark/70 focus:bg-slate-dark/70 focus:outline-none transition-colors
                ${highlightedIndex === index ? 'bg-slate-dark/70' : ''}
                ${option.disabled ? 'text-mist-gray cursor-not-allowed' : ''}
                ${option.value === selectedValue ? 'bg-slate-dark/70 text-parchment-white' : ''}
              `}
              onClick={() => !option.disabled && onOptionSelect(option)}
              disabled={option.disabled}
            >
              {option.label}
            </button>
          ))
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
