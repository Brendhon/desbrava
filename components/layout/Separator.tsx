interface SeparatorProps {
  className?: string;
  variant?: 'default' | 'thin' | 'thick';
}

export default function Separator({
  className = '',
  variant = 'default',
}: SeparatorProps) {
  return <hr className={`${styles[variant]} ${className}`} />;
}

const styles = {
  default: 'my-6 border-mist-gray/40',
  thin: 'my-4 border-mist-gray/40',
  thick: 'my-8 border-mist-gray/40',
};
