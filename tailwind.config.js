const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Now we build the full color palette, using all colors available
        // as shown at this link: https://tailwindcss.com/docs/customizing-colors#color-palette-reference
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        orange: colors.orange
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      pointerEvents: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
