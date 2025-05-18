/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nord)'],
      },
      // Typography Scale
      fontSize: {
        xl: '1.25rem',    /* 20px */
        '2xl': '1.5rem',  /* 24px */
        '3xl': '2rem',    /* 32px */
        '4xl': '2.5rem',  /* 40px */
      },
      // Spacing Scale
      spacing: {
        4: '1rem',    /* 16px */
        8: '2rem',    /* 32px */
        18: '4.5rem', /* 72px */
        28: '7rem',   /* 112px */
      },
      colors: {
        // Semantic color tokens
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          light: 'var(--color-neutral-light)',
          dark: 'var(--color-neutral-dark)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        'on-dark': 'var(--color-on-dark)',
        
        // State colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      backgroundImage: {
        // Hero gradient
        'gradient-hero': 'linear-gradient(to bottom, #000 0%, #0a0e1a 50%, #000 100%)',
        
        // Additional gradients
        'gradient-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
        'gradient-accent': 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
      },
    },
  },
  plugins: [],
} 