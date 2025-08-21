import { useFormStyles } from '@/hooks/useFormStyles';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface InputWithIconProps {
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  error?: string;
  className?: string;
  children: ReactNode;
  iconAction?: () => void | null;
}

const InputWithIcon = ({
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  error,
  className = '',
  children,
  iconAction,
}: InputWithIconProps) => {
  const styles = useFormStyles({
    size,
    variant,
    hasIcon: !!Icon,
    iconPosition,
    className,
    error,
  });

  return (
    <div className="relative">
      {Icon && iconPosition === 'left' && (
        <Icon
          className={`${styles.icon} ${!iconAction ? 'pointer-events-none' : 'cursor-pointer'}`}
          aria-hidden="true"
          onClick={iconAction}
        />
      )}

      {children}

      {Icon && iconPosition === 'right' && (
        <Icon
          className={`${styles.icon} ${!iconAction ? 'pointer-events-none' : 'cursor-pointer'}`}
          aria-hidden="true"
          onClick={iconAction}
        />
      )}
    </div>
  );
};

export default InputWithIcon;
