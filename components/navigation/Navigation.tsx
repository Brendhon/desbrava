'use client';

import Image from 'next/image';
import Link from 'next/link';
import UserMenu from './UserMenu';

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/dashboard" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Desbrava"
              width={40}
              height={40}
            />
            <span className={styles.logoText}>Desbrava</span>
          </Link>

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
  logoText: 'text-2xl font-bold text-parchment-white',
};
