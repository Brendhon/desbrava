'use client';

import TripForm from '@/components/form/TripForm';
import Card from '@/components/ui/Card';
import DangerZone from '@/components/ui/DangerZone';
import { PageHeader } from '@/components/ui/PageHeader';
import { useCountries } from '@/hooks/useCountries';
import { useToast } from '@/hooks/useToast';
import { useTrips } from '@/hooks/useTrips';
import { type TripSettingsFormData } from '@/lib/schemas/trip';
import { Save, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function TripSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hooks
  const { fetchTrip, updateTrip, deleteTrip, loading, error, clearError } = useTrips();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const { getCountryByName } = useCountries();

  // State for trip data
  const [tripData, setTripData] = useState<TripSettingsFormData | null>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);

  // Memoize the loadTrip function to prevent unnecessary re-renders
  const loadTrip = useCallback(async () => {
    if (!tripId) return;

    try {
      setIsLoadingTrip(true);
      clearError();

      const trip = await fetchTrip(tripId);
      
      if (trip) {
        // Convert trip data to form format
        const formData: TripSettingsFormData = {
          name: trip.name,
          country: trip.country.country, // Use country name for the form
          startDate: trip.startDate,
          endDate: trip.endDate,
          description: trip.description,
        };
        
        setTripData(formData);
      } else {
        showErrorToast(
          'Viagem não encontrada',
          'A viagem solicitada não foi encontrada ou você não tem permissão para acessá-la.'
        );
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Erro ao carregar viagem:', error);
      showErrorToast(
        'Erro ao carregar viagem',
        'Ocorreu um erro ao carregar os dados da viagem. Tente novamente.'
      );
      router.push('/dashboard');
    } finally {
      setIsLoadingTrip(false);
    }
  }, [tripId, fetchTrip, clearError, showErrorToast, router]);

  // Execute loadTrip only once on component mount
  useEffect(() => {
    loadTrip();
  }, []); // Empty dependency array - only run once

  // Memoize submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (data: TripSettingsFormData) => {
    if (!tripId) return;

    try {
      setIsSubmitting(true);
      clearError();

      // Get full country data
      const countryData = await getCountryByName(data.country);

      // Prepare update data
      const updateData = {
        name: data.name,
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        country: countryData,
      };

      // Update trip
      const updatedTrip = await updateTrip(tripId, updateData);

      if (updatedTrip) {
        showSuccessToast(
          'Viagem atualizada com sucesso!',
          'As alterações foram salvas e aplicadas à sua viagem.'
        );

        // Update local state
        setTripData(data);
      } else {
        showErrorToast(
          'Erro ao atualizar viagem',
          'Ocorreu um erro ao salvar as alterações. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
      showErrorToast(
        'Erro ao atualizar viagem',
        'Ocorreu um erro inesperado. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [tripId, getCountryByName, updateTrip, clearError, showSuccessToast, showErrorToast]);

  // Memoize delete handler to prevent unnecessary re-renders
  const handleDelete = useCallback(async () => {
    if (!tripId) return;

    if (
      !confirm(
        'Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.'
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      clearError();

      const success = await deleteTrip(tripId);

      if (success) {
        showSuccessToast(
          'Viagem excluída com sucesso!',
          'Redirecionando para o dashboard...'
        );

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        showErrorToast(
          'Erro ao excluir viagem',
          'Ocorreu um erro ao excluir a viagem. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro ao excluir viagem:', error);
      showErrorToast(
        'Erro ao excluir viagem',
        'Ocorreu um erro inesperado. Tente novamente.'
      );
    } finally {
      setIsDeleting(false);
    }
  }, [tripId, deleteTrip, clearError, showSuccessToast, showErrorToast, router]);

  // Show loading while fetching trip data
  if (isLoadingTrip) {
    return (
      <div className={styles.container}>
        <PageHeader
          backHref={`/trip/${tripId}`}
          backText="Voltar aos Detalhes da Viagem"
          backAriaLabel="Voltar aos detalhes da viagem"
          title="Configurações da Viagem"
          subtitle="Carregando dados da viagem..."
        />
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-purple mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando dados da viagem...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader
          backHref={`/trip/${tripId}`}
          backText="Voltar aos Detalhes da Viagem"
          backAriaLabel="Voltar aos detalhes da viagem"
          title="Configurações da Viagem"
          subtitle="Erro ao carregar dados"
        />
        <Card
          padding="xl"
          shadow="lg"
          background="dark"
          maxWidth="none"
          border={false}
          className={styles.errorContainer}
        >
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={clearError}
              className="px-4 py-2 bg-royal-purple text-white rounded-lg hover:bg-royal-purple/80 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Don't render form until we have trip data
  if (!tripData) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <PageHeader
        backHref={`/trip/${tripId}`}
        backText="Voltar aos Detalhes da Viagem"
        backAriaLabel="Voltar aos detalhes da viagem"
        title="Configurações da Viagem"
        subtitle="Edite os detalhes da sua viagem"
      />

      {/* Form */}
      <Card
        padding="xl"
        shadow="lg"
        background="dark"
        maxWidth="none"
        border={false}
        className={styles.formContainer}
      >
        <TripForm
          mode="edit"
          defaultValues={tripData}
          onSubmit={handleSubmit}
          submitButtonIcon={Save}
          isSubmitting={isSubmitting}
        />
      </Card>

      <br />

      {/* Danger Zone */}
      <DangerZone
        icon={Trash2}
        title="Zona de Perigo"
        description="Excluir permanentemente esta viagem e todos os seus dados associados"
        warningText="Esta ação é irreversível e excluirá todos os dados da viagem"
        actionLabel="Excluir Viagem"
        onAction={handleDelete}
        isLoading={isDeleting}
        loadingText="Excluindo..."
      />
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6',
  formContainer: '',
  errorContainer: 'text-center',
};
