'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { User, Mail, Shield, Bell, Globe, Save, LogOut } from 'lucide-react';

export default function AccountPage() {
  const { session, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    language: 'pt-BR',
    notifications: true,
    emailUpdates: true
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar atualização do perfil
    console.log('Atualizando perfil:', profileData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Configurações da Conta
        </h1>
        <p className={styles.subtitle}>
          Gerencie suas preferências e informações pessoais
        </p>
      </div>

      <div className={styles.content}>
        {/* Profile Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <User className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Informações do Perfil
            </h2>
          </div>

          <form onSubmit={handleProfileSubmit} className={styles.form}>
            {/* Name */}
            <div className={styles.formField}>
              <label htmlFor="name" className={styles.label}>
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
                aria-describedby="name-help"
              />
            </div>

            {/* Email */}
            <div className={styles.formField}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} aria-hidden="true" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={styles.inputWithIcon}
                  required
                  disabled
                  aria-describedby="email-help"
                />
              </div>
              <p className={styles.helpText}>
                O email não pode ser alterado pois está vinculado à sua conta Google
              </p>
            </div>

            {/* Language */}
            <div className={styles.formField}>
              <label htmlFor="language" className={styles.label}>
                Idioma
              </label>
              <div className={styles.inputWrapper}>
                <Globe className={styles.inputIcon} aria-hidden="true" />
                <select
                  id="language"
                  name="language"
                  value={profileData.language}
                  onChange={handleInputChange}
                  className={styles.selectWithIcon}
                  aria-describedby="language-help"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                  <option value="fr-FR">Français</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className={styles.saveButton}
              aria-label="Salvar alterações do perfil"
            >
              <Save className={styles.saveButtonIcon} aria-hidden="true" />
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* Notifications Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Bell className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Notificações
            </h2>
          </div>

          <div className={styles.notificationsContent}>
            <div className={styles.notificationItem}>
              <div>
                <h3 className={styles.notificationTitle}>Notificações Push</h3>
                <p className={styles.notificationDescription}>Receba lembretes sobre suas viagens</p>
              </div>
              <label className={styles.toggleWrapper}>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profileData.notifications}
                  onChange={handleInputChange}
                  className={styles.toggleInput}
                  aria-label="Ativar notificações push"
                />
                <div className={styles.toggle}></div>
              </label>
            </div>

            <div className={styles.notificationItem}>
              <div>
                <h3 className={styles.notificationTitle}>Atualizações por Email</h3>
                <p className={styles.notificationDescription}>Receba novidades sobre o Desbrava</p>
              </div>
              <label className={styles.toggleWrapper}>
                <input
                  type="checkbox"
                  name="emailUpdates"
                  checked={profileData.emailUpdates}
                  onChange={handleInputChange}
                  className={styles.toggleInput}
                  aria-label="Ativar atualizações por email"
                />
                <div className={styles.toggle}></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Segurança
            </h2>
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
                  {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className={styles.section}>
          <div className={styles.logoutContent}>
            <h2 className={styles.logoutTitle}>
              Sair da Conta
            </h2>
            <p className={styles.logoutDescription}>
              Você será redirecionado para a página inicial
            </p>
            <button
              onClick={logout}
              className={styles.logoutButton}
              aria-label="Sair da conta"
            >
              <LogOut className={styles.logoutButtonIcon} aria-hidden="true" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8",
  header: "mb-8",
  title: "text-3xl md:text-4xl font-bold text-parchment-white mb-3",
  subtitle: "text-lg text-mist-gray",
  content: "space-y-8",
  section: "bg-slate-dark rounded-lg p-6 md:p-8",
  sectionHeader: "flex items-center gap-3 mb-6",
  sectionIcon: "w-6 h-6 text-royal-purple",
  sectionTitle: "text-xl font-semibold text-parchment-white",
  form: "space-y-6",
  formField: "space-y-2",
  label: "block text-parchment-white font-medium",
  input: "w-full px-4 py-3 bg-midnight-blue border border-slate-dark/20 rounded-lg text-parchment-white focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent",
  inputWrapper: "relative",
  inputIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mist-gray",
  inputWithIcon: "w-full pl-12 pr-4 py-3 bg-midnight-blue border border-slate-dark/20 rounded-lg text-parchment-white focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent",
  selectWithIcon: "w-full pl-12 pr-4 py-3 bg-midnight-blue border border-slate-dark/20 rounded-lg text-parchment-white focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent",
  helpText: "text-sm text-mist-gray mt-1",
  saveButton: "bg-royal-purple text-parchment-white px-6 py-3 rounded-lg hover:bg-royal-purple/80 transition-colors font-medium flex items-center gap-2",
  saveButtonIcon: "w-5 h-5",
  notificationsContent: "space-y-4",
  notificationItem: "flex items-center justify-between",
  notificationTitle: "text-parchment-white font-medium",
  notificationDescription: "text-sm text-mist-gray",
  toggleWrapper: "relative inline-flex items-center cursor-pointer",
  toggleInput: "sr-only peer",
  toggle: "w-11 h-6 bg-midnight-blue peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-royal-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-purple",
  securityContent: "space-y-4",
  securityItem: "flex items-center justify-between p-4 bg-midnight-blue rounded-lg",
  securityTitle: "text-parchment-white font-medium",
  securityDescription: "text-sm text-mist-gray",
  securityStatus: "text-green-400 text-sm font-medium",
  logoutContent: "text-center",
  logoutTitle: "text-xl font-semibold text-parchment-white mb-4",
  logoutDescription: "text-mist-gray mb-6",
  logoutButton: "bg-red-600 text-parchment-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 mx-auto",
  logoutButtonIcon: "w-5 h-5",
};
