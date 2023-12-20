const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        red:{
          DEFAULT: '#ff0000',
        },
        blue: {
          DEFAULT: '#556EE6',
        },
        purple: {
          DEFAULT: '#6B21A8',
        },        
      },
    },
    fontSize: {
      8: ['8px', '14px'],
      10: ['10px', '18px'],
      12: ['12px', '18px'],
      14: ['14px', '20px'],
      16: ['16px', '24px'],
      18: ['18px', '26px'],
      20: ['20px', '28px'],
      22: ['22px', '34px'],
      24: ['24px', '36px'],
      28: ['28px', '36px'],
      32: ['32px', '40px'],
      36: ['36px', '40px'],
      40: ['40px', '50px'],
      48: ['48px', '50px'],
      56: ['56px', '60px'],
      64: ['64px', '70px'],
      72: ['72px', '80px'],
      80: ['80px', '85px'],
      90: ['90px', '95px'],
      100: ['100px', '105px'],
      110: ['110px', '115px'],
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  variants: {
    extend: {},
    fontWeight: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
}
