// Global Terminal Component Styles
// Reusable styles for all terminal-like components

import { palette, typography, spacing, borderRadius, shadows, transitions } from '../theme';

export const terminalStyles = {
  // Main terminal frame
  frameWrap: {
    background: '#0b0b0d',
    border: '1px solid #222',
    borderRadius: borderRadius.lg,
    padding: `${spacing['3xl']} ${spacing['4xl']}`,
    width: 'fit-content',
    margin: `${spacing['5xl']} auto`,
    boxShadow: shadows.lg,
  },
  
  frame: {
    maxWidth: "64ch",
    fontFamily: typography.mono,
    fontWeight: typography.normal,
  },
  
  // Terminal output
  output: {
    whiteSpace: "pre-wrap" as const,
    lineHeight: typography.relaxed,
    letterSpacing: "0.15px",
    fontSize: typography.lg,
    marginBottom: spacing.sm,
  },
  
  // Text styles
  hero: {
    color: palette.ink,
    display: "block",
    margin: `${spacing.xs} 0`,
    fontSize: typography.lg,
  },
  
  header: {
    color: palette.lilac,
    fontSize: typography.lg,
    marginBottom: spacing.md,
  },
  
  cmdHint: {
    color: palette.magenta,
    fontSize: typography.lg,
    marginTop: spacing.sm,
    display: "block",
  },
  
  // Prompt row
  promptRow: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  
  promptInputWrap: {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
  },
  
  promptCaret: {
    color: palette.magenta,
    borderRight: `2px solid ${palette.magenta}`,
    display: "inline-block",
    height: "1.4em",
    marginLeft: spacing.xs,
    marginRight: "2px",
    width: 0,
    pointerEvents: "none" as const,
    animation: "blink 1.4s ease-in-out infinite",
  },
  
  promptSuggestion: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    font: "inherit",
    color: `${palette.magenta}66`,
    pointerEvents: "none" as const,
    whiteSpace: "pre" as const,
  },
  
  promptInput: {
    position: "relative",
    width: "38ch",
    background: "transparent",
    border: "none",
    outline: "none",
    color: palette.ink,
    font: "inherit",
    fontSize: typography.lg,
    caretColor: palette.magenta,
    textShadow: `0 0 6px ${palette.lilac}44`,
  } as React.CSSProperties,
  
  // Section buttons
  sectionList: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: spacing.sm,
    margin: `${spacing.lg} 0`,
  },
  
  sectionButton: {
    background: 'transparent',
    border: `1px solid ${palette.lilac}`,
    borderRadius: borderRadius.md,
    color: palette.lilac,
    padding: `${spacing.sm} ${spacing.md}`,
    fontFamily: typography.mono,
    fontSize: typography.sm,
    cursor: 'pointer',
    transition: transitions.normal,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  
  sectionButtonActive: {
    background: palette.magenta,
    border: `1px solid ${palette.magenta}`,
    borderRadius: borderRadius.md,
    color: palette.bg,
    padding: `${spacing.sm} ${spacing.md}`,
    fontFamily: typography.mono,
    fontSize: typography.sm,
    cursor: 'pointer',
    transition: transitions.normal,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
};

// Global CSS animations and base styles
export const globalStyles = `
  @keyframes blink { 
    0% { opacity: 0.2 } 
    50% { opacity: 1 } 
    100% { opacity: 0.2 } 
  }
  
  body, html {
    margin: 0;
    padding: 0;
    background: ${palette.bg};
    overflow-x: hidden;
    font-family: ${typography.mono};
  }
  
  * {
    box-sizing: border-box;
  }
  
  .terminal-container {
    min-height: 100dvh;
    background: ${palette.bg};
    color: ${palette.ink};
    font-family: ${typography.mono};
    padding: ${spacing['3xl']} ${spacing.lg};
  }
`;
