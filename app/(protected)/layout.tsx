import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/navigation/Navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="bg-midnight-blue">
        <Navigation />
        <main className={styles.main}> {children} </main>
      </div>
    </ProtectedRoute>
  );
}

const styles = {
  main: 'mt-20',
};
