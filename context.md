# Field Nodes Context

## System Ethic
Field Nodes is designed around **care, not competition**. The system rewards thoughtful contribution over quick reactions, relation over hierarchy, and context over speed.

## Core Design Principles

### 1. Non-Hierarchical Growth
- Ideas grow **sideways through connection**, not upward through hierarchy
- Every node can link to any other node
- Links are **reciprocal** - both nodes reference each other
- No "top" or "bottom" - just a web of relations

### 2. Attribution Over Ownership
- Every contribution is **credited to its author**
- Ideas belong to the **collective field**, not individuals
- Content is **additive** - edits add to history, don't replace
- **Local-first** - users own their thoughts until they offer them

### 3. Care Over Performance
- This is **not social media** - no likes, follows, or viral content
- Users are encouraged to **listen before adding**
- **Slow, considered participation** is preferred
- The system rewards **context and care** over speed

### 4. Guest vs Account Distinction
- **Guests**: Read-only access, can browse and explore
- **Account holders**: Full access to write, create, link, tend
- Clear messaging about capabilities and limitations
- Natural progression from browsing to participating

## Technical Implementation

### Terminal Interface
- **Typewriter animation** for authentic, human feel
- **Fast, responsive** typing (2ms delay with minimal randomness)
- **Clear visual hierarchy** using boxes, emojis, and spacing
- **Natural input** - no complex command formats required

### Command System
- **Slash commands** (`/orient`, `/login`) for navigation
- **Natural typing** for names, usernames, content
- **Context-aware** - different commands available in different stages
- **Helpful error messages** with clear next steps

### State Management
- **React hooks** for stage and user state
- **Account step tracking** for multi-step flows
- **Local storage** for draft persistence
- **Guest restrictions** enforced at command level

## User Experience Philosophy

### Welcoming but Not Overwhelming
- **Inspiring opening** that sets the right tone
- **Clear value proposition** in first few words
- **Multiple entry points** based on user state
- **Progressive disclosure** - show what's needed when

### Respectful of User Time
- **Fast animations** that don't feel slow
- **Clear next steps** at every stage
- **Skip options** for returning users
- **Helpful but not verbose** error messages

### Encouraging Participation
- **Gentle guidance** rather than strict rules
- **Clear benefits** of creating an account
- **Multiple ways** to contribute (reflect, link, tend)
- **Recognition** of contributions through attribution

## Code Style Guidelines

### Comments Should Explain Intent
```typescript
// @fieldnodes:command
// Purpose: handle creation of a new node (thought object)
// Ethics: every node is additive, non-destructive
```

### Data Models Should Be Explicit
```typescript
interface Node {
  id: string;           // e.g., "FN_1.12"
  title: string;        // e.g., "feminism / systems"
  body: string;         // reflection content
  links: string[];      // connected node IDs (reciprocal)
  author: string;       // creator handle
  // ... etc
}
```

### Error Handling Should Be Helpful
```typescript
if (userIdentity?.name === 'guest') {
  await write('guests can only browse. create an account to write and create.','muted');
  await write('type /login to create an account.','muted');
  return;
}
```

## What Makes This Different

### Not Another Social Platform
- No feeds, algorithms, or viral content
- No follower counts or engagement metrics
- No advertising or data extraction
- Focus on **collective knowledge building**

### Not Another Note-Taking App
- **Collaborative by design** - not just personal notes
- **Network effects** through linking
- **Attribution required** - not anonymous
- **Living system** that grows through participation

### Not Another Wiki
- **Non-hierarchical** - no top-down structure
- **Personal voice** encouraged, not neutral tone
- **Local-first** - users control their content
- **Care-based** - quality over quantity

This system is designed to be a **living methodology** that teaches care, structure, and belonging through interaction.
