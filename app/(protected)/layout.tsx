import { ProtectedRoute } from '@/components/auth';
import { Navigation } from '@/components/navigation';
import { ToastContainer } from '@/components/ui';

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
        <ToastContainer />
      </div>
    </ProtectedRoute>
  );
}

const styles = {
  container: 'bg-midnight-blue',
  main: 'mt-20',
};
