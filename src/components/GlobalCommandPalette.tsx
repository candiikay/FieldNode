import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useThemeTokens } from '@/hooks/useThemeTokens';

interface Command {
  cmd: string;
  desc: string;
  category: string;
  path?: string;
}

export default function GlobalCommandPalette() {
  const tokens = useThemeTokens();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global commands available on all pages
  const commands: Command[] = [
    { cmd: '/orientate', desc: 'Learn about Field Nodes', category: 'discovery', path: '/orientate' },
    { cmd: '/explore', desc: 'See what others have shared', category: 'discovery', path: '/explore' },
    { cmd: '/signin', desc: 'Sign in to your account', category: 'auth', path: '/signin' },
    { cmd: '/signup', desc: 'Create new account', category: 'auth', path: '/signup' },
    { cmd: '/help', desc: 'Show help message', category: 'system', path: '/help' },
  ];

  // Smart filtering
  const filteredCommands = commands.filter(command => 
    command.cmd.toLowerCase().includes(input.toLowerCase()) ||
    command.desc.toLowerCase().includes(input.toLowerCase())
  );

  // Show dropdown when typing commands
  useEffect(() => {
    if (input.startsWith('/') && filteredCommands.length > 0) {
      setShowDropdown(true);
      setSelectedIndex(0);
    } else {
      setShowDropdown(false);
    }
  }, [input, filteredCommands.length]);

  // Global keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
          setInput('/');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showDropdown && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleCommandClick(filteredCommands[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowDropdown(false);
        setInput('');
      }
    }
  };

  const handleCommandClick = (command: Command) => {
    setInput(command.cmd);
    setShowDropdown(false);
    
    if (command.path) {
      router.push(command.path);
    } else {
      // Handle commands without specific paths
      console.log(`Executing command: ${command.cmd}`);
    }
  };

  return (
    <div className="global-command-palette">
      <div className="command-input-container">
        <span className="command-prompt">
          guest@fieldnodes:~FIELD$
        </span>
        <span className="command-caret"></span>
        <input 
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="command-input"
          placeholder=""
          autoFocus={false}
          spellCheck={false}
        />
      </div>

      {/* Notion-style Command Dropdown */}
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            bottom: '110%',
            left: '150px',
            background: tokens.color.bg.elevated,
            border: `1px solid ${tokens.color.divider}`,
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            minWidth: '280px',
            overflow: 'hidden',
            zIndex: 100,
            animation: 'fadeIn 0.1s ease-out',
          }}
        >
          {filteredCommands.map((command, index) => (
            <div
              key={command.cmd}
              onClick={() => handleCommandClick(command)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                background:
                  index === selectedIndex ? tokens.color.bg.hover : 'transparent',
                color: tokens.color.text.primary,
                cursor: 'pointer',
                fontFamily: tokens.typography.family.mono,
                fontSize: '14px',
                transition: 'background 0.15s ease',
              }}
            >
              <span
                style={{
                  color: tokens.color.field.lilac,
                  marginRight: '8px',
                  minWidth: '90px',
                }}
              >
                {command.cmd}
              </span>
              <span style={{ color: tokens.color.text.secondary, fontSize: '13px' }}>
                {command.desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
