import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

function LandingPage() {
  const tokens = useThemeTokens();
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedContent, setTypedContent] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Command list for dropdown
  const commands = [
    { cmd: '/orientate', desc: 'Learn about Field Nodes' },
    { cmd: '/explore', desc: 'See what others have shared' },
    { cmd: '/auth', desc: 'Sign in or create account' },
    { cmd: '/home', desc: 'Go to your home' },
    { cmd: '/help', desc: 'Show help message' },
  ];

  // All content to type out
  const contentLines = [
    '▌ a quiet network for collective thought',
    '▌ ideas move through relation, not reaction',
    '▌ this is not a feed — it\'s a field',
    '',
    'FIELD_NODES Collaborative Research Platform',
    '',
    '/orientate → Learn about Field Nodes',
    '/explore → See what others have shared',
    '/auth → Sign in or create account',
    '/help → Show help message',
    '',
    'Type any command and press Enter. Use Tab for auto-completion.',
  ];

  useEffect(() => {
    // Check if animation has been seen before (global flag)
    const hasSeenAnimation = localStorage.getItem('fieldnodes-typewriter-seen') === 'true';
    
    if (hasSeenAnimation) {
      // Skip animation, show all content immediately
      setTypedContent(contentLines);
      setIsTypingComplete(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    // First time - show animation
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLineIndex >= contentLines.length) {
        setIsTypingComplete(true);
        // Mark animation as seen globally
        localStorage.setItem('fieldnodes-typewriter-seen', 'true');
        if (inputRef.current) inputRef.current.focus();
        return;
      }

      const currentLine = contentLines[currentLineIndex];

      if (currentCharIndex <= currentLine.length) {
        const partialLine = currentLine.slice(0, currentCharIndex);
        setTypedContent(prev => {
          const newContent = [...prev];
          newContent[currentLineIndex] = partialLine;
          return newContent;
        });

        currentCharIndex++;
        // Faster typing for empty lines and spaces
        const delay = currentLine === '' ? 50 : currentLine[currentCharIndex - 1] === ' ' ? 30 : 20;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        // Move to next line
        currentLineIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeNextChar, 100); // Small pause between lines
      }
    };

    // Start typing after a brief delay
    timeoutId = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingComplete]);

  // Show dropdown when typing '/' commands
  useEffect(() => {
    if (input.startsWith('/') && isTypingComplete) {
      const filtered = commands.filter(cmd =>
        cmd.cmd.toLowerCase().startsWith(input.toLowerCase())
      );
      setShowDropdown(filtered.length > 0);
      setSelectedIndex(0);
    } else {
      setShowDropdown(false);
    }
  }, [input, isTypingComplete]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase();
    switch (command) {
      case '/orientate':
        router.push('/orientate');
        break;
      case '/explore':
        router.push('/explore');
        break;
      case '/auth':
        router.push('/auth');
        break;
      case '/home':
        router.push('/home');
        break;
      case '/profile':
        router.push('/profile');
        break;
      case '/help':
        router.push('/help');
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showDropdown) {
      const filtered = commands.filter(cmd =>
        cmd.cmd.toLowerCase().startsWith(input.toLowerCase())
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleCommandClick(filtered[selectedIndex].cmd);
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
        setInput('');
      }
    } else if (e.key === 'Enter' && input.trim()) {
      handleCommand(input.trim());
    }
  };

  const handleCommandClick = (command: string) => {
    setInput('');
    setShowDropdown(false);
    handleCommand(command);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: tokens.color.bg.canvas,
        fontFamily: tokens.typography.family.mono,
        color: tokens.color.text.primary,
        padding: '40px 20px',
      }}
    >
      {/* Scanlines effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 2px)',
          zIndex: 1,
        }}
      />

      {/* Terminal Window */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '900px',
          height: 'fit-content',
          border: `1px solid ${tokens.color.divider}`,
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: tokens.shadow.soft,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${tokens.color.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            background: tokens.color.bg.elevated,
            color: tokens.color.text.secondary,
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>field-nodes</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: tokens.color.bg.canvas,
                border: `1px solid ${tokens.color.divider}`,
              }}
            />
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: tokens.color.bg.canvas,
                border: `1px solid ${tokens.color.divider}`,
              }}
            />
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: tokens.color.bg.canvas,
                border: `1px solid ${tokens.color.divider}`,
              }}
            />
          </div>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Typed content with typewriter effect */}
            {typedContent.map((line, idx) => {
              const isTagline = idx < 3;
              const isTitle = idx === 4;
              const isCommand = idx >= 6 && idx <= 9;
              const isHelp = idx === 11;
              const isDivider = line === '';

              if (isDivider) {
                return (
                  <div
                    key={idx}
                    style={{
                      margin: '8px 0',
                      padding: '4px 0',
                      borderTop: `1px solid ${tokens.color.divider}`,
                      borderBottom: `1px solid ${tokens.color.divider}`,
                    }}
                  />
                );
              }

              if (isTagline) {
                return (
                  <div key={idx} style={{ marginBottom: '6px', lineHeight: 1.6, fontSize: '13px' }}>
                    <span style={{ opacity: 0.6 }}>{line.slice(0, 1)}</span>{' '}
                    <span style={{ color: tokens.color.text.secondary, fontStyle: 'italic' }}>
                      {line.slice(2)}
                      {idx === typedContent.length - 1 && !isTypingComplete && (
                        <span style={{ opacity: 1 }}>▋</span>
                      )}
                    </span>
                  </div>
                );
              }

              if (isTitle) {
                const parts = line.split(' ');
                return (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <span style={{ color: tokens.color.field.lilac, fontWeight: 600 }}>
                      {parts[0]}
                    </span>{' '}
                    <span style={{ fontWeight: 600 }}>
                      {parts.slice(1).join(' ')}
                      {idx === typedContent.length - 1 && !isTypingComplete && (
                        <span style={{ color: tokens.color.text.primary }}>▋</span>
                      )}
                    </span>
                  </div>
                );
              }

              if (isCommand) {
                const [cmd, ...desc] = line.split(' ');
                return (
                  <div
                    key={idx}
                    onClick={() => isTypingComplete && handleCommandClick(cmd)}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '10px',
                      alignItems: 'flex-start',
                      cursor: isTypingComplete ? 'pointer' : 'default',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (isTypingComplete) e.currentTarget.style.opacity = '0.7';
                    }}
                    onMouseLeave={(e) => {
                      if (isTypingComplete) e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <span style={{ minWidth: '100px', fontWeight: 600, color: tokens.color.field.lilac }}>
                      {cmd}
                    </span>
                    <span style={{ opacity: 0.4 }}>{desc[0]}</span>
                    <span style={{ color: tokens.color.text.secondary }}>
                      {desc.slice(1).join(' ')}
                      {idx === typedContent.length - 1 && !isTypingComplete && (
                        <span style={{ color: tokens.color.text.primary }}>▋</span>
                      )}
                    </span>
                  </div>
                );
              }

              if (isHelp) {
                return (
                  <div key={idx}>
                    <span style={{ color: tokens.color.text.secondary }}>
                      {line}
                      {idx === typedContent.length - 1 && !isTypingComplete && (
                        <span style={{ color: tokens.color.text.primary }}>▋</span>
                      )}
                    </span>
                  </div>
                );
              }

              return (
                <div key={idx}>
                  {line}
                  {idx === typedContent.length - 1 && !isTypingComplete && (
                    <span style={{ color: tokens.color.text.primary }}>▋</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
              fontWeight: 500,
              fontSize: '13px',
              paddingTop: '12px',
              borderTop: `1px solid ${tokens.color.divider}`,
            }}
          >
            <span style={{ color: tokens.color.text.secondary, fontWeight: 500 }}>
              {user ? (userProfile?.username || user.email?.split('@')[0] || 'user') : 'guest'}@fieldnodes:~FIELD
            </span>
            <span style={{ color: tokens.color.text.secondary, fontWeight: 500 }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: tokens.color.text.primary,
                font: 'inherit',
                fontSize: '13px',
                marginLeft: '3px',
                caretColor: tokens.color.text.primary,
              }}
              spellCheck={false}
              autoFocus
            />

            {/* Notion-style Command Dropdown */}
            {showDropdown && isTypingComplete && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '0',
                  marginBottom: '8px',
                  background: tokens.color.bg.elevated,
                  border: `1px solid ${tokens.color.divider}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  minWidth: '320px',
                  maxWidth: '400px',
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                {commands
                  .filter(cmd => cmd.cmd.toLowerCase().startsWith(input.toLowerCase()))
                  .map((item, index) => (
                    <div
                      key={item.cmd}
                      onClick={() => handleCommandClick(item.cmd)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: index === selectedIndex ? tokens.color.bg.hover : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                        borderLeft: `3px solid ${index === selectedIndex ? tokens.color.field.lilac : 'transparent'}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <span
                          style={{
                            color: index === selectedIndex ? tokens.color.field.lilac : tokens.color.text.primary,
                            fontWeight: 600,
                            fontSize: '14px',
                            minWidth: '90px',
                          }}
                        >
                          {item.cmd}
                        </span>
                        <span
                          style={{
                            color: tokens.color.text.secondary,
                            fontSize: '13px',
                            fontStyle: 'italic',
                          }}
                        >
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
        }}
      >
        <ThemeToggle />
      </div>

      {/* Scrollbar Styles */}
      <style jsx global>{`
        /* Scrollbar styling */
        .terminal-scrollable::-webkit-scrollbar {
          width: 14px;
        }

        .terminal-scrollable::-webkit-scrollbar-track {
          background: transparent;
        }

        .terminal-scrollable::-webkit-scrollbar-thumb {
          background: #cccccc;
          border-radius: 8px;
          border: 3px solid transparent;
          background-clip: content-box;
        }

        .terminal-scrollable::-webkit-scrollbar-thumb:hover {
          background: #999999;
          border-radius: 8px;
          border: 3px solid transparent;
          background-clip: content-box;
        }

        /* Dark mode scrollbar */
        [data-theme="research"] .terminal-scrollable::-webkit-scrollbar-thumb {
          background: #4a4a4a;
        }

        [data-theme="research"] .terminal-scrollable::-webkit-scrollbar-thumb:hover {
          background: #666666;
        }

        /* Firefox scrollbar */
        .terminal-scrollable {
          scrollbar-width: thin;
          scrollbar-color: #cccccc transparent;
        }

        [data-theme="research"] .terminal-scrollable {
          scrollbar-color: #4a4a4a transparent;
        }
      `}</style>
    </div>
  );
}

export default function Landing() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    </ThemeProvider>
  );
}