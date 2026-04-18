import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1324",
        slate: "#10182b",
        mist: "#d9e7ff",
        sand: "#fbf6eb",
        glow: "#75e6da",
        accent: "#f59e0b",
        danger: "#f97316"
      },
      boxShadow: {
        halo: "0 24px 80px rgba(4, 12, 27, 0.16)",
        panel: "0 20px 48px rgba(8, 15, 30, 0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(117, 230, 218, 0.18), transparent 36%), linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,248,255,0.78))"
      }
    }
  },
  plugins: []
};

export default config;
