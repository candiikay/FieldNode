import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { tokens } from '@/theme/tokens';

export default function UserMenu() {
  const { user, userProfile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || !userProfile) return null;

  const styles = {
    container: {
      position: 'relative' as const,
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      background: 'transparent',
      border: `1px solid ${tokens.color.divider}`,
      borderRadius: tokens.radius.base,
      color: tokens.color.text.primary,
      fontSize: tokens.typography.size.base,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    avatar: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: tokens.color.field.magenta,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: tokens.typography.size.sm,
      color: tokens.color.bg.canvas,
      fontWeight: tokens.typography.weight.medium,
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      right: 0,
      marginTop: tokens.spacing.sm,
      background: tokens.color.bg.elevated,
      border: `1px solid ${tokens.color.divider}`,
      borderRadius: tokens.radius.base,
      boxShadow: tokens.shadow.soft,
      minWidth: '200px',
      zIndex: 1000,
    },
    menuItem: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      color: tokens.color.text.primary,
      fontSize: tokens.typography.size.base,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
      borderBottom: `1px solid ${tokens.color.divider}`,
    },
    menuItemLast: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      color: tokens.color.text.primary,
      fontSize: tokens.typography.size.base,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    menuItemDanger: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      color: tokens.color.semantic.error,
      fontSize: tokens.typography.size.base,
      fontFamily: tokens.typography.family.mono,
      cursor: 'pointer',
      transition: `all ${tokens.animation.duration.base} ${tokens.animation.easing.base}`,
    },
    userInfo: {
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
      borderBottom: `1px solid ${tokens.color.divider}`,
    },
    username: {
      color: tokens.color.text.primary,
      fontSize: tokens.typography.size.base,
      fontWeight: tokens.typography.weight.medium,
      fontFamily: tokens.typography.family.mono,
    },
    email: {
      color: tokens.color.text.secondary,
      fontSize: tokens.typography.size.sm,
      fontFamily: tokens.typography.family.mono,
      marginTop: tokens.spacing.xs,
    },
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <div style={styles.avatar}>
          {userProfile.username.charAt(0).toUpperCase()}
        </div>
        @{userProfile.username}
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.userInfo}>
            <div style={styles.username}>@{userProfile.username}</div>
            <div style={styles.email}>{user.email}</div>
          </div>
          
          <div style={styles.menuItem}>
            profile
          </div>
          
          <div style={styles.menuItem}>
            settings
          </div>
          
          <div style={styles.menuItemLast}>
            fields
          </div>
          
          <div style={styles.menuItemDanger} onClick={handleSignOut}>
            sign out
          </div>
        </div>
      )}
    </div>
  );
}
