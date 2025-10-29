'use client';
import React from 'react';
import { useTheme, themes } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <div
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px',
        borderRadius: '20px',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${currentTheme.colors.divider}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.5px',
        fontFamily: currentTheme.typography.family.mono,
        background: theme === 'monochrome'
          ? 'rgba(0, 0, 0, 0.04)'
          : 'rgba(255, 255, 255, 0.05)',
        color: currentTheme.colors.text.secondary,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backdropFilter = 'blur(16px)';
        e.currentTarget.style.background = theme === 'monochrome'
          ? 'rgba(0, 0, 0, 0.06)'
          : 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = theme === 'monochrome'
          ? 'rgba(0, 0, 0, 0.12)'
          : 'rgba(255, 255, 255, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backdropFilter = 'blur(12px)';
        e.currentTarget.style.background = theme === 'monochrome'
          ? 'rgba(0, 0, 0, 0.04)'
          : 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = currentTheme.colors.divider;
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          transition: 'all 0.3s ease',
          background: currentTheme.colors.text.secondary,
        }}
      />
      <span>toggle</span>
    </div>
  );
}
