/** Tailwind config placeholder — will be replaced with the config you provide. */
module.exports = {
  content: [
    "./**/*.{html,md,liquid}",
    "./_includes/**/*.{html,liquid}",
    "./_layouts/**/*.{html,liquid}",
    "./_*/*.{md}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--ink) / 0.02)",
        ink: "rgb(var(--ink))",
        offwhite: "var(--color-background-offwhite)",
        border: "rgba(0,0,0,0.12)",
        accent: "var(--color-pink-light)"
      },
      boxShadow: {
        soft: "0 2px 6px rgba(101,79,132,0.12)",
        card: "0 4px 10px rgba(101,79,132,0.10), 0 1px 3px rgba(101,79,132,0.14)"
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite'
      },
      fontFamily: {
        brand: ["var(--font-brand)", "serif"],
        body: ["var(--font-body)", "system-ui"]
      }
    }
  },
  plugins: []
};


