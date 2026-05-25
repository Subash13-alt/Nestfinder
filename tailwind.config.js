/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        card: '#ffffff',
        'card-foreground': '#0a0a0a',
        primary: '#1a1a1a',
        'primary-foreground': '#ffffff',
        secondary: '#f5f5f5',
        'secondary-foreground': '#1a1a1a',
        muted: '#f5f5f5',
        'muted-foreground': '#737373',
        accent: '#e11d48',
        'accent-foreground': '#ffffff',
        'accent-strong': '#be123c',
        border: '#e5e5e5',
        hero: '#1a1a1a',
        'hero-foreground': '#ffffff',
        success: '#10b981',
        'success-foreground': '#ffffff',
        warning: '#f59e0b',
        'warning-foreground': '#ffffff',
        'surface-glass': 'rgba(255, 255, 255, 0.9)',
        'surface-warm': '#faf9f6',
      },
      fontFamily: {
        display: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        soft: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        nav: '0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'nest-rise': 'nest-rise 650ms ease-out both',
        'nav-pop': 'nav-pop 320ms ease-out',
      },
      keyframes: {
        'nest-rise': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'nav-pop': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
