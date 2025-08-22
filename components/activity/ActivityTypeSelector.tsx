'use client';

import { Button, Card } from '@/components/ui';
import { ACTIVITY_TYPE_INFO, ACTIVITY_TYPE_OPTIONS, type ActivityTypeKey } from '@/lib/types/activity';
import { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';

interface ActivityTypeSelectorProps {
  selectedType: ActivityTypeKey | '';
  onTypeSelect: (type: ActivityTypeKey) => void;
  onNext: () => void;
}

export default function ActivityTypeSelector({
  selectedType,
  onTypeSelect,
  onNext,
}: ActivityTypeSelectorProps) {
  const [hoveredType, setHoveredType] = useState<ActivityTypeKey | null>(null);

  const handleTypeSelect = (type: ActivityTypeKey) => {
    onTypeSelect(type);
  };

  const handleNext = () => {
    if (selectedType) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-parchment-white mb-2">
          Que tipo de atividade você quer criar?
        </h2>
        <p className="text-mist-gray">
          Selecione o tipo de atividade para continuar com o planejamento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACTIVITY_TYPE_OPTIONS.map((option) => {
          const isSelected = selectedType === option.value;
          const isHovered = hoveredType === option.value;

          return (
            <Card
              key={option.value}
              shadow="none"
              background="blue"
              maxWidth="none"
              border={true}
              className={`
                p-6 cursor-pointer transition-all duration-200 transform
                ${isSelected 
                  ? 'border-royal-purple bg-royal-purple/10 scale-103' 
                  : 'border-slate-dark/30 hover:border-royal-purple/50 hover:bg-slate-dark/50'
                }
                ${isHovered ? 'scale-101' : ''}
              `}
              onClick={() => handleTypeSelect(option.value)}
              onMouseEnter={() => setHoveredType(option.value)}
              onMouseLeave={() => setHoveredType(null)}
            >
              <div className="text-center space-y-3">
                <div className="text-4xl">{option.label.split(' ')[0]}</div>
                <h3 className="text-lg font-semibold text-parchment-white">
                  {option.label.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-mist-gray text-sm">{ACTIVITY_TYPE_INFO[option.value]}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          variant="primary"
          iconPosition="right"
          onClick={handleNext}
          className="w-full md:w-auto"
          disabled={!selectedType}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
