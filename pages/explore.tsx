import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRouter } from 'next/router';

function BrowsePage() {
  const tokens = useThemeTokens();
  const router = useRouter();

  const handleCommand = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case '/home':
        router.push('/');
        break;
      case '/orientate':
        router.push('/orientate');
        break;
      case '/help':
        router.push('/help');
        break;
      case '/node':
        router.push('/node');
        break;
      default:
        // Handle other commands here
        break;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: tokens.color.bg.canvas,
      color: tokens.color.text.primary,
      fontFamily: tokens.typography.family.mono,
      padding: '32px',
    }}>
      {/* Theme Toggle */}
      <ThemeToggle />
      
      <div style={{
        background: tokens.color.bg.elevated,
        border: `1px solid ${tokens.color.divider}`,
        borderRadius: '12px',
        padding: '64px 48px',
        width: 'fit-content',
        margin: '64px auto',
        boxShadow: tokens.shadow.soft,
        maxWidth: '800px',
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span style={{ 
            color: tokens.color.text.primary, 
            marginRight: '8px',
            fontSize: '16px'
          }}>┌─</span>
          <div style={{ color: tokens.color.text.primary, fontSize: '18px', fontWeight: 'bold' }}>
            BROWSE NODES
          </div>
        </div>
        
        <div style={{ 
          borderBottom: `1px solid ${tokens.color.divider}`, 
          marginBottom: '24px',
          width: '100%'
        }}></div>
        
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            color: tokens.color.text.primary, 
            marginBottom: '8px',
            fontSize: '15px'
          }}>
            no nodes found yet.
          </div>
          <div style={{ 
            color: tokens.color.text.primary, 
            marginBottom: '8px',
            fontSize: '15px'
          }}>
            create the first node to start building the field.
          </div>
          <div style={{ 
            color: tokens.color.text.primary, 
            marginBottom: '16px',
            fontSize: '15px'
          }}>
            every node needs evidence — links, images, videos, or files.
          </div>
        </div>

        <div style={{ 
          borderBottom: `1px solid ${tokens.color.divider}`, 
          marginBottom: '16px',
          width: '100%'
        }}></div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            color: tokens.color.field.magenta, 
            marginBottom: '16px',
            fontSize: '15px'
          }}>
            type /node to create the first node
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', position: 'relative' }}>
          <span style={{ 
            color: tokens.color.field.magenta,
            textShadow: tokens.color.field.magenta === '#D65CA9' ? '0 0 8px rgba(214, 92, 169, 0.3)' : 'none'
          }}>&gt;</span>
          <span style={{ 
            color: tokens.color.field.magenta, 
            borderRight: `2px solid ${tokens.color.field.magenta}`, 
            height: '1.4em', 
            width: '0', 
            animation: 'blink 1.4s ease-in-out infinite',
            textShadow: tokens.color.field.magenta === '#D65CA9' ? '0 0 8px rgba(214, 92, 169, 0.3)' : 'none'
          }}></span>
          
          <input 
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: tokens.color.text.primary,
              font: 'inherit',
              fontSize: '18px',
              width: '38ch',
              position: 'relative',
              zIndex: 2,
              caretColor: tokens.color.field.magenta,
            }}
            autoFocus
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const cmd = e.currentTarget.value;
                e.currentTarget.value = '';
                handleCommand(cmd);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Browse() {
  return (
    <ThemeProvider>
      <BrowsePage />
    </ThemeProvider>
  );
}
