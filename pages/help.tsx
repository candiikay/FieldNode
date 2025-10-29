import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { helpIndex, helpSections } from './help-data';

type ViewState = 'index' | 'section';

function HelpPage() {
  const tokens = useThemeTokens();
  const router = useRouter();

  const [input, setInput] = useState('');
  const [viewState, setViewState] = useState<ViewState>('index');
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const [typedContent, setTypedContent] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [awaitingReturn, setAwaitingReturn] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { cmd: '/home', desc: 'Return to home page' },
    { cmd: '/orientate', desc: 'View orientation tutorial' },
    { cmd: '/explore', desc: 'Browse existing fields and nodes' },
    { cmd: '/auth', desc: 'Sign in or create account' },
  ];

  // Load last read section from localStorage on mount
  useEffect(() => {
    const lastSection = localStorage.getItem('fieldnodes-last-help');
    if (lastSection && parseInt(lastSection) >= 1 && parseInt(lastSection) <= 10) {
      // Don't auto-load, just store for reference
    }
  }, []);

  // Save current section to localStorage
  useEffect(() => {
    if (currentSection) {
      localStorage.setItem('fieldnodes-last-help', currentSection.toString());
    }
  }, [currentSection]);

  useEffect(() => {
    let contentLines: string[] = [];

    if (viewState === 'index') {
      contentLines = helpIndex;
    } else if (viewState === 'section' && currentSection) {
      const section = helpSections.find(s => s.id === currentSection);
      if (section) contentLines = section.content;
    }

    setIsTypingComplete(false);
    setTypedContent([]);
    setAwaitingReturn(false);

    // Check if animation has been seen before (global flag)
    const hasSeenAnimation = localStorage.getItem('fieldnodes-typewriter-seen') === 'true';
    
    if (hasSeenAnimation) {
      // Skip animation, show all content immediately
      setTypedContent(contentLines);
      setIsTypingComplete(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }

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
          const next = [...prev];
          next[currentLineIndex] = partialLine;
          return next;
        });
        currentCharIndex++;
        const delay = currentLine === '' ? 50 : currentLine[currentCharIndex - 1] === ' ' ? 30 : 20;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeNextChar, 100);
      }
    };

    timeoutId = setTimeout(typeNextChar, 400);
    return () => clearTimeout(timeoutId);
  }, [viewState, currentSection]);

  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
      
      // Automatically set awaitingReturn if we see the prompt
      if (viewState === 'section') {
        const hasPrompt = typedContent.some(line =>
          (line || '').includes('return to help index? (y/n)')
        );
        if (hasPrompt) {
          setAwaitingReturn(true);
        }
      }
    }
  }, [isTypingComplete, typedContent, viewState]);

  // Show dropdown when typing '/' commands
  useEffect(() => {
    if (input.startsWith('/') && isTypingComplete && !awaitingReturn) {
      const filtered = commands.filter(cmd =>
        cmd.cmd.toLowerCase().startsWith(input.toLowerCase())
      );
      setShowDropdown(filtered.length > 0);
      setSelectedIndex(0);
    } else {
      setShowDropdown(false);
    }
  }, [input, isTypingComplete, awaitingReturn]);

  const handleInput = (value: string) => {
    setInput(value);
    // Don't process input immediately - wait for Enter key in handleKeyDown
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase();
    switch (command) {
      case '/home':
        router.push('/');
        break;
      case '/orientate':
        router.push('/orientate');
        break;
      case '/explore':
        router.push('/explore');
        break;
      case '/auth':
        router.push('/auth');
        break;
      default:
        break;
    }
  };

  const handleCommandClick = (command: string) => {
    setInput('');
    setShowDropdown(false);
    handleCommand(command);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle dropdown navigation
    if (showDropdown && isTypingComplete) {
      const filtered = commands.filter(cmd =>
        cmd.cmd.toLowerCase().startsWith(input.toLowerCase())
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
        return;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
        return;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleCommandClick(filtered[selectedIndex].cmd);
        return;
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowDropdown(false);
        setInput('');
        return;
      }
    }

    // Keyboard shortcuts for navigation in index
    if (viewState === 'index' && isTypingComplete && !awaitingReturn && !showDropdown) {
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        const current = highlightedIndex || 1;
        const next = current < 10 ? current + 1 : 1;
        setHighlightedIndex(next);
        return;
      }
      if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        const current = highlightedIndex || 1;
        const prev = current > 1 ? current - 1 : 10;
        setHighlightedIndex(prev);
        return;
      }
      if (e.key === 'Enter' && highlightedIndex) {
        e.preventDefault();
        setCurrentSection(highlightedIndex);
        setViewState('section');
        setInput('');
        setHighlightedIndex(null);
        return;
      }
    }

    // Escape to return to index
    if (e.key === 'Escape' && viewState === 'section') {
      e.preventDefault();
      setViewState('index');
      setCurrentSection(null);
      setInput('');
      setAwaitingReturn(false);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      if (viewState === 'index' && isTypingComplete) {
        const num = parseInt(input.trim());
        if (num >= 1 && num <= 10) {
          setCurrentSection(num);
          setViewState('section');
          setInput('');
          setHighlightedIndex(null);
          return;
        }
        // Handle command if not a number
        if (input.trim().startsWith('/')) {
          handleCommand(input.trim());
          setInput('');
          return;
        }
      }

      if (awaitingReturn && isTypingComplete) {
        const lower = input.trim().toLowerCase();
        if (lower === 'y' || lower === 'yes') {
          setViewState('index');
          setCurrentSection(null);
          setInput('');
          setAwaitingReturn(false);
          return;
        } else if (lower === 'n' || lower === 'no') {
          router.push('/');
          setInput('');
          setAwaitingReturn(false);
          return;
        }
      }

      // If awaiting return and Enter is pressed, process immediately if input is empty
      if (awaitingReturn && isTypingComplete && input.trim() === '') {
        // User just pressed Enter after prompt - do nothing, wait for y/n input
        return;
      }
    }
  };

  const handleSectionClick = (id: number) => {
    if (viewState === 'index' && isTypingComplete) {
      setCurrentSection(id);
      setViewState('section');
      setInput('');
    }
  };

  const renderLine = (line: string, idx: number) => {
    const showCursor = idx === typedContent.length - 1 && !isTypingComplete;
    const isDivider = line === '';
    const isDashDivider = line.startsWith('─') && line.length > 10;
    const isItem = /^\[(\d+)\]/.test(line);
    const isPrompt = line.includes('return to help index?');
    const isInstructionLine = viewState === 'index' && line.includes('Type a number') && line.includes('click');
    const isCommand = /^\/[a-z]/.test(line.trim()) || /^\/[a-z-]+\s+\[/.test(line.trim());
    const isIndexTitle = viewState === 'index' && idx === 0;
    const isTitle = viewState === 'section' && idx === 1;

    if (isDashDivider) {
      // Remove dash dividers entirely
      return null;
    }

    if (isDivider) {
      // Minimal spacing for empty lines - just a small margin
      return (
        <div
          key={idx}
          style={{
            margin: '4px 0',
            height: '4px',
          }}
        />
      );
    }

    if (isIndexTitle) {
      return (
        <div key={idx} style={{ marginBottom: '12px' }}>
          <span style={{ color: tokens.color.field.lilac, fontWeight: 600, fontSize: '16px' }}>
            {line}
            {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
          </span>
        </div>
      );
    }

    if (isItem && viewState === 'index') {
      const match = line.match(/^\[(\d+)\]/);
      const id = match ? parseInt(match[1]) : 0;
      const text = line.replace(/^\[\d+\]\s*/, '');
      const isHighlighted = highlightedIndex === id;
      
      return (
        <div
          key={idx}
          onClick={() => handleSectionClick(id)}
          style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '6px', 
            cursor: isTypingComplete ? 'pointer' : 'default', 
            transition: 'all 0.2s ease', 
            lineHeight: 1.6, 
            fontSize: '13px',
            backgroundColor: isHighlighted ? tokens.color.bg.hover : 'transparent',
            padding: isHighlighted ? '4px 8px' : '0',
            borderRadius: isHighlighted ? '4px' : '0',
            marginLeft: isHighlighted ? '-8px' : '0',
          }}
          onMouseEnter={(e) => { if (isTypingComplete) setHighlightedIndex(id); }}
          onMouseLeave={(e) => { if (isTypingComplete && highlightedIndex === id) setHighlightedIndex(null); }}
        >
          <span style={{ color: tokens.color.field.lilac, fontWeight: 600, minWidth: '40px' }}>
            [{id}]
          </span>
          <span style={{ color: isHighlighted ? tokens.color.field.lilac : tokens.color.text.secondary }}>
            {text}
            {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
          </span>
        </div>
      );
    }

    if (isCommand) {
      const parts = line.split('→');
      const cmd = parts[0].trim();
      const desc = parts[1]?.trim() || '';
      
      return (
        <div key={idx} style={{ marginBottom: '6px', lineHeight: 1.6, fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ 
            color: tokens.color.field.lilac, 
            fontWeight: 600, 
            fontFamily: tokens.typography.family.mono,
            minWidth: '180px',
            flexShrink: 0,
          }}>
            {cmd}
          </span>
          {desc && (
            <>
              <span style={{ opacity: 0.4 }}>→</span>
              <span style={{ color: tokens.color.text.secondary }}>
                {desc}
                {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
              </span>
            </>
          )}
        </div>
      );
    }

    if (isTitle) {
      return (
        <div key={idx} style={{ marginBottom: '12px' }}>
          <span style={{ color: tokens.color.field.lilac, fontWeight: 600, fontSize: '16px' }}>
            {line}
            {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
          </span>
        </div>
      );
    }

    if (isInstructionLine) {
      return (
        <div key={idx} style={{ marginTop: '12px', marginBottom: '6px', lineHeight: 1.6, fontSize: '13px' }}>
          <span style={{ color: tokens.color.text.secondary, fontStyle: 'italic' }}>
            {line}
            {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
          </span>
        </div>
      );
    }

    if (isPrompt) {
      return (
        <div key={idx} style={{ marginTop: '12px', marginBottom: '6px', lineHeight: 1.6, fontSize: '13px' }}>
          <span style={{ color: tokens.color.text.secondary }}>
            {line}
            {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
          </span>
        </div>
      );
    }

    return (
      <div key={idx} style={{ marginBottom: '6px', lineHeight: 1.6, fontSize: '13px' }}>
        <span style={{ color: tokens.color.text.secondary }}>
          {line}
          {showCursor && <span style={{ color: tokens.color.text.primary }}>▋</span>}
        </span>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: tokens.color.bg.canvas, color: tokens.color.text.primary, fontFamily: tokens.typography.family.mono, padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 2px)', zIndex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '900px', border: `1px solid ${tokens.color.divider}`, borderRadius: '6px', overflow: 'hidden', boxShadow: tokens.shadow.soft, position: 'relative', zIndex: 2 }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${tokens.color.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 500, letterSpacing: '0.5px', background: tokens.color.bg.elevated, color: tokens.color.text.secondary }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>field_nodes_help</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: tokens.color.bg.canvas, border: `1px solid ${tokens.color.divider}` }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: tokens.color.bg.canvas, border: `1px solid ${tokens.color.divider}` }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: tokens.color.bg.canvas, border: `1px solid ${tokens.color.divider}` }} />
          </div>
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            {typedContent.map((line, idx) => {
              const rendered = renderLine(line, idx);
              return rendered; // Filter out null returns from dash dividers
            }).filter(Boolean)}
          </div>

          {isTypingComplete && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0px', fontWeight: 500, fontSize: '13px', paddingTop: '12px', borderTop: `1px solid ${tokens.color.divider}` }}>
              <span style={{ color: tokens.color.text.secondary, fontWeight: 500 }}>guest@fieldnodes:~HELP</span>
              <span style={{ color: tokens.color.text.secondary, fontWeight: 500 }}>$</span>
              <span style={{ marginLeft: '3px', display: 'flex', alignItems: 'center', flex: 1 }}>
                <input 
                  ref={inputRef} 
                  value={input} 
                  onChange={(e) => handleInput(e.target.value)} 
                  onKeyDown={handleKeyDown} 
                  style={{ 
                    flex: 1, 
                    background: 'transparent', 
                    border: 'none', 
                    outline: 'none', 
                    color: tokens.color.text.primary, 
                    font: 'inherit', 
                    fontSize: '13px', 
                    caretColor: tokens.color.text.primary,
                    minWidth: '20px',
                  }} 
                  spellCheck={false} 
                  autoFocus 
                />
                {isTypingComplete && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '16px',
                      backgroundColor: tokens.color.text.primary,
                      marginLeft: input ? '2px' : '0',
                      animation: 'blink 1s ease-in-out infinite',
                    }}
                  />
                )}
              </span>

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
          )}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default function Help() {
  return (
    <ThemeProvider>
      <HelpPage />
    </ThemeProvider>
  );
}