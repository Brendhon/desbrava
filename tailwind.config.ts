import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Explorer's Diary" palette for Desbrava project
        'midnight-blue': '#0D1B2A',      // Midnight Blue - Main background
        'slate-dark': '#1B263B',         // Dark Slate - Card and modal background
        'parchment-white': '#E0E1DD',    // Parchment White - Main text and titles
        'mist-gray': '#A9B4C2',          // Mist Gray - Secondary text and icons
        'royal-purple': '#8443A4',      // Royal Purple - Highlights, buttons, and links
        
        // Semantic aliases for easier usage
        'primary': '#0D1B2A',
        'secondary': '#1B263B',
        'accent': '#8443A4',
        'text-primary': '#E0E1DD',
        'text-secondary': '#A9B4C2',
      },
    },
  },
  plugins: [],
}

export default config
