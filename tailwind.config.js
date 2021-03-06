module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', 'sans-serif']
      },
      colors: {
        brand: {
          primary: {
            400: '#5c77f0',
            500: '#4361ee',
            600: '#2d50eb'
          },
          success: {
            500: '#09f683'
          },
          info: {
            200: '#d9f4fc',
            300: '#aae6f8',
            400: '#7bd8f4',
            500: '#4cc9f0'
          },
          warn: {
            500: '#f7b926'
          },
          danger: {
            400: '#f958a0',
            500: '#f72585',
            600: '#e2086a'
          }
        }
      }
    }
  },
  plugins: []
}
