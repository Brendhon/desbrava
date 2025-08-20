'use client';

import Button from '@/components/ui/Button';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface UserMenuProps {
  className?: string;
}

export default function UserMenu({ className = '' }: UserMenuProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logout
  const logout = () => signOut({ callbackUrl: '/' });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // If no session, return null
  if (!session?.user) return null;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className={styles.triggerButton}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu do usuário"
      >
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {session.user.image ? (
              <Image
                width={32}
                height={32}
                src={session.user.image}
                alt={`Foto de ${session.user.name || 'Usuário'}`}
                className={styles.avatarImage}
              />
            ) : (
              <User className={styles.avatarIcon} aria-hidden="true" />
            )}
          </div>
          <span className={styles.userName}>
            {session.user.name?.split(' ')[0] || 'Usuário'}
          </span>
        </div>
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
          aria-hidden="true"
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownAvatar}>
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={`Foto de ${session.user.name || 'Usuário'}`}
                  className={styles.dropdownAvatarImage}
                  width={40}
                  height={40}
                />
              ) : (
                <User
                  className={styles.dropdownAvatarIcon}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className={styles.dropdownUserInfo}>
              <span className={styles.dropdownUserName}>
                {session.user.name || 'Usuário'}
              </span>
              <span className={styles.dropdownUserEmail}>
                {session.user.email}
              </span>
            </div>
          </div>

          <div className={styles.dropdownDivider} />

          <Link
            href="/account"
            className={styles.dropdownLink}
            onClick={() => setIsOpen(false)}
            aria-label="Configurações da conta"
          >
            <Settings className={styles.dropdownLinkIcon} aria-hidden="true" />
            <span>Conta</span>
          </Link>

          <button
            onClick={logout}
            className={styles.dropdownLogoutButton}
            aria-label="Sair da conta"
          >
            <LogOut className={styles.dropdownLogoutIcon} aria-hidden="true" />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  triggerButton: `
    flex items-center gap-3 px-3 py-2 rounded-lg
    hover:bg-slate-dark/60 hover:text-parchment-white
    focus:outline-none focus:ring-2 focus:ring-royal-purple focus:ring-offset-2 focus:ring-offset-midnight-blue
    transition-colors duration-200
  `,
  userInfo: 'flex items-center gap-3',
  avatar:
    'w-8 h-8 rounded-full bg-royal-purple flex items-center justify-center overflow-hidden',
  avatarImage: 'w-full h-full object-cover',
  avatarIcon: 'w-5 h-5 text-parchment-white',
  userName: 'text-sm font-medium text-mist-gray hidden sm:block',
  chevron: 'w-4 h-4 text-mist-gray transition-transform duration-200',
  chevronRotated: 'rotate-180',
  dropdown: `
    absolute right-0 top-full mt-2 w-64 bg-slate-dark
    rounded-2xl shadow-2xl border border-mist-gray/20
    py-2 z-50
  `,
  dropdownHeader: 'flex items-center gap-3 px-4 py-3',
  dropdownAvatar:
    'w-10 h-10 rounded-full bg-royal-purple flex items-center justify-center overflow-hidden',
  dropdownAvatarImage: 'w-full h-full object-cover',
  dropdownAvatarIcon: 'w-6 h-6 text-parchment-white',
  dropdownUserInfo: 'flex flex-col',
  dropdownUserName: 'text-sm font-medium text-parchment-white',
  dropdownUserEmail: 'text-xs text-mist-gray',
  dropdownDivider: 'border-t border-mist-gray/20 my-2',
  dropdownLink: `
    flex items-center gap-3 w-full px-4 py-2 text-sm text-mist-gray
    hover:bg-midnight-blue/40 hover:text-parchment-white transition-colors duration-200
    focus:outline-none focus:bg-midnight-blue/40 focus:text-parchment-white
  `,
  dropdownLinkIcon: 'w-4 h-4',
  dropdownLogoutButton: `
    flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 cursor-pointer
    hover:bg-red-900/20 hover:text-red-300 transition-colors duration-200
    focus:outline-none focus:bg-red-900/20 focus:text-red-300
  `,
  dropdownLogoutIcon: 'w-4 h-4',
};
