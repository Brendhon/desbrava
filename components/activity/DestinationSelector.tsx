'use client';

import { Input } from '@/components/form';
import { Card } from '@/components/ui';
import { ActivityTypeKey } from '@/lib/types/activity';
import { Place } from '@/lib/types/places';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export interface DestinationData {
  origin?: Place;
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
  const needsSingleDestination = !needsMultipleDestinations;

  const handleOriginSelect = (place: Place) => {
    setDestinations((prev) => ({ ...prev, origin: place }));
  };

  const handleDestinationSelect = (place: Place) => {
    setDestinations((prev) => ({ ...prev, destination: place }));
  };

  const handleNext = () => {
    if (needsMultipleDestinations) {
      if (destinations.origin && destinations.destination) {
        onNext(destinations);
      }
    } else {
      if (destinations.destination) {
        onNext({ destination: destinations.destination });
      }
    }
  };

  const canProceed = needsMultipleDestinations
    ? destinations.origin && destinations.destination
    : destinations.destination;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-parchment-white mb-2 text-2xl font-bold">
          {needsMultipleDestinations
            ? 'De onde para onde?'
            : 'Onde será a atividade?'}
        </h2>
        <p className="text-mist-gray">
          {needsMultipleDestinations
            ? 'Defina o ponto de partida e destino da sua viagem'
            : 'Selecione o local onde acontecerá a atividade'}
        </p>
      </div>

      <div className="space-y-6">
        {/* Origin (only for transportation) */}
        {needsMultipleDestinations && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="text-royal-purple h-5 w-5" />
              Ponto de Partida
            </h3>

            <div className="space-y-3">
              <Input
                label="Buscar local de origem"
                placeholder="Digite para buscar cidades, aeroportos, estações..."
                icon={Search}
                value={searchOrigin}
                onChange={(e) => setSearchOrigin(e.target.value)}
              />
              {isSearchingOrigin && (
                <div className="text-mist-gray flex items-center gap-2 text-sm">
                  <div className="border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  Buscando...
                </div>
              )}

              {destinations.origin && (
                <div className="bg-royal-purple/20 border-royal-purple/30 rounded-lg border p-3">
                  <p className="text-parchment-white font-medium">
                    {destinations.origin.displayName.text}
                  </p>
                  {destinations.origin.formattedAddress && (
                    <p className="text-mist-gray text-sm">
                      {destinations.origin.formattedAddress}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Destination */}
        <Card
          shadow="none"
          background="dark"
          maxWidth="none"
          border={false}
          className="p-6"
        >
          <h3 className="text-parchment-white mb-4 flex items-center gap-2 text-lg font-semibold">
            <MapPin className="text-royal-purple h-5 w-5" />
            {needsMultipleDestinations ? 'Destino' : 'Local da Atividade'}
          </h3>

          <div className="space-y-3">
            <Input
              label={
                needsMultipleDestinations ? 'Buscar destino' : 'Buscar local'
              }
              placeholder={
                needsMultipleDestinations
                  ? 'Digite para buscar cidades, aeroportos, estações...'
                  : 'Digite para buscar restaurantes, hotéis, atrações...'
              }
              icon={Search}
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
            {isSearchingDestination && (
              <div className="text-mist-gray flex items-center gap-2 text-sm">
                <div className="border-mist-gray h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                Buscando...
              </div>
            )}

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
        </Card>

        {/* Visual representation for transportation */}
        {needsMultipleDestinations &&
          destinations.origin &&
          destinations.destination && (
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className="p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <div className="bg-royal-purple/20 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                    <MapPin className="text-royal-purple h-6 w-6" />
                  </div>
                  <p className="text-mist-gray text-sm">Origem</p>
                  <p className="text-parchment-white font-medium">
                    {destinations.origin.displayName.text}
                  </p>
                </div>

                <div className="flex flex-1 justify-center">
                  <ArrowRight className="text-royal-purple h-8 w-8" />
                </div>

                <div className="flex-1 text-center">
                  <div className="bg-royal-purple/20 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                    <MapPin className="text-royal-purple h-6 w-6" />
                  </div>
                  <p className="text-mist-gray text-sm">Destino</p>
                  <p className="text-parchment-white font-medium">
                    {destinations.destination.displayName.text}
                  </p>
                </div>
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
