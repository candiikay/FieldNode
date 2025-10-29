// Field Nodes Design Tokens
// All design decisions reference these tokens, never hard-code values

export const tokens = {
  color: {
    bg: {
      canvas: 'var(--bg-canvas)',
      elevated: 'var(--bg-elevated)',
      hover: 'var(--bg-hover)',
      terminal: 'var(--bg-terminal)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      accent: 'var(--text-accent)',
      muted: 'var(--text-muted)',
    },
    field: {
      lilac: 'var(--field-lilac)',
      magenta: 'var(--field-magenta)',
      coral: 'var(--field-coral)',
      orchid: 'var(--field-orchid)',
    },
    semantic: {
      success: 'var(--semantic-success)',
      warning: 'var(--semantic-warning)',
      error: 'var(--semantic-error)',
      info: 'var(--semantic-info)',
    },
    divider: 'var(--divider)',
  },
  
  typography: {
    family: {
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
    },
    size: {
      xs: '11px',
      sm: '13px',
      base: '14px',
      md: '15px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.9,
    },
  },
  
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    base: 'var(--spacing-base)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': 'var(--spacing-3xl)',
  },
  
  radius: {
    sm: 'var(--radius-sm)',
    base: 'var(--radius-base)',
    lg: 'var(--radius-lg)',
  },
  
  shadow: {
    soft: 'var(--shadow-soft)',
    glow: 'var(--shadow-glow)',
    dropdown: 'var(--shadow-dropdown)',
  },
  
  animation: {
    duration: {
      fast: 'var(--anim-fast)',
      base: 'var(--anim-base)',
      slow: 'var(--anim-slow)',
      slowest: 'var(--anim-slowest)',
    },
    easing: {
      base: 'var(--anim-easing)',
      in: 'ease-in',
      out: 'ease-out',
    },
  },
} as const;

// Type-safe token access
export type Tokens = typeof tokens;

// Helper functions for common token access patterns
export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = tokens.color;
  for (const key of keys) {
    value = value[key];
  }
  return value as string;
};

export const getSpacing = (size: keyof typeof tokens.spacing) => tokens.spacing[size];
export const getRadius = (size: keyof typeof tokens.radius) => tokens.radius[size];
export const getShadow = (type: keyof typeof tokens.shadow) => tokens.shadow[type];
export const getAnimationDuration = (speed: keyof typeof tokens.animation.duration) => tokens.animation.duration[speed];
export const getAnimationEasing = (type: keyof typeof tokens.animation.easing) => tokens.animation.easing[type];
