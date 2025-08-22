'use client';

import { Input, Select } from '@/components/form';
import { Card } from '@/components/ui';
import { ActivityTypeKey } from '@/lib/types/activity';
import { Place } from '@/lib/types/places';
import { Calendar, Clock, TimerIcon } from 'lucide-react';
import { useState } from 'react';

interface PeriodSelectorProps {
  activityType: ActivityTypeKey;
  destinations: { origin?: Place; destination?: Place };
  onNext: (periodData: {
    date: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
  }) => void;
  onBack: () => void;
}

export default function PeriodSelector({
  activityType,
  destinations,
  onNext,
  onBack,
}: PeriodSelectorProps) {
  const [periodData, setPeriodData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    duration: '',
  });

  const isTransportation = activityType === 'transportation';
  const needsTimeRange = !isTransportation;

  const handleInputChange = (field: string, value: string) => {
    setPeriodData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (periodData.date) {
      onNext({
        date: periodData.date,
        startTime: periodData.startTime || undefined,
        endTime: periodData.endTime || undefined,
        duration: periodData.duration ? parseInt(periodData.duration) : undefined,
      });
    }
  };

  const canProceed = periodData.date && (
    isTransportation || 
    (needsTimeRange && (periodData.startTime || periodData.duration))
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-parchment-white mb-2">
          {isTransportation ? 'Quando será a viagem?' : 'Quando será a atividade?'}
        </h2>
        <p className="text-mist-gray">
          {isTransportation 
            ? 'Defina a data da sua viagem'
            : 'Selecione a data e horário da atividade'
          }
        </p>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <Card
          shadow="none"
          background="dark"
          maxWidth="none"
          border={false}
          className="p-6"
        >
          <h3 className="text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-royal-purple" />
            Data
          </h3>
          
          <div className="space-y-3">
            <Input
              label="Data"
              type="date"
              value={periodData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
          </div>
        </Card>

        {/* Time Selection (for non-transportation activities) */}
        {needsTimeRange && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <h3 className="text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-royal-purple" />
              Horário
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Horário de Início"
                type="time"
                icon={TimerIcon}
                iconPosition="right"
                value={periodData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
              
              <Input
                label="Horário de Fim"
                type="time"
                icon={TimerIcon}
                iconPosition="right"
                value={periodData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
              />
            </div>

            <div className="mt-4">
              <Input
                label="Duração (minutos) - opcional"
                type="number"
                placeholder="120"
                min="0"
                value={periodData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
              <p className="text-xs text-mist-gray mt-1">
                Deixe em branco se você já definiu horário de início e fim
              </p>
            </div>
          </Card>
        )}

        {/* Summary for transportation */}
        {isTransportation && destinations.origin && destinations.destination && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <h3 className="text-lg font-semibold text-parchment-white mb-4">
              Resumo da Viagem
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mist-gray">Tipo:</span>
                <span className="text-parchment-white">Transporte</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist-gray">De:</span>
                <span className="text-parchment-white">{destinations.origin.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist-gray">Para:</span>
                <span className="text-parchment-white">{destinations.destination.name}</span>
              </div>
              {periodData.date && (
                <div className="flex justify-between">
                  <span className="text-mist-gray">Data:</span>
                  <span className="text-parchment-white">
                    {new Date(periodData.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Summary for other activities */}
        {!isTransportation && destinations.destination && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <h3 className="text-lg font-semibold text-parchment-white mb-4">
              Resumo da Atividade
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mist-gray">Tipo:</span>
                <span className="text-parchment-white capitalize">{activityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist-gray">Local:</span>
                <span className="text-parchment-white">{destinations.destination.name}</span>
              </div>
              {periodData.date && (
                <div className="flex justify-between">
                  <span className="text-mist-gray">Data:</span>
                  <span className="text-parchment-white">
                    {new Date(periodData.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
              {periodData.startTime && (
                <div className="flex justify-between">
                  <span className="text-mist-gray">Início:</span>
                  <span className="text-parchment-white">{periodData.startTime}</span>
                </div>
              )}
              {periodData.endTime && (
                <div className="flex justify-between">
                  <span className="text-mist-gray">Fim:</span>
                  <span className="text-parchment-white">{periodData.endTime}</span>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-mist-gray hover:text-parchment-white transition-colors duration-200"
        >
          Voltar
        </button>
        
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-lg font-medium transition-all duration-200
            ${canProceed
              ? 'bg-royal-purple text-parchment-white hover:bg-royal-purple/90 hover:scale-105'
              : 'bg-slate-dark/50 text-mist-gray cursor-not-allowed'
            }
          `}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
