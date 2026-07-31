/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'm3-display': ['3.5625rem', { lineHeight: '4rem', fontWeight: '400', letterSpacing: '-0.25px' }],
        'm3-headline': ['2rem', { lineHeight: '2.5rem', fontWeight: '500', letterSpacing: '0' }],
        'm3-title': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '500', letterSpacing: '0' }],
        'm3-body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400', letterSpacing: '0.5px' }],
        'm3-label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500', letterSpacing: '0.5px' }],
      },
      colors: {
        primary: {
          0: '#000000', 10: '#001F33', 20: '#003554', 30: '#004D76',
          40: '#006599', 50: '#007FB8', 60: '#1A99D6', 70: '#4DB3E8',
          80: '#80CCF2', 90: '#B3E0F7', 95: '#D9EFFB', 99: '#F0F8FD', 100: '#FFFFFF',
        },
        secondary: {
          10: '#1A2B3C', 20: '#2F4152', 30: '#455869', 40: '#5C6F81',
          50: '#75889A', 60: '#8FA2B3', 80: '#C5D3E0', 90: '#E1E9F0',
        },
        tertiary: { 10: '#2A1A00', 30: '#6B4D1A', 50: '#A67A33', 70: '#D4A95C', 90: '#F5DEB3' },
        error: { 40: '#BA1A1A', 80: '#FFB4AB' },
        surface: {
          DEFAULT: '#FAFBFD', dim: '#F0F2F5', bright: '#FFFFFF',
          container: '#EEF1F5', 'container-high': '#E8EBEF',
        },
        outline: { DEFAULT: '#73777F', variant: '#C3C7CE' },
      },
      boxShadow: {
        'm3-1': '0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 1px rgba(0,0,0,0.05)',
        'm3-2': '0 1px 2px 0 rgba(0,0,0,0.08), 0 2px 6px 2px rgba(0,0,0,0.05)',
        'm3-3': '0 4px 8px 3px rgba(0,0,0,0.08), 0 1px 3px 0 rgba(0,0,0,0.06)',
        'm3-4': '0 6px 10px 4px rgba(0,0,0,0.08), 0 2px 3px 0 rgba(0,0,0,0.06)',
        'm3-5': '0 12px 17px 2px rgba(0,0,0,0.08), 0 5px 22px 4px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'm3-sm': '0.5rem', 'm3-md': '0.75rem', 'm3-lg': '1rem',
        'm3-xl': '1.5rem', 'm3-full': '9999px',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Roboto Flex"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
