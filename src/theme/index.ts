// Global Theme System for Field Nodes
// Centralized colors, typography, spacing, and component styles

export const darkTheme = {
  // Core colors - Dark mode
  bg: '#0f0f0f',
  ink: '#d4d4d4',
  accent: '#9f8f7f',
  command: '#d4d4d4',
  description: '#888888',
  muted: '#666666',
  tagline: '#a8a8a8',

  // Terminal window
  terminalBg: '#0f0f0f',
  terminalBorder: '#2a2a2a',
  terminalShadow: '0 4px 32px rgba(0, 0, 0, 0.4)',

  // Terminal header
  headerBg: '#0a0a0a',
  headerBorder: '#1f1f1f',
  headerText: '#666',

  // Terminal button
  btnBg: '#1a1a1a',
  btnBorder: '#2a2a2a',
  btnHoverBg: '#2a2a2a',

  // Prompt
  promptUser: '#a8a8a8',
  promptSymbol: '#666666',
  cursor: '#d4d4d4',

  // Section breaks
  sectionBorder: 'rgba(200, 200, 200, 0.08)',

  // Theme toggle
  toggleBg: 'rgba(255, 255, 255, 0.05)',
  toggleBorder: 'rgba(255, 255, 255, 0.1)',
  toggleText: '#666',
  toggleHoverBg: 'rgba(255, 255, 255, 0.08)',
  toggleHoverBorder: 'rgba(255, 255, 255, 0.15)',
  toggleDot: '#666',

  // Scrollbar
  scrollbarThumb: 'rgba(255, 255, 255, 0.08)',
  scrollbarThumbHover: 'rgba(255, 255, 255, 0.12)',
};

export const lightTheme = {
  // Core colors - Light mode
  bg: '#fafaf8',
  ink: '#2a2a28',
  accent: '#9f8f7f',
  command: '#333333',
  description: '#999999',
  muted: '#aaaaaa',
  tagline: '#999999',

  // Terminal window
  terminalBg: '#fafaf8',
  terminalBorder: '#e0e0dc',
  terminalShadow: '0 4px 32px rgba(0, 0, 0, 0.05)',

  // Terminal header
  headerBg: '#fcfcfa',
  headerBorder: '#f0f0eb',
  headerText: '#999',

  // Terminal button
  btnBg: '#f0f0eb',
  btnBorder: '#e0e0dc',
  btnHoverBg: '#e8e8e0',

  // Prompt
  promptUser: '#888888',
  promptSymbol: '#aaaaaa',
  cursor: '#333333',

  // Section breaks
  sectionBorder: 'rgba(80, 80, 80, 0.08)',

  // Theme toggle
  toggleBg: 'rgba(0, 0, 0, 0.04)',
  toggleBorder: 'rgba(0, 0, 0, 0.08)',
  toggleText: '#999',
  toggleHoverBg: 'rgba(0, 0, 0, 0.06)',
  toggleHoverBorder: 'rgba(0, 0, 0, 0.12)',
  toggleDot: '#999',

  // Scrollbar
  scrollbarThumb: 'rgba(0, 0, 0, 0.08)',
  scrollbarThumbHover: 'rgba(0, 0, 0, 0.12)',
};

export type Theme = typeof darkTheme;

export const typography = {
  // Font families - Updated to JetBrains Mono
  mono: "'JetBrains Mono', monospace",
  sans: "'JetBrains Mono', monospace",

  // Font sizes
  xs: '10px',
  sm: '11px',
  base: '13px',
  lg: '15px',
  xl: '18px',
  '2xl': '20px',

  // Line heights
  tight: 1.2,
  normal: 1.6,
  relaxed: 1.7,

  // Font weights
  weightNormal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '80px'
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  '2xl': '16px'
};

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12)',
  md: '0 4px 20px rgba(0,0,0,0.3)',
  lg: '0 0 60px rgba(208, 128, 208, 0.08)',
  glow: '0 0 6px rgba(185,137,255,0.15)',
  glowAccent: '0 0 6px rgba(255,62,181,0.15)'
};

export const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease'
};
