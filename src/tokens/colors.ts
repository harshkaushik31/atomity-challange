export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    bgCard: "var(--color-bg-card)",
    bgHexagonMuted: "var(--color-bg-hexagon-muted)",

    textPrimary: "var(--color-text-primary)",
    textMuted: "var(--color-text-muted)",

    accentPrimary: "var(--color-accent-primary)",
    accentPrimaryLight: "var(--color-accent-primary-light)",

    borderPrimary: "var(--color-border-primary)",
  },
  spacing: {
    xs: "var(--space-xs)",
    sm: "var(--space-sm)",
    md: "var(--space-md)",
    lg: "var(--space-lg)",
    xl: "var(--space-xl)",
    "2xl": "var(--space-2xl)",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    full: "var(--radius-full)",
  },
  font: {
    sans: "var(--font-sans)",
  },
} as const;