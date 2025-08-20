'use client';

import CountrySearchSelect from '@/components/form/CountrySearchSelect';
import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCountries } from '@/hooks';
import { useTrips } from '@/hooks/useTrips';
import { useToast } from '@/hooks/useToast';
import { createTripSchema, type CreateTripFormData } from '@/lib/schemas/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateTripPage() {
  const router = useRouter();
  const { createTrip, loading, error, clearError } = useTrips();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const { getCountryByName } = useCountries();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreateTripFormData>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      name: '',
      country: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  });

  // Handle country selection from CountrySearchSelect
  const handleCountrySelect = (countryCode: string) => {
    setValue('country', countryCode);
  };

  const onSubmit = async (data: CreateTripFormData) => {
    try {
      clearError();

      // Get Trip Data
      const tripData = {
        name: data.name,
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        country: await getCountryByName(data.country),
      };

      // Create Trip
      const newTrip = await createTrip(tripData);

      if (newTrip) {
        showSuccessToast(
          'Viagem criada com sucesso!',
          'Redirecionando para o dashboard...'
        );

        // Reset form
        reset();

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        showErrorToast(
          'Erro ao criar viagem',
          'Ocorreu um erro inesperado. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      showErrorToast(
        'Erro ao criar viagem',
        'Ocorreu um erro inesperado. Tente novamente.'
      );
    }
  };

  // Auto-hide error when user starts typing
  useEffect(() => {
    if (error) {
      // Error is now handled by the toast system
    }
  }, [error]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Criar Nova Viagem</h1>
        <p className={styles.subtitle}>
          Comece planejando sua próxima aventura
        </p>
      </div>



      {/* Form */}
      <Card
        padding="xl"
        shadow="lg"
        background="dark"
        maxWidth="none"
        border={false}
        className={styles.formContainer}
      >
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
            debounceDelay={300}
            onValueChange={handleCountrySelect}
          />

          {/* Datas */}
          <div className={styles.dateGrid}>
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
          </div>

          {/* Descrição */}
          <Textarea
            label="Descrição (opcional)"
            placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
            error={errors.description?.message}
            register={register('description')}
            rows={2}
            helperText="Adicione detalhes sobre seus planos de viagem"
          />

          {/* Botões */}
          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              icon={Plus}
              aria-label="Criar viagem"
              className="flex-1"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? 'Criando...' : 'Criar Viagem'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              aria-label="Cancelar criação"
              className="flex-1"
              disabled={isSubmitting || loading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  header: 'mb-8',
  title: 'text-3xl md:text-4xl font-bold text-parchment-white mb-3',
  subtitle: 'text-lg text-mist-gray',
  formContainer: '',
  form: 'space-y-6',
  dateGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  buttonGroup: 'flex flex-col sm:flex-row gap-4 pt-4',

};
