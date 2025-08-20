'use client';

import CountrySearchSelect from '@/components/form/CountrySearchSelect';
import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import {
  createTripSchema,
  tripSettingsSchema,
  type CreateTripFormData,
  type TripSettingsFormData,
} from '@/lib/schemas/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface TripFormProps {
  mode: 'create' | 'edit';
  defaultValues?: Partial<CreateTripFormData> | Partial<TripSettingsFormData>;
  onSubmit: (data: CreateTripFormData | TripSettingsFormData) => Promise<void>;
  submitButtonText?: string;
  submitButtonIcon?: LucideIcon;
  isSubmitting?: boolean;
  loading?: boolean;
}

export default function TripForm({
  mode,
  defaultValues = {},
  onSubmit,
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
    watch,
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

  const handleFormSubmit = async (
    data: CreateTripFormData | TripSettingsFormData
  ) => {
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
      <CountrySearchSelect
        label="País"
        placeholder="Digite para buscar um país..."
        error={errors.country?.message}
        register={register('country')}
        helperText="País principal da sua viagem"
        debounceDelay={300}
        onValueChange={handleCountrySelect}
        defaultValue={watch('country')}
      />

      {/* Datas */}
      <div className={styles.dateGrid}>
        <DatePicker
          label="Data de Início"
          error={errors.startDate?.message}
          defaultValue={isCreateMode ? undefined : defaultValues.startDate}
          register={register('startDate')}
          helperText="Quando sua viagem começa"
          popupPosition="top"
        />

        <DatePicker
          label="Data de Fim"
          error={errors.endDate?.message}
          defaultValue={isCreateMode ? undefined : defaultValues.endDate}
          register={register('endDate')}
          popupPosition="top"
          helperText="Quando sua viagem termina"
        />
      </div>

      {/* Descrição */}
      <Textarea
        label={'Descrição (opcional)'}
        placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
        rows={3}
        error={errors.description?.message}
        register={register('description')}
        helperText='Adicione detalhes sobre seus planos de viagem'
      />

      {/* Botões */}
      <Button
        type="submit"
        variant="primary"
        icon={SubmitButtonIcon}
        aria-label={
          isCreateMode ? 'Criar viagem' : 'Salvar alterações da viagem'
        }
        className={styles.button}
        disabled={isSubmitting || loading}
      >
        {getSubmitButtonText()}
      </Button>
    </form>
  );
}

const styles = {
  form: 'space-y-6',
  dateGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  button: 'w-full',
};
