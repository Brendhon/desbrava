import { Card } from '@/components/ui';
import { GoogleLoginButton } from '@/components/auth';

interface HeroSectionProps {
  onGoogleLogin: () => void;
  isLoading?: boolean;
}

export default function HeroSection({
  onGoogleLogin,
  isLoading = false,
}: HeroSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              ✈️ Bem-vindo ao <span className={styles.highlight}>Desbrava</span>
            </h1>

            <p className={styles.subtitle}>
              Seu planejador de viagens pessoal, focado em uma experiência
              simples e intuitiva
            </p>

            <div className={styles.description}>
              <p className={styles.descriptionText}>
                Em vez de planilhas complexas e informações espalhadas, o
                Desbrava oferece uma interface centralizada, limpa e focada para
                que você possa organizar seus roteiros de forma intuitiva.
              </p>

              <p className={styles.descriptionText}>
                Crie viagens, adicione pontos de referência e construa seu
                itinerário dia a dia, mesclando atividades planejadas
                manualmente com sugestões inteligentes de locais próximos.
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🗺️</span>
                <span className={styles.featureText}>
                  Criação de viagens simplificada
                </span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📍</span>
                <span className={styles.featureText}>
                  Pontos de referência inteligentes
                </span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📅</span>
                <span className={styles.featureText}>
                  Roteiros organizados por dia
                </span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🤖</span>
                <span className={styles.featureText}>
                  Sugestões automáticas de locais
                </span>
              </div>
            </div>
          </div>

          <div className={styles.loginSection}>
            <Card>
              <h2 className={styles.loginTitle}>Comece sua aventura</h2>
              <p className={styles.loginSubtitle}>
                Faça login com sua conta Google para começar a planejar suas
                viagens
              </p>

              <div className={styles.googleLoginContainer}>
                <GoogleLoginButton
                  onClick={onGoogleLogin}
                  isLoading={isLoading}
                />

                <p className={styles.loginNote}>
                  🔒 Login seguro e rápido com Google
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: 'min-h-screen bg-midnight-blue flex items-center',
  container: 'max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12',
  content: 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
  textContent: 'space-y-8',
  title:
    'text-2xl md:text-3xl lg:text-4xl font-bold text-parchment-white leading-tight',
  highlight: 'text-royal-purple',
  subtitle: 'text-xl md:text-2xl text-mist-gray font-medium',
  description: 'space-y-4',
  descriptionText: 'text-lg text-mist-gray leading-relaxed',
  features: 'grid grid-cols-2 gap-4 mt-8',
  feature: 'flex items-center gap-3',
  featureIcon: 'text-2xl',
  featureText: 'text-mist-gray text-sm',
  loginSection: 'flex justify-center lg:justify-end',
  loginTitle: 'text-2xl font-bold text-parchment-white text-center mb-2',
  loginSubtitle: 'text-mist-gray text-center mb-6',
  loginNote: 'text-xs text-mist-gray text-center mt-4',
  googleLoginContainer: 'flex flex-col justify-center items-center',
};
