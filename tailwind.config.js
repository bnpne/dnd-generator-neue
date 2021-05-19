module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      main: ['"iA Writer"'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
