import { SessionProvider } from '@/components/providers';
import { PWAInstallPrompt } from '@/components/pwa';
import { ToastProvider } from '@/context/ToastContext';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Desbrava',
  description:
    'Desbrava - Seu planejador de viagens pessoal. Agora disponível como PWA para uma experiência offline e app-like!',
  manifest: '/manifest.json',
  authors: [
    {
      name: 'Brendhon Moreira',
      url: 'https://www.linkedin.com/in/brendhon-moreira/',
    },
  ],
  openGraph: {
    title: 'Desbrava',
    description:
      'Desbrava - Seu planejador de viagens pessoal. Agora disponível como PWA para uma experiência offline e app-like!',
    url: 'https://desbrava-seven.vercel.app',
    siteName: 'Desbrava',
    images: [
      {
        url: 'https://desbrava-seven.vercel.app/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Desbrava - Seu planejador de viagens pessoal. Agora disponível como PWA para uma experiência offline e app-like!',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Desbrava',
    description:
      'Desbrava - Seu planejador de viagens pessoal. Agora disponível como PWA para uma experiência offline e app-like!',
    images: ['https://desbrava-seven.vercel.app/images/og-image.png'],
  },
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
