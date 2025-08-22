'use client';

import { Card } from '@/components/ui';
import {
  ACTIVITY_TYPE_INFO,
  ACTIVITY_TYPE_OPTIONS,
  type ActivityTypeKey,
} from '@/lib/types/activity';
import placeTypesData from '@/public/data/place_types.json';
import { useState, useEffect } from 'react';
import { SearchSelect } from '../form';
import { NavigationButtons } from '../steps';
import { SelectOption } from '@/lib/types/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activityTypeSelectorSchema, type ActivityTypeSelectorFormData } from '@/lib/schemas/activity';

export interface ActivityTypeData {
  type: ActivityTypeKey;
  subType: string;
}

interface ActivityTypeSelectorProps {
  typeData?: ActivityTypeData;
  onNext: (data: ActivityTypeData) => void;
}

export default function ActivityTypeSelector({
  typeData,
  onNext,
}: ActivityTypeSelectorProps) {
  const [hoveredType, setHoveredType] = useState<ActivityTypeKey | null>(null);
  const [subTypeOptions, setSubTypeOptions] = useState<SelectOption[]>(
    typeData?.type ? placeTypesData[typeData.type] : []
  );

  const {
    register,
    setValue,
    watch,
  } = useForm<ActivityTypeSelectorFormData>({
    resolver: zodResolver(activityTypeSelectorSchema),
    defaultValues: {
      activityType: typeData?.type || '',
      subType: typeData?.subType || '',
    },
    mode: 'onChange',
  });

  const watchedActivityType = watch('activityType');
  const watchedSubType = watch('subType');

  useEffect(() => {
    console.log('watchedActivityType', watchedActivityType);
    setSubTypeOptions(watchedActivityType ? placeTypesData[watchedActivityType as ActivityTypeKey] : []);
  }, [watchedActivityType]);

  const handleTypeSelect = (type: ActivityTypeKey) => {
    setValue('activityType', type);
    setValue('subType', '');
    setSubTypeOptions(type ? placeTypesData[type] : []);
  };

  const handleFormSubmit = (data: ActivityTypeData) => {
    onNext(data);
  };

  const handleNext = () => {
    if (watchedActivityType) {
      const data: ActivityTypeData = {
        type: watchedActivityType as ActivityTypeKey,
        subType: watchedSubType || '',
      };
      handleFormSubmit(data);
    }
  };

  const handleSubTypeChange = (value: string) => {
    const subTypeOption = subTypeOptions.find((option) => option.value === value);
    setValue('subType', subTypeOption?.label as string || '');
    console.log('value', value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-parchment-white mb-2 text-2xl font-bold">
          Que tipo de atividade você quer criar?
        </h2>
        <p className="text-mist-gray">
          Selecione o tipo de atividade para continuar com o planejamento
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {ACTIVITY_TYPE_OPTIONS.map((option) => {
          const isSelected = watchedActivityType === option.value;
          const isHovered = hoveredType === option.value;

          return (
            <Card
              key={option.value}
              shadow="none"
              padding="sm"
              background="blue"
              maxWidth="none"
              border={true}
              className={`transform cursor-pointer p-6 transition-all duration-200 ${isSelected
                ? 'border-royal-purple bg-royal-purple/10 scale-103'
                : 'border-slate-dark/30 hover:border-royal-purple/50 hover:bg-slate-dark/50'
                } ${isHovered ? 'scale-101' : ''} `}
              onClick={() => handleTypeSelect(option.value)}
              onMouseEnter={() => setHoveredType(option.value)}
              onMouseLeave={() => setHoveredType(null)}
            >
              <div className="space-y-3 text-center">
                <div className="text-2xl">{option.icon}</div>
                <h3 className="text-parchment-white text-lg font-semibold">
                  {option.label}
                </h3>
                <p className="text-mist-gray text-xs">
                  {ACTIVITY_TYPE_INFO[option.value]}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {watchedActivityType && (
        <div className="space-y-2">
          <SearchSelect
            label="Tipo de atividade"
            options={subTypeOptions}
            placeholder="Selecione o tipo de atividade"
            register={register('subType')}
            onSelect={handleSubTypeChange}
          />
        </div>
      )}

      <NavigationButtons
        onBack={() => { }}
        onNext={handleNext}
        canProceed={!!watchedActivityType && !!watchedSubType}
        canGoBack={false}
      />
    </div>
  );
}
