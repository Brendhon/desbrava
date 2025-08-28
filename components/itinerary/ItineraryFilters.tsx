'use client';

import { ActivityTypeKey, ActivityType } from '@/lib/types';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface ItineraryFiltersProps {
  selectedTypes: ActivityTypeKey[];
  onTypeChange: (types: ActivityTypeKey[]) => void;
  totalActivities: number;
  filteredCount: number;
}

export function ItineraryFilters({
  selectedTypes,
  onTypeChange,
  totalActivities,
  filteredCount,
}: ItineraryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTypeToggle = (type: ActivityTypeKey) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    onTypeChange([]);
  };

  const hasActiveFilters = selectedTypes.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.expandButton}
          aria-expanded={isExpanded}
          aria-label="Expandir filtros"
        >
          <Filter className={styles.filterIcon} />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className={styles.filterCount}>{selectedTypes.length}</span>
          )}
        </button>
        
        <div className={styles.stats}>
          <span className={styles.totalCount}>
            {filteredCount} de {totalActivities} atividade{totalActivities !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.filtersContent}>
          <div className={styles.filterSection}>
            <h5 className={styles.filterTitle}>Tipo de Atividade</h5>
            <div className={styles.typeFilters}>
              {Object.entries(ActivityType).map(([key, label]) => (
                <label key={key} className={styles.typeFilter}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(key as ActivityTypeKey)}
                    onChange={() => handleTypeToggle(key as ActivityTypeKey)}
                    className={styles.checkbox}
                  />
                  <span className={styles.typeLabel}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={styles.clearButton}
              aria-label="Limpar filtros"
            >
              <X className={styles.clearIcon} />
              Limpar Filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: 'bg-slate-dark rounded-lg border border-slate-dark/20',
  header: 'flex items-center justify-between p-4',
  expandButton: 'flex items-center gap-2 text-mist-gray hover:text-parchment-white transition-colors',
  filterIcon: 'w-4 h-4',
  filterCount: 'bg-royal-purple text-parchment-white text-xs px-2 py-1 rounded-full',
  stats: 'text-sm text-mist-gray',
  totalCount: 'font-medium',
  filtersContent: 'border-t border-slate-dark/20 p-4 space-y-4',
  filterSection: 'space-y-3',
  filterTitle: 'text-sm font-medium text-parchment-white',
  typeFilters: 'grid grid-cols-2 gap-3',
  typeFilter: 'flex items-center gap-2 cursor-pointer hover:text-parchment-white transition-colors',
  checkbox: 'w-4 h-4 text-royal-purple bg-slate-dark border-slate-dark/40 rounded',
  typeLabel: 'text-sm text-mist-gray',
  clearButton: 'flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm',
  clearIcon: 'w-4 h-4',
};
