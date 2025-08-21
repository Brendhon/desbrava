'use client';

import { Input, Select, Textarea } from '@/components/form';
import { PageHeader } from '@/components/layout';
import { Button, Card } from '@/components/ui';
import {
  ACTIVITY_TYPE_OPTIONS,
  type CreateActivityData
} from '@/lib/types/activity';
import { TripRoutes } from '@/lib/types/route';
import {
  Plus,
  Search,
  TimerIcon,
  X
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateActivityPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  // Form state
  const [formData, setFormData] = useState<Partial<CreateActivityData>>({
    type: 'leisure',
    priority: 'medium',
  });

  // Place search state
  const [placeSearch, setPlaceSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Custom place state
  const [useCustomPlace, setUseCustomPlace] = useState(false);
  const [customPlaceData, setCustomPlaceData] = useState({
    name: '',
    address: '',
  });

  // Tags state
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (field: keyof CreateActivityData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomPlaceChange = (field: string, value: string) => {
    setCustomPlaceData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form data:', formData);
  };

  const handleCancel = () => {
    router.push(TripRoutes.details(tripId));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <PageHeader
        backHref={TripRoutes.details(tripId)}
        backText="Voltar aos Detalhes"
        backAriaLabel="Voltar aos detalhes da viagem"
        title="Nova Atividade"
        subtitle="Adicione uma nova atividade ao seu itinerário"
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Basic Information */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <h3 className={styles.sectionTitle}>Informações Básicas</h3>
              
              <div className={styles.fieldGroup}>
                <Input
                  label="Nome da Atividade"
                  placeholder="Ex: Visita ao Museu do Louvre"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <Select
                  label="Tipo de Atividade"
                  options={ACTIVITY_TYPE_OPTIONS}
                  value={formData.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <Textarea
                  label="Descrição (opcional)"
                  placeholder="Descreva o que você planeja fazer..."
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </Card>

            {/* Date and Time */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <h3 className={styles.sectionTitle}>Data e Horário</h3>
              
              <div className={styles.fieldGroup}>
                <Input
                  label="Data"
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <div className={styles.timeGrid}>
                <div className={styles.fieldGroup}>
                  <Input
                    label="Horário de Início"
                    type="time"
                    icon={TimerIcon}
                    iconPosition='right'
                    value={formData.startTime || ''}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <Input
                    label="Horário de Fim"
                    type="time"
                    icon={TimerIcon}
                    iconPosition='right'
                    value={formData.endTime || ''}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <Input
                  label="Duração (minutos)"
                  type="number"
                  placeholder="120"
                  min="0"
                  value={formData.duration || ''}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                />
              </div>
            </Card>

          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Location */}
            <Card
              shadow="none"
              background="dark"
              maxWidth="none"
              border={false}
              className={styles.section}
            >
              <h3 className={styles.sectionTitle}>Localização</h3>
              
              <div className={styles.fieldGroup}>
                <div className={styles.locationToggle}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={useCustomPlace}
                      onChange={(e) => setUseCustomPlace(e.target.checked)}
                      className={styles.toggleCheckbox}
                    />
                    <span className={styles.toggleText}>Usar local personalizado</span>
                  </label>
                </div>
              </div>

              {!useCustomPlace ? (
                <div className={styles.fieldGroup}>
                  <div className={styles.placeSearch}>
                    <Input
                      label="Buscar lugar"
                      placeholder="Digite para buscar restaurantes, hotéis, atrações..."
                      icon={Search}
                      value={placeSearch}
                      onChange={(e) => setPlaceSearch(e.target.value)}
                    />
                    {isSearching && (
                      <div className={styles.searchingIndicator}>
                        <div className={styles.spinner}></div>
                        Buscando...
                      </div>
                    )}
                    {/* TODO: Place search results will go here */}
                  </div>
                </div>
              ) : (
                <div className={styles.fieldGroup}>
                  <Input
                    label="Nome do Local"
                    placeholder="Ex: Restaurante da Maria"
                    value={customPlaceData.name}
                    onChange={(e) => handleCustomPlaceChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Endereço (opcional)"
                    placeholder="Ex: Rua das Flores, 123"
                    value={customPlaceData.address}
                    onChange={(e) => handleCustomPlaceChange('address', e.target.value)}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            icon={Plus}
          >
            Criar Atividade
          </Button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  form: 'space-y-8',
  formGrid: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
  leftColumn: 'lg:col-span-2 space-y-6',
  rightColumn: 'space-y-6',
  section: 'p-6',
  sectionTitle: 'text-lg font-semibold text-parchment-white mb-4 flex items-center gap-2',
  fieldGroup: 'mb-4',
  timeGrid: 'grid grid-cols-2 gap-4',
  costGrid: 'grid grid-cols-2 gap-4',
  locationToggle: 'mb-4',
  toggleLabel: 'flex items-center gap-2 cursor-pointer',
  toggleCheckbox: 'w-4 h-4 text-royal-purple bg-slate-dark border-slate-dark/20 rounded focus:ring-royal-purple focus:ring-2',
  toggleText: 'text-parchment-white text-sm',
  placeSearch: 'space-y-3',
  searchingIndicator: 'flex items-center gap-2 text-mist-gray text-sm',
  spinner: 'w-4 h-4 border-2 border-mist-gray border-t-transparent rounded-full animate-spin',
  tagContainer: 'space-y-3',
  tagLabel: 'block text-sm font-medium text-parchment-white mb-2',
  tagInputGroup: 'flex gap-2',
  tagsList: 'flex flex-wrap gap-2',
  tag: 'inline-flex items-center gap-1 bg-royal-purple/20 text-royal-purple px-2 py-1 rounded-md text-sm',
  tagRemove: 'hover:bg-royal-purple/30 rounded-full p-0.5 transition-colors',
  formActions: 'flex justify-end gap-4 pt-6 border-t border-slate-dark/20',
};
