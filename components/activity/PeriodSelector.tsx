'use client';

import { Input } from '@/components/form';
import { Card } from '@/components/ui';
import { Calendar, Clock, TimerIcon } from 'lucide-react';
import { useState } from 'react';

import { ActivityTypeData } from './ActivityTypeSelector';
import { DestinationData } from './DestinationSelector';

export interface PeriodData {
  date: string;
  startTime: string;
  endTime: string;
}

interface PeriodSelectorProps {
  activityType: ActivityTypeData;
  destinations: DestinationData;
  onNext: (periodData: PeriodData) => void;
  onBack: () => void;
}

export default function PeriodSelector({
  activityType,
  destinations,
  onNext,
  onBack,
}: PeriodSelectorProps) {
  const [periodData, setPeriodData] = useState<PeriodData>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const isTransportation = activityType.type === 'transportation';
  const needsTimeRange = !isTransportation;

  const handleInputChange = (field: string, value: string) => {
    setPeriodData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (periodData.date) {
      onNext({
        date: periodData.date,
        startTime: periodData.startTime,
        endTime: periodData.endTime,
      });
    }
  };

  const canProceed =
    periodData.date &&
    (isTransportation ||
      (needsTimeRange && (periodData.startTime || periodData.endTime)));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-parchment-white mb-2 text-2xl font-bold">
          {isTransportation
            ? 'Quando será a viagem?'
            : 'Quando será a atividade?'}
        </h2>
        <p className="text-mist-gray">
          {isTransportation
            ? 'Defina a data da sua viagem'
            : 'Selecione a data e horário da atividade'}
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
          <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
            <Calendar className="text-royal-purple h-5 w-5" />
            Data
          </h3>

          <div className="space-y-3">
            <Input
              label="Data"
              type="date"
              value={periodData.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange('date', e.target.value)
              }
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
            <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
              <Clock className="text-royal-purple h-5 w-5" />
              Horário
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Horário de Início"
                type="time"
                icon={TimerIcon}
                iconPosition="right"
                value={periodData.startTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('startTime', e.target.value)
                }
              />

              <Input
                label="Horário de Fim"
                type="time"
                icon={TimerIcon}
                iconPosition="right"
                value={periodData.endTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('endTime', e.target.value)
                }
              />
            </div>
          </Card>
        )}

        {/* Summary for transportation */}
        {isTransportation && destinations.place && destinations.destination && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <h3 className="text-parchment-white mb-4 text-lg font-semibold">
              Resumo da Viagem
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mist-gray">Tipo:</span>
                <span className="text-parchment-white">Transporte</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist-gray">De:</span>
                <span className="text-parchment-white">
                  {destinations.place.displayName.text}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist-gray">Para:</span>
                <span className="text-parchment-white">
                  {destinations.destination.displayName.text}
                </span>
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
        {!isTransportation && destinations.place && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <h3 className="text-parchment-white mb-4 text-lg font-semibold">
              Resumo da Atividade
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-mist-gray">Tipo:</span>
                <span className="text-parchment-white capitalize">
                  {activityType.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist-gray">Local:</span>
                <span className="text-parchment-white">
                  {destinations.place.displayName.text}
                </span>
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
                  <span className="text-parchment-white">
                    {periodData.startTime}
                  </span>
                </div>
              )}
              {periodData.endTime && (
                <div className="flex justify-between">
                  <span className="text-mist-gray">Fim:</span>
                  <span className="text-parchment-white">
                    {periodData.endTime}
                  </span>
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
          className="text-mist-gray hover:text-parchment-white px-6 py-3 transition-colors duration-200"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          className={`rounded-lg px-8 py-3 font-medium transition-all duration-200 ${
            canProceed
              ? 'bg-royal-purple text-parchment-white hover:bg-royal-purple/90 hover:scale-105'
              : 'bg-slate-dark/50 text-mist-gray cursor-not-allowed'
          } `}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
