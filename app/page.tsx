'use client';

import { useState } from 'react';
import HeroSection from '@/components/ui/HeroSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      // TODO: Implementar autenticação com Google
      // Por enquanto, apenas simula um delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Login com Google iniciado');
      // Aqui será implementada a lógica de autenticação
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-midnight-blue min-h-screen">
      <HeroSection onGoogleLogin={handleGoogleLogin} isLoading={isLoading} />
    </main>
  );
}
