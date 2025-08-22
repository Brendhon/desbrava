interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'dark' | 'light' | 'gray' | 'blue';
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '7xl';
  border?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Animation type for card entrance effect */
  animation?: 'none' | 'fade-in' | 'slide-up' | 'scale-in' | 'slide-up-scale';
  /** Delay before animation starts for staggered entrance effects */
  delay?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
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
  animation = 'fade-in',
  delay = 'none',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`${styles.base} ${styles.padding[padding]} ${styles.shadow[shadow]} ${styles.background[background]} ${styles.maxWidth[maxWidth]} ${styles.rounded[rounded]} ${border ? styles.border : ''} ${styles.animation[animation]} ${styles.delay[delay]} ${className}`}
    >
      {children}
    </div>
  );
}

const styles = {
  base: 'w-full transition-all duration-700 ease-out',
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
    gray: 'bg-mist-gray',
    blue: 'bg-midnight-blue',
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
  animation: {
    none: '',
    'fade-in': 'opacity-0 animate-[fadeIn_0.7s_ease-out_forwards]',
    'slide-up':
      'opacity-0 translate-y-4 animate-[slideUp_0.7s_ease-out_forwards]',
    'scale-in': 'opacity-0 scale-95 animate-[scaleIn_0.7s_ease-out_forwards]',
    'slide-up-scale':
      'opacity-0 translate-y-4 scale-95 animate-[slideUpScale_0.7s_ease-out_forwards]',
  },
  delay: {
    none: '',
    sm: 'delay-100',
    md: 'delay-200',
    lg: 'delay-300',
    xl: 'delay-500',
  },
};
