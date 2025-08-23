'use client';

import { Input, Textarea } from '@/components/form';
import CountrySearchSelect from '@/components/form/selects/CountrySearchSelect';
import DatePicker from '@/components/form/DatePicker';
import { Button } from '@/components/ui';
import {
  createTripSchema,
  tripSettingsSchema,
  type CreateTripFormData,
  type TripSettingsFormData,
} from '@/lib/schemas/trip';
import { addDaysToDate, isStartDateBeforeEndDate, parsePtBrToDate } from '@/lib/utils/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
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
    watch,
    setValue,
    formState: { errors },
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

  const getSubmitButtonText = () => {
    if (submitButtonText) return submitButtonText;
    if (isSubmitting || loading) {
      return isCreateMode ? 'Criando...' : 'Salvando...';
    }
    return isCreateMode ? 'Criar Viagem' : 'Salvar Alterações';
  };

  // Get start date
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  
  // Clear end date if start date is after end date
  useEffect(() => {
    if (!isStartDateBeforeEndDate(startDate, endDate)) {
      setValue('endDate', '');
    }
  }, [startDate]);

  // Get end min date
  const endMinDate = useMemo(() => startDate ? addDaysToDate(parsePtBrToDate(startDate), 1) : undefined, [startDate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        defaultValue={defaultValues.country}
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
          value={startDate}
        />

        <DatePicker
          label="Data de Fim"
          error={errors.endDate?.message}
          disabled={!startDate}
          minDate={endMinDate}
          defaultValue={isCreateMode ? undefined : defaultValues.endDate}
          register={register('endDate')}
          popupPosition="top"
          helperText="Quando sua viagem termina"
          value={endDate}
        />
      </div>

      {/* Descrição */}
      <Textarea
        label={'Descrição (opcional)'}
        placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
        rows={3}
        error={errors.description?.message}
        register={register('description')}
        helperText="Adicione detalhes sobre seus planos de viagem"
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
