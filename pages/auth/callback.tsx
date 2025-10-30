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
          // Just go to home - let the home page handle routing
          router.push('/home');
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
