import { SessionProvider } from '@/components/providers/SessionProvider';
import { ToastProvider } from '@/context/ToastContext';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Desbrava - PWA',
  description: 'Desbrava - Seu planejador de viagens pessoal. Agora disponível como PWA para uma experiência offline e app-like!',
  manifest: '/manifest.json',
  authors: [
    {
      name: 'Brendhon Moreira',
      url: 'https://www.linkedin.com/in/brendhon-moreira/',
    },
  ],
  appleWebApp: {
    title: 'Desbrava',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} antialiased`}>
        <SessionProvider>
          <ToastProvider>
            {children}
            <PWAInstallPrompt />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
