import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          subtle: "var(--color-primary-subtle)",
          panel: "var(--color-primary-panel)",
          border: "var(--color-primary-panel-border)",
          muted: "var(--color-primary-muted)",
          foreground: "var(--color-primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          subtle: "var(--color-secondary-subtle)",
          foreground: "var(--color-secondary-foreground)"
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          subtle: "var(--color-accent-subtle)",
          foreground: "var(--color-accent-foreground)"
        },
        background: {
          DEFAULT: "var(--color-background)",
          secondary: "var(--color-background-secondary)"
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          secondary: "var(--color-surface-secondary)",
          input: "var(--color-surface-input)"
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)"
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)"
        },
        success: {
          DEFAULT: "var(--color-success)",
          subtle: "var(--color-success-subtle)"
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          subtle: "var(--color-warning-subtle)"
        },
        error: {
          DEFAULT: "var(--color-error)",
          subtle: "var(--color-error-subtle)"
        },
        ad: {
          DEFAULT: "var(--color-ad-surface)",
          border: "var(--color-ad-border)"
        }
      },
      boxShadow: {
        halo: "0 28px 90px rgba(16, 42, 40, 0.12)",
        panel: "0 20px 48px rgba(16, 42, 40, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
