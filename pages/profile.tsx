import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

function ProfilePage() {
  const tokens = useThemeTokens();
  const router = useRouter();
  const { user, userProfile, loading: authLoading, updateEmail, updatePassword } = useAuth();
  const [username, setUsername] = useState(userProfile?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userProfile?.avatar_url || null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [typedContent, setTypedContent] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not signed in (wait for auth to finish loading)
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  const contentLines = [
    '',
    'PROFILE SETTINGS',
    '',
    'Update your profile information below:',
    '',
  ];

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem('fieldnodes-typewriter-seen') === 'true';
    
    if (hasSeenAnimation) {
      setTypedContent(contentLines);
      setIsTypingComplete(true);
      return;
    }

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLineIndex >= contentLines.length) {
        setIsTypingComplete(true);
        localStorage.setItem('fieldnodes-typewriter-seen', 'true');
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
  }, []);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setAvatarPreview(userProfile.avatar_url || null);
    }
  }, [userProfile]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }

      setAvatarFile(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return;

    setUploadingAvatar(true);
    setError(null);

    try {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pics')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase
        .storage
        .from('profile-pics')
        .getPublicUrl(filePath);

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUpdate = async () => {
    if (!user) {
      setError('You must be signed in to update your profile');
      return;
    }
    
    console.log('Starting update...', { username, email, hasPassword: !!password });
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Update username
      if (username.trim()) {
        console.log('Updating username...');
        // Validate username
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
          setError('Username can only contain letters, numbers, and underscores');
          setLoading(false);
          return;
        }

        if (username.length < 3 || username.length > 30) {
          setError('Username must be between 3 and 30 characters');
          setLoading(false);
          return;
        }

        const { error: usernameError } = await supabase
          .from('users')
          .update({ username, display_name: username })
          .eq('id', user!.id);

        if (usernameError) {
          if (usernameError.code === '23505') {
            setError('Username is already taken');
          } else {
            setError(usernameError.message);
          }
          setLoading(false);
          return;
        }
      }

      // Update email (only if changed)
      if (email.trim() && email !== user?.email) {
        if (!email.includes('@')) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        try {
          await updateEmail(email);
        } catch (emailErr: any) {
          setError(emailErr.message || 'Failed to update email');
          setLoading(false);
          return;
        }
      }

      // Update password (only if provided)
      if (password.trim()) {
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        try {
          await updatePassword(password);
        } catch (pwdErr: any) {
          setError(pwdErr.message || 'Failed to update password');
          setLoading(false);
          return;
        }
      }

      console.log('Update successful!');
      setSuccess(true);
      setPassword('');
      setConfirmPassword('');
      setAvatarFile(null);
      
      // Don't auto-redirect, let user manually click to go to home
    } catch (err: any) {
      console.error('Update failed:', err);
      setError(err.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: tokens.color.bg.canvas,
          color: tokens.color.text.primary,
          fontFamily: tokens.typography.family.mono,
        }}
      >
        <div>loading profile…</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: tokens.color.bg.canvas, border: `1px solid ${tokens.color.divider}` }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: tokens.color.bg.canvas, border: `1px solid ${tokens.color.divider}` }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: tokens.color.bg.canvas, border: `1px solid ${tokens.color.divider}` }} />
          </div>
        </div>

        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            {typedContent.map((line, idx) => {
              const showCursor = idx === typedContent.length - 1 && !isTypingComplete;
              const isDivider = line === '';
              const isTitle = idx === 1;
              const isLabel = line.includes('Email:');

              if (isDivider) {
                return <div key={idx} style={{ margin: '4px 0', height: '4px' }} />;
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

              if (isLabel) {
                return (
                  <div key={idx} style={{ marginBottom: '6px', lineHeight: 1.6, fontSize: '13px' }}>
                    <span style={{ color: tokens.color.text.secondary, fontWeight: 600 }}>
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
            })}
          </div>

          {isTypingComplete && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Profile Picture Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', color: tokens.color.text.secondary, fontWeight: 600 }}>
                  Profile Picture
                </label>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: tokens.color.bg.elevated,
                      border: `2px solid ${tokens.color.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ color: tokens.color.text.muted, fontSize: '24px' }}>?</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        border: `1px solid ${tokens.color.divider}`,
                        borderRadius: '4px',
                        color: tokens.color.text.primary,
                        fontSize: '13px',
                        fontFamily: tokens.typography.family.mono,
                        cursor: 'pointer',
                        opacity: uploadingAvatar ? 0.6 : 1,
                      }}
                    >
                      {avatarFile ? 'Change Image' : 'Upload Image'}
                    </button>
                    {avatarFile && (
                      <button
                        onClick={uploadAvatar}
                        disabled={uploadingAvatar}
                        style={{
                          padding: '8px 16px',
                          background: tokens.color.field.lilac,
                          border: 'none',
                          borderRadius: '4px',
                          color: tokens.color.bg.canvas,
                          fontSize: '13px',
                          fontFamily: tokens.typography.family.mono,
                          fontWeight: 600,
                          cursor: 'pointer',
                          opacity: uploadingAvatar ? 0.6 : 1,
                        }}
                      >
                        {uploadingAvatar ? 'Uploading...' : 'Save Image'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Username Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: tokens.color.text.secondary }}>
                  <span style={{ color: tokens.color.field.lilac }}>username:</span>
                  <input
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(null);
                      setSuccess(false);
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: `1px solid ${tokens.color.divider}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: tokens.color.text.primary,
                      fontFamily: tokens.typography.family.mono,
                      fontSize: '13px',
                      outline: 'none',
                      caretColor: tokens.color.text.primary,
                      marginTop: '8px',
                    }}
                    placeholder="your_username"
                    disabled={loading}
                  />
                </label>
              </div>

              {/* Email Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: tokens.color.text.secondary }}>
                  <span style={{ color: tokens.color.field.lilac }}>email:</span>
                  <input
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                      setSuccess(false);
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: `1px solid ${tokens.color.divider}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: tokens.color.text.primary,
                      fontFamily: tokens.typography.family.mono,
                      fontSize: '13px',
                      outline: 'none',
                      caretColor: tokens.color.text.primary,
                      marginTop: '8px',
                    }}
                    placeholder="your@email.com"
                    disabled={loading}
                  />
                </label>
              </div>

              {/* Password Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: tokens.color.text.secondary }}>
                  <span style={{ color: tokens.color.field.lilac }}>new password:</span>
                  <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                      setSuccess(false);
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: `1px solid ${tokens.color.divider}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: tokens.color.text.primary,
                      fontFamily: tokens.typography.family.mono,
                      fontSize: '13px',
                      outline: 'none',
                      caretColor: tokens.color.text.primary,
                      marginTop: '8px',
                    }}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </label>
              </div>

              {/* Confirm Password Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', color: tokens.color.text.secondary }}>
                  <span style={{ color: tokens.color.field.lilac }}>confirm password:</span>
                  <input
                    ref={confirmPasswordRef}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError(null);
                      setSuccess(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdate();
                      }
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: `1px solid ${tokens.color.divider}`,
                      borderRadius: '4px',
                      padding: '8px 12px',
                      color: tokens.color.text.primary,
                      fontFamily: tokens.typography.family.mono,
                      fontSize: '13px',
                      outline: 'none',
                      caretColor: tokens.color.text.primary,
                      marginTop: '8px',
                    }}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </label>
              </div>

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

              {success && (
                <div style={{ 
                  padding: '8px 12px', 
                  background: tokens.color.semantic.success + '20',
                  border: `1px solid ${tokens.color.semantic.success}`,
                  borderRadius: '4px',
                  color: tokens.color.semantic.success,
                  fontSize: '13px',
                }}>
                  Profile updated successfully!
                </div>
              )}

              <button
                onClick={() => {
                  console.log('Button clicked!');
                  handleUpdate();
                }}
                disabled={loading}
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
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>

              <button
                onClick={() => router.push('/home')}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'transparent',
                  color: tokens.color.text.secondary,
                  border: `1px solid ${tokens.color.divider}`,
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: tokens.typography.family.mono,
                  cursor: 'pointer',
                }}
              >
                Back to Home
              </button>
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

export default function Profile() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    </ThemeProvider>
  );
}
