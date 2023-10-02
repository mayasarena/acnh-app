/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    dropShadow: {
      'btn': '0px 3px 0px #45C480',
    },
    colors: {
      'bubble-gum': '#ff77e9',
      'white': '#fff',
      'black': '#000',
      'cream': '#F4F1E2',
      'darkcream': '#EEE9D2',
      'lightcream': '#F9F8F0',
      'green': '#82D7A9',
      'lightgreen': '#C1EBD5',
      'darkgreen': '#45C480',
      'blue': '#12C5B6',
      'lightblue': '#8ED2C8',
      'brown': '#524642',
      'yellow': '#FDCB4D',
      'lightgray': '#b0b0b0',
    },
  },
  plugins: [],
}

