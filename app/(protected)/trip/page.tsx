'use client';

import CountrySearchSelect from '@/components/form/CountrySearchSelect';
import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCountries } from '@/hooks';
import { useTrips } from '@/hooks/useTrips';
import { createTripSchema, type CreateTripFormData } from '@/lib/schemas/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateTripPage() {
  const router = useRouter();
  const { createTrip, loading, error, clearError } = useTrips();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
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
      setShowError(false);

      // Get Trip Data
      const tripData = {
        name: data.name,
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        country: await getCountryByName(data.country)
      }

      // Create Trip
      const newTrip = await createTrip(tripData);

      if (newTrip) {
        setShowSuccess(true);
        
        // Reset form
        reset();
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setShowError(true);
      }
      
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      setShowError(true);
    }
  };

  // Auto-hide success/error messages
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  // Auto-hide error when user starts typing
  useEffect(() => {
    if (error) {
      setShowError(true);
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

      {/* Success Message */}
      {showSuccess && (
        <div className={styles.successMessage}>
          <CheckCircle className={styles.successIcon} />
          <div>
            <h3 className={styles.successTitle}>Viagem criada com sucesso!</h3>
            <p className={styles.successText}>
              Redirecionando para o dashboard...
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {(showError || error) && (
        <div className={styles.errorMessage}>
          <AlertCircle className={styles.errorIcon} />
          <div>
            <h3 className={styles.errorTitle}>Erro ao criar viagem</h3>
            <p className={styles.errorText}>
              {error || 'Ocorreu um erro inesperado. Tente novamente.'}
            </p>
          </div>
          <button
            onClick={() => {
              setShowError(false);
              clearError();
            }}
            className={styles.closeButton}
            aria-label="Fechar mensagem de erro"
          >
            ×
          </button>
        </div>
      )}

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
            label='País'
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
              popupPosition='top'
            />

            <DatePicker
              label="Data de Fim"
              error={errors.endDate?.message}
              register={register('endDate')}
              popupPosition='top'
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
  successMessage: 'mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-start gap-3 text-green-400',
  successIcon: 'w-6 h-6 text-green-500 flex-shrink-0 mt-0.5',
  successTitle: 'text-lg font-semibold text-green-400',
  successText: 'text-green-300',
  errorMessage: 'mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-400 relative',
  errorIcon: 'w-6 h-6 text-red-500 flex-shrink-0 mt-0.5',
  errorTitle: 'text-lg font-semibold text-red-400',
  errorText: 'text-red-300',
  closeButton: 'absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors',
};
