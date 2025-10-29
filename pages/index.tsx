import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Index() {
  const router = useRouter();
  
  useEffect(() => {
    // Always redirect to landing page
    router.push('/landing');
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
      <div>redirecting...</div>
    </div>
  );
}

