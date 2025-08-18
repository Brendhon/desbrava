import React from 'react';

/**
 * Color palette demonstration component for the Desbrava project
 * Shows all available colors and how to use them
 */
export default function ColorPaletteDemo() {
  const colorSwatches = [
    {
      name: 'Azul Meia-Noite',
      hex: '#0D1B2A',
      description: 'Fundo principal da aplicação',
      classes: 'bg-midnight-blue',
      semantic: 'bg-primary',
    },
    {
      name: 'Ardósia Escuro',
      hex: '#1B263B',
      description: 'Fundo para cards e modais',
      classes: 'bg-slate-dark',
      semantic: 'bg-secondary',
    },
    {
      name: 'Branco Pergaminho',
      hex: '#E0E1DD',
      description: 'Textos principais e títulos',
      classes: 'bg-parchment-white text-midnight-blue',
      semantic: 'bg-parchment-white text-text-primary',
    },
    {
      name: 'Cinza Névoa',
      hex: '#A9B4C2',
      description: 'Textos secundários e ícones',
      classes: 'bg-mist-gray text-midnight-blue',
      semantic: 'bg-mist-gray text-text-secondary',
    },
    {
      name: 'Roxo Real',
      hex: '#8443A4',
      description: 'Destaques, botões e links',
      classes: 'bg-royal-purple text-parchment-white',
      semantic: 'bg-accent text-text-primary',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            Paleta de Cores - Desbrava
          </h1>
          <p className={styles.subtitle}>
            Demonstração da paleta &ldquo;Diário de Explorador&rdquo; com todas as cores disponíveis
            e suas classes Tailwind correspondentes.
          </p>
        </div>

        {/* Color Swatches */}
        <div className={styles.swatchesGrid}>
          {colorSwatches.map((color, index) => (
            <div
              key={index}
              className={`${color.classes} ${styles.colorSwatch}`}
            >
              <div className={styles.swatchContent}>
                <h3 className={styles.swatchTitle}>
                  {color.name}
                </h3>
                <p className={styles.swatchDescription}>
                  {color.description}
                </p>
                <div className={styles.swatchHex}>
                  {color.hex}
                </div>
              </div>
              
              <div className={styles.swatchInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Classes:</span>
                  <code className={styles.codeBlock}>
                    {color.classes}
                  </code>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Semântico:</span>
                  <code className={styles.codeBlock}>
                    {color.semantic}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className={styles.examplesSection}>
          <h2 className={styles.sectionTitle}>
            Exemplos de Uso
          </h2>
          
          <div className={styles.examplesGrid}>
            {/* Buttons */}
            <div>
              <h3 className={styles.exampleSubtitle}>
                Botões
              </h3>
              <div className={styles.buttonGroup}>
                <button className={styles.buttonPrimary}>
                  Botão Primário
                </button>
                <button className={styles.buttonSecondary}>
                  Botão Secundário
                </button>
                <button className={styles.buttonOutline}>
                  Botão Outline
                </button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className={styles.exampleSubtitle}>
                Cards
              </h3>
              <div className={styles.cardGroup}>
                <div className={styles.exampleCard}>
                  <h4 className={styles.cardTitle}>
                    Card de Exemplo
                  </h4>
                  <p className={styles.cardText}>
                    Este é um exemplo de card usando as cores da paleta Desbrava.
                  </p>
                </div>
                <div className={styles.exampleCardHighlighted}>
                  <h4 className={styles.cardTitle}>
                    Card Destacado
                  </h4>
                  <p className={styles.cardText}>
                    Card com borda destacada usando a cor de acento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Variables Info */}
        <div className={styles.cssVariablesSection}>
          <h3 className={styles.cssVariablesTitle}>
            Variáveis CSS Disponíveis
          </h3>
          <div className={styles.variablesGrid}>
            <div>
              <code className={styles.variableCode}>--color-midnight-blue</code>
              <span className={styles.variableValue}>#0D1B2A</span>
            </div>
            <div>
              <code className={styles.variableCode}>--color-slate-dark</code>
              <span className={styles.variableValue}>#1B263B</span>
            </div>
            <div>
              <code className={styles.variableCode}>--color-parchment-white</code>
              <span className={styles.variableValue}>#E0E1DD</span>
            </div>
            <div>
              <code className={styles.variableCode}>--color-mist-gray</code>
              <span className={styles.variableValue}>#A9B4C2</span>
            </div>
            <div>
              <code className={styles.variableCode}>--color-royal-purple</code>
              <span className={styles.variableValue}>#8443A4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: "min-h-screen bg-midnight-blue p-4 md:p-6 lg:p-8",
  wrapper: "max-w-6xl mx-auto",
  
  // Header styles
  header: "text-center mb-8 md:mb-12",
  title: "text-3xl md:text-4xl font-bold text-parchment-white mb-3 md:mb-4",
  subtitle: "text-mist-gray text-base md:text-lg max-w-2xl mx-auto",
  
  // Color swatches
  swatchesGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12",
  colorSwatch: "rounded-lg p-4 md:p-6 shadow-lg border border-slate-dark/20",
  swatchContent: "mb-4",
  swatchTitle: "font-semibold text-base md:text-lg mb-2",
  swatchDescription: "text-sm opacity-90 mb-2",
  swatchHex: "font-mono text-sm opacity-75",
  swatchInfo: "space-y-2",
  infoRow: "text-xs",
  infoLabel: "font-semibold",
  codeBlock: "ml-2 px-2 py-1 bg-black/20 rounded text-xs",
  
  // Examples section
  examplesSection: "bg-slate-dark rounded-lg p-6 md:p-8 border border-mist-gray/20",
  sectionTitle: "text-xl md:text-2xl font-bold text-parchment-white mb-4 md:mb-6",
  examplesGrid: "grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8",
  exampleSubtitle: "text-base md:text-lg font-semibold text-parchment-white mb-3 md:mb-4",
  
  // Buttons
  buttonGroup: "flex flex-col gap-2",
  buttonPrimary: "bg-royal-purple text-parchment-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-royal-purple/90 transition-colors",
  buttonSecondary: "bg-slate-dark text-parchment-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium border border-royal-purple hover:bg-slate-dark/80 transition-colors",
  buttonOutline: "bg-transparent text-royal-purple px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium border border-royal-purple hover:bg-royal-purple/10 transition-colors",
  
  // Cards
  cardGroup: "flex flex-col gap-2",
  exampleCard: "bg-slate-dark border border-mist-gray/20 rounded-lg p-3 md:p-4 shadow-lg",
  exampleCardHighlighted: "bg-slate-dark border-2 border-royal-purple/70 rounded-lg p-3 md:p-4 shadow-lg",
  cardTitle: "text-parchment-white font-semibold mb-2",
  cardText: "text-mist-gray text-sm",
  
  // CSS Variables section
  cssVariablesSection: "mt-6 md:mt-8 bg-slate-dark rounded-lg p-4 md:p-6 border border-mist-gray/20",
  cssVariablesTitle: "text-base md:text-lg font-semibold text-parchment-white mb-3 md:mb-4",
  variablesGrid: "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm",
  variableCode: "text-royal-purple",
  variableValue: "text-mist-gray ml-2",
};
