interface PageHeaderProps {
  needsMultipleDestinations: boolean;
}

export default function PageHeader({ needsMultipleDestinations }: PageHeaderProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {needsMultipleDestinations
          ? 'De onde para onde?'
          : 'Onde será a atividade?'}
      </h2>
      <p className={styles.description}>
        {needsMultipleDestinations
          ? 'Defina o ponto de partida e destino da sua viagem'
          : 'Selecione o local onde acontecerá a atividade'}
      </p>
    </div>
  );
}

const styles = {
  container: 'text-center pb-4',
  title: 'text-parchment-white mb-2 text-2xl font-bold',
  description: 'text-mist-gray',
};
