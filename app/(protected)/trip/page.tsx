'use client';

import DatePicker from '@/components/form/DatePicker';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Globe, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CreateTripPage() {
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar criação da viagem
    console.log('Criando viagem:', formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Título da Viagem */}
          <Input
            label="Nome da Viagem"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ex: Aventura na Europa"
            required
            helperText="Escolha um nome descritivo para sua viagem"
          />

          {/* País */}
          <Input
            label="País"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Ex: França"
            icon={Globe}
            iconPosition="left"
            required
            helperText="País principal da sua viagem"
          />

          {/* Datas */}
          <div className={styles.dateGrid}>
            <DatePicker
              label="Data de Início"
              value={formData.startDate}
              placeholder="dd/MM/aaaa"
              onChange={(value) => setFormData({ ...formData, startDate: value })}
              helperText="Quando sua viagem começa"
            />

            <DatePicker
              label="Data de Fim"
              value={formData.endDate}
              onChange={(value) => setFormData({ ...formData, endDate: value })}
              placeholder="dd/MM/aaaa"
              helperText="Quando sua viagem termina"
            />
          </div>

          {/* Descrição */}
          <Textarea
            label="Descrição (opcional)"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
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
            >
              Criar Viagem
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
              aria-label="Cancelar criação"
              className="flex-1"
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
  backLink:
    'inline-flex items-center gap-2 text-mist-gray hover:text-parchment-white transition-colors mb-4',
  backIcon: 'w-4 h-4',
  title: 'text-3xl md:text-4xl font-bold text-parchment-white mb-3',
  subtitle: 'text-lg text-mist-gray',
  formContainer: '',
  form: 'space-y-6',
  dateGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  buttonGroup: 'flex flex-col sm:flex-row gap-4 pt-4',
};
