// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#fef7ee',
//           100: '#fdedd3',
//           200: '#f9d7a6',
//           300: '#f5ba6e',
//           400: '#f09333',
//           500: '#ec7a0e',
//           600: '#dd6109',
//           700: '#b7490b',
//           800: '#923a10',
//           900: '#763110',
//           950: '#401706',
//         },
//         navy: {
//           50: '#f0f3f9',
//           100: '#dae1ed',
//           200: '#bcc8de',
//           300: '#8f9ebe',
//           400: '#6c7ba3',
//           500: '#54618a',
//           600: '#414b72',
//           700: '#373e5d',
//           800: '#2a3046',
//           900: '#1c2132',
//           950: '#121620',
//         },
//         gold: {
//           50: '#fefce8',
//           100: '#fef9c3',
//           200: '#fef08a',
//           300: '#fde047',
//           400: '#facc15',
//           500: '#d4a017',
//           600: '#b8860b',
//           700: '#8b6914',
//           800: '#6d5511',
//           900: '#4a3a0b',
//         }
//       },
//       fontFamily: {
//         sans: ['var(--font-dana)', 'var(--font-vazir)', 'system-ui', 'sans-serif'],
//         display: ['var(--font-dana)', 'var(--font-vazir)', 'system-ui', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#f9d7a6',
          300: '#f5ba6e',
          400: '#f09333',
          500: '#ec7a0e',
          600: '#dd6109',
          700: '#b7490b',
          800: '#923a10',
          900: '#763110',
          950: '#401706',
        },
        navy: {
          50: '#f0f3f9',
          100: '#dae1ed',
          200: '#bcc8de',
          300: '#8f9ebe',
          400: '#6c7ba3',
          500: '#54618a',
          600: '#414b72',
          700: '#373e5d',
          800: '#2a3046',
          900: '#1c2132',
          950: '#121620',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4a017',
          600: '#b8860b',
          700: '#8b6914',
          800: '#6d5511',
          900: '#4a3a0b',
        },
        accent: {
          red: '#dc2626',
          orange: '#ea580c',
          amber: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(236, 122, 14, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(236, 122, 14, 0.1) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(28, 33, 50, 0.8) 0%, rgba(18, 22, 32, 0.9) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;