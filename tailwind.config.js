/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1220px',
      '2xl': '1440px',
      '3xl': '1700px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        primary: '#58ad53',
        secondary: '#e9ffd3',
        primaryButtonColor: '#32832e',
        black: {
          DEFAULT: '#000',
          100: '#0D1117',
          200: '#161B22',
          300: '#1F2428',
          400: '#242C38',
        },
        grey: {
          100: '#f5f7f8',
          200: '#55616D',
          300: '#f6f6f6',
        },
        white: {
          DEFAULT: '#FFF',
          400: '#A3B3BC',
          500: '#A4B8D5',
          800: '#D0DFFF',
        },
        purple: '#8C7CFF',
        pink: '#ED5FBD',
        violet: '#F16565',
        orange: '#FF964B',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(+100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'roll-in': {
          '0%': { transform: 'translateY(-200%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '75%': { opacity: '0.7' },
          '95%': { opacity: '1' },
          '100%': { transform: 'translateY(0)' },
        },
        'roll-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '25%': { opacity: '0.7' },
          '75%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-200%)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1s ease-in-out forwards',
        'fade-out': 'fade-out 1s ease-in-out forwards',
        'slide-in': 'slide-in 1s ease-in-out forwards',
        'roll-in': 'roll-in 1s ease-in-out forwards',
        'roll-out': 'roll-out 1s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/aspect-ratio')],
};
