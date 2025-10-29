import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import LoginModal from '@/components/auth/LoginModal';
import SignUpModal from '@/components/auth/SignUpModal';
import { terminalStyles } from '@/styles/terminal';
import { tokens } from '@/theme/tokens';

export default function Welcome() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Redirect if already authenticated
  if (user) {
    window.location.href = '/';
    return null;
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: tokens.color.bg.canvas,
      color: tokens.color.text.primary,
      fontFamily: tokens.typography.family.mono,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      boxSizing: 'border-box' as const,
    },
    content: {
      width: '100%',
      maxWidth: '720px',
      border: `1px solid ${tokens.color.divider}`,
      borderRadius: '16px',
      background: tokens.color.bg.elevated,
      padding: '48px 32px',
      textAlign: 'center' as const,
      boxShadow: tokens.shadow.soft,
    },
    title: {
      fontFamily: tokens.typography.family.mono,
      color: tokens.color.field.lilac,
      fontSize: '2rem',
      textTransform: 'lowercase' as const,
      letterSpacing: '0.04em',
      textShadow: '0 0 10px rgba(180, 120, 255, 0.25)',
      marginBottom: tokens.spacing.lg,
      fontWeight: tokens.typography.weight.semibold,
    },
    subtitle: {
      fontSize: tokens.typography.size.lg,
      color: tokens.color.text.secondary,
      marginBottom: tokens.spacing['2xl'],
      lineHeight: tokens.typography.lineHeight.relaxed,
    },
    description: {
      fontSize: tokens.typography.size.base,
      color: tokens.color.text.secondary,
      marginBottom: tokens.spacing['2xl'],
      lineHeight: tokens.typography.lineHeight.normal,
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: tokens.spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: tokens.spacing['2xl'],
    },
    button: {
      padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
      background: tokens.color.field.magenta,
      border: 'none',
      borderRadius: tokens.radius.base,
      color: tokens.color.bg.canvas,
      fontSize: tokens.typography.size.base,
      fontWeight: tokens.typography.weight.medium,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
      minWidth: '200px',
      textTransform: 'lowercase' as const,
      letterSpacing: '0.02em',
    },
    buttonSecondary: {
      padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
      background: 'transparent',
      border: `1px solid ${tokens.color.field.lilac}`,
      borderRadius: tokens.radius.base,
      color: tokens.color.field.lilac,
      fontSize: tokens.typography.size.base,
      fontWeight: tokens.typography.weight.medium,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
      minWidth: '200px',
      textTransform: 'lowercase' as const,
      letterSpacing: '0.02em',
    },
    features: {
      marginTop: tokens.spacing['2xl'],
      textAlign: 'left' as const,
    },
    featureTitle: {
      fontSize: tokens.typography.size.lg,
      color: tokens.color.field.lilac,
      marginBottom: tokens.spacing.md,
      fontFamily: tokens.typography.family.mono,
      textTransform: 'lowercase' as const,
      letterSpacing: '0.02em',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    featureItem: {
      fontSize: tokens.typography.size.base,
      color: tokens.color.text.secondary,
      marginBottom: tokens.spacing.sm,
      paddingLeft: tokens.spacing.md,
      fontFamily: tokens.typography.family.mono,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>field nodes</h1>
        <p style={styles.subtitle}>
          a system that learns through care
        </p>
        <p style={styles.description}>
          collaborative research network for atomic thought sharing.
          build knowledge through connected ideas, evidence, and reflection.
        </p>
        
        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => setShowSignUp(true)}>
            create account
          </button>
          <button style={styles.buttonSecondary} onClick={() => setShowLogin(true)}>
            sign in
          </button>
        </div>

        <div style={styles.features}>
          <h3 style={styles.featureTitle}>what you can do:</h3>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>• create raw nodes from ideas and observations</li>
            <li style={styles.featureItem}>• ground thoughts with sources and evidence</li>
            <li style={styles.featureItem}>• connect ideas across research fields</li>
            <li style={styles.featureItem}>• collaborate with other researchers</li>
            <li style={styles.featureItem}>• visualize knowledge networks</li>
            <li style={styles.featureItem}>• sync with are.na channels</li>
          </ul>
        </div>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            window.location.href = '/';
          }}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSuccess={() => {
            setShowSignUp(false);
            window.location.href = '/';
          }}
        />
      )}
    </div>
  );
}
