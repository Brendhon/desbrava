import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/navigation/Navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-midnight-blue">
        <Navigation />
        <main> {children} </main>
      </div>
    </ProtectedRoute>
  );
}
