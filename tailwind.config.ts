import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#FDFBF7",
          dark: "#121824",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1A2333",
        },
        ink: {
          primary: "#1F2421",
          secondary: "#635F59",
          darkPrimary: "#F1F5F9",
          darkSecondary: "#94A3B8",
        },
        storybook: {
          coral: "#D9532F",
          coralHover: "#C24321",
          mint: "#3A7D6B",
          mintLight: "#EBF5F1",
          amber: "#E5A93C",
          amberLight: "#FEF9EE",
          border: "#EFE9DF",
          borderDark: "#2D3748",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
