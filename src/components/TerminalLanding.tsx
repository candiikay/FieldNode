import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/ThemeContext';

export default function TerminalLanding() {
  const { theme, mode, toggleTheme } = useTheme();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Keyboard shortcut for theme toggle: Cmd/Ctrl + Shift + T
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  const handleCommand = (cmd: string) => {
    switch (cmd) {
      case 'discover':
        // Navigate to about/discover page
        console.log('Navigate to discover');
        break;
      case 'explore':
        // Navigate to explore page
        console.log('Navigate to explore');
        break;
      case 'signin':
        // Navigate to sign in page
        console.log('Navigate to sign in');
        break;
      case 'signup':
        // Navigate to sign up page
        console.log('Navigate to sign up');
        break;
      case 'help':
        router.push('/help');
        break;
      default:
        console.log('Unknown command');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: theme.bg,
        color: theme.ink,
        fontFamily: "'JetBrains Mono', monospace",
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          border: `1px solid ${theme.terminalBorder}`,
          margin: '12px',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: theme.terminalShadow,
          background: theme.terminalBg,
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${theme.headerBorder}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            background: theme.headerBg,
            color: theme.headerText,
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>field-nodes</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${theme.btnBorder}`,
                  background: theme.btnBg,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.btnHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme.btnBg;
                }}
              />
            ))}
          </div>
        </div>

        {/* Terminal body */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Tagline section */}
            <div
              style={{
                margin: '16px 0',
                lineHeight: 1.8,
                fontSize: '13px',
                letterSpacing: '0.3px',
              }}
            >
              {['a quiet network for collective thought', 'ideas move through relation, not reaction', 'this is not a feed — it\'s a field'].map((line, i) => (
                <div key={i} style={{ marginBottom: '12px', lineHeight: 1.7, opacity: 0, animation: `fade-in 0.5s ease-out forwards ${0.08 + i * 0.08}s` }}>
                  <span style={{ opacity: 0.6 }}>▌</span> <span style={{ color: theme.tagline, fontStyle: 'italic' }}>{line}</span>
                </div>
              ))}
            </div>

            {/* Section break */}
            <div
              style={{
                margin: '18px 0',
                padding: '10px 0',
                borderTop: `1px solid ${theme.sectionBorder}`,
                borderBottom: `1px solid ${theme.sectionBorder}`,
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards 0.32s',
              }}
            />

            {/* Title */}
            <div style={{ marginBottom: '12px', lineHeight: 1.7, opacity: 0, animation: 'fade-in 0.5s ease-out forwards 0.4s' }}>
              <span style={{ color: theme.accent, fontWeight: 500 }}>FIELD_NODES</span>{' '}
              <span style={{ color: theme.command, fontWeight: 500 }}>Collaborative Research Platform</span>
            </div>

            {/* Section break */}
            <div
              style={{
                margin: '18px 0',
                padding: '10px 0',
                borderTop: `1px solid ${theme.sectionBorder}`,
                borderBottom: `1px solid ${theme.sectionBorder}`,
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards 0.48s',
              }}
            />

            {/* Commands */}
            {[
              { cmd: 'discover', desc: 'Learn about Field Nodes', delay: '0.56s', onClick: () => handleCommand('discover') },
              { cmd: 'explore', desc: 'See what others have shared', delay: '0.64s', onClick: () => handleCommand('explore') },
              { cmd: 'signin', desc: 'Sign in to your account', delay: '0.72s', onClick: () => handleCommand('signin') },
              { cmd: 'signup', desc: 'Create new account', delay: '0.8s', onClick: () => handleCommand('signup') },
              { cmd: 'help', desc: 'Show help message', delay: '0.88s', onClick: () => handleCommand('help') },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '10px',
                  alignItems: 'flex-start',
                  opacity: 0,
                  animation: `fade-in 0.5s ease-out forwards ${item.delay}`,
                  cursor: 'pointer',
                }}
                onClick={item.onClick}
                onMouseEnter={(e) => {
                  const nameSpan = e.currentTarget.querySelector('.cmd-name') as HTMLElement;
                  if (nameSpan) nameSpan.style.opacity = '0.7';
                }}
                onMouseLeave={(e) => {
                  const nameSpan = e.currentTarget.querySelector('.cmd-name') as HTMLElement;
                  if (nameSpan) nameSpan.style.opacity = '1';
                }}
              >
                <span className="cmd-name" style={{ minWidth: '100px', fontWeight: 500, color: theme.accent, transition: 'opacity 0.2s' }}>
                  /{item.cmd}
                </span>
                <span style={{ opacity: 0.4 }}>→</span>
                <span style={{ color: theme.description }}>{item.desc}</span>
              </div>
            ))}

            {/* Section break */}
            <div
              style={{
                margin: '18px 0',
                padding: '10px 0',
                borderTop: `1px solid ${theme.sectionBorder}`,
                borderBottom: `1px solid ${theme.sectionBorder}`,
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards 0.96s',
              }}
            />

            {/* Hint */}
            <div style={{ marginBottom: '12px', lineHeight: 1.7, opacity: 0, animation: 'fade-in 0.5s ease-out forwards 1.04s' }}>
              <span style={{ color: theme.muted }}>Type any command and press Enter. Use Tab for auto-completion.</span>
            </div>
          </div>

          {/* Prompt */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
              fontWeight: 400,
              marginTop: '20px',
              fontSize: '13px',
            }}
          >
            <span style={{ color: theme.promptUser }}>guest@fieldnodes:~FIELD</span>
            <span style={{ color: theme.promptSymbol }}>$</span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                marginLeft: '3px',
                animation: 'blink 1s infinite',
                verticalAlign: 'middle',
                background: theme.cursor,
              }}
            />
          </div>
        </div>
      </div>

      {/* Theme toggle button */}
      <div
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '20px',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${theme.toggleBorder}`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.5px',
          fontFamily: "'JetBrains Mono', monospace",
          background: theme.toggleBg,
          color: theme.toggleText,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.toggleHoverBg;
          e.currentTarget.style.borderColor = theme.toggleHoverBorder;
          e.currentTarget.style.backdropFilter = 'blur(16px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.toggleBg;
          e.currentTarget.style.borderColor = theme.toggleBorder;
          e.currentTarget.style.backdropFilter = 'blur(12px)';
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            background: theme.toggleDot,
          }}
        />
        <span>toggle</span>
      </div>

      {/* Scanlines effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          backgroundImage: mode === 'dark'
            ? 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 2px)'
            : 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01) 1px, transparent 1px, transparent 2px)',
          zIndex: 1,
        }}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Scrollbar styling */
        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: transparent;
        }

        div::-webkit-scrollbar-thumb {
          background: ${theme.scrollbarThumb};
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: ${theme.scrollbarThumbHover};
        }

        @media (max-width: 768px) {
          .theme-toggle {
            bottom: 16px;
            right: 16px;
            font-size: 10px;
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
}
