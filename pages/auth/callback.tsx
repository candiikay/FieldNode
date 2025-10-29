import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/?error=auth_failed');
          return;
        }

        if (data.session) {
          // Always redirect to profile first for Google OAuth users
          // The profile page will handle checking if username exists
          const userId = data.session.user.id;
          try {
            const { data: profile } = await supabase
              .from('users')
              .select('username')
              .eq('id', userId)
              .single();

            // If no username exists, go to profile to set one
            if (!profile || !profile.username) {
              console.log('No username found, redirecting to profile');
              router.push('/profile');
            } else {
              // Has username, go to their personal home
              console.log('Username found:', profile.username, 'redirecting to home');
              router.push('/home');
            }
          } catch (profileError: any) {
            // If profile doesn't exist yet (error code PGRST116), redirect to profile
            console.log('Profile not found, redirecting to profile:', profileError);
            router.push('/profile');
          }
        } else {
          // No session, redirect to landing
          router.push('/landing');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        router.push('/?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B0B0D',
      color: '#F5EDEE',
      fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    }}>
      <div>authenticating...</div>
    </div>
  );
}
