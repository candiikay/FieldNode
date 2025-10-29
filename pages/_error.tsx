import { ThemeProvider } from '@/contexts/ThemeContext';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useEffect } from 'react';

function Error({ statusCode }: { statusCode: number }) {
  const tokens = useThemeTokens();

  useEffect(() => {
    // Log error for debugging
    console.error('Error page rendered with status code:', statusCode);
  }, [statusCode]);

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
          border: `1px solid ${tokens.color.divider}`,
          borderRadius: '6px',
          padding: '32px',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            color: tokens.color.semantic.error,
            marginBottom: '8px',
          }}>
            {statusCode ? `Error ${statusCode}` : 'An Error Occurred'}
          </h1>
          <p style={{ 
            color: tokens.color.text.secondary,
            fontSize: '14px',
          }}>
            {statusCode === 404
              ? 'The page you are looking for does not exist.'
              : 'Something went wrong. Please try again.'}
          </p>
        </div>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: tokens.color.field.lilac,
            color: tokens.color.bg.canvas,
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

function ErrorPage({ statusCode }: { statusCode: number }) {
  return (
    <ThemeProvider>
      <Error statusCode={statusCode} />
    </ThemeProvider>
  );
}

export default ErrorPage;

