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
    description: 'Clean interface with warm brown accents',
    colors: {
      bg: {
        canvas: '#fafafa',
        elevated: '#ffffff',
        hover: '#f0f0f0',
        terminal: '#ffffff',
      },
      text: {
        primary: '#2d2d2d',
        secondary: '#999999',
        accent: '#9f8f7f',
        muted: '#b3b3b3',
      },
      field: {
        lilac: '#9f8f7f',
        magenta: '#9f8f7f',
        coral: '#9f8f7f',
        orchid: '#9f8f7f',
      },
      semantic: {
        success: '#4caf50',
        warning: '#ff9800',
        error: '#dc2626',
        info: '#2196f3',
      },
      divider: '#e5e5e5',
    },
    typography: {
      family: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      },
    },
  },
  research: {
    name: 'Amplified',
    description: 'Dark interface with warm brown accents',
    colors: {
      bg: {
        canvas: '#1a1a1a',
        elevated: '#0f0f0f',
        hover: '#2a2a2a',
        terminal: '#0f0f0f',
      },
      text: {
        primary: '#cccccc',
        secondary: '#808080',
        accent: '#9f8f7f',
        muted: '#666666',
      },
      field: {
        lilac: '#9f8f7f',
        magenta: '#9f8f7f',
        coral: '#9f8f7f',
        orchid: '#9f8f7f',
      },
      semantic: {
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
      },
      divider: '#333333',
    },
    typography: {
      family: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
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
