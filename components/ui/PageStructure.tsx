interface PageStructureProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageStructure({
  title,
  description,
  children,
  className = '',
}: PageStructureProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

const styles = {
  container: 'space-y-6',
  header: 'text-center pb-6',
  title: 'text-parchment-white mb-2 text-2xl font-bold',
  description: 'text-mist-gray text-lg',
};
