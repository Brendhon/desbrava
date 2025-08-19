import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/navigation/Navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Navigation />
        <main className={styles.main}> {children} </main>
      </div>
    </ProtectedRoute>
  );
}

const styles = {
  container: 'bg-midnight-blue',
  main: 'mt-20',
};
