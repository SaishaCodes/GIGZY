/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors - Dark background
        dark: {
          900: '#0a0f14',
          800: '#0f1419',
          700: '#151c24',
          600: '#1c252f',
          500: '#242e3a',
          400: '#2f3b4a',
          300: '#3d4a5c',
        },
        // Turquoise - Primary accent
        turquoise: {
          50: '#e6fcf7',
          100: '#b3f5e6',
          200: '#80edd5',
          300: '#4de5c4',
          400: '#26deb6',
          500: '#00d4a8',
          600: '#00c49b',
          700: '#00a880',
          800: '#008b6a',
          900: '#006e54',
        },
        // Seeker Mode - Blue theme
        seeker: {
          50: '#e6f0ff',
          100: '#b3d4ff',
          200: '#80b8ff',
          300: '#4d9cff',
          400: '#2680ff',
          500: '#0066ff',
          600: '#005be6',
          700: '#004dcc',
          800: '#0040b3',
          900: '#003399',
        },
        // Provider Mode - Green theme
        provider: {
          50: '#e6fff0',
          100: '#b3ffd6',
          200: '#80ffbc',
          300: '#4dffa2',
          400: '#26ff8c',
          500: '#00ff75',
          600: '#00e66a',
          700: '#00cc5e',
          800: '#00b352',
          900: '#009946',
        },
        // Status colors
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
        // Trust score gradient
        trust: {
          low: '#ef4444',
          medium: '#f59e0b',
          high: '#10b981',
          excellent: '#00d4a8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        // 8pt spacing system
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
      },
      borderRadius: {
        'card': '14px',
        'button': '12px',
        'input': '10px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.25)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glow-turquoise': '0 0 20px rgba(0, 212, 168, 0.3)',
        'glow-seeker': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-provider': '0 0 20px rgba(0, 255, 117, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 168, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 168, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#e5e7eb',
            a: { color: '#00d4a8' },
          },
        },
      },
    },
  },
  plugins: [],
}