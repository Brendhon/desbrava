'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Shield, Calendar, Trash2, LogOut, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import DangerZone from '@/components/ui/DangerZone';

export default function AccountPage() {
  const { session, logout } = useAuth();
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isClearingData, setIsClearingData] = useState(false);

  const handleGoogleCalendarConnect = () => {
    // TODO: Implementar integração com Google Calendar
    console.log('Conectando com Google Calendar...');
    setIsCalendarConnected(true);
  };

  const handleGoogleCalendarDisconnect = () => {
    // TODO: Implementar desconexão do Google Calendar
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
      // TODO: Implementar limpeza de dados da conta
      console.log('Limpando dados da conta...');
      // Aguardar um pouco para simular a operação
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirecionar para logout após limpeza
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
      <div className={styles.header}>
        <h1 className={styles.title}>Configurações da Conta</h1>
        <p className={styles.subtitle}>
          Gerencie suas integrações e configurações de segurança
        </p>
      </div>

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
                <h3 className={styles.securityTitle}>Último Login</h3>
                <p className={styles.securityDescription}>
                  {new Date().toLocaleDateString('pt-BR')} às{' '}
                  {new Date().toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Logout Section */}
        <Card
          padding="xl"
          shadow="lg"
          background="dark"
          maxWidth="none"
          border={false}
        >
          <div className={styles.logoutContent}>
            <h2 className={styles.logoutTitle}>Sair da Conta</h2>
            <p className={styles.logoutDescription}>
              Você será redirecionado para a página inicial
            </p>
            <Button
              onClick={logout}
              variant="danger"
              icon={LogOut}
              aria-label="Sair da conta"
              className="mx-auto"
            >
              Sair
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  container: 'max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8',
  header: 'mb-8',
  title: 'text-3xl md:text-4xl font-bold text-parchment-white mb-3',
  subtitle: 'text-lg text-mist-gray',
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
