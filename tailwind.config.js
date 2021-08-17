const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        /* Hide scrollbar for Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      };

      addUtilities(newUtilities);
    }),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: "#1DA1F2",
        darkblue: "#2795D9",
        lightblue: "#EFF9FF",
        dark: "#657786",
        light: "#AAB8C2",
        lighter: "#E1E8ED",
        lightest: "#F5F8FA",
      },
    },
  },
  variants: {
    extend: {},
  },
};
