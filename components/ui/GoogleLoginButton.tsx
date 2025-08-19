import Image from 'next/image';

interface GoogleLoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function GoogleLoginButton({ onClick, isLoading = false }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={styles.button}
      type="button"
    >
      <div className={styles.iconContainer}>
        <Image
          src="/images/google-icon.jpg"
          alt="Google"
          width={20}
          height={20}
          className={styles.icon}
        />
      </div>
      <span className={styles.text}>
        {isLoading ? 'Entrando...' : 'Entrar com Google'}
      </span>
    </button>
  );
}

const styles = {
  button: `
    flex items-center justify-center gap-3 cursor-pointer
    w-full max-w-sm px-6 py-3 
    bg-white text-gray-700 
    rounded-lg shadow-md border border-mist-gray/20
    hover:shadow-lg hover:bg-parchment-white/98
    transition-all duration-200 
    active:scale-95 
    disabled:opacity-50 
    disabled:cursor-not-allowed
    focus:outline-none 
    focus:ring-2 
    focus:ring-royal-purple/20
  `,
  iconContainer: "flex-shrink-0",
  icon: "rounded-sm",
  text: "font-medium text-sm",
};
