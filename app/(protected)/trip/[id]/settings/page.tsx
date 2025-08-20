'use client';

import TripForm from '@/components/form/TripForm';
import { Separator } from '@/components/Separator';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import DangerZone from '@/components/ui/DangerZone';
import { type TripSettingsFormData } from '@/lib/schemas/trip';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TripSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Buscar dados da viagem pelo ID
  const defaultValues: TripSettingsFormData = {
    name: 'Aventura na Europa',
    country: 'França',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    description:
      'Uma incrível jornada pela França, explorando Paris, Lyon e Nice.',
  };

  const handleSubmit = async (data: TripSettingsFormData) => {
    try {
      setIsSubmitting(true);
      // TODO: Implementar atualização da viagem na API
      console.log('Atualizando viagem:', data);

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Mostrar mensagem de sucesso
      console.log('Viagem atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
      // TODO: Mostrar mensagem de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/trip/${tripId}`);
  };

  const handleDelete = () => {
    // TODO: Implementar exclusão da viagem
    if (
      confirm(
        'Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.'
      )
    ) {
      console.log('Excluindo viagem:', tripId);
      router.push('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Link
          href={`/trip/${tripId}`}
          className={styles.backLink}
          aria-label="Voltar aos detalhes da viagem"
        >
          <ArrowLeft className={styles.backIcon} aria-hidden="true" />
          Voltar aos Detalhes da Viagem
        </Link>
        <h1 className={styles.title}>Configurações da Viagem</h1>
        <p className={styles.subtitle}>Edite os detalhes da sua viagem</p>
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
        <TripForm
          mode="edit"
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
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
        isLoading={isSubmitting}
        loadingText="Excluindo..."
      />
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  header: 'mb-8',
  backLink:
    'inline-flex items-center gap-2 text-mist-gray hover:text-parchment-white transition-colors mb-4',
  backIcon: 'w-4 h-4',
  title: 'text-3xl md:text-4xl font-bold text-parchment-white mb-3',
  subtitle: 'text-lg text-mist-gray',
  formContainer: '',
};
