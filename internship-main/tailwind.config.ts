import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    animation: {
      'spin-slow': 'spin 4s linear infinite',
      'spin-slow-reverse': 'spin 4s linear infinite reverse',
      'spin-slow-2s': 'spin 2s linear infinite',
      'spin-slow-reverse-2s': 'spin 2s linear infinite reverse',
      spin: 'spin 1s linear infinite',
      bounce: 'bounce 1s infinite',
    },
    extend: {
      colors: {
        'deep-sapphire': '#002060',
        'light-purple': '#CC96F6',
        'dark-blue-violet': '#430673',
        'pale-cyan': '#99FFFF',
        'bubblegum-pink': '#FF8DDD',
        'lavender-blush': '#EBD5FD',
        'oxford-blue': '#001F54',
        'dark-cerulean': '#082567',
        'alice-blue': '#F5F9FC',
        'bright-gray': '#E6EEF4',
        'corn-flower-blue': '#84ABE4',
        'medium-orchid': '#CC66BB',
      },
    },
  },
  plugins: [],
  corePlugins: {
    aspectRatio: true,
  },
};

export default config;
