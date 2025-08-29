'use client';

import { PageHeader } from '@/components/layout';
import { DangerZone } from '@/components/settings';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useTrips } from '@/hooks/useTrips';
import { DashboardRoutes } from '@/lib/types';
import { Calendar, ExternalLink, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AccountPage() {
  const { session, logout } = useAuth();
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isClearingData, setIsClearingData] = useState(false);

  // hooks
  const { clearTrips } = useTrips();

  const handleGoogleCalendarConnect = () => {
    // TODO: Call the API to connect to Google Calendar
    console.log('Conectando com Google Calendar...');
    setIsCalendarConnected(true);
  };

  const handleGoogleCalendarDisconnect = () => {
    // TODO: Call the API to disconnect from Google Calendar
    console.log('Desconectando do Google Calendar...');
    setIsCalendarConnected(false);
  };

  const handleClearAccountData = async () => {
    if (
      !confirm(
        'Tem certeza que deseja excluir todos os seus dados? Esta ação não pode ser desfeita.'
      )
    ) {
      return;
    }

    setIsClearingData(true);
    try {
      await clearTrips();
      logout();
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    } finally {
      setIsClearingData(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <PageHeader
        backHref={DashboardRoutes.dashboard()}
        backText="Voltar ao Dashboard"
        backAriaLabel="Voltar ao Dashboard"
        title="Configurações da Conta"
        subtitle="Gerencie suas integrações e configurações de segurança"
      />

      <div className={styles.content}>
        {/* Google Calendar Integration Section */}
        <Card
          padding="xl"
          shadow="lg"
          background="dark"
          maxWidth="none"
          border={false}
        >
          <div className={styles.sectionHeader}>
            <Calendar className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Integração com Google Calendar
            </h2>
          </div>

          <div className={styles.integrationContent}>
            <div className={styles.integrationInfo}>
              <h3 className={styles.integrationTitle}>
                Sincronização de Atividades
              </h3>
              <p className={styles.integrationDescription}>
                Conecte sua conta do Google Calendar para sincronizar
                automaticamente suas atividades e viagens
              </p>
              {isCalendarConnected && (
                <div className={styles.connectionStatus}>
                  <span className={styles.statusConnected}>Conectado</span>
                  <p className={styles.statusText}>
                    Suas atividades estão sendo sincronizadas automaticamente
                  </p>
                </div>
              )}
            </div>

            <div className={styles.integrationActions}>
              {!isCalendarConnected ? (
                <Button
                  onClick={handleGoogleCalendarConnect}
                  variant="primary"
                  icon={Calendar}
                  externalIcon={ExternalLink}
                  aria-label="Conectar com Google Calendar"
                >
                  Conectar Google Calendar
                </Button>
              ) : (
                <Button
                  onClick={handleGoogleCalendarDisconnect}
                  variant="secondary"
                  icon={Calendar}
                  aria-label="Desconectar do Google Calendar"
                >
                  Desconectar
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Account Data Management Section */}
        <DangerZone
          icon={Trash2}
          title="Gerenciamento de Dados"
          description="Excluir permanentemente todas as suas viagens, atividades e dados pessoais"
          warningText="Esta ação é irreversível e excluirá todos os seus dados"
          actionLabel="Limpar Dados da Conta"
          onAction={handleClearAccountData}
          isLoading={isClearingData}
          loadingText="Limpando..."
        />

        {/* Security Section */}
        <Card
          padding="xl"
          shadow="lg"
          background="dark"
          maxWidth="none"
          border={false}
        >
          <div className={styles.sectionHeader}>
            <Shield className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>Segurança</h2>
          </div>

          <div className={styles.securityContent}>
            <div className={styles.securityItem}>
              <div>
                <h3 className={styles.securityTitle}>Conta Google</h3>
                <p className={styles.securityDescription}>
                  Conectada via {session?.user?.email}
                </p>
              </div>
              <span className={styles.securityStatus}>Conectada</span>
            </div>

            <div className={styles.securityItem}>
              <div>
                <h3 className={styles.securityTitle}>Último Acesso</h3>
                <p className={styles.securityDescription}>
                  {new Date().toLocaleDateString('pt-BR')} às{' '}
                  {new Date().toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6',
  content: 'space-y-8',
  sectionHeader: 'flex items-center gap-3 mb-6',
  sectionIcon: 'w-6 h-6 text-royal-purple',
  sectionTitle: 'text-xl font-semibold text-parchment-white',
  integrationContent: 'flex flex-col gap-4',
  integrationInfo: 'space-y-3',
  integrationTitle: 'text-lg font-medium text-parchment-white',
  integrationDescription: 'text-mist-gray',
  connectionStatus:
    'mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg',
  statusConnected: 'inline-block text-green-400 text-sm font-medium mb-2',
  statusText: 'text-green-300 text-sm',
  integrationActions: 'flex',
  securityContent: 'space-y-4',
  securityItem:
    'flex items-center justify-between p-4 bg-midnight-blue rounded-lg',
  securityTitle: 'text-parchment-white font-medium',
  securityDescription: 'text-sm text-mist-gray',
  securityStatus: 'text-green-400 text-sm font-medium',
  logoutContent: 'text-center',
  logoutTitle: 'text-xl font-semibold text-parchment-white mb-4',
  logoutDescription: 'text-mist-gray mb-6',
};
