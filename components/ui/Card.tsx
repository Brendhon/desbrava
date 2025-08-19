interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'dark' | 'light';
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '7xl';
  border?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function Card({
  children,
  className = '',
  padding = 'lg',
  shadow = 'lg',
  background = 'dark',
  maxWidth = 'none',
  border = true,
  rounded = 'lg',
}: CardProps) {
  return (
    <div
      className={`${styles.base} ${styles.padding[padding]} ${styles.shadow[shadow]} ${styles.background[background]} ${styles.maxWidth[maxWidth]} ${styles.rounded[rounded]} ${border ? styles.border : ''} ${className}`}
    >
      {children}
    </div>
  );
}

const styles = {
  base: 'w-full',
  padding: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-6 md:p-8',
  },
  shadow: {
    none: '',
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
  maxWidth: {
    none: '',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    '7xl': 'max-w-7xl',
  },
  rounded: {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  },
  border: 'border border-mist-gray/20',
};
