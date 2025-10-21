// Global Theme System for Field Nodes
// Centralized colors, typography, spacing, and component styles

export const palette = {
  // Core colors
  bg: '#0E0E10',
  ink: '#F5EDEE', 
  magenta: '#D65CA9',
  lilac: '#B27CB6',
  orchid: '#A05C8D',
  muted: '#9AA0A6',
  
  // Semantic colors
  accent: '#FF3EB5',
  textPrimary: '#F5EDEE',
  textSecondary: '#9AA0A6',
  divider: '#1C1C1F',
  helpBg: '#141416',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Interactive states
  hover: 'rgba(255,62,181,0.1)',
  active: 'rgba(255,62,181,0.2)',
  disabled: 'rgba(255,255,255,0.3)',
  
  // Gradients
  disabledGradient: 'linear-gradient(135deg, #3a3a3a 0%, #555 100%)',
  guestBannerBg: 'rgba(255,62,181,0.08)',
  guestBannerBorder: '#2A2A2D'
};

export const typography = {
  // Font families
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  
  // Font sizes
  xs: '11px',
  sm: '13px', 
  base: '15px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  
  // Line heights
  tight: 1.2,
  normal: 1.6,
  relaxed: 1.9,
  
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
