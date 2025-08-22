'use client';

import { Card } from '@/components/ui';
import { ActivityTypeKey } from '@/lib/types/activity';
import { Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';
import { DestinationData } from './DestinationSelector';
import { PeriodData } from './PeriodSelector';

interface ActivitySummaryProps {
  activityType: ActivityTypeKey;
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
  const isTransportation = activityType === 'transportation';
  const needsTimeRange = !isTransportation;

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
        <div className="w-20 h-20 bg-royal-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-royal-purple" />
        </div>
        <h2 className="text-2xl font-bold text-parchment-white mb-2">
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
          <h3 className="text-lg font-semibold text-parchment-white mb-4">
            Tipo de Atividade
          </h3>
          
          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {activityType === 'accommodation' && '🏨'}
              {activityType === 'transportation' && '🚗'}
              {activityType === 'food' && '🍽️'}
              {activityType === 'leisure' && '🎯'}
              {activityType === 'other' && '📝'}
            </div>
            <div>
              <p className="text-parchment-white font-medium capitalize">
                {activityType === 'accommodation' && 'Acomodação'}
                {activityType === 'transportation' && 'Transporte'}
                {activityType === 'food' && 'Alimentação'}
                {activityType === 'leisure' && 'Lazer'}
                {activityType === 'other' && 'Outro'}
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
          <h3 className="text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-royal-purple" />
            {isTransportation ? 'Rota da Viagem' : 'Local da Atividade'}
          </h3>
          
          {isTransportation ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-royal-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-royal-purple text-sm font-medium">1</span>
                </div>
                <div>
                  <p className="text-mist-gray text-sm">Ponto de Partida</p>
                  <p className="text-parchment-white font-medium">
                    {destinations.origin?.displayName.text}
                  </p>
                  {destinations.origin?.formattedAddress && (
                    <p className="text-mist-gray text-xs">
                      {destinations.origin.formattedAddress}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-royal-purple/30" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-royal-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-royal-purple text-sm font-medium">2</span>
                </div>
                <div>
                  <p className="text-mist-gray text-sm">Destino</p>
                  <p className="text-parchment-white font-medium">
                    {destinations.destination?.displayName.text}
                  </p>
                  {destinations.destination?.formattedAddress && (
                    <p className="text-mist-gray text-xs">
                      {destinations.destination.formattedAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-royal-purple/20 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-royal-purple" />
              </div>
              <div>
                <p className="text-parchment-white font-medium">
                  {destinations.destination?.displayName.text}
                </p>
                {destinations.destination?.formattedAddress && (
                  <p className="text-mist-gray text-sm">
                    {destinations.destination.formattedAddress}
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
          <h3 className="text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-royal-purple" />
            Data e Horário
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-mist-gray" />
              <div>
                <p className="text-mist-gray text-sm">Data</p>
                <p className="text-parchment-white font-medium">
                  {formatDate(periodData.date)}
                </p>
              </div>
            </div>
            
            {needsTimeRange && periodData.startTime && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-mist-gray" />
                <div>
                  <p className="text-mist-gray text-sm">Horário de Início</p>
                  <p className="text-parchment-white font-medium">
                    {formatTime(periodData.startTime)}
                  </p>
                </div>
              </div>
            )}
            
            {needsTimeRange && periodData.endTime && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-mist-gray" />
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
          className="px-6 py-3 text-mist-gray hover:text-parchment-white transition-colors duration-200 disabled:opacity-50"
        >
          Voltar
        </button>
        
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`
            px-8 py-3 rounded-lg font-medium transition-all duration-200
            ${isSubmitting
              ? 'bg-slate-dark/50 text-mist-gray cursor-not-allowed'
              : 'bg-royal-purple text-parchment-white hover:bg-royal-purple/90 hover:scale-105'
            }
          `}
        >
          {isSubmitting ? 'Criando...' : 'Criar Atividade'}
        </button>
      </div>
    </div>
  );
}
