'use client';

import TripForm from '@/components/form/TripForm';
import Card from '@/components/ui/Card';
import DangerZone from '@/components/ui/DangerZone';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorPage } from '@/components/ui';
import { useCountries } from '@/hooks/useCountries';
import { useToast } from '@/hooks/useToast';
import { useTrips } from '@/hooks/useTrips';
import { type TripSettingsFormData } from '@/lib/schemas/trip';
import { Save, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TripSettingsLoading from './loading';

export default function TripSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hooks
  const { fetchTrip, updateTrip, deleteTrip, error, clearError } = useTrips();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const { getCountryByName } = useCountries();

  // State for trip data
  const [tripData, setTripData] = useState<TripSettingsFormData | null>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);

  const loadTrip = useCallback(async () => {
    // If tripId is not set, return
    if (!tripId) return;

    // Set loading state to true
    setIsLoadingTrip(true);

    try {
      // Fetch trip data
      const trip = await fetchTrip(tripId);

      // Convert trip data to form format
      const formData: TripSettingsFormData = {
        name: trip?.name || '',
        country: trip?.country.country || '', // Use country name for the form
        startDate: trip?.startDate || '',
        endDate: trip?.endDate || '',
        description: trip?.description || '',
      };

      // Set trip data
      setTripData(formData);
    } finally {
      // Set loading state to false
      setIsLoadingTrip(false);
    }
  }, [tripId, fetchTrip]);

  // Load trip data when tripId changes
  useEffect(() => void loadTrip(), [loadTrip]);

  // Handle success
  const handleSuccess = useCallback(
    (title: string, description: string, data?: TripSettingsFormData) => {
      showSuccessToast(title, description);
      if (data) setTripData(data);
    },
    [showSuccessToast]
  );

  // Handle error
  const handleError = useCallback(
    (title: string, description: string, error?: unknown) => {
      showErrorToast(title, description);
      if (error) console.error(error);
    },
    [showErrorToast]
  );

  // Memoize submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback(
    async (data: TripSettingsFormData) => {
      // If tripId is not set, return
      if (!tripId) return;

      try {
        // Set submitting state to true
        setIsSubmitting(true);

        // Clear error
        clearError();

        // Prepare update data
        const updateData = {
          name: data.name,
          description: data.description || '',
          startDate: data.startDate,
          endDate: data.endDate,
          country: await getCountryByName(data.country),
        };

        // Update trip
        const updatedTrip = await updateTrip(tripId, updateData);

        // Handle success or error
        if (updatedTrip) {
          handleSuccess(
            'Viagem atualizada com sucesso!',
            'As alterações foram salvas e aplicadas à sua viagem.',
            data
          );
        } else {
          handleError(
            'Erro ao atualizar viagem',
            'Ocorreu um erro ao salvar as alterações. Tente novamente.'
          );
        }
      } catch (error) {
        handleError(
          'Erro ao atualizar viagem',
          'Ocorreu um erro inesperado. Tente novamente.',
          error
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [tripId]
  );

  // Memoize delete handler to prevent unnecessary re-renders
  const handleDelete = useCallback(async () => {
    if (!tripId) return;

    // Confirm deletion
    if (
      !confirm(
        'Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.'
      )
    ) {
      // If user does not confirm, return
      return;
    }

    try {
      // Set deleting state to true
      setIsDeleting(true);
      clearError();

      // Delete trip
      const success = await deleteTrip(tripId);

      // Handle success
      if (success) {
        handleSuccess(
          'Viagem excluída com sucesso!',
          'Redirecionando para o dashboard...'
        );

        // Redirect to dashboard after 2 seconds
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        handleError(
          'Erro ao excluir viagem',
          'Ocorreu um erro ao excluir a viagem. Tente novamente.'
        );
      }
    } catch (error) {
      handleError(
        'Erro ao excluir viagem',
        'Ocorreu um erro inesperado. Tente novamente.',
        error
      );
    } finally {
      setIsDeleting(false);
    }
  }, [tripId, deleteTrip, clearError, handleSuccess, handleError, router]);

  // Memoize back href to prevent unnecessary re-renders
  const backHref = useMemo(() => `/trip/${tripId}`, [tripId]);

  // Show loading while fetching trip data
  if (isLoadingTrip) return <TripSettingsLoading />;

  // Show error state
  if (error) {
    return (
      <ErrorPage
        backHref={backHref}
        backText="Voltar aos Detalhes da Viagem"
        backAriaLabel="Voltar aos detalhes da viagem"
        title="Configurações da Viagem"
        subtitle="Erro ao carregar dados"
        errorMessage={error}
        onRetry={clearError}
        retryButtonText="Tentar Novamente"
      />
    );
  }

  // Don't render form until we have trip data
  if (!tripData) return null;

  return (
    <div className={styles.container}>
      {/* Header */}
      <PageHeader
        backHref={backHref}
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
  formContainer: 'mb-8',
  loadingContainer: 'flex justify-center items-center py-12',
  loadingText: 'text-mist-gray mt-4 text-center',
};
