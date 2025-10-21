import {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import RawNodeEditor from './RawNodeEditor';
import { NodeStorage } from '../services/storage';
import { Node } from '../types';

type Stage = 'origin'|'orient'|'covenant'|'identify'|'login'|'lineage'|'reflect'|'link'|'tend'|'offer'|'create-node'|'browse-nodes'|'node-detail'|'account-confirmed';

const palette = {
  bg:'#0E0E10', ink:'#F5EDEE', magenta:'#D65CA9', lilac:'#B27CB6', orchid:'#A05C8D', muted:'#9AA0A6'
};

  const stageCommands: Record<Stage, string[]> = {
    origin: ['/node','/browse','/orient','/home','/help'],
    orient: ['/home','/help','/explore'],
    covenant: ['/home','/agree','/policy','/exit'],
    identify: ['/home','/login','/guest'],
    login: ['/home','/login'],
    'account-confirmed': ['/home','/explore'],
    lineage: ['/home','/node','/browse','/explore','/help'],
    reflect: ['/home','/link','/tend','/explore','/offer','/node','/browse','/help'],
    link: ['/home','/tend','/explore','/offer','/node','/browse','/help'],
    tend: ['/home','/done','/help'],
    offer: ['/home','/publish','/back'],
    'create-node': ['/home','/cancel'],
    'browse-nodes': ['/home','/node','/back','/search','/filter','/help'],
    'node-detail': ['/home','/link','/tend','/back','/edit','/help'],
  };

  const orientPages = [
    `welcome to FIELD NODES
──────────────────────────────────────────────
a shared environment for collaborative thinking
each idea lives as a node—connected, editable,
and part of a collective field of knowledge
──────────────────────────────────────────────

📖 ABOUT
Field Nodes is not social media or a feed.
It's a collaborative workspace where participants
create, connect, and care for ideas.
You can explore existing nodes, add your own,
or reflect on others.

🧭 BASIC COMMANDS
   /orient     see this guide again
   /explore    browse existing fields and nodes
   /help       list all available commands

💡 BEST PRACTICES
   • move slowly — context matters
   • listen before adding
   • name things clearly so others can find them
   • credit existing connections when you extend them`,
  ];

const covenantBlock = `──────────────────────────────────────────────
FIELD NODES COVENANT
──────────────────────────────────────────────
Before joining, review our shared principles:

• Knowledge here is collective, additive, and attributed.
• We design for care, not competition.
• Contributions can be linked, forked, and preserved with credit.
• We honor pacing, rest, and context.
• We reject harassment, extraction, and scarcity.

To participate, you must agree to uphold these values.

[ type /agree ]   [ /policy ]   [ /exit ]
──────────────────────────────────────────────`;

const identityIntro = `──────────────────────────────────────────────
ACCOUNT CREATION
──────────────────────────────────────────────
to write and create in the field, you need an account:

choose a name: [type below]
choose a password: [type below]

──────────────────────────────────────────────
Already have an account? type /login
Want to browse first? type /guest`;

function formatHandle(name?:string){
  if(!name) return 'guest';
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g,'');
  return cleaned.length ? cleaned : 'guest';
}

function identityConfirmedBlock(name:string){
  return `──────────────────────────────────────────────
IDENTITY CONFIRMED
──────────────────────────────────────────────
welcome, ${formatHandle(name)}@fieldnodes
your space has been initialized

STATE: exploring
MODE: collective
DATA: local-first sync ON

ready when you are.`;
}

function explorationBlockFor(handle:string){
  return `exploration mode initiated...
┌─ ACTIVE FIELDS ─────────────────────────────┐
│  system_design     (14 connected nodes)     │
│  feminist_theory   (22 connected nodes)     │
│  mutual_aid        (17 connected nodes)     │
│  archiving         (10 connected nodes)     │
│  infrastructure    (8 connected nodes)      │
└─────────────────────────────────────────────┘

📍 YOU ARE HERE
   ${handle}:~FIELD
   STATE: exploring | MODE: collective

🧭 NEXT STEPS
   /enter [field_name]     → explore one field
   /map                    → view full network
   /help                   → list all commands

💡 TIP
   browse first, contribute second
   the field grows best through relation`;
}

const rolePromptBlock = `──────────────────────────────────────────────
ROLE DISCOVERY
──────────────────────────────────────────────
you are tending your first node

how would you describe your role today?
(observer / builder / reflector / steward)

roles can change as you move through the field.
choose one that feels right for now:
role: [_________]
──────────────────────────────────────────────`;

const styles = {
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
};


export default function FieldNodesTerminal(){
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [stage, setStage] = useState<Stage>('origin');
  const [input, setInput] = useState('');
  const [draft, setDraft] = useState('');
  const [unlockedSeed, setUnlockedSeed] = useState(false);
  const [userIdentity, setUserIdentity] = useState<{name:string, role:string, password?:string}|null>(null);
  const [accountStep, setAccountStep] = useState<'name'|'password'|'complete'>('name');
  const [showNodeForm, setShowNodeForm] = useState(false);
  const [browseNodes, setBrowseNodes] = useState<Node[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasBooted = useRef(false);
  const orientIndexRef = useRef(0);
  const [suggestion, setSuggestion] = useState('');

  useEffect(()=>{
    if(hasBooted.current) return;
    hasBooted.current = true;
    boot();
  },[]);
  
  // Handle URL command parameters
  useEffect(() => {
    const { command } = router.query;
    if (command && typeof command === 'string') {
      // Small delay to ensure component is ready
      setTimeout(() => {
        handleCommand(command);
      }, 100);
    }
  }, [router.query]);
  
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); },[lines]);
  useEffect(()=>{
    const onSlash = (e: KeyboardEvent)=>{
      if(e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if(target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)){
        return;
      }
      e.preventDefault();
      inputRef.current?.focus();
      setInput('/');
    };
    window.addEventListener('keydown', onSlash);
    return ()=>window.removeEventListener('keydown', onSlash);
  },[]);
  useEffect(()=>{
    setSuggestion(getSuggestion(input, stage));
  },[input, stage]);

  function push(s:string){ setLines(l=>[...l, s]); }
  
  function hero(text: string){
    return `<span style="
      color:${palette.ink};
      display:block;
      margin:4px 0;
      font-size:18px;
    ">${escapeHtml(text)}</span>`;
  }
  
  async function typeText(text: string, delay: number = 2): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          // Replace the last line instead of adding new ones
          setLines(prev => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = text.slice(0, i + 1);
            return newLines;
          });
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, Math.max(1, delay + Math.random() * 2)); // quicker cadence
    });
  }
  
  async function boot(){
    // Initial connection delay - much faster
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Start with empty line for typing
    push('');
    await typeText(`<span style="color:${palette.lilac};font-size:18px">guest@fieldnodes:~FIELD</span>`);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    push('');
    await typeText(hero("welcome to a space where thoughts connect"));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    push('');
    await typeText(hero("where ideas grow through relation, not competition"));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    push('');
    await typeText(hero("this is not about being seen"));
    await new Promise(resolve => setTimeout(resolve, 150));
    
    push('');
    await typeText(hero("it's about listening, tending, belonging"));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    push('');
    await typeText(`<span style="color:${palette.magenta};font-size:18px">&gt; type /node to create your first node</span>`);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    push('');
    await typeText(`<span style="color:${palette.magenta};font-size:18px">&gt; type /browse to explore existing nodes</span>`);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    push('');
    await typeText(`<span style="color:${palette.magenta};font-size:18px">&gt; type /orient to learn more about the system</span>`);
    
    // Small delay before input becomes active
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  function color(text:string, kind:'accent'|'muted'|'prompt'='accent'){
    const c = kind==='accent'?palette.magenta : kind==='muted'? palette.muted : palette.lilac;
    return `<span style="color:${c}">${escapeHtml(text)}</span>`;
  }
  function escapeHtml(s:string){ return s.replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c] as string)); }

  const pause = (ms:number = 35)=> new Promise(resolve => setTimeout(resolve, ms));

  async function write(text:string, kind?:'accent'|'muted'|'prompt'){
    push('');
    await typeText(kind ? color(text, kind) : text);
    await pause(25);
  }

  async function handleCommand(raw:string){
    let cmd = raw.trim();
    
    // Remove leading slash if present (consistent with HelpTerminal)
    if (cmd.startsWith('/')) {
      cmd = cmd.slice(1);
    }
    if(stage==='orient' && cmd===''){
      setInput('');
      setSuggestion('');
      await showCovenant();
      return;
    }
    if(stage==='covenant' && cmd===''){
      setInput('');
      setSuggestion('');
      await write('type /agree to continue or /policy to review terms.','muted');
      return;
    }
    push('');
    await typeText(color(`> ${cmd}`, 'accent'));
    await pause(10);
    setInput('');
    setSuggestion('');

    switch(stage){
      case 'origin':{
        if(cmd==='node'){
          setStage('create-node');
          setShowNodeForm(true);
          return;
        }
        if(cmd==='browse'){
          await showBrowseNodes();
          return;
        }
        if(cmd==='orient'){ await runOrient(); return; }
        if(cmd==='home'){ 
          setStage('origin');
          setLines([]); // Clear terminal completely
          await boot();
          return; 
        }
        if(cmd==='join'){ await handleJoin(); return; }
        if(cmd==='reflect'){ await handleReflect(); return; }
        if(cmd==='help'){ router.push('/help'); return; }
        await write('type /node to create your first node','muted');
        return;
      }
       case 'orient':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='explore'){ await showIdentityIntro(); return; }
         if(cmd==='help'){ router.push('/help'); return; }
         if(cmd===''){ await showCovenant(); return; }
         await write('press Enter to continue or /explore to skip.','muted');
         return;
       }
      case 'covenant':{
        if(cmd==='home'){ 
          setStage('origin');
          setLines([]); // Clear terminal completely
          await boot();
          return; 
        }
        if(cmd==='agree'){ await showIdentityIntro(); return; }
        if(cmd==='policy'){
          await write('opening the shared policy archive (placeholder).','muted');
          await write('type /agree when you are ready to continue.','muted');
          return;
        }
        if(cmd==='exit'){
          await write('connection closed. type /orient to reconnect.','muted');
          setStage('origin');
          return;
        }
        await write('available: /home · /agree · /policy · /exit','muted');
        return;
      }
       case 'identify':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='login'){
           await write('username: [__________]','muted');
           await write('format: username: [your username]','accent');
           setStage('login');
           return;
         }
         if(cmd==='guest'){
           setUserIdentity({name:'guest', role:'observer'});
           await write('welcome, guest! you can browse and explore.');
           await write('to write and create, you\'ll need an account.');
           await showExplorationIntro('guest');
           return;
         }
         // Handle account creation steps (non-command input)
         if(cmd !== 'home' && cmd !== 'login' && cmd !== 'guest'){
           if(accountStep === 'name'){
             const name = cmd.trim();
             if(name.length < 2){ await write('please provide a name (2+ characters)','muted'); return; }
             setUserIdentity({name, role: '', password: ''});
             setAccountStep('password');
             await showPasswordScreen(name);
             return;
           }
           if(accountStep === 'password'){
             const password = cmd.trim();
             if(password.length < 4){ await write('password must be at least 4 characters','muted'); return; }
             setUserIdentity(prev => prev ? {...prev, password} : null);
             setAccountStep('complete');
             await showAccountConfirmed(userIdentity?.name || '');
             return;
           }
         }
         await write('just type your name, or use /login /guest','muted');
         return;
       }
       case 'account-confirmed':{
         if(cmd===''){ await showExplorationIntro(userIdentity?.name || ''); return; }
         await write('press Enter to begin exploring','muted');
         return;
       }
      case 'login':{
        if(cmd==='home'){ 
          setStage('origin');
          setLines([]); // Clear terminal completely
          await boot();
          return; 
        }
        // Handle login steps (non-command input)
        if(cmd !== 'home' && cmd !== 'login'){
          if(accountStep === 'name'){
            const username = cmd.trim();
            if(username.length < 2){ await write('please provide a username (2+ characters)','muted'); return; }
            setUserIdentity({name: username, role: '', password: ''});
            setAccountStep('password');
            await write(`username: ${username}`);
            await write('password:');
            return;
          }
          if(accountStep === 'password'){
            const password = cmd.trim();
            if(password.length < 4){ await write('password must be at least 4 characters','muted'); return; }
            // In real app, verify password here
            await write(`welcome back, ${userIdentity?.name || 'user'}`);
            await write('you are now connected to the field');
            await write('available actions: /reflect · /link · /tend · /explore','accent');
            setStage('reflect');
            return;
          }
        }
        await write('just type your username','muted');
        return;
      }
       case 'lineage':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='map'){
           await write('rendering network map… (prototype placeholder)','muted');
           return;
         }
         if(cmd==='node'){
           if(userIdentity?.name === 'guest'){
             await write('guests cannot create nodes. create an account to participate.','muted');
             return;
           }
           setStage('create-node');
           setShowNodeForm(true);
           return;
         }
         if(cmd==='browse'){
           await showBrowseNodes();
           return;
         }
         if(cmd==='help'){ router.push('/help'); return; }
         if(cmd==='explore'){
           await showExplorationIntro(userIdentity?.name || undefined);
           return;
         }
         if(cmd==='lineage'){
           await write('field exploration coming soon. for now, create nodes to build the field.');
           await write('type /node to create your first node, or /browse to see existing ones.');
           return;
         }
         await write('available: /node · /browse · /explore','muted');
         return;
       }
       case 'reflect':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         // Check if user is guest (read-only)
         if(userIdentity?.name === 'guest'){
           if(cmd==='explore'){
             await write('node interface coming soon. for now, use /browse to see nodes.');
             push(color('type /reflect to return to writing','muted'));
             return;
           }
           if(cmd==='browse'){
             await showBrowseNodes();
             return;
           }
           await write('guests can only browse. create an account to write and create.','muted');
           await write('type /login to create an account.','muted');
           return;
         }
         
         if(cmd==='node'){
           setStage('create-node');
           setShowNodeForm(true);
           return;
         }
         
         if(cmd==='browse'){
           await showBrowseNodes();
           return;
         }
         
         if(cmd.startsWith('role:') && !userIdentity?.role){
           const role = cmd.replace('role:','').trim().toLowerCase();
           const validRoles = ['observer','builder','reflector','steward'];
           if(!validRoles.includes(role)){ await write('choose: observer · builder · reflector · steward','muted'); return; }
           setUserIdentity(prev => ({...prev, role, name: prev?.name ?? 'guest'}));
           await write(`role recorded: ${role}`);
           await write('you may now tend your node with context.','muted');
           return;
         }
         if(cmd==='link'){
           if(draft.trim().length<10){ await write('add a bit more before linking (~10+ chars).','muted'); return; }
           setUnlockedSeed(true);
           await write(`link recorded. thank you for tending the field.`);
           await write('/tend is now available for maintenance.','accent');
           await write('you can /offer to publish or keep exploring.','muted');
           setStage('link');
           return;
         }
         if(cmd==='tend'){
           await write('tending mode: add sources, citations, or care-notes');
           await write('format: source: [url] or note: [your note]','muted');
           setStage('tend');
           return;
         }
         if(cmd==='explore'){
           await write('exploration mode: browse existing nodes or create new ones.');
           await write('type /browse to see nodes, or /node to create a new one.');
           return;
         }
         if(cmd==='offer'){
           setStage('offer');
           await write('identity ritual (mock) — Supabase wiring pending.','muted');
           return;
         }
         return;
       }
      case 'link':{
        if(cmd==='home'){ 
          setStage('origin');
          setLines([]); // Clear terminal completely
          await boot();
          return; 
        }
        if(cmd==='tend'){
          await write('tending mode: add sources, citations, or care-notes');
          await write('format: source: [url] or note: [your note]','muted');
          setStage('tend');
          return;
        }
        if(cmd==='explore'){
          await write('node interface coming soon. for now, use /browse to see nodes.');
          push(color('type /reflect to return to writing','muted'));
          return;
        }
        if(cmd==='offer'){
          setStage('offer');
          await write('identity ritual (mock) — Supabase wiring pending.','muted');
          return;
        }
        await write('available: /tend /explore /offer','muted');
        return;
      }
      case 'tend':{
        if(cmd==='home'){ 
          setStage('origin');
          setLines([]); // Clear terminal completely
          await boot();
          return; 
        }
        if(cmd.startsWith('source:')){
          const source = cmd.replace('source:','').trim();
          await write(`source added: ${source}`);
          await write('add another source or note, or type /done to finish','muted');
          return;
        }
        if(cmd.startsWith('note:')){
          const note = cmd.replace('note:','').trim();
          await write(`care-note added: ${note}`);
          await write('add another source or note, or type /done to finish','muted');
          return;
        }
        if(cmd==='done'){
          await write('tending complete. node maintained.');
          await write('available: /reflect /explore /offer','muted');
          setStage('link');
          return;
        }
        await write('format: source: [url] or note: [your note] or /done','muted');
        return;
      }
       case 'offer':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='publish'){
           await write('publishing flow coming soon.','muted');
           return;
         }
         if(cmd==='back'){
           setStage('reflect');
           await write('returning to reflection.','muted');
           return;
         }
         await write('available: /publish /back','muted');
         return;
       }
       case 'create-node':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='cancel'){
           setShowNodeForm(false);
           setStage('lineage');
           await write('node creation cancelled.','muted');
           return;
         }
         await write('use the form above to create your node, or /cancel to go back.','muted');
         return;
       }
       case 'browse-nodes':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='back'){
           setStage('lineage');
           await write('returning to exploration.','muted');
           return;
         }
         if(cmd==='node'){
           if(userIdentity?.name === 'guest'){
             await write('guests cannot create nodes. create an account to participate.','muted');
             return;
           }
           setStage('create-node');
           setShowNodeForm(true);
           return;
         }
         if(cmd==='search'){
           await write('search functionality coming soon.','muted');
           return;
         }
         if(cmd==='filter'){
           await write('filter functionality coming soon.','muted');
           return;
         }
         await write('available: /back · /node · /search · /filter','muted');
         return;
       }
       case 'node-detail':{
         if(cmd==='home'){ 
           setStage('origin');
           setLines([]); // Clear terminal completely
           await boot();
           return; 
         }
         if(cmd==='back'){
           setStage('browse-nodes');
           await write('returning to node browser.','muted');
           return;
         }
         if(cmd==='link'){
           await write('link creation coming soon.','muted');
           return;
         }
         if(cmd==='tend'){
           await write('node tending coming soon.','muted');
           return;
         }
         if(cmd==='edit'){
           await write('node editing coming soon.','muted');
           return;
         }
         await write('available: /back · /link · /tend · /edit','muted');
         return;
       }
       default:
         await write('command not handled in this stage.','muted');
    }
  }

  async function handleJoin(){
    setAccountStep('name');
    setStage('login');
    
    const content = `do you have an account?

just type your username below:`;
    
    await showNewScreen(
      'LOGIN',
      content,
      'type your username:'
    );
  }

  async function handleReflect(){
    setAccountStep('name');
    setStage('login');
    
    const content = `do you have an account?

just type your username below:`;
    
    await showNewScreen(
      'LOGIN',
      content,
      'type your username:'
    );
  }

  async function runOrient(){
    orientIndexRef.current = 0;
    setStage('orient');
    setLines([]);
    await write('orientation initiated…','muted');
    await showOrientScreen();
  }

  async function showOrientScreen(){
    const content = `welcome to FIELD NODES
──────────────────────────────────────────────
a shared environment for collaborative thinking
each idea lives as a node—connected, editable,
and part of a collective field of knowledge
──────────────────────────────────────────────

📖 ABOUT
Field Nodes is not social media or a feed.
It's a collaborative workspace where participants
create, connect, and care for ideas.
You can explore existing nodes, add your own,
or reflect on others.

🧭 BASIC COMMANDS
   /orient     see this guide again
   /explore    browse existing fields and nodes
   /help       list all available commands

💡 BEST PRACTICES
   • move slowly — context matters
   • listen before adding
   • name things clearly so others can find them
   • credit existing connections when you extend them`;
    
    await showNewScreen(
      'ORIENTATION',
      content,
      'press Enter to continue or /explore to skip'
    );
  }

  async function showNewScreen(title: string, content: string, prompt: string){
    // Clear screen and show new context
    setLines([]);
    await pause(200);
    
    // Show screen title
    await write(`┌─ ${title} ─────────────────────────────────────────┐`);
    await pause(100);
    
    // Show content
    await write(content);
    await pause(200);
    
    // Show prompt
    await write(`└───────────────────────────────────────────────────┘`);
    await pause(100);
    await write(prompt, 'accent');
  }

  async function showPasswordScreen(name: string){
    const content = `account creation in progress...

name: ${name} ✓
password: [type below]

choose a secure password (minimum 4 characters)`;
    
    await showNewScreen(
      'PASSWORD SETUP',
      content,
      'type your password:'
    );
  }

  async function showAccountConfirmed(name: string){
    setStage('account-confirmed');
    const content = `account created successfully!

welcome, ${formatHandle(name)}@fieldnodes
your space has been initialized

STATE: exploring
MODE: collective
DATA: local-first sync ON

ready when you are.`;
    
    await showNewScreen(
      'ACCOUNT CONFIRMED',
      content,
      'press Enter to begin exploring'
    );
  }

  async function showCovenant(){
    setStage('covenant');
    const content = `Before joining, review our shared principles:

• Knowledge here is collective, additive, and attributed.
• We design for care, not competition.
• Contributions can be linked, forked, and preserved with credit.
• We honor pacing, rest, and context.
• We reject harassment, extraction, and scarcity.

To participate, you must agree to uphold these values.`;
    
    await showNewScreen(
      'FIELD NODES COVENANT',
      content,
      'type /agree to continue or /policy to review terms'
    );
  }

  async function showIdentityIntro(){
    setStage('identify');
    setAccountStep('name');
    
    const content = `to write and create in the field, you need an account:

choose a name: [type below]
choose a password: [type below]

Already have an account? type /login
Want to browse first? type /guest`;
    
    await showNewScreen(
      'ACCOUNT CREATION',
      content,
      'type your name below:'
    );
  }

  async function showExplorationIntro(nameOverride?:string){
    setStage('lineage');
    const handle = `${formatHandle(nameOverride ?? userIdentity?.name)}@fieldnodes`;
    
    const content = `┌─ EXPLORATION MODE ──────────────────────────┐
│  welcome to the field of collaborative     │
│  thinking and knowledge building            │
└─────────────────────────────────────────────┘

📍 YOU ARE HERE
   ${handle}
   STATE: exploring | MODE: collective

💡 TIP
   create nodes to start building the field
   every node needs evidence — links, images, videos, or files`;
    
    await showNewScreen(
      'EXPLORATION MODE',
      content,
      'type /node to create your first node, or /lineage to explore fields'
    );
  }

  async function showBrowseNodes(){
    setStage('browse-nodes');
    const nodes = NodeStorage.getAllNodes();
    setBrowseNodes(nodes);
    
    if(nodes.length === 0){
      const content = `no nodes found yet.

create the first node to start building the field.

every node needs evidence — links, images, videos, or files.`;
      
      await showNewScreen(
        'BROWSE NODES',
        content,
        'type /node to create the first node'
      );
      return;
    }

    const content = `found ${nodes.length} nodes in the field:

${nodes.slice(0, 10).map((node, i) => 
  `[${i + 1}] ${node.title} [${node.status}] by @${node.author} (${node.connectionCount} connections)`
).join('\n')}

${nodes.length > 10 ? `... and ${nodes.length - 10} more` : ''}

click a node number to view details`;
    
    await showNewScreen(
      'BROWSE NODES',
      content,
      'type node number to view, /node to create, or /back to return'
    );
  }

  async function handleNodeCreated(nodeData: any){
    setShowNodeForm(false);
    setStage('lineage');
    
    // Convert RawNodeEditor data to Node format
    const node: Node = {
      id: nodeData.id,
      title: nodeData.statement,
      thought: nodeData.description,
      origin: {
        type: 'other',
        description: nodeData.sources.join(', ') || 'No source provided'
      },
      artifacts: nodeData.sources.map((source: string) => ({
        type: 'url' as const,
        url: source,
        metadata: {
          title: source
        }
      })),
      tags: [],
      suggestedConnections: [],
      connections: [],
      status: nodeData.status,
      reviewMetadata: nodeData.reviewMetadata,
      systemContext: {
        layer: 'raw',
        description: 'A foundational thought unit in the Field system',
        instructions: 'This is a raw node that can be expanded, linked, and refined over time'
      },
      author: nodeData.author,
      createdAt: nodeData.createdAt,
      updatedAt: nodeData.updatedAt,
      lastTended: nodeData.createdAt,
      connectionCount: 0
    };
    
    // Save to storage
    NodeStorage.saveNode(node);
    
    const statusMessage = node.status === 'grounded' 
      ? 'your node is grounded with sources and ready for review.'
      : 'your node is in draft state. add sources to ground it.';
    
    await write(`node created: ${node.id} "${node.title}"`);
    await write(statusMessage);
    await write('type /browse to see all nodes, or /node to create another.');
  }


  return (
    <div
      style={{
        minHeight:"100dvh",
        background: palette.bg,
        color: palette.ink,
        fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        padding: "32px 16px",
      }}
    >
      {showNodeForm ? (
        <RawNodeEditor
          user={{
            isAuthenticated: userIdentity?.name !== 'guest',
            handle: userIdentity?.name || 'guest'
          }}
          onSeed={handleNodeCreated}
          onCancel={() => {
            setShowNodeForm(false);
            setStage('lineage');
          }}
          onSignIn={() => {
            // Handle sign in - could open a modal or redirect
            // TODO: Implement sign in modal or redirect
          }}
        />
      ) : (
        <div style={styles.frameWrap}>
        <div style={styles.frame}>
        <div
          style={styles.output}
          dangerouslySetInnerHTML={{ __html: lines.join("\n") }}
        />
        
        {/* Modern Action Buttons */}
        {(stage==='origin' || stage==='lineage' || stage==='reflect' || stage==='link') && (
          <div style={{marginTop:24, padding:20, background:'rgba(11, 11, 13, 0.6)', border:'1px solid #2a2a30', borderRadius:12, backdropFilter:'blur(8px)'}}>
            <div style={{color:palette.magenta, marginBottom:16, fontSize:'14px', fontWeight:500, letterSpacing:'0.5px', textTransform:'uppercase'}}>Available Actions</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:12}}>
              <button
                onClick={() => handleCommand('/node')}
                style={{
                  padding:'14px 18px',
                  background:`linear-gradient(135deg, ${palette.magenta}22, ${palette.orchid}11)`,
                  border:`1px solid ${palette.magenta}44`,
                  borderRadius:8,
                  color:palette.ink,
                  fontSize:'15px',
                  cursor:'pointer',
                  transition:'all 0.2s ease',
                  fontFamily:'inherit',
                  textAlign:'left',
                  display:'flex',
                  flexDirection:'column',
                  gap:4,
                  boxShadow:`0 2px 8px ${palette.magenta}11`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.magenta}33, ${palette.orchid}22)`;
                  e.currentTarget.style.borderColor = palette.magenta;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${palette.magenta}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.magenta}22, ${palette.orchid}11)`;
                  e.currentTarget.style.borderColor = `${palette.magenta}44`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${palette.magenta}11`;
                }}
              >
                <span style={{color:palette.lilac, fontWeight:500}}>/node</span>
                <span style={{color:palette.muted, fontSize:'13px'}}>create new node</span>
              </button>

              <button
                onClick={() => handleCommand('/browse')}
                style={{
                  padding:'14px 18px',
                  background:`linear-gradient(135deg, ${palette.lilac}22, ${palette.orchid}11)`,
                  border:`1px solid ${palette.lilac}44`,
                  borderRadius:8,
                  color:palette.ink,
                  fontSize:'15px',
                  cursor:'pointer',
                  transition:'all 0.2s ease',
                  fontFamily:'inherit',
                  textAlign:'left',
                  display:'flex',
                  flexDirection:'column',
                  gap:4,
                  boxShadow:`0 2px 8px ${palette.lilac}11`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.lilac}33, ${palette.orchid}22)`;
                  e.currentTarget.style.borderColor = palette.lilac;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${palette.lilac}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.lilac}22, ${palette.orchid}11)`;
                  e.currentTarget.style.borderColor = `${palette.lilac}44`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${palette.lilac}11`;
                }}
              >
                <span style={{color:palette.lilac, fontWeight:500}}>/browse</span>
                <span style={{color:palette.muted, fontSize:'13px'}}>browse all nodes</span>
              </button>

              <button
                onClick={() => handleCommand('/orient')}
                style={{
                  padding:'14px 18px',
                  background:`linear-gradient(135deg, ${palette.orchid}22, ${palette.magenta}11)`,
                  border:`1px solid ${palette.orchid}44`,
                  borderRadius:8,
                  color:palette.ink,
                  fontSize:'15px',
                  cursor:'pointer',
                  transition:'all 0.2s ease',
                  fontFamily:'inherit',
                  textAlign:'left',
                  display:'flex',
                  flexDirection:'column',
                  gap:4,
                  boxShadow:`0 2px 8px ${palette.orchid}11`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.orchid}33, ${palette.magenta}22)`;
                  e.currentTarget.style.borderColor = palette.orchid;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${palette.orchid}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.orchid}22, ${palette.magenta}11)`;
                  e.currentTarget.style.borderColor = `${palette.orchid}44`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${palette.orchid}11`;
                }}
              >
                <span style={{color:palette.lilac, fontWeight:500}}>/orient</span>
                <span style={{color:palette.muted, fontSize:'13px'}}>learn about the system</span>
              </button>

              <button
                onClick={() => handleCommand('/help')}
                style={{
                  padding:'14px 18px',
                  background:`linear-gradient(135deg, ${palette.muted}22, ${palette.muted}11)`,
                  border:`1px solid ${palette.muted}44`,
                  borderRadius:8,
                  color:palette.ink,
                  fontSize:'15px',
                  cursor:'pointer',
                  transition:'all 0.2s ease',
                  fontFamily:'inherit',
                  textAlign:'left',
                  display:'flex',
                  flexDirection:'column',
                  gap:4,
                  boxShadow:`0 2px 8px ${palette.muted}11`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.muted}33, ${palette.muted}22)`;
                  e.currentTarget.style.borderColor = palette.muted;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${palette.muted}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${palette.muted}22, ${palette.muted}11)`;
                  e.currentTarget.style.borderColor = `${palette.muted}44`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${palette.muted}11`;
                }}
              >
                <span style={{color:palette.lilac, fontWeight:500}}>/help</span>
                <span style={{color:palette.muted, fontSize:'13px'}}>see all commands</span>
              </button>
            </div>
          </div>
        )}

        {stage==='reflect' && (
          <div style={{marginTop:12}}>
            <div style={{color:palette.muted}}>private buffer — finish with Ctrl/⌘+Enter</div>
            <textarea
              style={{width:'100%',minHeight:160,background:'#0b0b0d',border:'1px solid #2a2a30',color:palette.ink,padding:12,borderRadius:8,fontFamily:'inherit',fontSize:15,lineHeight:1.5}}
              value={draft}
              onChange={e=>setDraft(e.target.value)}
              onKeyDown={(e)=>{ if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){ push(color('your reflection is saved locally. type /link to connect it.','muted')); } }}
            />
          </div>
        )}

        <div ref={endRef} />
        
        <div style={styles.promptRow}>
          <span style={{color:palette.magenta}}>&gt;</span>
          <span style={styles.promptCaret} />
          <div style={styles.promptInputWrap}>
            {suggestion && suggestion !== input && suggestion.startsWith(input) && (
              <span style={styles.promptSuggestion}>
                <span style={{opacity:0}}>{input}</span>
                {suggestion.slice(input.length)}
              </span>
            )}
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={(e)=>{
                if((e.key==='Tab' || e.key==='ArrowRight') && suggestion){
                  e.preventDefault();
                  setInput(suggestion);
                  return;
                }
                if(e.key==='Enter'){
                  handleCommand(input);
                }
              }}
              spellCheck={false}
              style={styles.promptInput}
              ref={inputRef}
              autoFocus
            />
          </div>
        </div>
        </div>
      </div>
      )}
      
      <style>{`
        @keyframes blink { 0%{opacity:.2} 50%{opacity:1} 100%{opacity:.2} }
      `}</style>
      <style jsx global>{`
        html, body {
          margin: 0;
          background: ${palette.bg};
        }
      `}</style>
    </div>
  );
}

function getSuggestion(value:string, stage:Stage){
  if(!value.startsWith('/')) return '';
  const options = stageCommands[stage] || [];
  const match = options.find(cmd => cmd.startsWith(value));
  if(!match) return '';
  return match === value ? '' : match;
}
