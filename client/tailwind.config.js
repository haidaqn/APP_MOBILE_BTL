// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      flex: {
        1: '1 1 0%',
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
        9: '9 9 0%',
        10: '10 10 0%',
        11: '11 11 0%',
        12: '12 12 0%',
        13: '13 13 0%',
        14: '14 14 0%',
        15: '15 15 0%'
      },
      colors: {
        greenCustom: '#00AC76',
        redCustom: '#C04345',
        blueCustom: '#0043F9',
        backgroundLight: '#F0F0F3',
        backgroundMedium: '#B9B9B9',
        backgroundDark: '#777777'
      }
    }
  },
  plugins: []
};
