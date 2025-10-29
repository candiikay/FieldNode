import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { tokens } from '@/theme/tokens';

interface SignUpModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function SignUpModal({ onClose, onSuccess }: SignUpModalProps) {
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('username can only contain letters, numbers, and underscores');
      setLoading(false);
      return;
    }

    if (username.length < 3 || username.length > 30) {
      setError('username must be between 3 and 30 characters');
      setLoading(false);
      return;
    }

    try {
      await signUpWithEmail(email, password, username);
      onSuccess();
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
    error: {
      color: tokens.color.semantic.error,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
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
    helpText: {
      color: tokens.color.text.secondary,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
      marginTop: tokens.spacing.sm,
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <h2 style={styles.title}>create account</h2>
        
        <form style={styles.form} onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <div style={styles.helpText}>
            letters, numbers, and underscores only
          </div>
          
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
            minLength={6}
          />
          <div style={styles.helpText}>
            minimum 6 characters
          </div>
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'creating account...' : 'create account'}
          </button>
        </form>

        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
