'use client';

import TripForm from '@/components/form/TripForm';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCountries } from '@/hooks/useCountries';
import { useToast } from '@/hooks/useToast';
import { useTrips } from '@/hooks/useTrips';
import { type CreateTripFormData } from '@/lib/schemas/trip';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CreateTripPage() {
  const router = useRouter();
  const { createTrip, loading, error, clearError } = useTrips();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const { getCountryByName } = useCountries();

  const handleSubmit = async (data: CreateTripFormData) => {
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

  return (
    <div className={styles.container}>
      {/* Header */}
      <PageHeader
        backHref="/dashboard"
        backText="Voltar ao Dashboard"
        backAriaLabel="Voltar ao Dashboard"
        title="Criar Nova Viagem"
        subtitle="Comece planejando sua próxima aventura"
      />

      {/* Form */}
      <Card
        padding="xl"
        shadow="lg"
        background="dark"
        maxWidth="none"
        border={false}
      >
        <TripForm
          mode="create"
          onSubmit={handleSubmit}
          submitButtonIcon={Plus}
          loading={loading}
        />
      </Card>
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6',
};
