'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import { tripSettingsSchema, type TripSettingsFormData } from '@/lib/schemas/trip';
import { ArrowLeft, Calendar, Globe, MapPin, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function TripSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id;

  // TODO: Buscar dados da viagem pelo ID
  const defaultValues: TripSettingsFormData = {
    title: 'Aventura na Europa',
    country: 'França',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    description:
      'Uma incrível jornada pela França, explorando Paris, Lyon e Nice.',
    referencePoint: 'Hotel Le Grand, Paris',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TripSettingsFormData>({
    resolver: zodResolver(tripSettingsSchema),
    defaultValues,
  });

  // Carregar dados iniciais quando o componente montar
  useEffect(() => {
    // TODO: Buscar dados da viagem da API
    // Por enquanto, usando dados mockados
    reset(defaultValues);
  }, [reset]);

  const onSubmit = async (data: TripSettingsFormData) => {
    try {
      // TODO: Implementar atualização da viagem na API
      console.log('Atualizando viagem:', data);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Mostrar mensagem de sucesso
      console.log('Viagem atualizada com sucesso!');
      
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
      // TODO: Mostrar mensagem de erro
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Título da Viagem */}
          <Input
            label="Nome da Viagem"
            placeholder="Ex: Aventura na Europa"
            error={errors.title?.message}
            register={register('title')}
            helperText="Escolha um nome descritivo para sua viagem"
            required
          />

          {/* País */}
          <Input
            label="País"
            placeholder="Ex: França"
            icon={Globe}
            error={errors.country?.message}
            register={register('country')}
            helperText="País principal da sua viagem"
            required
          />

          {/* Datas */}
          <div className={styles.dateGrid}>
            <Input
              label="Data de Início"
              type="date"
              icon={Calendar}
              error={errors.startDate?.message}
              register={register('startDate')}
              helperText="Quando sua viagem começa"
              required
            />

            <Input
              label="Data de Fim"
              type="date"
              icon={Calendar}
              error={errors.endDate?.message}
              register={register('endDate')}
              helperText="Quando sua viagem termina"
              required
            />
          </div>

          {/* Ponto de Referência */}
          <Input
            label="Ponto de Referência"
            placeholder="Ex: Hotel Le Grand, Paris"
            icon={MapPin}
            error={errors.referencePoint?.message}
            register={register('referencePoint')}
            helperText="Local principal ou ponto de partida da viagem"
            required
          />

          {/* Descrição */}
          <Textarea
            label="Descrição"
            placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
            rows={4}
            error={errors.description?.message}
            register={register('description')}
            helperText="Descreva os planos, atividades e expectativas da viagem"
            required
          />

          {/* Botões */}
          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              icon={Save}
              aria-label="Salvar alterações da viagem"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>

            <Link
              href={`/trip/${tripId}`}
              aria-label="Cancelar edição da viagem"
              className="flex-1"
            >
              <Button variant="ghost" className="w-full">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>

        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <h3 className={styles.dangerZoneTitle}>Zona de Perigo</h3>
          <Card
            padding="sm"
            shadow="none"
            background="light"
            maxWidth="none"
            border={false}
            className={styles.dangerZoneContent}
          >
            <div className={styles.deleteSection}>
              <div>
                <h4 className={styles.deleteTitle}>Excluir Viagem</h4>
                <p className={styles.deleteDescription}>
                  Esta ação não pode ser desfeita. Todos os dados da viagem
                  serão perdidos permanentemente.
                </p>
              </div>
              <Button
                type="button"
                onClick={handleDelete}
                variant="danger"
                icon={Trash2}
                aria-label="Excluir viagem permanentemente"
              >
                Excluir
              </Button>
            </div>
          </Card>
        </div>
      </Card>
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
  form: 'space-y-6',
  dateGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  buttonGroup: 'flex flex-col sm:flex-row gap-4 pt-4',
  dangerZone: 'mt-12 pt-8 border-t border-slate-dark/20',
  dangerZoneTitle: 'text-lg font-semibold text-parchment-white mb-4',
  dangerZoneContent: '',
  deleteSection: 'flex items-center justify-between',
  deleteTitle: 'text-parchment-white font-medium mb-1',
  deleteDescription: 'text-sm text-mist-gray',
};
