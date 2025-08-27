import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface GroupSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

/**
 * GroupSection Component
 *
 * A reusable component that provides a consistent structure for grouped content sections.
 * Used in forms and summary components to organize related information.
 *
 * @param title - The main title of the group section
 * @param description - A brief description explaining the group's purpose
 * @param icon - The icon to display alongside the title
 * @param children - The content to be displayed within the group
 * @param className - Optional additional CSS classes
 */
export default function GroupSection({
  title,
  description,
  icon: Icon,
  children,
  className = '',
}: GroupSectionProps) {
  return (
    <div className={`${styles.group} ${className}`}>
      <div className={styles.groupHeader}>
        <h3 className={styles.groupTitle}>
          <Icon className={styles.groupIcon} />
          {title}
        </h3>
        <p className={styles.groupDescription}>{description}</p>
      </div>

      {children}
    </div>
  );
}

const styles = {
  group: 'bg-slate-800/30 rounded-xl p-6 border border-slate-700/50',
  groupHeader: 'mb-6 text-center',
  groupTitle:
    'text-parchment-white mb-2 text-xl font-semibold flex items-center justify-center gap-2',
  groupIcon: 'text-royal-purple h-6 w-6',
  groupDescription: 'text-mist-gray text-sm',
};
