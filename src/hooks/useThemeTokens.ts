// Theme-aware design tokens hook
// Provides tokens based on current theme context

import { useTheme, themes } from '../contexts/ThemeContext';

export const useThemeTokens = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return {
    color: currentTheme.colors,
    typography: currentTheme.typography,
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      base: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
    },
    radius: {
      sm: '6px',
      base: '8px',
      lg: '12px',
    },
    shadow: {
      soft: theme === 'monochrome' 
        ? '0 0 60px rgba(0, 0, 0, 0.08)'
        : '0 0 60px rgba(208, 128, 208, 0.08)',
      glow: theme === 'monochrome'
        ? '0 0 12px rgba(0, 0, 0, 0.15)'
        : '0 0 12px rgba(162, 138, 255, 0.33)',
    },
    animation: {
      duration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slowest: '500ms',
      },
      easing: {
        base: 'ease-in-out',
        in: 'ease-in',
        out: 'ease-out',
      },
    },
  };
};
