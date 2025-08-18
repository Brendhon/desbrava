import ColorPaletteDemo from "@/components/ui/ColorPaletteDemo";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Simple header with greeting */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            🚀 Olá! Bem-vindo ao Desbrava
          </h1>
          <p className={styles.subtitle}>
            Explore a paleta de cores &ldquo;Diário de Explorador&rdquo; do projeto
          </p>
        </div>
      </div>

      {/* Color palette demonstration component */}
      <ColorPaletteDemo />
    </div>
  );
}

const styles = {
  container: "min-h-screen bg-midnight-blue",
  header: "bg-slate-dark border-b border-mist-gray/20",
  headerContent: "max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6",
  title: "text-2xl md:text-3xl font-bold text-parchment-white",
  subtitle: "text-mist-gray mt-2",
};
