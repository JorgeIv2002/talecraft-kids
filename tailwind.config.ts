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
          light: "#FAF7F2",
          dark: "#141624",
        },
        surface: {
          light: "#FFFFFF",
          warm: "#FFFDF9",
          dark: "#1E2238",
        },
        ink: {
          primary: "#2D231B",
          secondary: "#6E6259",
          darkPrimary: "#F8F6F0",
          darkSecondary: "#A5A096",
        },
        storybook: {
          coral: "#FF6B4A",
          coralDark: "#D94524",
          coralLight: "#FFF0EB",
          amber: "#FBBF24",
          amberDark: "#D97706",
          amberLight: "#FEF9EE",
          mint: "#10B981",
          mintDark: "#059669",
          mintLight: "#ECFDF5",
          lavender: "#8B5CF6",
          sky: "#38BDF8",
          skyLight: "#F0F9FF",
          border: "#EFE6DA",
          borderDark: "#2F3550",
        },
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "cursive", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
      },
      boxShadow: {
        storybook: "0 8px 30px -4px rgba(45, 35, 27, 0.08)",
        "storybook-hover": "0 14px 35px -4px rgba(45, 35, 27, 0.12)",
        "toy-coral": "0 4px 0 0 #D94524",
        "toy-amber": "0 4px 0 0 #B45309",
        "toy-mint": "0 4px 0 0 #047857",
        "toy-night": "0 4px 0 0 #181D2E",
      },
    },
  },
  plugins: [],
};

export default config;
