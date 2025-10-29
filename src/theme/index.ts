// Global Theme System for Field Nodes
// Centralized colors, typography, spacing, and component styles
// Now token-based for consistency and maintainability

import { tokens } from './tokens';

// Re-export tokens with legacy palette names for backwards compatibility
export const palette = {
  bg: tokens.color.bg.canvas,
  ink: tokens.color.text.primary,
  magenta: tokens.color.field.magenta,
  lilac: tokens.color.field.lilac,
  orchid: tokens.color.field.orchid,
  muted: tokens.color.text.secondary,
  success: tokens.color.semantic.success,
  error: tokens.color.semantic.error,
  warning: tokens.color.semantic.warning,
  info: tokens.color.semantic.info,
  
  // Legacy compatibility
  accent: tokens.color.field.magenta,
  textPrimary: tokens.color.text.primary,
  textSecondary: tokens.color.text.secondary,
  divider: tokens.color.divider,
  helpBg: tokens.color.bg.elevated,
  
  // Interactive states
  hover: 'rgba(214, 92, 169, 0.1)',
  active: 'rgba(214, 92, 169, 0.2)',
  disabled: 'rgba(255,255,255,0.3)',
  
  // Gradients
  disabledGradient: 'linear-gradient(135deg, #3a3a3a 0%, #555 100%)',
  guestBannerBg: 'rgba(214, 92, 169, 0.08)',
  guestBannerBorder: '#2A2A2D'
};

export const typography = {
  fontFamilyMono: tokens.typography.family.mono,
  fontFamilySans: tokens.typography.family.sans,
  sizeSm: tokens.typography.size.sm,
  base: tokens.typography.size.base,
  lg: tokens.typography.size.lg,
  xl: tokens.typography.size.xl,
  '2xl': tokens.typography.size['2xl'],
  tight: tokens.typography.lineHeight.tight,
  normal: tokens.typography.lineHeight.normal,
  relaxed: tokens.typography.lineHeight.relaxed,
  weightNormal: tokens.typography.weight.normal,
  medium: tokens.typography.weight.medium,
  semibold: tokens.typography.weight.semibold,
  bold: tokens.typography.weight.semibold, // Map bold to semibold per brand guidelines
};

export const spacing = tokens.spacing;

export const borderRadius = {
  sm: tokens.radius.sm,
  md: tokens.radius.base,
  lg: tokens.radius.lg,
  xl: tokens.radius.lg,
  '2xl': '16px' // Keep legacy value
};

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12)',
  md: '0 4px 20px rgba(0,0,0,0.3)',
  lg: tokens.shadow.soft,
  glow: tokens.shadow.glow,
  glowAccent: '0 0 6px rgba(214, 92, 169, 0.15)'
};

export const transitions = {
  fast: tokens.animation.duration.fast,
  normal: tokens.animation.duration.base,
  slow: tokens.animation.duration.slow
};

// Export tokens for new components
export { tokens };
