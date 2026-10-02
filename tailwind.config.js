export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: '#0B2147',
        gold: '#DDB665',
        paper: '#F2F2EE',
        ink: '#12172B',
        royal: '#0A4595',
        muted: '#6B6F7B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        label: ['Rubik', 'system-ui', 'sans-serif'],
        body: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
};
