import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRouter } from 'next/router';

function SignUpPage() {
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
        <div style={{ color: tokens.color.field.lilac, marginBottom: '24px', fontSize: '20px' }}>
          guest@fieldnodes:~SIGNUP
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            color: tokens.color.text.primary, 
            fontSize: '24px', 
            marginBottom: '16px',
            fontWeight: 'normal'
          }}>
            Create Account
          </h1>
          
          <p style={{ 
            color: tokens.color.text.primary, 
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>
            Account creation is coming soon! For now, you can explore the platform as a guest.
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: tokens.color.field.lilac, 
            fontSize: '18px', 
            marginBottom: '16px',
            fontWeight: 'normal',
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
          }}>
            What's Coming
          </h2>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ 
              color: tokens.color.text.primary, 
              marginBottom: '8px',
              lineHeight: '1.6'
            }}>
              • Email-based authentication with magic links
            </div>
            <div style={{ 
              color: tokens.color.text.primary, 
              marginBottom: '8px',
              lineHeight: '1.6'
            }}>
              • Username selection and profile creation
            </div>
            <div style={{ 
              color: tokens.color.text.primary, 
              marginBottom: '8px',
              lineHeight: '1.6'
            }}>
              • Collaborative research fields
            </div>
            <div style={{ 
              color: tokens.color.text.primary, 
              marginBottom: '8px',
              lineHeight: '1.6'
            }}>
              • Real-time node creation and editing
            </div>
            <div style={{ 
              color: tokens.color.text.primary, 
              marginBottom: '8px',
              lineHeight: '1.6'
            }}>
              • Are.na integration for research collections
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: tokens.color.field.lilac, 
            fontSize: '18px', 
            marginBottom: '16px',
            fontWeight: 'normal',
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
          }}>
            Guest Experience
          </h2>
          
          <p style={{ 
            color: tokens.color.text.primary, 
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>
            As a guest, you can explore the platform, learn about Field Nodes concepts, 
            and get familiar with the interface. When account creation is available, 
            you'll be able to save your research and collaborate with others.
          </p>
        </div>

        <div style={{ marginTop: '32px', marginBottom: '16px' }}>
          <div style={{
            color: tokens.color.field.lilac,
            marginBottom: '8px',
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
          }}>
            type /orientate to learn about Field Nodes
          </div>
          <div style={{ 
            color: tokens.color.field.lilac, 
            marginBottom: '8px',
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
          }}>
            type /help to see all available commands
          </div>
          <div style={{ 
            color: tokens.color.field.lilac, 
            marginBottom: '16px',
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
          }}>
            type /home to return to the main screen
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', position: 'relative' }}>
          <span style={{ 
            color: tokens.color.field.lilac,
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
          }}>&gt;</span>
          <span style={{ 
            color: tokens.color.field.lilac, 
            borderRight: `2px solid ${tokens.color.field.lilac}`, 
            height: '1.4em', 
            width: '0', 
            animation: 'blink 1.4s ease-in-out infinite',
            textShadow: tokens.color.field.lilac === '#059669' ? '0 0 8px rgba(5, 150, 105, 0.3)' : 'none'
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
              caretColor: tokens.color.field.lilac,
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

export default function SignUp() {
  return (
    <ThemeProvider>
      <SignUpPage />
    </ThemeProvider>
  );
}
