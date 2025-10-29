<!-- 24800c7d-5531-43a4-8e0a-e6011904a75d cb88203e-3cb4-4d97-b297-77b9a46e17ee -->
# Field Nodes: The Ultimate Collaborative Research Platform - Complete Implementation Plan

## Vision

Transform Field Nodes into the **first truly collaborative research platform** that combines:

- **Pilgrim's intelligent content extraction** - Evidence-based research from any URL
- **Real-time collaborative exploration** - Multiple users researching together
- **Are.na's cross-platform curation** - Seamless sync between platforms
- **Visual research trails** - See how ideas connect through web content

## Open Source Resources & Architecture Patterns

Field Nodes can leverage proven patterns from these excellent open-source projects:

### **1. Graphameleon** - [GitHub](https://github.com/Orange-OpenSource/graphameleon)

**What it does**: Browser extension that collects browsing traces and builds knowledge graphs

**What we can use**:

- Architecture for browser extension + web app sync
- Logic for tracking navigation and producing node/graph data
- Browsing trace capture patterns
- Knowledge graph data structures

**License**: Check repository for license terms

**Adaptation strategy**:

- Use their extension architecture for future Field Nodes browser extension
- Adapt their graph data structures for Field Node taxonomy
- Learn from their capture → graph pipeline

### **2. Perplexity Lens** - [GitHub](https://github.com/iamaayushijain/perplexity-lens)

**What it does**: Browser extension that builds personalized knowledge graphs from browsing activity

**What we can use**:

- Content selection and capture mechanisms
- Node storage patterns
- Graph export and visualization techniques
- Browser activity monitoring logic

**License**: Check repository for license terms

**Adaptation strategy**:

- Study their "browse → offer reflection" interaction patterns
- Adapt their node creation workflow for Raw Node creation
- Use their graph visualization as reference for Field Map

### **3. KG-Vis (Coypu Knowledge Graph Visualization)** - [GitHub](https://github.com/semantic-systems/coypu-kg-vis)

**What it does**: Web browser tool for exploring knowledge graphs

**What we can use**:

- Graph exploration UI/UX patterns
- Filtering and search mechanisms
- Node/edge styling and layout algorithms
- Interactive graph navigation

**License**: Check repository for license terms

**Adaptation strategy**:

- Use as reference for Field Map component
- Adapt their filtering for Field Nodes taxonomy
- Learn from their graph interaction patterns

### **4. Are.na Official Repositories** - [GitHub](https://github.com/orgs/aredotna/repositories)

**What they provide**: Official Are.na codebase and tools

**Key repositories**:

- `ervell` - Are.na front-end client (TypeScript)
- `pilgrim` - Web research tool (already integrated)
- `arena-rb` - Ruby API library
- `arena-php` - PHP API library (already referenced)

**What we can use**:

- API patterns and best practices
- UI/UX patterns for content curation
- Channel and block data structures
- Authentication flows

**Adaptation strategy**:

- Follow their API patterns exactly (already doing this)
- Study `ervell` for UI/UX inspiration
- Use `pilgrim` for content extraction (already planned)

### **What Field Nodes Will Build Custom**:

1. **Unique Node Taxonomy**: Raw / Support / Reflection / Context / Connection / Steward
2. **Reflective Prompt System**: Session tracking and reflection prompts
3. **Collaborative Research Sessions**: Real-time multi-user exploration
4. **Terminal Aesthetic**: Command-line inspired UI/UX
5. **Cross-Platform Sync**: Field Nodes ↔ Are.na bidirectional sync
6. **Research Engine**: Pilgrim-powered content extraction + link discovery

## Overview

Build a production-ready multi-user research platform with Pilgrim-powered content extraction, Supabase backend, Are.na integration, real-time collaboration, comprehensive testing, security, and deployment infrastructure. Priority: **The best collaborative research app ever**.

## Priority Order (Aesthetic-First Revolutionary Research Platform)

1. **Design System & Brand** (Phase 0): Codify Field Nodes aesthetic before any code
2. **Core Infrastructure** (Phase 1-2): Foundation files, Supabase setup, security
3. **Pilgrim Integration** (Phase 3): Content extraction foundation, research engine
4. **Research-Assisted Node Creation** (Phase 4): Enhanced RawNodeEditor with URL import
5. **Real-Time Collaborative Research** (Phase 5-6): Live research sessions, link discovery
6. **Field Management & Visualization** (Phase 7-8): Field browser, research trail graphs
7. **Are.na Cross-Platform Sync** (Phase 9): Bidirectional sync, channel import
8. **Advanced Research Features** (Phase 10-11): Mobile, analytics, content analysis

---

## Phase 0: Design System & Brand Guidelines (AESTHETIC FOUNDATION)

### Philosophy: Aesthetic as Infrastructure

Field Nodes is not just a tool - it's a **cultural interface** where users *feel* before they understand. Every design decision expresses cyber-feminist systems thinking: care, slowness, relation, and material honesty.

**Core Mood**: Terminal minimalism meets coral feminism. Command line meets coral reef.

---

### 0.1 Create Brand Directory Structure

**Priority**: CRITICAL - Foundation for all design decisions

**Create directory**: `/brand`

**Files to create**:

```
/brand
  ├── brand-guidelines.md       # Core aesthetic principles
  ├── style-guide.md            # Voice, tone, copy guidelines
  ├── typography-specs.md       # Font system specifications
  ├── color-palette.json        # Semantic color tokens
  └── motion-principles.md      # Animation & interaction guidelines
```

---

### 0.2 Create Brand Guidelines Document

**File**: `/brand/brand-guidelines.md` (NEW)

**Content**:

```markdown
# Field Nodes — Brand Guidelines

## Vision

Field Nodes is a cultural interface for collaborative research. We design for care, not competition. Every interaction should feel like a quiet conversation with a thoughtful system.

## Core Mood

Terminal minimalism meets coral feminism.
Command line meets coral reef.
Slow, contemplative, technically precise, emotionally aware.

## Reference Aesthetics

- **Terminal interfaces**: Minimal, text-based, honest
- **Are.na**: Curation, connection, care
- **Obsidian**: Knowledge graphs, dark themes
- **Arc browser**: Thoughtful interaction design
- **Cyber-feminist zines**: Care + critique + systems thinking
- **Coral reefs**: Organic growth, interconnection, living systems

## Visual Identity

### Color Palette

**Primary Colors**:
- **Background**: `#0B0B0D` (deep black with warmth)
- **Text Primary**: `#EAEAEA` (soft gray, easy on eyes)
- **Ink (main text)**: `#F5EDEE` (warm white)

**Accent Colors**:
- **Lilac**: `#A28AFF` (contemplation, connection)
- **Magenta**: `#D65CA9` (emphasis, interaction)
- **Coral**: `#F86F5C` (warmth, care)
- **Orchid**: `#A05C8D` (depth, reflection)

**Functional Colors**:
- **Muted**: `#9AA0A6` (secondary text)
- **Divider**: `#1C1C1F` (subtle separation)
- **Success**: `#4CAF50` (grounded status)
- **Warning**: `#FF9800` (needs attention)
- **Error**: `#F44336` (gentle alert, not harsh)

### Color Semantics

Use semantic naming, not hex codes in components:
- `field.lilac` not `#A28AFF`
- `field.coral` not `#F86F5C`
- `text.primary` not `#EAEAEA`
- `bg.canvas` not `#0B0B0D`

### Typography

**Font Families**:
- **Headings & UI**: *Space Grotesk* or *Suisse Int'l* (humanist sans-serif)
- **Body & Code**: *IBM Plex Mono* (warm monospace)
- **Alternative**: *Geist Mono* (clean, technical)

**Type Scale** (base 14px):
```

xs: 11px   // metadata

sm: 13px   // secondary text

base: 14px // body text

md: 15px   // emphasized body

lg: 18px   // section headers

xl: 20px   // page titles

2xl: 24px  // hero text

3xl: 32px  // terminal splash

```

**Weights**:
- Regular: 400 (primary weight)
- Medium: 500 (emphasis)
- Semibold: 600 (headings only)
- **Never use**: Bold (700+), Thin (100-200)

**Line Heights**:
- Tight: 1.2 (headings)
- Normal: 1.6 (body)
- Relaxed: 1.9 (terminal output)

### Texture & Material

**Surface Quality**:
- Matte, not glossy
- Soft grain overlay (subtle noise PNG at 2-3% opacity)
- No gradients except radial glows for focus states
- No shadows except soft `0 0 60px rgba(208, 128, 208, 0.08)`

**Light Leaks**:
- Subtle radial gradients for terminals: `radial-gradient(circle at 50% 50%, rgba(162, 138, 255, 0.03), transparent)`
- Only for focused or active states

### Composition

**Layout Principles**:
- Grid-based but breathing
- Generous margins (32px minimum)
- Centered layouts for focus
- Minimal clutter - only essential elements visible
- Maximum 64 characters per line for readability

**Spacing Scale** (based on 8px):
```

xs: 4px

sm: 8px

md: 12px

base: 16px

lg: 24px

xl: 32px

2xl: 48px

3xl: 64px

````

## Interaction Principles

### 1. Quiet Feedback

**No popups or jarring alerts**. Every action feels like a pulse.

Examples:
- Saving a node → new line in terminal: `> node seeded successfully`
- Error → gentle message: `this couldn't connect. try again?`
- Not: Modal dialogs, toast notifications, sound effects

### 2. Material Honesty

**Everything feels textual or code-based**. No skeuomorphism.

- Keep UI flat and honest
- Rely on typography and spacing, not faux 3D
- Buttons look like terminal commands
- Forms feel like structured data entry

### 3. Contextual Care

**Interface checks in, doesn't demand**.

Examples:
- "would you like to reflect?" (not "Save now!")
- "you've been researching for 14 min. take a moment?" (not "Session timeout")
- "this node needs sources to be grounded" (not "Required field!")

### 4. Slowness as Affordance

**Small delays that make reflection felt**.

- Fade-in transitions: 200-300ms
- Typewriter effects for system messages: 2ms per character
- Cursor blink: 1.4s ease-in-out
- Page transitions: dissolve, not slide

## Motion & Animation

### Animation Principles

- **Subtle**: Never draw attention from content
- **Purposeful**: Only animate state changes
- **Slow**: 200-300ms standard, 500ms for major transitions
- **Natural**: Ease-in-out, not linear

### Standard Animations

**Fade In**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Duration: 200ms, ease-in-out */
````

**Typewriter** (for terminal):

```css
@keyframes blink {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
/* Duration: 1.4s, ease-in-out, infinite */
```

**Dissolve** (page transitions):

```css
@keyframes dissolve {
  from { opacity: 1; }
  to { opacity: 0; }
}
/* Duration: 300ms, ease-in-out */
```

### What NOT to Animate

- Don't: Slide transitions
- Don't: Bounce effects
- Don't: Parallax scrolling
- Don't: Rotating loaders (use pulse or dots)

## Sound Design (Optional)

**Ambient Soundscape**:

- Soft hum (like server room ambience)
- Coral reef underwater sounds
- Very low volume, user-controllable
- No click sounds, no beeps

## Design Tokens

All design decisions should reference tokens, never hard-code values.

**Token Structure**:

```json
{
  "color": {
    "bg": {
      "canvas": "#0B0B0D",
      "elevated": "#141416",
      "hover": "#1C1C1F"
    },
    "text": {
      "primary": "#F5EDEE",
      "secondary": "#9AA0A6",
      "accent": "#D65CA9"
    },
    "field": {
      "lilac": "#A28AFF",
      "magenta": "#D65CA9",
      "coral": "#F86F5C",
      "orchid": "#A05C8D"
    }
  },
  "typography": {
    "family": {
      "sans": "'Space Grotesk', -apple-system, sans-serif",
      "mono": "'IBM Plex Mono', ui-monospace, monospace"
    },
    "size": {
      "xs": "11px",
      "sm": "13px",
      "base": "14px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "base": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "radius": {
    "sm": "6px",
    "base": "8px",
    "lg": "12px"
  }
}
```

## Validation Checklist

Before shipping any design:

- [ ] Does every UI element use design tokens (not hard-coded values)?
- [ ] Can someone glance at a screenshot and feel the vibe (terminal + care)?
- [ ] Does every message sound like Field Nodes (not generic tech copy)?
- [ ] Are transitions slow and contemplative (200-300ms)?
- [ ] Is there generous white space and breathing room?
- [ ] Does the design express feminist systems logic (care, not competition)?
- [ ] Are fonts properly weighted (400-500, never bold)?
- [ ] Are colors used semantically (lilac for connection, coral for warmth)?

## Anti-Patterns (What Field Nodes is NOT)

- Not a productivity tool (we value slowness)
- Not gamified (no badges, no streaks)
- Not competitive (no leaderboards, no follower counts)
- Not aggressive (no red alerts, no ALL CAPS)
- Not corporate (no jargon, no "optimize" or "engage")
- Not trendy (timeless, not chasing design trends)

## Brand Voice

See `/brand/style-guide.md` for complete voice and copy guidelines.

**Summary**: Calm, poetic, technical. Like a curious librarian + quiet system daemon.

---

*"a system that learns through care."*

````

---

### 0.3 Create Style Guide (Voice & Copy)

**File**: `/brand/style-guide.md` (NEW)

**Content**:
```markdown
# Field Nodes — Style Guide

## Voice & Tone

### Personality

Field Nodes speaks like:
- A curious librarian who loves connections
- A quiet system daemon that cares
- A contemplative researcher, not a salesperson
- A coral reef: organic, interconnected, alive

### Voice Attributes

**Calm**: Never urgent or aggressive
**Poetic**: Rhythm and line breaks matter
**Technical**: Precise but not cold
**Inclusive**: Gender-neutral, accessible
**Minimal**: Every word earns its place

## Language Palette

### System Messages

**Format**: Monospace, lowercase, concise, terminal-style

Examples:
````

> node seeded successfully

> connecting to field: feminist_theory

> 3 links discovered from this source

> research session started

```

**Rules**:
- Always start with `> ` (terminal prompt)
- Lowercase only
- No punctuation except periods for complete thoughts
- Present tense for current actions
- Past tense for completed actions

### Instructional Copy

**Format**: Imperative but gentle

Examples:
```

browse first, contribute second.

paste a URL to start researching.

add sources to ground your node.

reflection happens slowly—take your time.

```

**Rules**:
- Lowercase unless proper noun
- Period endings (like poetry)
- Short phrases, one per line
- Use verbs of relation: connect, reflect, maintain, seed

### Reflective Prompts

**Format**: Questions that invite, don't demand

Examples:
```

you've been exploring for 14 min. would you like to reflect?

this thought feels related to your last node. connect them?

you haven't added sources yet. ground this idea?

```

**Rules**:
- Lowercase, conversational
- End with question mark
- Notice behavior, don't judge
- Offer choice, never force

### Error Messages

**Format**: No blame, no red, gentle guidance

Examples:
```

this node couldn't connect. maybe try again later.

we couldn't extract content from that URL. check the link?

you'll need to sign in to seed nodes.

```

**Rules**:
- No "Error!" or "Failed!"
- Suggest solution, don't blame user
- Use "couldn't" not "failed"
- Keep it conversational

### Metadata & Labels

**Format**: Short, semantic, descriptive

Examples:
```

Type: Raw Node

Status: grounded

Author: @username

Created: 10/20/2025

Sources: 3 links

```

**Rules**:
- Sentence case for labels
- Lowercase for values (except proper nouns)
- Use colons to separate
- Keep parallel structure

### Button & Action Text

**Format**: Command-style, action-oriented

Examples:
```

Seed

Import Channel

Start Research

Add Source

Connect Nodes

Export Collection

```

**Rules**:
- Verb first (action-oriented)
- Sentence case
- No periods
- 1-2 words maximum
- Make it feel like a command

## Word Choices

### Prefer (Field Nodes voice)

- connect (not link)
- reflect (not review)
- maintain (not update)
- seed (not post)
- archive (not delete)
- ground (not validate)
- tend (not edit)
- offer (not share)
- field (not folder/category)
- research (not search)

### Avoid (Corporate tech speak)

- optimize
- engage
- scale
- leverage
- drive
- grow your network
- boost productivity
- maximize impact

## Writing Rules

### 1. Prefer Lowercase

Use lowercase for most copy (like code or poetry). Use sentence case only for:
- Proper nouns (Field Nodes, Are.na)
- UI labels (Type, Status, Author)
- Button text (Seed, Import)

### 2. Line Breaks as Breaths

Rhythm matters. Break lines where you'd naturally pause.

**Good**:
```

browse first,

contribute second.

the field grows best

through relation.

```

**Bad**:
```

Browse first, contribute second. The field grows best through relation.

```

### 3. One Idea Per Sentence

Short, clear, contemplative.

**Good**:
```

you've been researching for 14 minutes.

would you like to reflect?

```

**Bad**:
```

You've been researching for 14 minutes, so you might want to take a moment to reflect on what you've discovered.

```

### 4. Active Voice, Present Tense

Be direct and immediate.

**Good**: `connecting to field: feminist_theory`
**Bad**: `connection to field is being established`

### 5. No Jargon

Explain technical concepts in plain language.

**Good**: `this node needs sources to be grounded`
**Bad**: `node validation requires source attribution`

## Brand Tagline

**Primary**: "a system that learns through care."

**Alternatives**:
- "collaborative research, grown slowly."
- "knowledge that connects."
- "field notes for collective thinking."

## Tone by Context

### Onboarding

**Tone**: Welcoming, patient, educational

Example:
```

welcome to the field.

this is not social media.

it's a space for slow, connected thinking.

start by browsing what others have shared.

when you're ready, seed your first node.

```

### Terminal/Command Interface

**Tone**: Technical but warm, like a helpful daemon

Example:
```

> field nodes v0.3

> guest@fieldnodes:~FIELD

type /node to create

type /browse to explore

type /help for guidance

```

### Help Documentation

**Tone**: Clear, instructional, supportive

Example:
```

Raw Nodes are the seeds of the field.

Each one captures a single idea, question, or observation.

They need sources to be grounded.

Think of sources as evidence—

links, articles, videos, or files that support your thought.

```

### Error States

**Tone**: Calm, solution-oriented, no blame

Example:
```

we couldn't sync to are.na.

check that you're signed in and have permission to write to that channel.

```

## Copy Templates

### Node Creation

**Empty state**:
```

paste a URL to start researching.

or write your thought directly.

```

**With content**:
```

your node is saved locally as a draft.

add sources to ground it.

```

**Success**:
```

> node FN-RN.042 seeded successfully

```

### Research Session

**Start**:
```

research session started

exploring: [URL]

3 users researching in this field

```

**Link discovered**:
```

> 15 links discovered

explore any to continue the research trail

```

**Complete**:
```

> research session complete

12 links explored

3 nodes created

sync to are.na?

```

### Reflection Prompts

**Time-based**:
```

you've been browsing for [X] minutes.

pause and reflect?

```

**Activity-based**:
```

you've explored [X] links.

create a node to capture what you're learning?

```

**Connection-based**:
```

this feels related to "[node title]"

connect these nodes?

```

## Validation Checklist

Before shipping any copy:

- [ ] Does it sound like Field Nodes (calm, poetic, technical)?
- [ ] Is it lowercase where appropriate?
- [ ] Are line breaks used for rhythm?
- [ ] Is it free of jargon and corporate speak?
- [ ] Does it use verbs of relation (connect, reflect, maintain)?
- [ ] Is it minimal (every word earns its place)?
- [ ] Does it express care, not competition?
- [ ] Would you want to read this?

---

*remember: we speak like a system that cares.*
```

---

### 0.4 Create Theme Tokens File

**File**: `/src/theme/tokens.ts` (NEW)

**Content**:

```typescript
// Field Nodes Design Tokens
// All design decisions reference these tokens, never hard-code values

export const tokens = {
  color: {
    bg: {
      canvas: '#0B0B0D',
      elevated: '#141416',
      hover: '#1C1C1F',
      terminal: 'rgba(11, 11, 13, 0.6)',
    },
    text: {
      primary: '#F5EDEE',
      secondary: '#9AA0A6',
      accent: '#D65CA9',
      muted: '#666',
    },
    field: {
      lilac: '#A28AFF',
      magenta: '#D65CA9',
      coral: '#F86F5C',
      orchid: '#A05C8D',
    },
    semantic: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
    divider: '#1C1C1F',
  },
  
  typography: {
    family: {
      sans: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    },
    size: {
      xs: '11px',
      sm: '13px',
      base: '14px',
      md: '15px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.9,
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  radius: {
    sm: '6px',
    base: '8px',
    lg: '12px',
  },
  
  shadow: {
    soft: '0 0 60px rgba(208, 128, 208, 0.08)',
    glow: '0 0 12px rgba(162, 138, 255, 0.33)',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slowest: '500ms',
    },
    easing: {
      base: 'ease-in-out',
      in: 'ease-in',
      out: 'ease-out',
    },
  },
} as const;

// Type-safe token access
export type Tokens = typeof tokens;
```

---

### 0.5 Update Existing Theme Files

**Modify**: `/src/theme/index.ts`

Replace with token-based system:

```typescript
import { tokens } from './tokens';

// Re-export tokens with legacy palette names for backwards compatibility
export const palette = {
  bg: tokens.color.bg.canvas,
  ink: tokens.color.text.primary,
  magenta: tokens.color.field.magenta,
  lilac: tokens.color.field.lilac,
  orchid: tokens.color.field.orchid,
  muted: tokens.color.text.secondary,
  success: tokens.color.semantic.success,
  error: tokens.color.semantic.error,
  warning: tokens.color.semantic.warning,
  info: tokens.color.semantic.info,
};

export const typography = {
  fontFamilyMono: tokens.typography.family.mono,
  fontFamilySans: tokens.typography.family.sans,
  sizeSm: tokens.typography.size.sm,
  base: tokens.typography.size.base,
  lg: tokens.typography.size.lg,
  xl: tokens.typography.size.xl,
  '2xl': tokens.typography.size['2xl'],
  tight: tokens.typography.lineHeight.tight,
  normal: tokens.typography.lineHeight.normal,
  relaxed: tokens.typography.lineHeight.relaxed,
  weightNormal: tokens.typography.weight.normal,
  medium: tokens.typography.weight.medium,
  semibold: tokens.typography.weight.semibold,
  bold: tokens.typography.weight.semibold, // Map bold to semibold
};

export const spacing = tokens.spacing;

// Export tokens for new components
export { tokens };
```

---

## Phase 1: Critical Missing Files & Infrastructure

### 0.1 Create README.md

**Why critical**: First thing developers/contributors see on GitHub

**File**: `README.md`

**Content structure**:

```markdown
# Field Nodes

A collaborative research network for atomic thought sharing.

## Quick Start

1. Clone repo: `git clone https://github.com/candiikay/FieldNode.git`
2. Install: `npm install`
3. Create `.env.local` (see `.env.example`)
4. Run: `npm run dev`

## What is Field Nodes?

Field Nodes is a living commons for interlinked thought...

## Tech Stack

- Next.js 14, React 18, TypeScript
- Supabase (Postgres, Auth, Realtime)
- Tiptap rich text editor
- D3.js for network visualization

## Project Structure

/pages - Next.js routes
/src/components - React components
/src/services - Data layer
/src/theme - Design system

## Environment Variables

See `.env.example` for required keys.

## Contributing

See CONTRIBUTING.md

## License

MIT (see LICENSE)
```

### 0.2 Create .env.example

**File**: `.env.example`

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Are.na Integration (Optional for MVP)
NEXT_PUBLIC_ARENA_API_KEY=your-arena-token-here
ARENA_OAUTH_CLIENT_ID=your-client-id-here
ARENA_OAUTH_CLIENT_SECRET=your-client-secret-here

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Monitoring (Optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
```

### 0.3 Create LICENSE

**File**: `LICENSE`

**Content**: MIT License (standard open-source)

### 0.4 Create CONTRIBUTING.md

**File**: `CONTRIBUTING.md`

**Content structure**:

- How to report bugs
- Code style guidelines (TypeScript, React best practices)
- Pull request process
- Testing requirements
- Branch naming conventions

### 0.5 Create .eslintrc.json

**File**: `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

### 0.6 Create .prettierrc

**File**: `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

### 0.7 Update .gitignore

**Modify**: `.gitignore`

Add missing entries:

```
# Environment
.env.local
.env*.local

# Testing
coverage/
.nyc_output/
playwright-report/
test-results/

# Supabase
supabase/.branches
supabase/.temp

# Misc
.vercel
*.log
```

### 0.8 Create package.json Scripts

**Modify**: `package.json`

Add test and lint scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest --coverage",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Phase 1: Supabase Setup & Security Foundation

### 1.1 Create Supabase Account & Project

**Manual steps**:

1. Go to supabase.com
2. Sign up with GitHub
3. Create new project: "fieldnodes-mvp"
4. Region: Choose closest to you
5. Strong database password (save to password manager)
6. Wait for provisioning (~2 min)
7. Copy Project URL and anon key to `.env.local`

### 1.2 Install Dependencies

**Run**:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zustand zod
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @playwright/test
npm install -D prettier eslint-config-prettier
npm install react-force-graph-2d d3-force
```

**Why each package**:

- `@supabase/*` - Database, auth, realtime
- `zustand` - Lightweight global state (alternative to Redux)
- `zod` - Runtime schema validation
- `vitest` - Fast unit testing (Vite-based)
- `@playwright/test` - E2E testing across browsers
- `react-force-graph-2d` - Network visualization
- `d3-force` - Physics simulation for graph

### 1.3 Create Database Schema

**File**: `supabase/schema.sql` (NEW)

**Full schema with security**:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT username_length CHECK (length(username) >= 3 AND length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- Fields (research areas)
CREATE TABLE public.fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES public.users(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9_]+$')
);

-- Node types and statuses
CREATE TYPE node_type AS ENUM ('raw', 'context', 'support', 'reflection');
CREATE TYPE node_status AS ENUM ('draft', 'grounded', 'reviewed', 'canonical', 'needs_revision');

-- Nodes table
CREATE TABLE public.nodes (
  id TEXT PRIMARY KEY,
  type node_type NOT NULL,
  status node_status DEFAULT 'draft',
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.users(id),
  statement TEXT NOT NULL,
  description TEXT,
  sources JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  parent_node_id TEXT REFERENCES public.nodes(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_node_id CHECK (id ~ '^FN-[A-Z]{2}\.[0-9]{3}$'),
  CONSTRAINT statement_not_empty CHECK (length(trim(statement)) > 0)
);

-- Node connections (relationships)
CREATE TYPE relationship_type AS ENUM ('expands', 'supports', 'revises', 'situates', 'verifies', 'challenges');

CREATE TABLE public.node_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_node_id TEXT REFERENCES public.nodes(id) ON DELETE CASCADE,
  to_node_id TEXT REFERENCES public.nodes(id) ON DELETE CASCADE,
  relationship_type relationship_type NOT NULL,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT no_self_reference CHECK (from_node_id != to_node_id)
);

-- Field memberships (roles)
CREATE TYPE member_role AS ENUM ('viewer', 'contributor', 'editor', 'steward');

CREATE TABLE public.field_memberships (
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role member_role DEFAULT 'contributor',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (field_id, user_id)
);

-- Activity log (social feed)
CREATE TYPE activity_action AS ENUM ('offered', 'supported', 'reflected', 'linked', 'revised');

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  action activity_action NOT NULL,
  node_id TEXT REFERENCES public.nodes(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_nodes_field_id ON public.nodes(field_id);
CREATE INDEX idx_nodes_author_id ON public.nodes(author_id);
CREATE INDEX idx_nodes_created_at ON public.nodes(created_at DESC);
CREATE INDEX idx_nodes_status ON public.nodes(status);
CREATE INDEX idx_activity_field_created ON public.activity_log(field_id, created_at DESC);
CREATE INDEX idx_connections_from ON public.node_connections(from_node_id);
CREATE INDEX idx_connections_to ON public.node_connections(to_node_id);
CREATE INDEX idx_field_memberships_user ON public.field_memberships(user_id);
CREATE INDEX idx_field_memberships_field ON public.field_memberships(field_id);
CREATE INDEX idx_fields_slug ON public.fields(slug);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Public profiles, own edits
CREATE POLICY "Users can read all profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Fields: Public readable, member writable
CREATE POLICY "Anyone can read public fields" ON public.fields
  FOR SELECT USING (is_public = true);

CREATE POLICY "Members can read private fields" ON public.fields
  FOR SELECT USING (
    id IN (SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create fields" ON public.fields
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Nodes: Field-based access
CREATE POLICY "Read nodes in accessible fields" ON public.nodes
  FOR SELECT USING (
    field_id IN (
      SELECT id FROM public.fields WHERE is_public = true
      UNION
      SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Create nodes in member fields" ON public.nodes
  FOR INSERT WITH CHECK (
    field_id IN (
      SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Authors update own draft nodes" ON public.nodes
  FOR UPDATE USING (author_id = auth.uid() AND status = 'draft');

-- Activity log: Field-based read
CREATE POLICY "Read activity in accessible fields" ON public.activity_log
  FOR SELECT USING (
    field_id IN (
      SELECT id FROM public.fields WHERE is_public = true
      UNION
      SELECT field_id FROM public.field_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users create activity" ON public.activity_log
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Node connections: Read with node access
CREATE POLICY "Read connections for accessible nodes" ON public.node_connections
  FOR SELECT USING (
    from_node_id IN (SELECT id FROM public.nodes) OR
    to_node_id IN (SELECT id FROM public.nodes)
  );

-- Field memberships: Self-readable
CREATE POLICY "Users read own memberships" ON public.field_memberships
  FOR SELECT USING (user_id = auth.uid());

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_nodes_updated_at
  BEFORE UPDATE ON public.nodes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Execute in Supabase**:

1. Go to SQL Editor in Supabase dashboard
2. Paste entire schema
3. Run (F5 or click "Run")
4. Verify all tables created in Table Editor

### 1.4 Create Supabase Client

**File**: `src/lib/supabase.ts` (NEW)

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client
export const supabase = createClientComponentClient();

// Server-side client (for API routes)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Type helpers
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
      };
      // Add other table types as needed
    };
  };
};
```

---

## Phase 2: Authentication & Multi-User Foundation

### 2.1 Create Auth Provider

**File**: `src/providers/AuthProvider.tsx` (NEW)

```typescript
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 2.2 Create Auth Components

**File**: `src/components/auth/LoginModal.tsx` (NEW)

```typescript
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { palette } from '@/theme';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMagicLinkSent(true);
    }
    setLoading(false);
  };

  // Styled component implementation here
  // (Terminal aesthetic with palette colors)
}
```

**File**: `src/components/auth/SignUpModal.tsx` (NEW)

Similar structure to LoginModal, but includes username selection and profile creation.

**File**: `src/components/auth/UserMenu.tsx` (NEW)

Dropdown menu showing username, profile link, settings, sign out.

### 2.3 Update pages/_app.tsx

**Modify**: `pages/_app.tsx`

```typescript
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/providers/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

### 2.4 Create Protected Route Middleware

**File**: `middleware.ts` (NEW, root level)

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /field/* routes
  if (req.nextUrl.pathname.startsWith('/field/') && !session) {
    return NextResponse.redirect(new URL('/welcome', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/field/:path*', '/settings'],
};
```

---

## Phase 3: Real-Time Data Layer

### 3.1 Create Supabase Storage Service

**File**: `src/services/supabase-storage.ts` (NEW)

Replace localStorage with Supabase queries:

```typescript
import { supabase } from '@/lib/supabase';
import { Node, Field, User } from '@/types';

export class SupabaseStorage {
  // Node operations
  static async createNode(node: Omit<Node, 'id' | 'created_at'>) {
    const nodeId = await this.generateNodeId(node.type);
    
    const { data, error } = await supabase
      .from('nodes')
      .insert({
        id: nodeId,
        ...node,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from('activity_log').insert({
      field_id: node.field_id,
      user_id: node.author_id,
      action: 'offered',
      node_id: nodeId,
    });

    return data;
  }

  static async getNode(id: string) {
    const { data, error } = await supabase
      .from('nodes')
      .select('*, author:users(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getFieldNodes(fieldId: string) {
    const { data, error } = await supabase
      .from('nodes')
      .select('*, author:users(*)')
      .eq('field_id', fieldId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Field operations
  static async createField(field: Omit<Field, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('fields')
      .insert(field)
      .select()
      .single();

    if (error) throw error;

    // Auto-join creator
    await supabase.from('field_memberships').insert({
      field_id: data.id,
      user_id: field.created_by,
      role: 'steward',
    });

    return data;
  }

  static async getPublicFields() {
    const { data, error } = await supabase
      .from('fields')
      .select('*, created_by:users(*), _count:field_memberships(count)')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Activity feed
  static async getActivityFeed(fieldId: string, limit = 50) {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*, user:users(*), node:nodes(*)')
      .eq('field_id', fieldId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Real-time subscriptions
  static subscribeToField(fieldId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`field:${fieldId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'nodes',
          filter: `field_id=eq.${fieldId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
          filter: `field_id=eq.${fieldId}`,
        },
        callback
      )
      .subscribe();
  }

  // Node ID generation (using Supabase counter)
  private static async generateNodeId(type: string): Promise<string> {
    const prefix = type === 'raw' ? 'RN' : type === 'context' ? 'CN' : 'SN';
    
    // Use Supabase sequence (create in schema)
    const { data, error } = await supabase.rpc('get_next_node_id', {
      node_prefix: prefix,
    });

    if (error) throw error;
    return `FN-${prefix}.${String(data).padStart(3, '0')}`;
  }
}
```

**Add to schema.sql**:

```sql
-- Node ID counter function
CREATE SEQUENCE IF NOT EXISTS node_counter_seq;

CREATE OR REPLACE FUNCTION get_next_node_id(node_prefix TEXT)
RETURNS INTEGER AS $$
DECLARE
  next_id INTEGER;
BEGIN
  SELECT nextval('node_counter_seq') INTO next_id;
  RETURN next_id;
END;
$$ LANGUAGE plpgsql;
```

### 3.2 Update TypeScript Types

**Modify**: `src/types/index.ts`

Add Field, User, Activity types:

```typescript
export interface User {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Field {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_by: string;
  is_public: boolean;
  created_at: string;
}

export interface Activity {
  id: string;
  field_id: string;
  user_id: string;
  action: 'offered' | 'supported' | 'reflected' | 'linked' | 'revised';
  node_id: string;
  content: string | null;
  created_at: string;
  user?: User;
  node?: Node;
}

// Update existing Node interface to include field_id
export interface Node {
  id: string;
  type: NodeType;
  status: NodeStatus;
  field_id: string; // NEW
  author_id: string; // NEW
  statement: string;
  description: string;
  sources: Array<{
    type: string;
    url?: string;
    citation?: string;
  }>;
  metadata: any;
  parent_node_id: string | null;
  created_at: string;
  updated_at: string;
  author?: User; // NEW
}
```

---

## Phase 4: Collaborative Features

### 4.1 Create Field Pages

**File**: `pages/fields/index.tsx` (NEW)

Browse all public fields, search, create new field.

**File**: `pages/field/[slug].tsx` (NEW)

Individual field view with split layout:

- Top: Activity feed (terminal stream)
- Bottom: Node graph visualization
- Commands: `/new`, `/support`, `/reflect`

### 4.2 Create Activity Feed Component

**File**: `src/components/ActivityFeed.tsx` (NEW)

Real-time terminal-style feed:

- Subscribe to activity_log changes
- Display: `@username offered FN-RN.018 "Title"`
- Clickable node IDs
- Auto-scroll to bottom on new entries

### 4.3 Update RawNodeEditor

**Modify**: `src/components/RawNodeEditor.tsx`

Add:

- Field selector dropdown (list user's fields)
- Change "Seed" button to "Offer to Field"
- Post to activity_log on success
- Use SupabaseStorage.createNode()

### 4.4 Create Support & Reflection Forms

**File**: `src/components/SupportNodeForm.tsx` (NEW)

Similar to RawNodeEditor but:

- Shows parent node context
- Links via parent_node_id
- Creates node_connection relationship

**File**: `src/components/ReflectionNodeForm.tsx` (NEW)

Allows reflection on multiple nodes.

---

## Phase 5: Node Graph Visualization

### 5.1 Create Graph Component

**File**: `src/components/NodeGraph.tsx` (NEW)

Using `react-force-graph-2d`:

- Fetch nodes and connections from Supabase
- Color by node type (Raw: violet, Support: coral, etc.)
- Physics: d3.forceManyBody(), forceLink(), forceCenter()
- Hover: tooltip with node details
- Click: open node detail drawer
- Real-time: subscribe to new nodes, animate entry

### 5.2 Integrate into Field Page

Split view in `pages/field/[slug].tsx`:

- Tab system: "Feed" | "Graph" | "Both"
- Synchronized state (click node → highlight in graph, scroll feed)

---

## Phase 6: Testing Infrastructure

### 6.1 Create Test Setup

**File**: `vitest.config.ts` (NEW)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**File**: `src/test/setup.ts` (NEW)

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(),
    })),
  },
}));
```

### 6.2 Create E2E Tests

**File**: `playwright.config.ts` (NEW)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**File**: `e2e/multi-user-flow.spec.ts` (NEW)

**Critical for your multi-user testing**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Multi-user collaboration', () => {
  test('two users can see each others nodes in real-time', async ({ browser }) => {
    // Create two browser contexts (two users)
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    
    // User 1: Sign up and create field
    await page1.goto('/');
    await page1.click('text=Create Account');
    await page1.fill('[name=email]', 'user1@test.com');
    await page1.fill('[name=password]', 'password123');
    await page1.fill('[name=username]', 'researcher1');
    await page1.click('text=Sign Up');
    
    // Create field
    await page1.goto('/fields');
    await page1.click('text=Create New Field');
    await page1.fill('[name=name]', 'Test Field');
    await page1.fill('[name=slug]', 'test-field');
    await page1.click('text=Create');
    
    // User 2: Sign up and join same field
    await page2.goto('/');
    await page2.click('text=Create Account');
    await page2.fill('[name=email]', 'user2@test.com');
    await page2.fill('[name=password]', 'password123');
    await page2.fill('[name=username]', 'researcher2');
    await page2.click('text=Sign Up');
    
    await page2.goto('/fields');
    await page2.click('text=Test Field');
    
    // User 1 creates a node
    await page1.goto('/field/test-field');
    await page1.type('[data-testid=terminal-input]', '/new');
    await page1.press('[data-testid=terminal-input]', 'Enter');
    await page1.fill('[name=statement]', 'Real-time collaboration test');
    await page1.click('text=Offer to Field');
    
    // User 2 should see it in feed
    await expect(page2.locator('text=Real-time collaboration test')).toBeVisible({ timeout: 5000 });
    
    // User 2 supports the node
    await page2.click('text=/support FN-RN.001');
    await page2.fill('[name=statement]', 'Great insight!');
    await page2.click('text=Add Support');
    
    // User 1 should see support in feed
    await expect(page1.locator('text=@researcher2 supported')).toBeVisible({ timeout: 5000 });
    
    await context1.close();
    await context2.close();
  });
});
```

**File**: `e2e/auth-flow.spec.ts` (NEW)

Test signup, login, logout flow.

### 6.3 Create GitHub Actions CI

**File**: `.github/workflows/ci.yml` (NEW)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: E2E tests
        run: npm run test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Phase 7: Security & Best Practices

### 7.1 Input Sanitization

**File**: `src/utils/validation.ts` (NEW)

```typescript
import { z } from 'zod';

export const nodeSchema = z.object({
  statement: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  sources: z.array(
    z.object({
      type: z.string(),
      url: z.string().url().optional(),
      citation: z.string().optional(),
    })
  ),
});

export const fieldSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().regex(/^[a-z0-9_]+$/),
  description: z.string().max(500).optional(),
});

export const usernameSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9_]+$/);

// Sanitize HTML from rich text editor
export function sanitizeHTML(html: string): string {
  // Use DOMPurify or similar
  return html; // Implement proper sanitization
}
```

### 7.2 Rate Limiting

**File**: `src/utils/rateLimiting.ts` (NEW)

```typescript
// Simple in-memory rate limiter for MVP
// For production: use Upstash Redis or similar

const rateLimits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  userId: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const userLimit = rateLimits.get(userId);

  if (!userLimit || now > userLimit.resetAt) {
    rateLimits.set(userId, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}
```

### 7.3 Error Boundaries

**File**: `src/components/ErrorBoundary.tsx` (NEW)

```typescript
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Send to Sentry or similar
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

---

## Phase 7: Pilgrim Content Extraction Engine

### 7.1 Install Pilgrim Dependencies

**Priority**: CRITICAL - Foundation for evidence-based research

**Installation**:

```bash
npm install redis memcached bluebird-q
```

**Why**: Pilgrim requires Redis for caching and Memcached for performance optimization

### 7.2 Create Content Extraction Service

**File**: `src/services/ContentExtraction.ts` (NEW)

**Based on**: [Pilgrim GitHub Repository](https://github.com/aredotna/pilgrim.git)

```typescript
import Redis from 'redis';

export interface ExtractedContent {
  html: string;
  title: string;
  hrefs: string[];
  url: string;
  host: string;
  cached: number;
}

export class ContentExtractionService {
  private redis: Redis.RedisClient;
  private readonly CACHE_TTL = 86400; // 24 hours
  
  constructor() {
    this.redis = Redis.createClient();
  }
  
  async extractFromUrl(url: string): Promise<ExtractedContent> {
    // Check cache first
    const cached = await this.getFromCache(url);
    if (cached) return cached;
    
    // Extract using Pilgrim-style readability
    const response = await fetch(`/api/extract?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    const extracted: ExtractedContent = {
      html: data.html,           // Cleaned HTML
      title: data.title,         // Page title
      hrefs: data.hrefs,         // All inner links
      url: data.url,             // Canonical URL
      host: data.host,           // Domain
      cached: Date.now()
    };
    
    // Cache for future use
    await this.saveToCache(url, extracted);
    
    return extracted;
  }
  
  async createNodeFromUrl(url: string, fieldId: string) {
    const extracted = await this.extractFromUrl(url);
    
    return {
      type: 'raw',
      field_id: fieldId,
      statement: extracted.title,
      description: `Research imported from ${extracted.host}`,
      sources: [{
        type: 'url',
        url: extracted.url,
        title: extracted.title,
        extractedContent: extracted.html,
        discoveredLinks: extracted.hrefs
      }],
      status: 'grounded', // Has source evidence
      metadata: {
        importSource: 'pilgrim',
        extractedLinks: extracted.hrefs,
        host: extracted.host,
        extractionDate: new Date().toISOString()
      }
    };
  }
  
  private async getFromCache(url: string): Promise<ExtractedContent | null> {
    return new Promise((resolve) => {
      this.redis.get(`extract:${url}`, (err, data) => {
        if (err || !data) resolve(null);
        else resolve(JSON.parse(data));
      });
    });
  }
  
  private async saveToCache(url: string, data: ExtractedContent): Promise<void> {
    return new Promise((resolve) => {
      this.redis.setex(
        `extract:${url}`,
        this.CACHE_TTL,
        JSON.stringify(data),
        () => resolve()
      );
    });
  }
}
```

### 7.3 Create Extraction API Route

**File**: `pages/api/extract.ts` (NEW)

**Implementation**:

```typescript
import type { NextRequest } from 'next/server';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export default async function handler(req: NextRequest) {
  const { url } = req.query;
  
  if (!url || typeof url !== 'string') {
    return Response.json({ error: 'URL parameter required' }, { status: 400 });
  }
  
  try {
    // Fetch the URL content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'FieldNodes/1.0 (Research Bot)'
      }
    });
    
    const html = await response.text();
    
    // Parse with JSDOM
    const dom = new JSDOM(html, { url });
    
    // Extract with Readability
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    
    // Extract all links
    const links = Array.from(dom.window.document.querySelectorAll('a[href]'))
      .map(a => a.getAttribute('href'))
      .filter(href => href && href.startsWith('http'))
      .map(href => new URL(href!, url).toString());
    
    // Extract metadata
    const title = article?.title || dom.window.document.title;
    const host = new URL(url).hostname;
    
    return Response.json({
      html: article?.content || '',
      title,
      hrefs: [...new Set(links)], // Remove duplicates
      url,
      host,
      cached: Date.now()
    });
    
  } catch (error) {
    console.error('Extraction error:', error);
    return Response.json(
      { error: 'Failed to extract content' },
      { status: 500 }
    );
  }
}
```

### 7.4 Create Research Engine

**File**: `src/services/ResearchEngine.ts` (NEW)

**Implementation**:

```typescript
import { ContentExtractionService } from './ContentExtraction';
import { supabase } from '@/lib/supabase';

export interface ResearchSession {
  id: string;
  fieldId: string;
  initialUrl: string;
  initialContent: ExtractedContent;
  participants: string[];
  explorations: ResearchExploration[];
  researchTrail: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResearchExploration {
  url: string;
  content: ExtractedContent;
  exploredBy: string;
  timestamp: string;
  parentUrl?: string;
}

export class ResearchEngine {
  private contentExtractor: ContentExtractionService;
  
  constructor() {
    this.contentExtractor = new ContentExtractionService();
  }
  
  async createResearchSession(
    fieldId: string,
    initialUrl: string,
    userId: string
  ): Promise<ResearchSession> {
    const content = await this.contentExtractor.extractFromUrl(initialUrl);
    
    const session: ResearchSession = {
      id: `research-${Date.now()}`,
      fieldId,
      initialUrl,
      initialContent: content,
      participants: [userId],
      explorations: [{
        url: initialUrl,
        content,
        exploredBy: userId,
        timestamp: new Date().toISOString()
      }],
      researchTrail: [initialUrl],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to Supabase
    await supabase.from('research_sessions').insert({
      id: session.id,
      field_id: fieldId,
      initial_url: initialUrl,
      participants: [userId],
      created_at: session.createdAt
    });
    
    return session;
  }
  
  async exploreLink(
    sessionId: string,
    url: string,
    userId: string,
    parentUrl?: string
  ): Promise<ExtractedContent> {
    const content = await this.contentExtractor.extractFromUrl(url);
    
    // Save exploration
    await supabase.from('research_explorations').insert({
      session_id: sessionId,
      url,
      explored_by: userId,
      parent_url: parentUrl,
      extracted_title: content.title,
      extracted_links: content.hrefs,
      timestamp: new Date().toISOString()
    });
    
    // Notify other session participants
    await this.notifySessionParticipants(sessionId, {
      type: 'link_explored',
      url,
      exploredBy: userId,
      title: content.title,
      timestamp: new Date().toISOString()
    });
    
    return content;
  }
  
  private async notifySessionParticipants(
    sessionId: string,
    notification: any
  ): Promise<void> {
    const channel = supabase.channel(`research:${sessionId}`);
    await channel.send({
      type: 'broadcast',
      event: 'exploration',
      payload: notification
    });
  }
}
```

---

## Phase 8: Are.na Cross-Platform Integration

### 8.1 Install Are.na Dependencies

**Priority**: HIGH - Cross-platform research capabilities

**Installation**:

```bash
npm install @mozilla/readability jsdom
```

**Why**: For content extraction and parsing (Readability), DOM manipulation (JSDOM)

### 8.2 Register Are.na App

**Priority**: HIGH - Required for OAuth authentication

**Manual steps**:

1. Go to <https://dev.are.na> and sign in
2. Navigate to "Applications"
3. Click "New Application"
4. Application details:

                        - Name: "Field Nodes"
                        - Description: "Collaborative research platform with evidence-based nodes"
                        - Callback URL: `https://fieldnodes.com/auth/arena/callback` (or `http://localhost:3000/auth/arena/callback` for dev)

5. Save Client ID and Secret to `.env.local`

### 8.3 Create Are.na API Client

**File**: `src/services/ArenaAPI.ts` (NEW)

**Based on**: [Arena PHP Library](https://github.com/aredotna/arena-php.git) patterns

```typescript
const ARENA_API_BASE = 'https://api.are.na/v2';

export interface ArenaChannel {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  published: boolean;
  collaboration: boolean;
  length: number;
  user: ArenaUser;
  collaborators: ArenaUser[];
  contents: ArenaBlock[];
  follower_count: number;
  created_at: string;
  updated_at: string;
}

export interface ArenaBlock {
  id: number;
  title: string;
  generated_title: string;
  content: string | null;
  content_html: string | null;
  description: string | null;
  description_html: string | null;
  source: { url: string } | null;
  image: {
    thumb: { url: string };
    display: { url: string };
    original: { url: string };
  } | null;
  user: ArenaUser;
  connections: ArenaConnection[];
  created_at: string;
  updated_at: string;
  class: string;
  base_class: string;
}

export interface ArenaUser {
  id: number;
  slug: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string;
}

export interface ArenaConnection {
  id: number;
  title: string;
  slug: string;
}

export class ArenaAPI {
  private accessToken: string;
  private baseURL = ARENA_API_BASE;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Get channel with contents (like arena-php get_channel)
  async getChannel(slug: string, options: { page?: number, per?: number } = {}): Promise<ArenaChannel> {
    const queryParams = new URLSearchParams({
      page: String(options.page || 1),
      per: String(options.per || 100)
    });
    
    const response = await fetch(
      `${this.baseURL}/channels/${slug}?${queryParams}`,
      {
      headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  // Get specific block (like arena-php get_block)
  async getBlock(id: number): Promise<ArenaBlock> {
    const response = await fetch(`${this.baseURL}/blocks/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch block: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  // Create new block (like arena-php create_block)
  async createBlock(channelSlug: string, blockData: {
    source?: string;
    title?: string;
    content?: string;
    description?: string;
  }): Promise<ArenaBlock> {
    const response = await fetch(`${this.baseURL}/channels/${channelSlug}/blocks`, {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blockData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create block: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  // Get user's channels
  async getUserChannels(): Promise<ArenaChannel[]> {
    const response = await fetch(`${this.baseURL}/users/me/channels`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user channels: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.channels || [];
  }
  
  // Transform Are.na block to Field Node format
  transformBlockToNode(block: ArenaBlock, fieldId: string) {
    return {
      id: `arena-${block.id}`,
      type: 'raw',
      field_id: fieldId,
      statement: block.title || block.generated_title,
      description: block.description || block.content || '',
      sources: block.source ? [{
          type: 'arena',
        url: block.source.url,
        title: block.title,
        arenaId: block.id,
        arenaBlockUrl: `https://are.na/block/${block.id}`
      }] : [],
      status: block.source ? 'grounded' : 'draft',
      metadata: {
        importSource: 'arena',
        arenaId: block.id,
        arenaUser: block.user.username,
        arenaConnections: block.connections.map(c => c.slug),
        importedAt: new Date().toISOString()
      },
      author_id: 'arena-import', // Will be replaced with actual user
      created_at: block.created_at,
      updated_at: block.updated_at
    };
  }
}
```

### 8.4 Create Research Sync Service

**File**: `src/services/ResearchSync.ts` (NEW)

**Implementation**:

```typescript
import { ArenaAPI } from './ArenaAPI';
import { ResearchEngine } from './ResearchEngine';
import { ContentExtractionService } from './ContentExtraction';
import { supabase } from '@/lib/supabase';

export class ResearchSync {
  private arenaAPI: ArenaAPI;
  private researchEngine: ResearchEngine;
  private contentExtractor: ContentExtractionService;
  
  constructor(arenaAccessToken: string) {
    this.arenaAPI = new ArenaAPI(arenaAccessToken);
    this.researchEngine = new ResearchEngine();
    this.contentExtractor = new ContentExtractionService();
  }
  
  // Sync Field Node research session to Are.na channel
  async syncResearchToArena(
    researchSessionId: string,
    channelSlug: string,
    userId: string
  ): Promise<{ success: boolean; blockCount: number }> {
    try {
      // Get research session from database
      const { data: session, error } = await supabase
        .from('research_sessions')
        .select('*, research_explorations(*)')
        .eq('id', researchSessionId)
        .single();
        
      if (error) throw error;
      
      // Get Are.na channel to verify access
      const channel = await this.arenaAPI.getChannel(channelSlug);
      
      let blockCount = 0;
      
      // Create blocks for each explored link
      for (const exploration of session.research_explorations) {
        const blockData = {
          source: exploration.url,
          title: exploration.extracted_title,
          description: `Research from Field Nodes session ${researchSessionId}`
        };
        
        await this.arenaAPI.createBlock(channelSlug, blockData);
        blockCount++;
      }
      
      // Create a summary block for the research session
      const summaryBlock = {
        title: `Research Session: ${session.initial_url}`,
        content: `Collaborative research with ${session.participants.length} participants. 
                  Explored ${session.research_explorations.length} links.`,
        description: `Field Nodes Research Session ID: ${researchSessionId}`
      };
      
      await this.arenaAPI.createBlock(channelSlug, summaryBlock);
      blockCount++;
      
      // Log sync activity
      await supabase.from('arena_sync_log').insert({
        research_session_id: researchSessionId,
        arena_channel: channelSlug,
        blocks_created: blockCount,
        synced_by: userId,
        synced_at: new Date().toISOString()
      });
      
      return { success: true, blockCount };
      
    } catch (error) {
      console.error('Failed to sync research to Are.na:', error);
      return { success: false, blockCount: 0 };
    }
  }
  
  // Import Are.na channel as Field Nodes research collection
  async importArenaChannel(
    channelSlug: string,
    fieldId: string,
    userId: string
  ): Promise<{ success: boolean; nodeCount: number; collectionId: string }> {
    try {
      // Get Are.na channel with all contents
      const channel = await this.arenaAPI.getChannel(channelSlug, { per: 100 });
      
      // Create research collection in Field Nodes
      const { data: collection, error: collectionError } = await supabase
        .from('research_collections')
        .insert({
          name: channel.title,
          description: channel.description,
          field_id: fieldId,
          created_by: userId,
          source: 'arena',
          source_channel: channelSlug,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (collectionError) throw collectionError;
      
      let nodeCount = 0;
      
      // Import each block as Field Node
      for (const block of channel.contents) {
        // Only import blocks with sources (URLs)
        if (block.source && block.source.url) {
          try {
            // Extract content using Pilgrim
            const extractedContent = await this.contentExtractor.extractFromUrl(
              block.source.url
            );
            
            // Create Field Node from Are.na block
            const nodeData = {
              type: 'raw',
              field_id: fieldId,
              author_id: userId,
              statement: block.title || block.generated_title,
              description: block.description || extractedContent.title,
              sources: [{
                type: 'arena',
                url: block.source.url,
                title: block.title,
                arenaId: block.id,
                extractedContent: extractedContent.html,
                discoveredLinks: extractedContent.hrefs
              }],
              status: 'grounded',
      metadata: {
                importSource: 'arena',
                arenaChannel: channelSlug,
                arenaBlockId: block.id,
                researchCollection: collection.id,
                originalAuthor: block.user.username
              },
              created_at: block.created_at
            };
            
            const { error: nodeError } = await supabase
              .from('nodes')
              .insert(nodeData);
              
            if (!nodeError) nodeCount++;
            
          } catch (extractError) {
            console.warn(`Failed to extract content for block ${block.id}:`, extractError);
            // Continue with next block
          }
        }
      }
      
      // Log import activity
      await supabase.from('arena_import_log').insert({
        arena_channel: channelSlug,
        field_id: fieldId,
        collection_id: collection.id,
        nodes_imported: nodeCount,
        imported_by: userId,
        imported_at: new Date().toISOString()
      });
      
      return { 
        success: true, 
        nodeCount, 
        collectionId: collection.id 
      };
      
    } catch (error) {
      console.error('Failed to import Are.na channel:', error);
      throw error;
    }
  }
  
  // Get user's Are.na channels
  async getUserArenaChannels(): Promise<ArenaChannel[]> {
    return await this.arenaAPI.getUserChannels();
  }
}
```

### 8.5 Create Research Sync Interface Component

**File**: `src/components/ResearchSyncInterface.tsx` (NEW)

**Implementation**:

```typescript
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ResearchSync } from '@/services/ResearchSync';
import { palette } from '@/theme';

interface ResearchSyncInterfaceProps {
  researchSessionId: string;
  fieldId: string;
  userId: string;
}

export default function ResearchSyncInterface({
  researchSessionId,
  fieldId,
  userId
}: ResearchSyncInterfaceProps) {
  const router = useRouter();
  const [arenaChannels, setArenaChannels] = useState([]);
  const [syncStatus, setSyncStatus] = useState('idle');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [importChannel, setImportChannel] = useState('');
  
  useEffect(() => {
    loadUserChannels();
  }, []);
  
  const loadUserChannels = async () => {
    try {
      const arenaToken = localStorage.getItem('arena_access_token');
      if (!arenaToken) return;
      
      const sync = new ResearchSync(arenaToken);
      const channels = await sync.getUserArenaChannels();
      setArenaChannels(channels);
    } catch (error) {
      console.error('Failed to load Are.na channels:', error);
    }
  };
  
  const handleSyncToArena = async () => {
    if (!selectedChannel) return;
    
    setSyncStatus('syncing');
    
    try {
      const arenaToken = localStorage.getItem('arena_access_token');
      const sync = new ResearchSync(arenaToken);
      
      const result = await sync.syncResearchToArena(
        researchSessionId,
        selectedChannel,
        userId
      );
      
      if (result.success) {
        setSyncStatus('synced');
        showNotification(`✅ Synced ${result.blockCount} blocks to Are.na`);
      } else {
        setSyncStatus('error');
        showNotification('❌ Sync failed. Please try again.');
      }
    } catch (error) {
      setSyncStatus('error');
      showNotification('❌ Sync failed. Please check permissions.');
    }
  };
  
  const handleImportFromArena = async () => {
    if (!importChannel) return;
    
    setSyncStatus('importing');
    
    try {
      const arenaToken = localStorage.getItem('arena_access_token');
      const sync = new ResearchSync(arenaToken);
      
      const result = await sync.importArenaChannel(
        importChannel,
        fieldId,
        userId
      );
      
      if (result.success) {
        setSyncStatus('imported');
        showNotification(`✅ Imported ${result.nodeCount} nodes from Are.na`);
        router.push(`/field/${fieldId}/research/${result.collectionId}`);
      }
    } catch (error) {
      setSyncStatus('error');
      showNotification('❌ Import failed. Please check channel permissions.');
    }
  };
  
  const showNotification = (message: string) => {
    // Implementation for toast notification
    console.log(message);
  };
  
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Cross-Platform Research</h3>
      
      {/* Sync to Are.na */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Sync to Are.na</h4>
        <select 
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          style={styles.select}
        >
          <option value="">Select channel...</option>
          {arenaChannels.map(channel => (
            <option key={channel.slug} value={channel.slug}>
              {channel.title} ({channel.length} blocks)
            </option>
          ))}
        </select>
        <button 
          onClick={handleSyncToArena}
          disabled={!selectedChannel || syncStatus === 'syncing'}
          style={styles.button}
        >
          {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Research'}
        </button>
      </div>
      
      {/* Import from Are.na */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Import from Are.na</h4>
        <input 
          placeholder="Enter Are.na channel slug..."
          value={importChannel}
          onChange={(e) => setImportChannel(e.target.value)}
          style={styles.input}
        />
        <button 
          onClick={handleImportFromArena}
          disabled={!importChannel || syncStatus === 'importing'}
          style={styles.button}
        >
          {syncStatus === 'importing' ? 'Importing...' : 'Import Channel'}
        </button>
      </div>
      
      {/* Status Messages */}
      {syncStatus === 'synced' && (
        <div style={styles.success}>
          ✅ Research synced to Are.na successfully
        </div>
      )}
      
      {syncStatus === 'imported' && (
        <div style={styles.success}>
          ✅ Channel imported to Field Nodes successfully
        </div>
      )}
      
      {syncStatus === 'error' && (
        <div style={styles.error}>
          ❌ Operation failed. Please try again.
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    background: palette.bg,
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    marginTop: '24px'
  },
  title: {
    color: palette.magenta,
    fontSize: '20px',
    marginBottom: '16px'
  },
  section: {
    marginBottom: '24px'
  },
  sectionTitle: {
    color: palette.lilac,
    fontSize: '16px',
    marginBottom: '12px'
  },
  select: {
    width: '100%',
    padding: '12px',
    background: palette.helpBg,
    border: `1px solid ${palette.divider}`,
    borderRadius: '8px',
    color: palette.ink,
    fontSize: '14px',
    marginBottom: '12px'
  },
  input: {
    width: '100%',
    padding: '12px',
    background: palette.helpBg,
    border: `1px solid ${palette.divider}`,
    borderRadius: '8px',
    color: palette.ink,
    fontSize: '14px',
    marginBottom: '12px'
  },
  button: {
    padding: '12px 24px',
    background: palette.magenta,
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 500
  },
  success: {
    padding: '12px',
    background: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid #4CAF50',
    borderRadius: '8px',
    color: '#4CAF50',
    marginTop: '16px'
  },
  error: {
    padding: '12px',
    background: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid #F44336',
    borderRadius: '8px',
    color: '#F44336',
    marginTop: '16px'
  }
};
```

---

## Phase 9: Knowledge Graph Visualization (Using Open Source Patterns)

### 9.1 Study Reference Projects

**Priority**: HIGH - Learn from proven graph visualization patterns

**Reference Projects**:

1. **KG-Vis** ([GitHub](https://github.com/semantic-systems/coypu-kg-vis))

                        - Study their graph exploration UI/UX
                        - Learn filtering and search patterns
                        - Adapt node/edge styling for Field Nodes taxonomy

2. **Graphameleon** ([GitHub](https://github.com/Orange-OpenSource/graphameleon))

                        - Study their navigation tracking → graph data pipeline
                        - Learn from their knowledge graph data structures
                        - Adapt for Field Nodes' research trail visualization

3. **Perplexity Lens** ([GitHub](https://github.com/iamaayushijain/perplexity-lens))

                        - Study their graph export and visualization techniques
                        - Learn from their browsing activity → node creation flow
                        - Adapt for Field Nodes' reflection prompts

### 9.2 Create Field Map Component

**File**: `src/components/FieldMap.tsx` (NEW)

**Based on**: KG-Vis patterns + react-force-graph-2d

**Implementation**:

```typescript
import { useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { supabase } from '@/lib/supabase';
import { palette } from '@/theme';

interface FieldMapProps {
  fieldId: string;
  onNodeClick?: (nodeId: string) => void;
}

export default function FieldMap({ fieldId, onNodeClick }: FieldMapProps) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const graphRef = useRef();
  
  useEffect(() => {
    loadGraphData();
    subscribeToUpdates();
  }, [fieldId, filterType]);
  
  const loadGraphData = async () => {
    // Get nodes from field
    const { data: nodes, error: nodesError } = await supabase
      .from('nodes')
      .select('*, author:users(*)')
      .eq('field_id', fieldId);
      
    if (nodesError) {
      console.error('Failed to load nodes:', nodesError);
      return;
    }
    
    // Get connections between nodes
    const { data: connections, error: connectionsError } = await supabase
      .from('node_connections')
      .select('*')
      .in('from_node_id', nodes.map(n => n.id));
      
    if (connectionsError) {
      console.error('Failed to load connections:', connectionsError);
      return;
    }
    
    // Filter based on selected type
    const filteredNodes = filterType === 'all' 
      ? nodes 
      : nodes.filter(n => n.type === filterType);
    
    // Transform to graph data format
    const graphNodes = filteredNodes.map(node => ({
      id: node.id,
      label: node.statement,
      type: node.type,
      status: node.status,
      author: node.author?.username,
      color: getNodeColor(node.type, node.status),
      size: getNodeSize(node.type)
    }));
    
    const graphLinks = connections
      .filter(conn => 
        filteredNodes.find(n => n.id === conn.from_node_id) &&
        filteredNodes.find(n => n.id === conn.to_node_id)
      )
      .map(conn => ({
        source: conn.from_node_id,
        target: conn.to_node_id,
        type: conn.relationship_type,
        color: getLinkColor(conn.relationship_type)
      }));
    
    setGraphData({ nodes: graphNodes, links: graphLinks });
  };
  
  const subscribeToUpdates = () => {
    const channel = supabase
      .channel(`field:${fieldId}:graph`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'nodes',
        filter: `field_id=eq.${fieldId}`
      }, () => {
        loadGraphData(); // Reload on any node change
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'node_connections'
      }, () => {
        loadGraphData(); // Reload on any connection change
      })
      .subscribe();
      
    return () => channel.unsubscribe();
  };
  
  const getNodeColor = (type: string, status: string) => {
    // Color by type (inspired by KG-Vis)
    const typeColors = {
      raw: palette.lilac,
      support: '#FF9800',
      reflection: '#4CAF50',
      context: palette.magenta
    };
    
    // Dim if draft status
    const color = typeColors[type] || palette.muted;
    return status === 'draft' ? `${color}66` : color;
  };
  
  const getNodeSize = (type: string) => {
    // Size by importance (inspired by Graphameleon)
    const sizes = {
      raw: 8,
      support: 6,
      reflection: 7,
      context: 5
    };
    return sizes[type] || 5;
  };
  
  const getLinkColor = (type: string) => {
    const linkColors = {
      expands: palette.lilac,
      supports: '#FF9800',
      challenges: '#F44336',
      revises: '#2196F3'
    };
    return linkColors[type] || palette.muted;
  };
  
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    onNodeClick?.(node.id);
  };
  
  return (
    <div style={styles.container}>
      {/* Filter Controls (inspired by KG-Vis) */}
      <div style={styles.controls}>
        <h3 style={styles.title}>Field Map</h3>
        <div style={styles.filters}>
          <button 
            onClick={() => setFilterType('all')}
            style={filterType === 'all' ? styles.filterActive : styles.filter}
          >
            All Nodes
          </button>
          <button 
            onClick={() => setFilterType('raw')}
            style={filterType === 'raw' ? styles.filterActive : styles.filter}
          >
            Raw
          </button>
          <button 
            onClick={() => setFilterType('support')}
            style={filterType === 'support' ? styles.filterActive : styles.filter}
          >
            Support
          </button>
          <button 
            onClick={() => setFilterType('reflection')}
            style={filterType === 'reflection' ? styles.filterActive : styles.filter}
          >
            Reflection
          </button>
        </div>
      </div>
      
      {/* Graph Visualization */}
      <div style={styles.graphContainer}>
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeLabel="label"
          nodeColor="color"
          nodeVal="size"
          linkColor="color"
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          onNodeClick={handleNodeClick}
          backgroundColor={palette.bg}
          cooldownTicks={100}
          d3VelocityDecay={0.3}
        />
      </div>
      
      {/* Node Detail Panel (inspired by Perplexity Lens) */}
      {selectedNode && (
        <div style={styles.detailPanel}>
          <h4 style={styles.detailTitle}>{selectedNode.label}</h4>
          <div style={styles.detailMeta}>
            <span>Type: {selectedNode.type}</span>
            <span>Status: {selectedNode.status}</span>
            <span>Author: @{selectedNode.author}</span>
          </div>
          <button 
            onClick={() => onNodeClick?.(selectedNode.id)}
            style={styles.viewButton}
          >
            View Full Node
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    background: palette.bg,
    position: 'relative' as const
  },
  controls: {
    position: 'absolute' as const,
    top: '20px',
    left: '20px',
    zIndex: 10,
    background: 'rgba(14, 14, 16, 0.95)',
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`
  },
  title: {
    color: palette.magenta,
    fontSize: '18px',
    marginBottom: '12px'
  },
  filters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const
  },
  filter: {
    padding: '8px 16px',
    background: 'transparent',
    border: `1px solid ${palette.divider}`,
    borderRadius: '6px',
    color: palette.muted,
    cursor: 'pointer',
    fontSize: '13px'
  },
  filterActive: {
    padding: '8px 16px',
    background: palette.magenta,
    border: `1px solid ${palette.magenta}`,
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '13px'
  },
  graphContainer: {
    width: '100%',
    height: '100%'
  },
  detailPanel: {
    position: 'absolute' as const,
    bottom: '20px',
    right: '20px',
    width: '300px',
    background: 'rgba(14, 14, 16, 0.95)',
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
    zIndex: 10
  },
  detailTitle: {
    color: palette.ink,
    fontSize: '16px',
    marginBottom: '12px'
  },
  detailMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    color: palette.muted,
    fontSize: '13px',
    marginBottom: '12px'
  },
  viewButton: {
    width: '100%',
    padding: '10px',
    background: palette.lilac,
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  }
};
```

---

## Phase 10: Browser Extension (Future Enhancement)

### 10.1 Study Extension Architecture

**Priority**: LOW - Future feature after web app is solid

**Reference Projects**:

1. **Graphameleon** - Extension + web app sync architecture
2. **Perplexity Lens** - Browse → capture → reflect workflow

**Adaptation Strategy**:

- Use their extension → web app communication patterns
- Adapt their browsing trace capture for Field Nodes research sessions
- Learn from their content selection mechanisms

**Implementation Notes**:

- Build as Chrome/Firefox extension
- Sync with Field Nodes web app via API
- Capture URLs → auto-create Raw Nodes
- Offer reflection prompts after browsing sessions

---

## Phase 11: Migration & Deployment

### 9.1 Create Migration Script

**File**: `scripts/migrate-to-supabase.ts` (NEW)

```typescript
import { createClient } from '@supabase/supabase-js';
import { NodeStorage } from '../src/services/storage';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrateLocalStorageData() {
  console.log('Starting migration...');

  // Get localStorage data
  const nodes = NodeStorage.getAllNodes();
  const fields = NodeStorage.getAllFields();

  console.log(`Found ${nodes.length} nodes, ${fields.length} fields`);

  // Create default field if none exist
  let defaultFieldId: string;
  if (fields.length === 0) {
    const { data: field } = await supabase
      .from('fields')
      .insert({
        name: 'My Research',
        slug: 'my-research',
        is_public: false,
      })
      .select()
      .single();
    defaultFieldId = field.id;
  } else {
    defaultFieldId = fields[0].id;
  }

  // Migrate nodes
  for (const node of nodes) {
    await supabase.from('nodes').insert({
      ...node,
      field_id: defaultFieldId,
    });
  }

  console.log('Migration complete!');
}

migrateLocalStorageData();
```

**Run with**: `npx tsx scripts/migrate-to-supabase.ts`

### 9.2 Update Vercel Deployment

**Add environment variables in Vercel dashboard**:

1. Go to vercel.com
2. Select project
3. Settings → Environment Variables
4. Add all variables from `.env.example`

**Update deployment**:

```bash
git push origin main
# Auto-deploys via Vercel GitHub integration
```

### 9.3 Update README with Setup Instructions

**

### To-dos

- [ ] Create Supabase project, configure database schema with tables and RLS policies
- [ ] Install Supabase client libraries and configure environment variables
- [ ] Build authentication provider, login/signup modals, and protected routes
- [ ] Replace localStorage with Supabase queries and real-time subscriptions
- [ ] Build field discovery, activity feeds, support/reflection forms
- [ ] Implement force-directed graph visualization for node relationships
- [ ] Create data migration script, configure Vercel deployment, update documentation