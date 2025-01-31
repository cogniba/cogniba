import defaultTheme from "tailwindcss/defaultTheme";
import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
        position: "top, right, bottom, left",
        size: "width, height",
        "bounding-box": "top, right, bottom, left, width, height",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-x-infinite": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-x": "gradient-x 3s linear infinite",
        "gradient-x-infinite": "gradient-x-infinite 3s linear infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "rgb(var(--success))",
          foreground: "rgb(var(--success-foreground))",
        },
        link: "rgb(var(--link))",
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        chart: {
          "1": "rgb(var(--chart-1))",
          "2": "rgb(var(--chart-2))",
          "3": "rgb(var(--chart-3))",
          "4": "rgb(var(--chart-4))",
          "5": "rgb(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        red: {
          DEFAULT: "rgb(var(--red))",
        },
        orange: {
          DEFAULT: "rgb(var(--orange))",
        },
        amber: {
          DEFAULT: "rgb(var(--amber))",
        },
        yellow: {
          DEFAULT: "rgb(var(--yellow))",
        },
        lime: {
          DEFAULT: "rgb(var(--lime))",
        },
        green: {
          DEFAULT: "rgb(var(--green))",
        },
        emerald: {
          DEFAULT: "rgb(var(--emerald))",
        },
        teal: {
          DEFAULT: "rgb(var(--teal))",
        },
        cyan: {
          DEFAULT: "rgb(var(--cyan))",
        },
        sky: {
          DEFAULT: "rgb(var(--sky))",
        },
        blue: {
          DEFAULT: "rgb(var(--blue))",
        },
        indigo: {
          DEFAULT: "rgb(var(--indigo))",
        },
        violet: {
          DEFAULT: "rgb(var(--violet))",
        },
        purple: {
          DEFAULT: "rgb(var(--purple))",
        },
        fuchsia: {
          DEFAULT: "rgb(var(--fuchsia))",
        },
        pink: {
          DEFAULT: "rgb(var(--pink))",
        },
        rose: {
          DEFAULT: "rgb(var(--rose))",
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
