import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

type AuthView = 'form' | 'success' | 'signout';

function AuthPage() {
  const tokens = useThemeTokens();
  const router = useRouter();
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } = useAuth();
  const [view, setView] = useState<AuthView>(user ? 'signout' : 'form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Magic link disabled for now
  const [typedContent, setTypedContent] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [signoutInput, setSignoutInput] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { cmd: '/home', desc: 'Return to home page' },
    { cmd: '/orientate', desc: 'Learn about Field Nodes' },
    { cmd: '/help', desc: 'View help documentation' },
    { cmd: '/explore', desc: 'Browse existing fields and nodes' },
  ];

  // Content based on view
  const getContentLines = (): string[] => {
    switch (view) {
      case 'form':
        return [
          '',
          'FIELD_NODES AUTHENTICATION',
          '',
        ];
      case 'success':
        return [
          '',
          'Authentication successful.',
          '',
          'Welcome to Field Nodes.',
          '',
          'press Enter to continue',
        ];
      case 'signout':
        return [
          '',
          'SIGN OUT',
          '',
          `Signed in as ${user?.email || 'user'}`,
          '',
          'Are you sure you want to sign out? (y/n)',
        ];
      default:
        return [];
    }
  };

  // Load content and typewriter effect
  useEffect(() => {
    const contentLines = getContentLines();
    setIsTypingComplete(false);
    setTypedContent([]);
    setError(null);

    // Check if animation has been seen before (global flag)
    const hasSeenAnimation = localStorage.getItem('fieldnodes-typewriter-seen') === 'true';
    
    if (hasSeenAnimation) {
      setTypedContent(contentLines);
      setIsTypingComplete(true);
      if (emailRef.current) emailRef.current.focus();
      return;
    }

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLineIndex >= contentLines.length) {
        setIsTypingComplete(true);
        localStorage.setItem('fieldnodes-typewriter-seen', 'true');
        if (emailRef.current) emailRef.current.focus();
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

        const delay = currentLine === '' ? 50 :
                     currentLine[currentCharIndex - 1] === ' ' ? 30 : 20;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeNextChar, 100);
      }
    };

    timeoutId = setTimeout(typeNextChar, 300);
    return () => clearTimeout(timeoutId);
  }, [view, user]);

  useEffect(() => {
    if (isTypingComplete && emailRef.current && view === 'form' && !loading) {
      emailRef.current.focus();
    }
  }, [isTypingComplete, view, loading]);

  // Show dropdown when typing '/' commands
  useEffect(() => {
    if (view === 'signout') {
      if (signoutInput.startsWith('/') && isTypingComplete) {
        const filtered = commands.filter(cmd =>
          cmd.cmd.toLowerCase().startsWith(signoutInput.toLowerCase())
        );
        setShowDropdown(filtered.length > 0);
        setSelectedIndex(0);
      } else {
        setShowDropdown(false);
      }
    }
  }, [signoutInput, view, isTypingComplete]);

  const handleSignIn = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
      setView('success');
    } catch (err: any) {
      setError(err.message || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signUpWithEmail(email, password, username);
      setView('success');
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
      setLoading(false);
    }
  };

  // Magic link handler removed

  const handleSignOut = async () => {
    if (signoutInput.toLowerCase() === 'y' || signoutInput.toLowerCase() === 'yes') {
      await signOut();
      setView('form');
      setEmail('');
      setPassword('');
      setUsername('');
      setSignoutInput('');
    } else if (signoutInput.toLowerCase() === 'n' || signoutInput.toLowerCase() === 'no') {
      setView('form');
      setSignoutInput('');
    }
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
      case '/help':
        router.push('/help');
        break;
      case '/explore':
        router.push('/explore');
        break;
    }
  };

  const handleSignoutKeyDown = (e: React.KeyboardEvent) => {
    if (showDropdown) {
      const filtered = commands.filter(cmd =>
        cmd.cmd.toLowerCase().startsWith(signoutInput.toLowerCase())
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand(filtered[selectedIndex].cmd);
        setSignoutInput('');
        setShowDropdown(false);
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSignOut();
    }
  };

  const renderLine = (line: string, idx: number) => {
    const showCursor = idx === typedContent.length - 1 && !isTypingComplete;
    const isDivider = line === '';
    const isTitle = (view === 'form' && idx === 1) || 
                    (view === 'signout' && idx === 1);

    if (isDivider) {
      return (
        <div key={idx} style={{ margin: '4px 0', height: '4px' }} />
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
          maxWidth: '600px',
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
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Typed content */}
          <div>
            {typedContent.map((line, idx) => renderLine(line, idx))}
          </div>

          {/* Form */}
          {view === 'form' && isTypingComplete && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Email field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ 
                  fontSize: '13px', 
                  color: tokens.color.text.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: tokens.color.field.lilac }}>email:</span>
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab' && !e.shiftKey && passwordRef.current) {
                        e.preventDefault();
                        passwordRef.current.focus();
                      }
                    }}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: `1px solid ${tokens.color.divider}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: tokens.color.text.primary,
                      fontFamily: tokens.typography.family.mono,
                      fontSize: '13px',
                      outline: 'none',
                      caretColor: tokens.color.text.primary,
                    }}
                    placeholder="user@example.com"
                    disabled={loading}
                  />
                </label>
              </div>

              {/* Password field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ 
                  fontSize: '13px', 
                  color: tokens.color.text.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: tokens.color.field.lilac }}>password:</span>
                  <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Tab' && !e.shiftKey) {
                        e.preventDefault();
                        if (isSignUp && usernameRef.current) {
                          usernameRef.current.focus();
                        } else if (emailRef.current) {
                          emailRef.current.focus();
                        }
                      } else if (e.key === 'Tab' && e.shiftKey) {
                        e.preventDefault();
                        if (emailRef.current) emailRef.current.focus();
                      }
                    }}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: `1px solid ${tokens.color.divider}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: tokens.color.text.primary,
                      fontFamily: tokens.typography.family.mono,
                      fontSize: '13px',
                      outline: 'none',
                      caretColor: tokens.color.text.primary,
                    }}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </label>
              </div>

              {/* Username field - only shown for sign up */}
              {isSignUp && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ 
                    fontSize: '13px', 
                    color: tokens.color.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: tokens.color.field.lilac }}>username:</span>
                    <input
                      ref={usernameRef}
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Tab' && !e.shiftKey) {
                          e.preventDefault();
                          if (emailRef.current) emailRef.current.focus();
                        } else if (e.key === 'Tab' && e.shiftKey && passwordRef.current) {
                          e.preventDefault();
                          passwordRef.current.focus();
                        }
                      }}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: `1px solid ${tokens.color.divider}`,
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: tokens.color.text.primary,
                        fontFamily: tokens.typography.family.mono,
                        fontSize: '13px',
                        outline: 'none',
                        caretColor: tokens.color.text.primary,
                      }}
                      placeholder="username"
                      disabled={loading}
                    />
                  </label>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div style={{ 
                  padding: '8px 12px', 
                  background: tokens.color.semantic.error + '20',
                  border: `1px solid ${tokens.color.semantic.error}`,
                  borderRadius: '4px',
                  color: tokens.color.semantic.error,
                  fontSize: '13px',
                }}>
                  Error: {error}
                </div>
              )}

              {/* Magic link flow disabled */}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={isSignUp ? handleSignUp : handleSignIn}
                  disabled={loading}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '10px 16px',
                    background: tokens.color.field.lilac,
                    color: tokens.color.bg.canvas,
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: tokens.typography.family.mono,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {loading ? '...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError(null);
                    setPassword('');
                    setUsername('');
                  }}
                  disabled={loading}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '10px 16px',
                    background: 'transparent',
                    color: tokens.color.text.secondary,
                    border: `1px solid ${tokens.color.divider}`,
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: tokens.typography.family.mono,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                </button>
              </div>

              {/* Divider */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                margin: '8px 0',
              }}>
                <div style={{ 
                  flex: 1, 
                  height: '1px', 
                  background: tokens.color.divider 
                }} />
                <span style={{ 
                  fontSize: '12px', 
                  color: tokens.color.text.secondary,
                  opacity: 0.6
                }}>OR</span>
                <div style={{ 
                  flex: 1, 
                  height: '1px', 
                  background: tokens.color.divider 
                }} />
              </div>

              {/* Social login buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    color: tokens.color.text.primary,
                    border: `1px solid ${tokens.color.divider}`,
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: tokens.typography.family.mono,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          )}

          {/* Success view */}
          {view === 'success' && isTypingComplete && (
            <div style={{ marginTop: '12px' }}>
              <button
                onClick={() => router.push('/')}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: tokens.color.field.lilac,
                  color: tokens.color.bg.canvas,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: tokens.typography.family.mono,
                  cursor: 'pointer',
                }}
              >
                Continue to Home
              </button>
            </div>
          )}

          {/* Sign out view */}
          {view === 'signout' && isTypingComplete && (
            <div style={{ position: 'relative' }}>
              {typedContent.map((line, idx) => {
                if (idx === 4) {
                  return (
                    <div key={idx} style={{ marginTop: '12px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: tokens.color.text.secondary, fontWeight: 500, fontSize: '13px' }}>
                          guest@fieldnodes:~AUTH$
                        </span>
                        <input
                          ref={inputRef}
                          value={signoutInput}
                          onChange={(e) => setSignoutInput(e.target.value)}
                          onKeyDown={handleSignoutKeyDown}
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
                        <span
                          style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '14px',
                            background: tokens.color.text.primary,
                            marginLeft: '2px',
                            animation: 'blink 1s infinite',
                          }}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}

              {/* Command Dropdown */}
              {showDropdown && (
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
                    .filter(cmd => cmd.cmd.toLowerCase().startsWith(signoutInput.toLowerCase()))
                    .map((item, index) => (
                      <div
                        key={item.cmd}
                        onClick={() => {
                          handleCommand(item.cmd);
                          setSignoutInput('');
                          setShowDropdown(false);
                        }}
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

      {/* Blink animation */}
      <style jsx global>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Auth() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthPage />
      </AuthProvider>
    </ThemeProvider>
  );
}
