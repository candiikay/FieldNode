'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'monochrome' | 'research';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
         monochrome: {
           name: 'Attuned',
           description: 'Sensitive, responsive interface that listens and adapts',
           colors: {
             bg: {
               canvas: '#FFFFFF',
               elevated: '#F8F9FA',
               hover: '#F1F3F4',
               terminal: 'rgba(248, 249, 250, 0.8)',
             },
             text: {
               primary: '#1A1A1A',
               secondary: '#6B7280',
               accent: '#374151',
               muted: '#9CA3AF',
             },
             field: {
               lilac: '#059669', // Green neon for contrast
               magenta: '#374151',
               coral: '#4B5563',
               orchid: '#6B7280',
             },
             semantic: {
               success: '#059669',
               warning: '#D97706',
               error: '#DC2626',
               info: '#2563EB',
             },
             divider: '#E5E7EB',
           },
    typography: {
      family: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      },
    },
  },
  research: {
    name: 'Amplified',
    description: 'Bold, vibrant interface that amplifies voices and connections',
    colors: {
      bg: {
        canvas: '#0D0A12',
        elevated: '#171226',
        hover: '#221A35',
        terminal: 'rgba(13, 10, 18, 0.6)',
      },
      text: {
        primary: '#EDE6FF',
        secondary: '#B3A8C7',
        accent: '#E18EE7',
        muted: '#7A6F8E',
      },
      field: {
        lilac: '#B79CFF',
        magenta: '#E18EE7',
        coral: '#F86F5C',
        orchid: '#9A5FAE',
      },
      semantic: {
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      divider: '#2A2040',
    },
    typography: {
      family: {
        sans: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      },
    },
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('monochrome');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('fieldnodes-theme') as ThemeMode;
    if (savedTheme && (savedTheme === 'monochrome' || savedTheme === 'research')) {
      setThemeState(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('fieldnodes-theme', theme);
  }, [theme]);

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];
    
    // Update CSS variables
    root.style.setProperty('--bg-canvas', currentTheme.colors.bg.canvas);
    root.style.setProperty('--bg-elevated', currentTheme.colors.bg.elevated);
    root.style.setProperty('--bg-hover', currentTheme.colors.bg.hover);
    root.style.setProperty('--bg-terminal', currentTheme.colors.bg.terminal);
    
    root.style.setProperty('--text-primary', currentTheme.colors.text.primary);
    root.style.setProperty('--text-secondary', currentTheme.colors.text.secondary);
    root.style.setProperty('--text-accent', currentTheme.colors.text.accent);
    root.style.setProperty('--text-muted', currentTheme.colors.text.muted);
    
    root.style.setProperty('--field-lilac', currentTheme.colors.field.lilac);
    root.style.setProperty('--field-magenta', currentTheme.colors.field.magenta);
    root.style.setProperty('--field-coral', currentTheme.colors.field.coral);
    root.style.setProperty('--field-orchid', currentTheme.colors.field.orchid);
    
    root.style.setProperty('--semantic-success', currentTheme.colors.semantic.success);
    root.style.setProperty('--semantic-warning', currentTheme.colors.semantic.warning);
    root.style.setProperty('--semantic-error', currentTheme.colors.semantic.error);
    root.style.setProperty('--semantic-info', currentTheme.colors.semantic.info);
    
    root.style.setProperty('--divider', currentTheme.colors.divider);
    
    root.style.setProperty('--font-sans', currentTheme.typography.family.sans);
    root.style.setProperty('--font-mono', currentTheme.typography.family.mono);
    
    // Set theme attribute for CSS selectors
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'monochrome' ? 'research' : 'monochrome');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
