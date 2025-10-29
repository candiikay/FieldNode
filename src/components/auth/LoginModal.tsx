import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { tokens } from '@/theme/tokens';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const { signInWithEmail, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [mode, setMode] = useState<'password' | 'magic'>('password');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmail(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithMagicLink(email);
      setMagicLinkSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      background: tokens.color.bg.canvas,
      border: `1px solid ${tokens.color.divider}`,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing['2xl'],
      width: '400px',
      maxWidth: '90vw',
      boxShadow: tokens.shadow.soft,
    },
    title: {
      color: tokens.color.text.primary,
      fontSize: tokens.typography.size.xl,
      fontWeight: tokens.typography.weight.semibold,
      marginBottom: tokens.spacing.lg,
      fontFamily: tokens.typography.family.sans,
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: tokens.spacing.md,
    },
    input: {
      padding: tokens.spacing.md,
      background: tokens.color.bg.elevated,
      border: `1px solid ${tokens.color.divider}`,
      borderRadius: tokens.radius.base,
      color: tokens.color.text.primary,
      fontSize: tokens.typography.size.base,
      fontFamily: tokens.typography.family.mono,
      outline: 'none',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    button: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      background: tokens.color.field.magenta,
      border: 'none',
      borderRadius: tokens.radius.base,
      color: tokens.color.bg.canvas,
      fontSize: tokens.typography.size.base,
      fontWeight: tokens.typography.weight.medium,
      fontFamily: tokens.typography.family.sans,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    buttonSecondary: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      background: 'transparent',
      border: `1px solid ${tokens.color.field.lilac}`,
      borderRadius: tokens.radius.base,
      color: tokens.color.field.lilac,
      fontSize: tokens.typography.size.base,
      fontWeight: tokens.typography.weight.medium,
      fontFamily: tokens.typography.family.sans,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    error: {
      color: tokens.color.semantic.error,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
    },
    success: {
      color: tokens.color.semantic.success,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
    },
    modeToggle: {
      display: 'flex',
      gap: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
    },
    modeButton: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      background: 'transparent',
      border: 'none',
      color: tokens.color.text.secondary,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    modeButtonActive: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      background: 'transparent',
      border: 'none',
      color: tokens.color.field.magenta,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    closeButton: {
      position: 'absolute' as const,
      top: tokens.spacing.md,
      right: tokens.spacing.md,
      background: 'transparent',
      border: 'none',
      color: tokens.color.text.secondary,
      fontSize: tokens.typography.size.lg,
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <h2 style={styles.title}>sign in</h2>
        
        <div style={styles.modeToggle}>
          <button
            style={mode === 'password' ? styles.modeButtonActive : styles.modeButton}
            onClick={() => setMode('password')}
          >
            password
          </button>
          <button
            style={mode === 'magic' ? styles.modeButtonActive : styles.modeButton}
            onClick={() => setMode('magic')}
          >
            magic link
          </button>
        </div>

        {mode === 'password' ? (
          <form style={styles.form} onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'signing in...' : 'sign in'}
            </button>
          </form>
        ) : (
          <form style={styles.form} onSubmit={handleMagicLink}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'sending...' : 'send magic link'}
            </button>
          </form>
        )}

        {error && <div style={styles.error}>{error}</div>}
        {magicLinkSent && (
          <div style={styles.success}>
            magic link sent to {email}. check your email.
          </div>
        )}
      </div>
    </div>
  );
}
