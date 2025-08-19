'use client';

import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { createTripSchema, type CreateTripFormData } from '@/lib/schemas/trip';
import { Globe, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateTripPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTripFormData>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      title: '',
      country: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  });

  const onSubmit = async (data: CreateTripFormData) => {
    try {
      // TODO: Implementar criação da viagem na API
      console.log('Criando viagem:', data);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Mostrar mensagem de sucesso e redirecionar
      console.log('Viagem criada com sucesso!');
      
      // Reset form após sucesso
      reset();
      
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      // TODO: Mostrar mensagem de erro
    }
  };

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
            <DatePicker
              label="Data de Início"
              error={errors.startDate?.message}
              register={register('startDate')}
              helperText="Quando sua viagem começa"
            />

            <DatePicker
              label="Data de Fim"
              error={errors.endDate?.message}
              register={register('endDate')}
              helperText="Quando sua viagem termina"
            />
          </div>

          {/* Descrição */}
          <Textarea
            label="Descrição (opcional)"
            placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
            error={errors.description?.message}
            register={register('description')}
            rows={4}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando...' : 'Criar Viagem'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
              aria-label="Cancelar criação"
              className="flex-1"
              disabled={isSubmitting}
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
