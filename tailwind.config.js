/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karla: 'karla',
      },
      fontSize: {
        label: '16px',
      },
      colors: {
        'form-green-1': '#dff0e7',
        'form-green-2': '#0c7d68',
        'form-red': '#d73c3c',
        'form-grey-1': '#86a2a6',
        'form-grey-2': '#2a4245',
      },
      width: {
        form: '480px',
      },
    },
  },
  plugins: [],
}
