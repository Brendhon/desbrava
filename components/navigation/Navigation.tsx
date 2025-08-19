'use client';

import { Home, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import Button from '../ui/Button';
import UserMenu from './UserMenu';

export function Navigation() {
  // Get the current pathname
  const pathname = usePathname();

  // Check if the current path is active
  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/dashboard" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Desbrava"
              width={36}
              height={36}
            />
            <span className={styles.logoText}>Desbrava</span>
          </Link>

          <div className={styles.navLeftButtons}>
            {/* Home Button */}
            <Link href="/dashboard" aria-label="Dashboard">
              <Button
                variant={isActive('/dashboard') ? 'primary' : 'ghost'}
                icon={Home}
                aria-label="Dashboard"
              >
                Dashboard
              </Button>
            </Link>

            {/* Trip Button */}
            <Link href="/trip" aria-label="Trip">
              <Button
                variant={isActive('/trip') ? 'primary' : 'ghost'}
                icon={MapPin}
                aria-label="Trip"
              >
                Viagens
              </Button>
            </Link>
          </div>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: 'bg-slate-dark border-b border-parchment-white/30 fixed top-0 left-0 right-0 z-50',
  container: 'w-full mx-auto px-4 sm:px-6 lg:px-8',
  navContent: 'flex justify-between items-center h-18',
  logo: 'flex items-center gap-2 text-xl font-bold text-parchment-white hover:opacity-80 transition-opacity',
  logoText: 'text-xl font-bold text-parchment-white',
  navLeftButtons: 'flex items-center gap-4 hidden lg:flex',
};
