interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'dark' | 'light';
}

export default function Card({
  children,
  className = '',
  padding = 'lg',
  shadow = '2xl',
  background = 'dark',
}: CardProps) {
  return (
    <div
      className={`${styles.base} ${styles.padding[padding]} ${styles.shadow[shadow]} ${styles.background[background]} ${className}`}
    >
      {children}
    </div>
  );
}

const styles = {
  base: 'rounded-2xl max-w-md w-full border border-mist-gray/20',
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  background: {
    dark: 'bg-slate-dark',
    light: 'bg-parchment-white',
  },
};
