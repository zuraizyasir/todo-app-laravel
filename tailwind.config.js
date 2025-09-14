/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}', // Scans all Vue, JS, and TS files in src folder
    ],
    theme: {
      extend: {}, // Add custom theme configurations here if needed
    },
    plugins: [], // Add Tailwind plugins here if needed
  };