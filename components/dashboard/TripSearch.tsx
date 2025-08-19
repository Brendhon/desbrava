'use client';

import Button from '@/components/ui/Button';
import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TripSearchProps {
  onSearch: (searchTerm: string, filters: TripFilters) => void;
  onClear: () => void;
  loading?: boolean;
}

interface TripFilters {
  startDate?: string;
  endDate?: string;
  country?: string;
}

export default function TripSearch({ onSearch, onClear, loading = false }: TripSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TripFilters>({});

  const handleSearch = () => {
    onSearch(searchTerm, filters);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilters({});
    onClear();
  };

  const handleFilterChange = (key: keyof TripFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchInput}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar viagens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.searchActions}>
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className={styles.filterButton}
            disabled={loading}
          >
            <Filter className={styles.filterIcon} />
            Filtros
          </Button>

          <Button
            variant="primary"
            onClick={handleSearch}
            disabled={!searchTerm && !Object.values(filters).some(Boolean)}
          >
            Buscar
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Data de Início</label>
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className={styles.filterInput}
                disabled={loading}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Data de Fim</label>
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className={styles.filterInput}
                disabled={loading}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>País</label>
              <input
                type="text"
                placeholder="Código do país (ex: BR, FR)"
                value={filters.country || ''}
                onChange={(e) => handleFilterChange('country', e.target.value.toUpperCase())}
                className={styles.filterInput}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className={styles.activeFilters}>
          <span className={styles.activeFiltersLabel}>Filtros ativos:</span>
          
          {searchTerm && (
            <span className={styles.filterTag}>
              Busca: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className={styles.removeFilter}
                aria-label="Remover filtro de busca"
              >
                <X className={styles.removeIcon} />
              </button>
            </span>
          )}

          {filters.startDate && (
            <span className={styles.filterTag}>
              Início: {new Date(filters.startDate).toLocaleDateString('pt-BR')}
              <button
                onClick={() => handleFilterChange('startDate', '')}
                className={styles.removeFilter}
                aria-label="Remover filtro de data de início"
              >
                <X className={styles.removeIcon} />
              </button>
            </span>
          )}

          {filters.endDate && (
            <span className={styles.filterTag}>
              Fim: {new Date(filters.endDate).toLocaleDateString('pt-BR')}
              <button
                onClick={() => handleFilterChange('endDate', '')}
                className={styles.removeFilter}
                aria-label="Remover filtro de data de fim"
              >
                <X className={styles.removeIcon} />
              </button>
            </span>
          )}

          {filters.country && (
            <span className={styles.filterTag}>
              País: {filters.country}
              <button
                onClick={() => handleFilterChange('country', '')}
                className={styles.removeFilter}
                aria-label="Remover filtro de país"
              >
                <X className={styles.removeIcon} />
              </button>
            </span>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={handleClear}
            className={styles.clearAllButton}
            disabled={loading}
          >
            Limpar Todos
          </Button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: 'space-y-4',
  searchSection: 'flex flex-col sm:flex-row gap-4',
  searchInput: 'relative flex-1',
  searchIcon: 'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mist-gray',
  input: 'w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-parchment-white placeholder-mist-gray focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent',
  searchActions: 'flex gap-3',
  filterButton: 'flex items-center gap-2',
  filterIcon: 'w-4 h-4',
  filtersSection: 'bg-slate-800 border border-slate-700 rounded-lg p-4',
  filtersGrid: 'grid grid-cols-1 md:grid-cols-3 gap-4',
  filterGroup: 'space-y-2',
  filterLabel: 'block text-sm font-medium text-mist-gray',
  filterInput: 'w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-parchment-white placeholder-mist-gray focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent',
  activeFilters: 'flex flex-wrap items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-lg',
  activeFiltersLabel: 'text-sm text-mist-gray mr-2',
  filterTag: 'inline-flex items-center gap-2 px-3 py-1 bg-royal-purple text-parchment-white text-sm rounded-full',
  removeFilter: 'hover:bg-royal-purple/80 rounded-full p-1 transition-colors duration-200',
  removeIcon: 'w-3 h-3',
  clearAllButton: 'ml-auto',
};
