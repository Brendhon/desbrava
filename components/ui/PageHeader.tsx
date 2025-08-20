import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  backHref: string;
  backText: string;
  backAriaLabel: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({
  backHref,
  backText,
  backAriaLabel,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <Link
        href={backHref}
        className={styles.backLink}
        aria-label={backAriaLabel}
      >
        <ArrowLeft className={styles.backIcon} aria-hidden="true" />
        {backText}
      </Link>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

const styles = {
  header: 'space-y-4 mb-4',
  backLink:
    'inline-flex items-center gap-2 text-sm text-mist-gray hover:text-parchment-white transition-colors',
  backIcon: 'h-4 w-4',
  title: 'text-2xl md:text-3xl font-bold text-parchment-white mb-2',
  subtitle: 'text-lg text-mist-gray',
};
