import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  externalIcon?: LucideIcon;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  externalIcon: ExternalIcon,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'cursor-pointer font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed justify-center';

  const variantStyles = {
    primary: 'bg-royal-purple text-parchment-white hover:bg-royal-purple/80',
    secondary:
      'bg-midnight-blue text-parchment-white hover:bg-slate-dark/80 border border-slate-dark/20',
    danger: 'bg-red-700 text-parchment-white hover:bg-red-800',
    ghost:
      'bg-transparent text-parchment-white hover:bg-slate-dark/20 border border-slate-dark/20',
  };

  const sizeStyles = {
    xs: 'px-3 py-1 text-xs rounded-sm',
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
  };

  const iconStyles = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const externalIconStyles = {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const buttonStyles = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      aria-label={ariaLabel}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={iconStyles[size]} aria-hidden="true" />
      )}

      {children}

      {Icon && iconPosition === 'right' && (
        <Icon className={iconStyles[size]} aria-hidden="true" />
      )}

      {ExternalIcon && (
        <ExternalIcon className={externalIconStyles[size]} aria-hidden="true" />
      )}
    </button>
  );
}
