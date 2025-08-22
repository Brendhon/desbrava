'use client';

import { Input, Select } from '@/components/form';
import { Card } from '@/components/ui';
import { ActivityTypeKey } from '@/lib/types/activity';
import { Place } from '@/lib/types/places';
import { Search, MapPin, ArrowRight } from 'lucide-react';
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
    setDestinations(prev => ({ ...prev, origin: place }));
  };

  const handleDestinationSelect = (place: Place) => {
    setDestinations(prev => ({ ...prev, destination: place }));
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
        <h2 className="text-2xl font-bold text-parchment-white mb-2">
          {needsMultipleDestinations ? 'De onde para onde?' : 'Onde será a atividade?'}
        </h2>
        <p className="text-mist-gray">
          {needsMultipleDestinations 
            ? 'Defina o ponto de partida e destino da sua viagem'
            : 'Selecione o local onde acontecerá a atividade'
          }
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
            <h3 className="text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-royal-purple" />
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
                <div className="flex items-center gap-2 text-mist-gray text-sm">
                  <div className="w-4 h-4 border-2 border-mist-gray border-t-transparent rounded-full animate-spin" />
                  Buscando...
                </div>
              )}
              
              {destinations.origin && (
                <div className="p-3 bg-royal-purple/20 border border-royal-purple/30 rounded-lg">
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
          <h3 className="text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-royal-purple" />
            {needsMultipleDestinations ? 'Destino' : 'Local da Atividade'}
          </h3>
          
          <div className="space-y-3">
            <Input
              label={needsMultipleDestinations ? "Buscar destino" : "Buscar local"}
              placeholder={needsMultipleDestinations 
                ? "Digite para buscar cidades, aeroportos, estações..."
                : "Digite para buscar restaurantes, hotéis, atrações..."
              }
              icon={Search}
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
            {isSearchingDestination && (
              <div className="flex items-center gap-2 text-mist-gray text-sm">
                <div className="w-4 h-4 border-2 border-mist-gray border-t-transparent rounded-full animate-spin" />
                Buscando...
              </div>
            )}
            
            {destinations.destination && (
              <div className="p-3 bg-royal-purple/20 border border-royal-purple/30 rounded-lg">
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
        {needsMultipleDestinations && destinations.origin && destinations.destination && (
          <Card
            shadow="none"
            background="dark"
            maxWidth="none"
            border={false}
            className="p-6"
          >
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="w-12 h-12 bg-royal-purple/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-royal-purple" />
                </div>
                <p className="text-sm text-mist-gray">Origem</p>
                <p className="text-parchment-white font-medium">
                  {destinations.origin.displayName.text}
                </p>
              </div>
              
              <div className="flex-1 flex justify-center">
                <ArrowRight className="w-8 h-8 text-royal-purple" />
              </div>
              
              <div className="text-center flex-1">
                <div className="w-12 h-12 bg-royal-purple/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-royal-purple" />
                </div>
                <p className="text-sm text-mist-gray">Destino</p>
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
