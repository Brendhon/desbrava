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
            <Image src="/images/logo.png" alt="Desbrava" width={36} height={36}/>
            <span className={styles.logoText}>Desbrava</span>
          </Link>

          {/* User Menu */}
          <div className={styles.navRight}>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: "bg-slate-dark border-b border-parchment-white/30",
  container: "w-full mx-auto px-4 sm:px-6 lg:px-8",
  navContent: "flex justify-between items-center h-16",
  logo: "flex items-center gap-2 text-xl font-bold text-parchment-white hover:opacity-80 transition-opacity",
  logoText: "text-xl font-bold text-parchment-white",
  navRight: "flex items-center gap-4"
};
