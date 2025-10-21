import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const palette = {
  bg: '#0E0E10',
  ink: '#F5EDEE',
  magenta: '#D65CA9',
  lilac: '#B27CB6',
  orchid: '#A05C8D',
  muted: '#9AA0A6'
};

const helpSections = [
  {
    id: 'getting-started',
    title: 'GETTING STARTED',
    content: `──────────────────────────────────────────────
GETTING STARTED
──────────────────────────────────────────────

BASIC WORKFLOW:
1. Type /node to create your first Raw Node
2. Fill in title, description, and sources
3. Type /browse to see all nodes
4. Type /help anytime for this guide

QUICK COMMANDS:
/node       → Create a new Raw Node
/browse     → View all existing nodes  
/orient     → See the system introduction
/help       → Show this help system

WHAT IS A RAW NODE?
A Raw Node is a single, focused idea or observation.
Think of it as a "seed" that can grow into connections.

Example Raw Node:
Title: "Algorithms as curators of taste"
Description: "This TikTok reframed aesthetic judgment..."
Sources: "hktok.com/.123"

──────────────────────────────────────────────`
  },
  {
    id: 'commands',
    title: 'ALL COMMANDS',
    content: `──────────────────────────────────────────────
ALL COMMANDS
──────────────────────────────────────────────

NAVIGATION:
/orient     → System introduction and guide
/explore    → Browse existing fields and nodes
/help       → Show this help system
/back       → Return to previous screen

NODE CREATION:
/node       → Create a new Raw Node
/browse     → View all existing nodes
/search     → Find specific nodes (coming soon)
/filter     → Filter nodes by criteria (coming soon)

NODE MANAGEMENT:
/link       → Connect nodes together (coming soon)
/tend       → Review and maintain nodes (coming soon)
/edit       → Modify existing nodes (coming soon)

ACCOUNT:
/login      → Access your account
/guest      → Continue as read-only guest
/logout     → Sign out of your account

──────────────────────────────────────────────`
  },
  {
    id: 'examples',
    title: 'EXAMPLES',
    content: `──────────────────────────────────────────────
EXAMPLES
──────────────────────────────────────────────

EXAMPLE 1: Creating a Raw Node
> /node
[Opens node creation form]
Title: "Social media algorithms shape taste"
Description: "Platforms curate what we see, influencing..."
Sources: "research-paper.pdf, conversation with Sarah"

EXAMPLE 2: Browsing Nodes
> /browse
[Shows list of all your nodes]
Click any node to view details

EXAMPLE 3: Getting Help
> /help
[Shows this help system]
Click buttons or type: getting-started, commands, examples

EXAMPLE 4: System Introduction
> /orient
[Shows the orientation guide]
Learn about the system and best practices

EXAMPLE 5: Exploring
> /explore
[Browse existing fields and nodes]
See what others have created

WHAT MAKES A GOOD RAW NODE?
• One clear idea or observation
• Grounded in evidence or experience
• Specific enough to be useful
• Broad enough to connect to other ideas

──────────────────────────────────────────────`
  },
  {
    id: 'troubleshooting',
    title: 'TROUBLESHOOTING',
    content: `──────────────────────────────────────────────
TROUBLESHOOTING
──────────────────────────────────────────────

COMMON ISSUES:

Q: I typed /node but nothing happened
A: Make sure you're in the right stage. Try /orient first.

Q: I can't see my nodes after creating them
A: Type /browse to view all your nodes.

Q: The help page looks weird
A: Try refreshing the page or typing /help again.

Q: I'm stuck in a form
A: Look for Cancel button or try /back command.

Q: I forgot what commands are available
A: Type /help anytime to see this guide.

STILL STUCK?
• Type /orient to restart the introduction
• Type /help to see this guide again
• Try refreshing the page
• Check that you're typing commands correctly

──────────────────────────────────────────────`
  },
  {
    id: 'faq',
    title: 'FREQUENTLY ASKED QUESTIONS',
    content: `──────────────────────────────────────────────
FREQUENTLY ASKED QUESTIONS
──────────────────────────────────────────────

Q: What is a Raw Node?
A: A single, focused idea or observation. Think of it as 
   a "seed" that can grow into connections with other ideas.

Q: How do I create my first node?
A: Type /node in the main terminal, then fill in the form 
   with a title, description, and sources.

Q: Can I edit nodes after creating them?
A: Yes, you can edit your own nodes. Look for edit buttons 
   or try /edit command (coming soon).

Q: How do I find nodes I created?
A: Type /browse to see all your nodes in a list.

Q: What if I get lost?
A: Type /help anytime to see this guide, or /orient to 
   restart the introduction.

Q: Is this like social media?
A: No, this is for collaborative thinking and knowledge 
   building. No likes, follows, or viral content.

──────────────────────────────────────────────`
  }
];

const styles: any = {
  frameWrap: {
    background: '#0b0b0d',
    border: '1px solid #222',
    borderRadius: '10px',
    padding: '32px 40px',
    width: 'fit-content',
    margin: '80px auto',
    boxShadow: '0 0 60px rgba(208, 128, 208, 0.08)',
  },
  frame: {
    maxWidth: "64ch",
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontWeight: 400,
  },
  output: {
    whiteSpace: "pre-wrap",    // wrap long lines while preserving manual breaks
    lineHeight: 1.9,
    letterSpacing: "0.15px",
    fontSize: "18px",
    marginBottom: "10px",
  },
  hero: {
    color: palette.ink,
    display: "block",
    margin: "4px 0",
    fontSize: "18px",
  },
  header: {
    color: palette.lilac,
    fontSize: "18px",
    marginBottom: "12px",
  },
  cmdHint: {
    color: palette.magenta,
    fontSize: "18px",
    marginTop: "10px",
    display: "block",
  },
  promptRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "12px",
  },
  promptInputWrap: {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
  },
  promptCaret: {
    color: palette.magenta,
    borderRight: `2px solid ${palette.magenta}`,
    display: "inline-block",
    height: "1.4em",
    marginLeft: "4px",
    marginRight: "2px",
    width: 0,
    pointerEvents: "none" as const,
    animation: "blink 1.4s ease-in-out infinite",
  },
  promptSuggestion: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    font: "inherit",
    color: `${palette.magenta}66`,
    pointerEvents: "none" as const,
    whiteSpace: "pre" as const,
  },
  promptInput: {
    position: "relative",
    width: "38ch",
    background: "transparent",
    border: "none",
    outline: "none",
    color: palette.ink,
    font: "inherit",
    fontSize: "18px",
    caretColor: palette.magenta,
    textShadow: `0 0 6px ${palette.lilac}44`,
  } as React.CSSProperties,
  sectionList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
  sectionButton: {
    background: "transparent",
    border: "1px solid #333",
    color: palette.muted,
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  },
  sectionButtonActive: {
    background: "rgba(214, 92, 169, 0.1)",
    border: "1px solid #D65CA9",
    color: palette.magenta,
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  }
} as React.CSSProperties;

export default function HelpTerminal() {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    showHelpMenu();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [lines]);

  const write = (text: string, color?: string, delay: number = 2) => {
    // Add color styling to specific parts of the text
    const colorizedText = text
      .replace(/(\/[a-z-]+)/g, `<span style="color: ${palette.magenta}">$1</span>`)
      .replace(/(→)/g, `<span style="color: ${palette.lilac}">$1</span>`)
      .replace(/(\[.*?\])/g, `<span style="color: ${palette.lilac}">$1</span>`)
      .replace(/(>.*)/g, `<span style="color: ${palette.magenta}">$1</span>`)
      .replace(/(Q:.*)/g, `<span style="color: ${palette.lilac}">$1</span>`)
      .replace(/(A:.*)/g, `<span style="color: ${palette.ink}">$1</span>`);
    
    const lines = colorizedText.split('\n');
    setLines(prev => [...prev, ...lines]);
  };

  const showHelpMenu = () => {
    setLines([]);
    
    const menuContent = `FIELD NODES HELP SYSTEM
──────────────────────────────────────────────
select a topic to explore:

[ getting-started ]  [ commands ]  [ examples ]
[ troubleshooting ]  [ faq ]

type the section name or use the buttons above

QUICK SLASH COMMANDS:
/node       → Create a new Raw Node
/browse     → View all existing nodes
/orient     → System introduction
/home       → Return to main page
/help       → This help system

SECTION COMMANDS:
/getting-started  → Getting started guide
/commands        → All available commands
/examples        → Usage examples
/troubleshooting → Common issues
/faq             → Frequently asked questions

TIP: Type / and press Tab for auto-completion

──────────────────────────────────────────────`;
    
    write(menuContent);
  };

  const showSection = (sectionId: string) => {
    const section = helpSections.find(s => s.id === sectionId);
    if (!section) return;

    setCurrentSection(sectionId);
    setLines([]);
    write(section.content);
    write('\n\npress Enter to return to menu');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Auto-completion for slash commands
    if (value.startsWith('/')) {
      const allCommands = [
        'home', 'browse', 'orient', 'node', 'help',
        'getting-started', 'commands', 'examples', 'troubleshooting', 'faq'
      ];
      
      const matchingCommand = allCommands.find(cmd => 
        cmd.startsWith(value.slice(1).toLowerCase())
      );
      
      
      if (matchingCommand) {
        setSuggestion(`/${matchingCommand}`);
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      e.stopPropagation();
      setInput(suggestion);
      setSuggestion('');
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      let command = input.trim().toLowerCase();
      
      // Remove leading slash if present
      if (command.startsWith('/')) {
        command = command.slice(1);
      }
      
      if (command === '') {
        if (currentSection) {
          showHelpMenu();
          setCurrentSection('');
        }
        return;
      }

      if (command === 'menu' || command === 'back') {
        showHelpMenu();
        setCurrentSection('');
        setInput('');
        return;
      }

      // Check if it's a section name
      const section = helpSections.find(s => s.id === command);
      if (section) {
        showSection(section.id);
        setInput('');
        return;
      }

      // Handle navigation commands
      if (command === 'home') {
        router.push('/?command=home');
        return;
      }

      if (command === 'browse') {
        router.push('/?command=browse');
        return;
      }

      if (command === 'orient') {
        router.push('/?command=orient');
        return;
      }

      if (command === 'node') {
        router.push('/?command=node');
        return;
      }

      // Handle other commands
      if (command === 'help') {
        showHelpMenu();
        setInput('');
        return;
      }

      // Unknown command
      write(`unknown command: ${command}\ntry: getting-started, commands, examples, troubleshooting, faq\nor: home, browse, orient, node`);
      setInput('');
    }
  };

  const handleSectionClick = (sectionId: string) => {
    showSection(sectionId);
    setInput('');
  };

  return (
    <>
      <style jsx global>{`
        @keyframes blink { 0%{opacity:.2} 50%{opacity:1} 100%{opacity:.2} }
        body, html {
          margin: 0;
          padding: 0;
          background: #0E0E10;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <div
        style={{
          minHeight:"100dvh",
          background: palette.bg,
          color: palette.ink,
          fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          padding: "32px 16px",
        }}
      >
      <div style={styles.frameWrap}>
        <div style={styles.frame}>
          <div
            style={styles.output}
            dangerouslySetInnerHTML={{ __html: lines.join("\n") }}
          />
          
          <div style={styles.sectionList}>
            {helpSections.map((section) => (
              <button
                key={section.id}
                style={currentSection === section.id ? styles.sectionButtonActive : styles.sectionButton}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.id}
              </button>
            ))}
          </div>
          
          <div style={styles.promptRow}>
            <span style={{color:palette.magenta}}>&gt;</span>
            <span style={styles.promptCaret} />
            <div style={styles.promptInputWrap}>
              <input
                ref={inputRef}
                style={styles.promptInput}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder=""
                autoFocus
              />
              {suggestion && (
                <span style={styles.promptSuggestion}>
                  {suggestion.slice(input.length)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
