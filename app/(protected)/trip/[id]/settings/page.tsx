'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Globe, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';

export default function TripSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id;

  // TODO: Buscar dados da viagem pelo ID
  const [formData, setFormData] = useState({
    title: 'Aventura na Europa',
    country: 'França',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    description: 'Uma incrível jornada pela França, explorando Paris, Lyon e Nice.',
    referencePoint: 'Hotel Le Grand, Paris'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar atualização da viagem
    console.log('Atualizando viagem:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    // TODO: Implementar exclusão da viagem
    if (confirm('Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.')) {
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
        <h1 className={styles.title}>
          Configurações da Viagem
        </h1>
        <p className={styles.subtitle}>
          Edite os detalhes da sua viagem
        </p>
      </div>

      {/* Form */}
      <div className={styles.formContainer}>
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

          {/* Ponto de Referência */}
          <div className={styles.formField}>
            <label htmlFor="referencePoint" className={styles.label}>
              Ponto de Referência
            </label>
            <div className={styles.inputWrapper}>
              <MapPin className={styles.inputIcon} aria-hidden="true" />
              <input
                type="text"
                id="referencePoint"
                name="referencePoint"
                value={formData.referencePoint}
                onChange={handleInputChange}
                placeholder="Ex: Hotel Le Grand, Paris"
                className={styles.inputWithIcon}
                required
                aria-describedby="referencePoint-help"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className={styles.formField}>
            <label htmlFor="description" className={styles.label}>
              Descrição
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
              icon={Save}
              aria-label="Salvar alterações da viagem"
              className="flex-1"
            >
              Salvar Alterações
            </Button>
            
            <Link
              href={`/trip/${tripId}`}
              aria-label="Cancelar edição da viagem"
              className="flex-1"
            >
              <Button
                variant="ghost"
                className="w-full"
              >
                Cancelar
              </Button>
            </Link>
          </div>
        </form>

        {/* Danger Zone */}
        <div className={styles.dangerZone}>
          <h3 className={styles.dangerZoneTitle}>
            Zona de Perigo
          </h3>
          <div className={styles.dangerZoneContent}>
            <div className={styles.deleteSection}>
              <div>
                <h4 className={styles.deleteTitle}>
                  Excluir Viagem
                </h4>
                <p className={styles.deleteDescription}>
                  Esta ação não pode ser desfeita. Todos os dados da viagem serão perdidos permanentemente.
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
          </div>
        </div>
      </div>
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
  formContainer: "bg-slate-dark rounded-lg p-6 md:p-8",
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

  dangerZone: "mt-12 pt-8 border-t border-slate-dark/20",
  dangerZoneTitle: "text-lg font-semibold text-parchment-white mb-4",
  dangerZoneContent: "bg-midnight-blue rounded-lg p-4",
  deleteSection: "flex items-center justify-between",
  deleteTitle: "text-parchment-white font-medium mb-1",
  deleteDescription: "text-sm text-mist-gray",

};
