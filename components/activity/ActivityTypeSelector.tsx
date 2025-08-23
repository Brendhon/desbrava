'use client';

import { SubTypeSearchSelect } from '@/components/form/selects';
import { NavigationButtons } from '@/components/steps';
import { Card } from '@/components/ui';
import { usePlaceTypes } from '@/hooks/usePlaceTypes';
import {
  ACTIVITY_TYPE_INFO,
  ACTIVITY_TYPE_OPTIONS,
  type ActivityTypeKey,
} from '@/lib/types/activity';
import { SelectOption } from '@/lib/types/form';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface ActivityTypeData {
  type: ActivityTypeKey;
  subType: string;
}

interface ActivityTypeSelectorProps {
  typeData?: ActivityTypeData;
  onNext: (data: ActivityTypeData) => void;
}

export default function ActivityTypeSelector({ typeData, onNext }: ActivityTypeSelectorProps) {
  // Selected type and sub type
  const [selectedType, setSelectedType] = useState<ActivityTypeKey | null>(typeData?.type || null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(typeData?.subType || null);

  // Hooks
  const { getSubtypesByType } = usePlaceTypes();

  // Selected option for the sub type
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
    typeData?.type && typeData?.subType 
      ? getSubtypesByType(typeData.type, typeData.subType)
      : undefined
  );

  // Handle type select
  const handleTypeSelect = (type: ActivityTypeKey) => {
    setSelectedType(type);
    setSelectedSubType(null);
    setSelectedOption(undefined);
  };

  // Handle next button click
  const handleNext = () => {
    if (selectedType && selectedSubType) {
      onNext({ type: selectedType as ActivityTypeKey, subType: selectedSubType });
    }
  };

  // Handle sub type change
  const handleSubTypeChange = (option: SelectOption) => {
    setSelectedSubType(option.value);
    setSelectedOption(option);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.titleText}>
          Que tipo de atividade você quer criar?
        </h2>
        <p className={styles.description}>
          Selecione o tipo de atividade para continuar com o planejamento
        </p>
      </div>

      <div className={styles.cardContainer}>
        {ACTIVITY_TYPE_OPTIONS.map((option) => {
          const isSelected = selectedType === option.value;

          return (
            <Card
              key={option.value}
              shadow="none"
              padding="sm"
              background="blue"
              maxWidth="none"
              border={true}
              className={cn(styles.card, isSelected ? styles.cardSelected : styles.cardUnselected)}
              onClick={() => handleTypeSelect(option.value)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>{option.icon}</div>
                <h3 className={styles.cardTitle}>
                  {option.label}
                </h3>
                <p className={styles.cardDescription}>
                  {ACTIVITY_TYPE_INFO[option.value]}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedType && (
          <SubTypeSearchSelect
            label="Tipo de atividade"
            defaultValue={selectedOption?.value}
            placeholder="Selecione o tipo de atividade"
            onSelect={handleSubTypeChange}
          activityType={selectedType}
        />
      )}

      <NavigationButtons
        onBack={() => { }}
        onNext={handleNext}
        canProceed={!!selectedType && !!selectedSubType}
        canGoBack={false}
      />
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  title: 'text-center',
  titleText: 'text-parchment-white mb-2 text-2xl font-bold',
  description: 'text-center',
  cardContainer: 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  card: 'transform cursor-pointer p-6 transition-all duration-200',
  cardContent: 'space-y-3 text-center',
  cardSelected: 'border-royal-purple bg-royal-purple/10 scale-105',
  cardUnselected: 'border-slate-dark/30 hover:border-royal-purple/50 hover:bg-slate-dark/50 hover:scale-104',
  cardIcon: 'text-2xl',
  cardTitle: 'text-parchment-white text-lg font-semibold',
  cardDescription: 'text-mist-gray text-xs',
  searchSelectContainer: 'space-y-2',
  typeNotFound: 'text-mist-gray text-xs',
  typeNotFoundLink: 'text-royal-purple underline cursor-pointer',
}
