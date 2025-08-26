import { Card } from '@/components/ui';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface CardPlaceInfoProps {
  children: ReactNode;
  title: string;
  description?: ReactNode;
  Icon: LucideIcon;
}

export default function CardPlaceInfo({ children, title, description, Icon }: CardPlaceInfoProps) {
  return (
    <Card shadow="none" padding='sm' background="royal-purple" maxWidth="none" border={false} className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        {/* Title */}
        <span className={styles.titleContainer}>
          <Icon className={styles.icon} />
          <h4 className={styles.title}>{title}</h4>
        </span>

        {/* Description */}
        {description && <div className={styles.description}>{description}</div>}
      </div>

      {/* Children */}
      {children}

    </Card>
  );
}

const styles = {
  container: 'border-royal-purple/30 rounded-lg border p-4 mt-4 space-y-4',
  header: 'flex flex-col sm:flex-row sm:items-center gap-2 justify-between',
  title: 'text-parchment-white font-semibold text-lg',
  description: 'text-parchment-white text-sm',
  icon: "w-6 h-6 text-royal-purple",
  titleContainer: 'flex items-center gap-2'
}
