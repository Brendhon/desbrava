'use client';

import { memo, useCallback, useState } from 'react';
import { Input } from '@/components/form';
import { Search, X } from 'lucide-react';
import Card from '../ui/Card';

// Constants
const STATUS_OPTIONS = ['all', 'past', 'active', 'future'] as const;
type StatusFilter = (typeof STATUS_OPTIONS)[number];

interface TripFilterProps {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  countryFilter: string;
  setCountryFilter: (country: string) => void;
  getStatusCount: (status: StatusFilter) => number;
  getStatusLabel: (status: StatusFilter) => string;
}

const TripFilter = memo(
  ({
    statusFilter,
    setStatusFilter,
    countryFilter,
    setCountryFilter,
    getStatusCount,
    getStatusLabel,
  }: TripFilterProps) => {
    const handleStatusFilter = useCallback(
      (status: StatusFilter) => setStatusFilter(status),
      [setStatusFilter]
    );

    const handleCountryFilterChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setCountryFilter(e.target.value),
      [setCountryFilter]
    );

    return (
      <Card padding="lg" background="dark" maxWidth="none" border={false}>
        {/* Trip Search Filter */}
        <Input
          label="Buscar viagens"
          placeholder="Busque por qualquer informação da viagem (nome, país, descrição, datas, etc.)"
          value={countryFilter}
          icon={countryFilter ? X : undefined}
          iconPosition="right"
          iconAction={() => (countryFilter ? setCountryFilter('') : null)}
          onChange={handleCountryFilterChange}
          size="md"
          helperText="🔎 Pesquise suas viagens por qualquer dado: nome, país, descrição, datas e mais! Use palavras-chave para encontrar rapidamente a viagem desejada. ✈️🌍"
        />
        
        {/* Status Filters */}
        <div className={styles.statusFilters}>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`${styles.statusFilter} ${statusFilter === status ? styles.statusFilterActive : ''
                }`}
            >
              {getStatusLabel(status)}
              <span className={styles.statusCount}>
                ({getStatusCount(status)})
              </span>
            </button>
          ))}
        </div>
      </Card>
    );
  }
);

TripFilter.displayName = 'TripFilter';

export default TripFilter;

const styles = {
  container: 'space-y-4',
  statusFilters: 'flex flex-wrap gap-2 pt-8',
  statusFilter:
    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-slate-700 text-mist-gray hover:text-parchment-white bg-midnight-blue',
  statusFilterActive:
    'bg-royal-purple text-parchment-white hover:bg-royal-purple/90',
  statusCount: 'ml-1 opacity-75',
};
