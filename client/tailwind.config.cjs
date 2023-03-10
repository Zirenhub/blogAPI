/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#303030',
        third: '#CCD6A6',
        text: '#ffff38',
        background: '#FFFBE9',
        dimWhite: 'rgba(255, 255, 255, 0.8)',
      },
      fontFamily: {
        fira: ['"Fira Sans"', 'sans-serif'],
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '6xl': '4.632rem',
        '7xl': '5.232rem',
        '8xl': '6.132rem',
      },
      maxWidth: {
        sidebar: '15rem',
      },
      minWidth: {
        comment: '30rem',
      },
      backgroundImage: {
        profilePic: "url('/images/Default_pfp.svg')",
      },
    },
  },
  plugins: [],
};
