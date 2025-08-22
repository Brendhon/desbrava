'use client';

import { Input } from '@/components/form';
import { ACTIVITY_PLACE_PLACEHOLDERS, ActivityTypeKey } from '@/lib/types/activity';
import { Place } from '@/lib/types/places';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export interface DestinationData {
  place?: Place;
  destination?: Place;
}

interface DestinationSelectorProps {
  activityType: ActivityTypeKey;
  onNext: (destinations: DestinationData) => void;
  onBack: () => void;
}

export default function DestinationSelector({
  activityType,
  onNext,
  onBack,
}: DestinationSelectorProps) {
  const [destinations, setDestinations] = useState<DestinationData>({});

  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false);
  const [isSearchingDestination, setIsSearchingDestination] = useState(false);

  // Determine if this activity type needs multiple destinations
  const needsMultipleDestinations = activityType === 'transportation';

  const handleNext = () => {
    if (needsMultipleDestinations) {
      if (destinations.place && destinations.destination) {
        onNext(destinations);
      }
    } else {
      if (destinations.destination) {
        onNext({ destination: destinations.destination });
      }
    }
  };

  const canProceed = needsMultipleDestinations
    ? destinations.place && destinations.destination
    : destinations.destination;

  return (
    <div className="space-y-6">
      <div className="text-center pb-4">

        {/* Page title */}
        <h2 className="text-parchment-white mb-2 text-2xl font-bold">
          {needsMultipleDestinations
            ? 'De onde para onde?'
            : 'Onde será a atividade?'}
        </h2>

        {/* Page description */}
        <p className="text-mist-gray">
          {needsMultipleDestinations
            ? 'Defina o ponto de partida e destino da sua viagem'
            : 'Selecione o local onde acontecerá a atividade'}
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row">
        {/* Origin | Activity Location */}
        <div
          className={`px-8 w-full ${needsMultipleDestinations ? 'border-r-0 border-mist-gray/50 lg:border-r' : ''}`}
        >
          {/* Place title */}
          <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
            <MapPin className="text-royal-purple h-5 w-5" />
            {needsMultipleDestinations ? 'Ponto de partida' : 'Local da Atividade'}
          </h3>

          {/* Place search */}
          <div className="space-y-3">
            <Input
              label={
                needsMultipleDestinations ? "Buscar local de origem" : 'Buscar local'
              }
              placeholder={ACTIVITY_PLACE_PLACEHOLDERS[activityType]}
              icon={Search}
              value={searchOrigin}
              onChange={(e) => setSearchOrigin(e.target.value)}
            />
            {isSearchingDestination && (
              <div className="text-mist-gray flex items-center gap-2 text-sm">
                <div className="border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                Buscando...
              </div>
            )}

          </div>

          {/* Place info */}
          {destinations.place && (
            <div className="bg-royal-purple/20 border-royal-purple/30 rounded-lg border p-3">
              <p className="text-parchment-white font-medium">
                {destinations.place.displayName.text}
              </p>
              {destinations.place.formattedAddress && (
                <p className="text-mist-gray text-sm">
                  {destinations.place.formattedAddress}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Destination (only for transportation) */}
        {needsMultipleDestinations && (
          <div className="px-8 w-full">
            {/* Destination title */}
            <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="text-royal-purple h-5 w-5" />
              Local de destino
            </h3>

            {/* Destination search */}
            <div className="space-y-3">
              <Input
                label="Buscar local de destino"
                placeholder="Digite para buscar cidades, aeroportos, estações..."
                icon={Search}
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
              {isSearchingOrigin && (
                <div className="text-mist-gray flex items-center gap-2 text-sm">
                  <div className="border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  Buscando...
                </div>
              )}

            </div>

            {/* Destination info */}
            {destinations.destination && (
              <div className="bg-royal-purple/20 border-royal-purple/30 rounded-lg border p-3">
                <p className="text-parchment-white font-medium">
                  {destinations.destination.displayName.text}
                </p>
                {destinations.destination.formattedAddress && (
                  <p className="text-mist-gray text-sm">
                    {destinations.destination.formattedAddress}
                  </p>
                )}
              </div>
            )}
          </div>
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
          className={`rounded-lg px-8 py-3 font-medium transition-all duration-200 ${canProceed
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
