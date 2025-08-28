import { createTheme, type MantineThemeOverride } from "@mantine/core";

const themeOverrides: MantineThemeOverride = createTheme({
  colors: {
    primary: [
      "#f1f1ff",
      "#e0dff2",
      "#bfbdde",
      "#9b98ca",
      "#7d79b9",
      "#6a66af",
      "#605cac",
      "#504c97",
      "#464388",
      "#3b3979",
    ],
    grayscale: [
      "#ffffff", // 0 - white
      "#d9d9d9", // 1
      "#bfbfbf", // 2
      "#a6a6a6", // 3
      "#8c8c8c", // 4
      "#737373", // 5
      "#595959", // 6
      "#404040", // 7
      "#262626", // 8
      "#000000", // 9 - black
    ],
  },
  fontFamily: "Lato",
  fontFamilyMonospace: "Lato",
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
  headings: {
    fontFamily: "Lato",
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: "36px",
        lineHeight: "48px",
      },
      h2: {
        fontSize: "24px",
        lineHeight: "32px",
      },
      h3: {
        fontSize: "20px",
        lineHeight: "24px",
      },
      h4: {
        fontSize: "16px",
        lineHeight: "24px",
      },
    },
  },
  primaryColor: "primary",
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  components: {
    Table: {
      styles: {
        th: {
          color: "var(--mantine-color-primary-9)",
          fontWeight: 700,
          fontSize: "18px",
          padding: "12px 24px",
        },
        td: {
          fontSize: "16px",
          padding: "12px 24px",
          color: "var(--mantine-color-primary-9)",
          fontWeight: 500,
        },
      },
    },
  },
});

export default themeOverrides;
