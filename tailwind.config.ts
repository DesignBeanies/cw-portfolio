import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        "neon-pink": "var(--neon-pink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        nav: "var(--nav-width)",
        "mobile-nav": "var(--mobile-nav-height)",
      },
      maxWidth: {
        content: "56rem",
      },
      scrollMargin: {
        "mobile-nav": "calc(var(--mobile-nav-height) + 1rem)",
      },
      animation: {
        "neon-pulse": "neon-pulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
