import { forwardRef } from 'react';
import { SelectOption } from '@/lib/types';

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
      emptyMessage = 'Nenhuma opção encontrada',
    },
    ref
  ) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={styles.dropdown}
        style={{
          maxWidth: '100%',
          minWidth: '100%',
          width: '100%',
        }}
      >
        {options.length === 0 ? (
          <div className={styles.emptyMessage}>{emptyMessage}</div>
        ) : (
          options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={` ${styles.option} ${highlightedIndex === index ? styles.optionHighlighted : ''} ${option.disabled ? styles.optionDisabled : ''} ${option.value === selectedValue ? styles.optionSelected : ''} `}
              onClick={() => !option.disabled && onOptionSelect(option)}
              disabled={option.disabled}
            >
              {option.item ? option.item : option.label}
            </button>
          ))
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;

const styles = {
  dropdown:
    'absolute z-50 w-full mt-1 bg-midnight-blue border border-slate-dark/20 rounded-lg shadow-lg max-h-60 overflow-y-auto',
  emptyMessage: 'px-4 py-3 text-mist-gray text-center',
  option:
    'w-full px-4 py-3 text-left hover:bg-slate-dark/70 focus:bg-slate-dark/70 focus:outline-none transition-colors',
  optionHighlighted: 'bg-slate-dark/70',
  optionDisabled: 'text-mist-gray cursor-not-allowed',
  optionSelected: 'bg-slate-dark/70 text-parchment-white',
  renderOptionContent: 'flex items-center gap-2 w-full',
  renderOptionContentImage: 'w-4 h-4 rounded-sm object-cover flex-shrink-0',
  renderOptionContentDesc: 'text-xs text-mist-gray ml-auto flex-shrink-0',
  renderOptionContentLabel: 'flex-1 truncate',
};
