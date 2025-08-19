'use client';

import { Button, Card } from '@/components/ui';
import { ArrowLeft, Calendar, Globe, Map, MapPin, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TripDetailsPage() {
  const params = useParams();
  const tripId = params.id;

  // TODO: Buscar dados da viagem pelo ID
  const trip = {
    id: tripId,
    title: 'Aventura na Europa',
    country: 'França',
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    description: 'Uma incrível jornada pela França, explorando Paris, Lyon e Nice.',
    referencePoint: 'Hotel Le Grand, Paris',
    activities: []
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link
            href="/dashboard"
            className={styles.backLink}
            aria-label="Voltar ao Dashboard"
          >
            <ArrowLeft className={styles.backIcon} aria-hidden="true" />
            Voltar ao Dashboard
          </Link>
          
          <Link
            href={`/trip/${tripId}/settings`}
            className={styles.settingsLink}
            aria-label="Configurações da viagem"
          >
            <Settings className={styles.settingsIcon} aria-hidden="true" />
            Configurações
          </Link>
        </div>

        <h1 className={styles.title}>
          {trip.title}
        </h1>
        <p className={styles.description}>
          {trip.description}
        </p>

        {/* Trip Info Cards */}
        <div className={styles.infoGrid}>
          <Card 
            padding="sm" 
            shadow="none" 
            background="dark" 
            maxWidth="none" 
            border={false}
            className={styles.infoCard}
          >
            <Globe className={styles.infoIcon} aria-hidden="true" />
            <div>
              <p className={styles.infoLabel}>País</p>
              <p className={styles.infoValue}>{trip.country}</p>
            </div>
          </Card>

          <Card 
            padding="sm" 
            shadow="none" 
            background="dark" 
            maxWidth="none" 
            border={false}
            className={styles.infoCard}
          >
            <Calendar className={styles.infoIcon} aria-hidden="true" />
            <div>
              <p className={styles.infoLabel}>Período</p>
              <p className={styles.infoValue}>
                {new Date(trip.startDate).toLocaleDateString('pt-BR')} - {new Date(trip.endDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </Card>

          <Card 
            padding="sm" 
            shadow="none" 
            background="dark" 
            maxWidth="none" 
            border={false}
            className={styles.infoCard}
          >
            <MapPin className={styles.infoIcon} aria-hidden="true" />
            <div>
              <p className={styles.infoLabel}>Ponto de Referência</p>
              <p className={styles.infoValue}>{trip.referencePoint}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Content Tabs */}
      <Card 
        shadow="none" 
        background="dark" 
        maxWidth="none" 
        border={false}
        className={styles.tabContainer}
      >
        {/* Tab Navigation */}
        <div className={styles.tabNav}>
          <nav className={styles.tabNavContent}>
            <button className={styles.tabButtonActive} aria-label="Aba Itinerário">
              Itinerário
            </button>
            <button className={styles.tabButton} aria-label="Aba Mapa">
              Mapa
            </button>
            <button className={styles.tabButton} aria-label="Aba Documentos">
              Documentos
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Itinerary Tab */}
          <div className={styles.itineraryContent}>
            <div className={styles.itineraryHeader}>
              <h3 className={styles.itineraryTitle}>
                Seu Itinerário
              </h3>
              <Button 
                variant="primary"
                icon={Plus}
                aria-label="Adicionar nova atividade"
                size="sm"
              >
                Adicionar Atividade
              </Button>
            </div>

            {/* Empty State */}
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Map className={styles.emptyIconImage} aria-hidden="true" />
              </div>
              <h3 className={styles.emptyTitle}>
                Nenhuma atividade planejada
              </h3>
              <p className={styles.emptyDescription}>
                Comece adicionando atividades ao seu itinerário para organizar melhor sua viagem.
              </p>
              <Button 
                variant="primary"
                icon={Plus}
                aria-label="Criar primeira atividade"
              >
                Primeira Atividade
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8",
  header: "mb-8",
  headerTop: "flex items-center justify-between mb-6",
  backLink: "inline-flex items-center gap-2 text-mist-gray hover:text-parchment-white transition-colors",
  backIcon: "w-4 h-4",
  settingsLink: "inline-flex items-center gap-2 bg-slate-dark text-mist-gray px-4 py-2 rounded-lg hover:bg-slate-dark/60 hover:text-parchment-white transition-colors",
  settingsIcon: "w-4 h-4",
  title: "text-3xl md:text-4xl font-bold text-parchment-white mb-3",
  description: "text-lg text-mist-gray mb-6",
  infoGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",
  infoCard: "flex items-center gap-3",
  infoIcon: "w-5 h-5 text-royal-purple",
  infoLabel: "text-sm text-mist-gray",
  infoValue: "text-parchment-white font-medium",
  tabContainer: "",
  tabNav: "border-b border-slate-dark/20",
  tabNavContent: "flex space-x-8 px-6",
  tabButton: "py-4 px-1 border-b-2 border-transparent text-mist-gray hover:text-parchment-white font-medium",
  tabButtonActive: "py-4 px-1 border-b-2 border-royal-purple text-royal-purple font-medium",
  tabContent: "p-6",
  itineraryContent: "space-y-6",
  itineraryHeader: "flex items-center justify-between",
  itineraryTitle: "text-xl font-semibold text-parchment-white",

  emptyState: "text-center py-16",
  emptyIcon: "w-20 h-20 bg-midnight-blue rounded-full flex items-center justify-center mx-auto mb-6",
  emptyIconImage: "w-10 h-10 text-mist-gray",
  emptyTitle: "text-xl font-semibold text-parchment-white mb-3",
  emptyDescription: "text-mist-gray mb-6 max-w-md mx-auto",
};
