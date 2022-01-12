const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Now we build the full color palette, using all colors available
        // as shown at this link: https://tailwindcss.com/docs/customizing-colors#color-palette-reference
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        bluegray: colors.slate,
        coolgray: colors.coolgray,
        gray: colors.gray,
        truegray: colors.neutral,
        warmgray: colors.stone,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
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
