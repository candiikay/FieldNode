// Global Terminal Component Styles
// Reusable styles for all terminal-like components
// Now using token-based design system

import { tokens } from '../theme/tokens';

export const terminalStyles = {
  // Main terminal frame
  frameWrap: {
    background: tokens.color.bg.canvas,
    border: `1px solid ${tokens.color.divider}`,
    borderRadius: tokens.radius.lg,
    padding: `${tokens.spacing['3xl']} ${tokens.spacing['2xl']}`,
    width: '100%',
    maxWidth: '960px',
    margin: `${tokens.spacing['3xl']} auto`,
    boxShadow: tokens.shadow.soft,
  },
  
  frame: {
    width: '100%',
    maxWidth: '80ch',
    fontFamily: tokens.typography.family.mono,
    fontWeight: tokens.typography.weight.normal,
  },
  
  // Terminal output
  output: {
    whiteSpace: "pre-wrap" as const,
    lineHeight: tokens.typography.lineHeight.relaxed,
    letterSpacing: "0.15px",
    fontSize: tokens.typography.size.lg,
    marginBottom: tokens.spacing.sm,
  },
  
  // Text styles
  hero: {
    color: tokens.color.text.primary,
    display: "block",
    margin: `${tokens.spacing.xs} 0`,
    fontSize: tokens.typography.size.lg,
  },
  
  header: {
    color: tokens.color.field.lilac,
    fontSize: tokens.typography.size.lg,
    marginBottom: tokens.spacing.md,
  },
  
  cmdHint: {
    color: tokens.color.field.magenta,
    fontSize: tokens.typography.size.lg,
    marginTop: tokens.spacing.sm,
    display: "block",
  },
  
  // Prompt row
  promptRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  
  promptInputWrap: {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
  },
  
  promptCaret: {
    color: tokens.color.field.magenta,
    borderRight: `2px solid ${tokens.color.field.magenta}`,
    display: "inline-block",
    height: "1.4em",
    marginLeft: tokens.spacing.xs,
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
    color: `${tokens.color.field.magenta}66`,
    pointerEvents: "none" as const,
    whiteSpace: "pre" as const,
  },
  
  promptInput: {
    position: "relative",
    width: "38ch",
    background: "transparent",
    border: "none",
    outline: "none",
    color: tokens.color.text.primary,
    font: "inherit",
    fontSize: tokens.typography.size.lg,
    caretColor: tokens.color.field.magenta,
    textShadow: `0 0 6px ${tokens.color.field.lilac}44`,
  } as React.CSSProperties,
  
  // Section buttons
  sectionList: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: tokens.spacing.sm,
    margin: `${tokens.spacing.lg} 0`,
  },
  
  sectionButton: {
    background: 'transparent',
    border: `1px solid ${tokens.color.field.lilac}`,
    borderRadius: tokens.radius.base,
    color: tokens.color.field.lilac,
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    fontFamily: tokens.typography.family.mono,
    fontSize: tokens.typography.size.sm,
    cursor: 'pointer',
    transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  
  sectionButtonActive: {
    background: tokens.color.field.magenta,
    border: `1px solid ${tokens.color.field.magenta}`,
    borderRadius: tokens.radius.base,
    color: tokens.color.bg.canvas,
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    fontFamily: tokens.typography.family.mono,
    fontSize: tokens.typography.size.sm,
    cursor: 'pointer',
    transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
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
    background: ${tokens.color.bg.canvas};
    overflow-x: hidden;
    font-family: ${tokens.typography.family.mono};
  }
  
  * {
    box-sizing: border-box;
  }
  
  .terminal-container {
    min-height: 100dvh;
    background: ${tokens.color.bg.canvas};
    color: ${tokens.color.text.primary};
    font-family: ${tokens.typography.family.mono};
    padding: ${tokens.spacing['3xl']} ${tokens.spacing.lg};
  }
`;
