'use client';

import { useState } from 'react';
import { MapPin, Calendar, Globe, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button, Card } from '@/components/ui';

export default function CreateTripPage() {
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar criação da viagem
    console.log('Criando viagem:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Criar Nova Viagem
        </h1>
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
          <div className={styles.formField}>
            <label htmlFor="title" className={styles.label}>
              Nome da Viagem
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ex: Aventura na Europa"
              className={styles.input}
              required
              aria-describedby="title-help"
            />
          </div>

          {/* País */}
          <div className={styles.formField}>
            <label htmlFor="country" className={styles.label}>
              País
            </label>
            <div className={styles.inputWrapper}>
              <Globe className={styles.inputIcon} aria-hidden="true" />
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Ex: França"
                className={styles.inputWithIcon}
                required
                aria-describedby="country-help"
              />
            </div>
          </div>

          {/* Datas */}
          <div className={styles.dateGrid}>
            <div className={styles.formField}>
              <label htmlFor="startDate" className={styles.label}>
                Data de Início
              </label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.inputIcon} aria-hidden="true" />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.inputWithIcon}
                  required
                  aria-describedby="startDate-help"
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label htmlFor="endDate" className={styles.label}>
                Data de Fim
              </label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.inputIcon} aria-hidden="true" />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.inputWithIcon}
                  required
                  aria-describedby="endDate-help"
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className={styles.formField}>
            <label htmlFor="description" className={styles.label}>
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Conte um pouco sobre o que você planeja fazer nesta viagem..."
              rows={4}
              className={styles.textarea}
              aria-describedby="description-help"
            />
          </div>

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
  container: "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8",
  header: "mb-8",
  backLink: "inline-flex items-center gap-2 text-mist-gray hover:text-parchment-white transition-colors mb-4",
  backIcon: "w-4 h-4",
  title: "text-3xl md:text-4xl font-bold text-parchment-white mb-3",
  subtitle: "text-lg text-mist-gray",
  formContainer: "",
  form: "space-y-6",
  formField: "space-y-2",
  label: "block text-parchment-white font-medium",
  input: "w-full px-4 py-3 bg-midnight-blue border border-slate-dark/20 rounded-lg text-parchment-white placeholder-mist-gray focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent",
  inputWrapper: "relative",
  inputIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mist-gray",
  inputWithIcon: "w-full pl-12 pr-4 py-3 bg-midnight-blue border border-slate-dark/20 rounded-lg text-parchment-white placeholder-mist-gray focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent",
  textarea: "w-full px-4 py-3 bg-midnight-blue border border-slate-dark/20 rounded-lg text-parchment-white placeholder-mist-gray focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent resize-none",
  dateGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  buttonGroup: "flex flex-col sm:flex-row gap-4 pt-4",
};
