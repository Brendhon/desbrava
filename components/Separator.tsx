interface SeparatorProps {
  className?: string;
  variant?: 'default' | 'thin' | 'thick';
}

export function Separator({ className = '', variant = 'default' }: SeparatorProps) {
  return (
    <hr className={`${styles.base} ${styles[variant]} ${className}`} />
  );
}

const styles = {
  base: 'border-t',
  default: 'my-8 border-mist-gray/40',
  thin: 'my-4 border-mist-gray/40',
  thick: 'my-12 border-mist-gray/40',
};
