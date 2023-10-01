/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem",
      },

      colors: {
        primary: "#37B6FF",
        disabledPrimary: "#69C0FF",
        secondary: "#FE66C4",
        "neutral-dark-gray": "#9C9CA4",
        "neutral-gray": "#DBDBDB",
        "neutral-black": "#141522",
      },
      lineHeight: {
        7.5: "1.875rem",
        3.5: "0.9375rem",
      },
      spacing: {
        4.5: "1.125rem",
      },
      width: {
        67.5: "16.875rem",
        556: "34.75rem",
      },
      height: {
        45: "11.25rem",
      },
      borderRadius: {
        10: "0.625rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};
