'use client';

import CountrySearchSelect from '@/components/form/CountrySearchSelect';
import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import { createTripSchema, tripSettingsSchema, type CreateTripFormData, type TripSettingsFormData } from '@/lib/schemas/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface TripFormProps {
  mode: 'create' | 'edit';
  defaultValues?: Partial<CreateTripFormData> | Partial<TripSettingsFormData>;
  onSubmit: (data: CreateTripFormData | TripSettingsFormData) => Promise<void>;
  onCancel?: () => void;
  submitButtonText?: string;
  submitButtonIcon?: LucideIcon;
  isSubmitting?: boolean;
  loading?: boolean;
}

export default function TripForm({
  mode,
  defaultValues = {},
  onSubmit,
  onCancel,
  submitButtonText,
  submitButtonIcon: SubmitButtonIcon,
  isSubmitting = false,
  loading = false,
}: TripFormProps) {

  const isCreateMode = mode === 'create';
  const schema = isCreateMode ? createTripSchema : tripSettingsSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateTripFormData | TripSettingsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      country: '',
      startDate: '',
      endDate: '',
      description: '',
      ...defaultValues,
    },
  });

  // Handle country selection from CountrySearchSelect
  const handleCountrySelect = (countryCode: string) => {
    setValue('country', countryCode);
  };

  const handleFormSubmit = async (data: CreateTripFormData | TripSettingsFormData) => {
    if (isCreateMode) {
      // For create mode, we need to get the full country data
      const createData = data as CreateTripFormData;
      const tripData = {
        ...createData,
        country: createData.country,
      };  
      await onSubmit(tripData);
    } else {
      // For edit mode, pass the data as is
      await onSubmit(data);
    }
  };

  const getSubmitButtonText = () => {
    if (submitButtonText) return submitButtonText;
    if (isSubmitting || loading) {
      return isCreateMode ? 'Criando...' : 'Salvando...';
    }
    return isCreateMode ? 'Criar Viagem' : 'Salvar Alterações';
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      {/* Nome da Viagem */}
      <Input
        label="Nome da Viagem"
        placeholder="Ex: Aventura na Europa"
        error={errors.name?.message}
        register={register('name')}
        helperText="Escolha um nome descritivo para sua viagem"
        required
      />

      {/* País */}
      {isCreateMode ? (
        <CountrySearchSelect
          label="País"
          placeholder="Digite para buscar um país..."
          error={errors.country?.message}
          register={register('country')}
          helperText="País principal da sua viagem"
          debounceDelay={300}
          onValueChange={handleCountrySelect}
        />
      ) : (
        <Input
          label="País"
          placeholder="Ex: França"
          error={errors.country?.message}
          register={register('country')}
          helperText="País principal da sua viagem"
          required
        />
      )}

      {/* Datas */}
      <div className={styles.dateGrid}>
        {isCreateMode ? (
          <>
            <DatePicker
              label="Data de Início"
              error={errors.startDate?.message}
              register={register('startDate')}
              helperText="Quando sua viagem começa"
              popupPosition="top"
            />

            <DatePicker
              label="Data de Fim"
              error={errors.endDate?.message}
              register={register('endDate')}
              popupPosition="top"
              helperText="Quando sua viagem termina"
            />
          </>
        ) : (
          <>
            <Input
              label="Data de Início"
              type="date"
              error={errors.startDate?.message}
              register={register('startDate')}
              helperText="Quando sua viagem começa"
              required
            />

            <Input
              label="Data de Fim"
              type="date"
              error={errors.endDate?.message}
              register={register('endDate')}
              helperText="Quando sua viagem termina"
              required
            />
          </>
        )}
      </div>

      {/* Descrição */}
      <Textarea
        label={isCreateMode ? "Descrição (opcional)" : "Descrição"}
        placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
        rows={isCreateMode ? 2 : 4}
        error={errors.description?.message}
        register={register('description')}
        helperText={isCreateMode ? "Adicione detalhes sobre seus planos de viagem" : "Descreva os planos, atividades e expectativas da viagem"}
        required={!isCreateMode}
      />

      {/* Botões */}
      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          variant="primary"
          icon={SubmitButtonIcon}
          aria-label={isCreateMode ? "Criar viagem" : "Salvar alterações da viagem"}
          className="flex-1"
          disabled={isSubmitting || loading}
        >
          {getSubmitButtonText()}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant={isCreateMode ? "secondary" : "ghost"}
            onClick={onCancel}
            aria-label={isCreateMode ? "Cancelar criação" : "Cancelar edição da viagem"}
            className="flex-1"
            disabled={isSubmitting || loading}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: 'space-y-6',
  dateGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  buttonGroup: 'flex flex-col sm:flex-row gap-4 pt-4',
};
