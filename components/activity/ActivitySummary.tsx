'use client';

import { Card } from '@/components/ui';
import { Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';
import { DestinationData } from './DestinationSelector';
import { PeriodData } from './PeriodSelector';
import { ActivityTypeData } from './ActivityTypeSelector';

interface ActivitySummaryProps {
  activityType: ActivityTypeData;
  destinations: DestinationData;
  periodData: PeriodData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function ActivitySummary({
  activityType,
  destinations,
  periodData,
  onBack,
  onSubmit,
  isSubmitting = false,
}: ActivitySummaryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-royal-purple/20 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle className="text-royal-purple h-10 w-10" />
        </div>
        <h2 className="text-parchment-white mb-2 text-2xl font-bold">
          Resumo da Atividade
        </h2>
        <p className="text-mist-gray">
          Revise as informações antes de criar a atividade
        </p>
      </div>

      <div className="space-y-6">
        {/* Activity Type */}
        <Card
          shadow="none"
          background="dark"
          maxWidth="none"
          border={false}
          className="p-6"
        >
          <h3 className="text-parchment-white mb-4 text-lg font-semibold">
            Tipo de Atividade
          </h3>

          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {activityType.type === 'accommodation' && '🏨'}
              {activityType.type === 'transportation' && '🚗'}
              {activityType.type === 'food' && '🍽️'}
              {activityType.type === 'leisure' && '🎯'}
              {activityType.type === 'other' && '📝'}
            </div>
            <div>
              <p className="text-parchment-white font-medium capitalize">
                {activityType.type === 'accommodation' && 'Acomodação'}
                {activityType.type === 'transportation' && 'Transporte'}
                {activityType.type === 'food' && 'Alimentação'}
                {activityType.type === 'leisure' && 'Lazer'}
                {activityType.type === 'other' && 'Outro'}
              </p>
            </div>
          </div>
        </Card>

        {/* Destinations */}
        <Card
          shadow="none"
          background="dark"
          maxWidth="none"
          border={false}
          className="p-6"
        >
          <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
            <MapPin className="text-royal-purple h-5 w-5" />
            Local da Atividade
          </h3>

          {destinations.place && (
            <div className="flex items-center gap-3">
              <div className="bg-royal-purple/20 flex h-8 w-8 items-center justify-center rounded-full">
                <MapPin className="text-royal-purple h-4 w-4" />
              </div>
              <div>
                <p className="text-parchment-white font-medium">
                  {destinations.place.displayName.text}
                </p>
                {destinations.place.formattedAddress && (
                  <p className="text-mist-gray text-sm">
                    {destinations.place.formattedAddress}
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Date and Time */}
        <Card
          shadow="none"
          background="dark"
          maxWidth="none"
          border={false}
          className="p-6"
        >
          <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
            <Calendar className="text-royal-purple h-5 w-5" />
            Data e Horário
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="text-mist-gray h-5 w-5" />
              <div>
                <p className="text-mist-gray text-sm">Data</p>
                <p className="text-parchment-white font-medium">
                  {formatDate(periodData.date)}
                </p>
              </div>
            </div>

            {periodData.startTime && (
              <div className="flex items-center gap-3">
                <Clock className="text-mist-gray h-5 w-5" />
                <div>
                  <p className="text-mist-gray text-sm">Horário de Início</p>
                  <p className="text-parchment-white font-medium">
                    {formatTime(periodData.startTime)}
                  </p>
                </div>
              </div>
            )}

            {periodData.endTime && (
              <div className="flex items-center gap-3">
                <Clock className="text-mist-gray h-5 w-5" />
                <div>
                  <p className="text-mist-gray text-sm">Horário de Fim</p>
                  <p className="text-parchment-white font-medium">
                    {formatTime(periodData.endTime)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-mist-gray hover:text-parchment-white px-6 py-3 transition-colors duration-200 disabled:opacity-50"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`rounded-lg px-8 py-3 font-medium transition-all duration-200 ${isSubmitting
              ? 'bg-slate-dark/50 text-mist-gray cursor-not-allowed'
              : 'bg-royal-purple text-parchment-white hover:bg-royal-purple/90 hover:scale-105'
            } `}
        >
          {isSubmitting ? 'Criando...' : 'Criar Atividade'}
        </button>
      </div>
    </div>
  );
}
