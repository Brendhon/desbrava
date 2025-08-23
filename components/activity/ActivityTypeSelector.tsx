'use client';

import { SubTypeSearchSelect } from '@/components/form/selects';
import { NavigationButtons } from '@/components/steps';
import { Card } from '@/components/ui';
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
  const [selectedType, setSelectedType] = useState<ActivityTypeKey | undefined>(typeData?.type);
  const [selectedSubType, setSelectedSubType] = useState<string | undefined>(typeData?.subType);

  // Handle type select
  const handleTypeSelect = (type: ActivityTypeKey) => {
    setSelectedType(type);
    setSelectedSubType(undefined);
  };

  // Handle next button click
  const handleNext = () => {
    if (selectedType && selectedSubType) {
      onNext({ type: selectedType, subType: selectedSubType });
    }
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
              className={cn(
                styles.card,
                isSelected ? styles.cardSelected : styles.cardUnselected
              )}
              onClick={() => handleTypeSelect(option.value)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>{option.icon}</div>
                <h3 className={styles.cardTitle}>{option.label}</h3>
                <p className={styles.cardDescription}>
                  {ACTIVITY_TYPE_INFO[option.value]}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className={styles.searchSelectContainer}>
        <SubTypeSearchSelect
          activityType={selectedType}
          defaultValue={typeData?.subType}
          onSelect={(option: SelectOption) => setSelectedSubType(option.value)}
        />
      </div>

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
  cardContainer:
    'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  card: 'transform cursor-pointer p-6 transition-all duration-200',
  cardContent: 'space-y-3 text-center',
  cardSelected: 'border-royal-purple bg-royal-purple/10 scale-105',
  cardUnselected:
    'border-slate-dark/30 hover:border-royal-purple/50 hover:bg-slate-dark/50 hover:scale-104',
  cardIcon: 'text-2xl',
  cardTitle: 'text-parchment-white text-lg font-semibold',
  cardDescription: 'text-mist-gray text-xs',
  searchSelectContainer: 'mt-4 mb-0',
};
