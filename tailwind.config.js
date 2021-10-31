module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        25: "6.25rem",
        26: "6.5rem",
        100: "25rem",
        164: "41rem",
        178: "44.5rem",
        179: "44.75rem",
        192: "48rem",
      },
      scale: {
        300: "3",
      },
      animation: {
        "bounce-one": "bounce 0.5s linear 1",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      blur: ["hover", "group-hover"],
      margin: ["group-hover"],
      inset: ["group-hover"],
      translate: ["group-hover"],
    },
  },
  plugins: [],
};
