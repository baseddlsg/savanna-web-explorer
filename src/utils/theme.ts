
/**
 * Savanna theme configuration
 */
export const theme = {
  colors: {
    amber: "#F59E0B",
    brown: "#78350F",
    green: "#65A30D",
    sand: "#FEFCE8",
    stone: "#44403C",
    wheat: "#F5F5F4",
    night: "#1C1917",
  },
  spacing: {
    navbarHeight: "4rem",
    sidebarWidth: "16rem",
    sidebarCollapsedWidth: "4rem",
    contentMaxWidth: "1200px",
  },
  transitions: {
    default: "all 0.3s ease",
  },
};

/**
 * Type definitions for theme
 */
export type Theme = typeof theme;
