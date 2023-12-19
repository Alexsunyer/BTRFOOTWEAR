const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#000000',
      gray: {
        '51': '#515966',
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },
    extend: {
      fontSize: {
        '14': '14px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked', 'disabled'],
      borderColor: ['checked', 'odd', 'even', 'disabled'],
      borderWidth: ['odd', 'even'],
      borderRadius: ['first', 'last'],
      margin: ['first', 'odd', 'even'],
      textColor: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addBase, theme }) {
      addBase({
        'html': {fontSize: theme('fontSize.14'), color: theme('colors.gray.51'), letterSpacing: '0.2px'},
      })
    })
  ]
}