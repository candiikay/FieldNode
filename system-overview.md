# Field Nodes System Overview

## Core Philosophy
Field Nodes is a **non-hierarchical, collaborative thinking system** where ideas grow through relation, not competition. Every contribution is additive and attributed.

## Architecture

### Key Components
- **`/src/components/FieldNodesTerminal.tsx`** - Main terminal interface
- **`/src/types/`** - Type definitions (create this)
- **`/src/commands/`** - Command handlers (create this)
- **`/src/data/`** - Node and field data (create this)

### User States
```typescript
type UserType = 'guest' | 'account';
type Stage = 'origin' | 'orient' | 'covenant' | 'identify' | 'login' | 'lineage' | 'reflect' | 'link' | 'tend' | 'offer';
```

### Account System
- **Guests**: Read-only access, can browse and explore
- **Account holders**: Full access to write, create, link, tend
- **Account creation**: Name + password (min 4 chars)
- **Login**: Username + password verification

## Data Models

### Node Structure
```typescript
interface Node {
  id: string;           // e.g., "FN_1.12"
  title: string;        // e.g., "feminism / systems"
  body: string;         // reflection content
  links: string[];      // connected node IDs
  author: string;       // creator handle
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
  state: 'evolving' | 'stable' | 'archived';
  connections: number;  // active link count
}
```

### User Identity
```typescript
interface UserIdentity {
  name: string;         // display name
  role: string;         // observer/builder/reflector/steward
  password?: string;    // for account holders
}
```

## Command System

### Navigation Commands
- **`/orient`** - Show system introduction and guide
- **`/explore`** - Browse existing fields and nodes
- **`/help`** - List available commands
- **`/map`** - View network visualization

### Account Commands
- **`/login`** - Login with username/password
- **`/guest`** - Continue as read-only guest

### Content Commands
- **`/node`** - Create new node (account holders only)
- **`/link <a> <b>`** - Connect two nodes
- **`/reflect`** - Add reflection to current node
- **`/tend`** - Maintain node (add sources, notes)
- **`/offer`** - Publish to shared system

## User Flow

### New User Path
1. **Origin** → Welcome screen with 3 options
2. **Orient** → System introduction (can skip with `/explore`)
3. **Covenant** → Agree to shared principles
4. **Identify** → Create account (name + password) or continue as guest
5. **Lineage** → Choose starting field or explore
6. **Reflect** → Begin contributing (account holders only)

### Returning User Path
1. **Origin** → Welcome screen
2. **Login** → Username + password
3. **Reflect** → Direct access to content creation

## Key Behaviors

### Guest Restrictions
```typescript
// Guests can only browse - no writing/creating
if (userIdentity?.name === 'guest') {
  // Allow: /explore, /map, /help
  // Block: /node, /link, /reflect, /tend, /offer
  // Show: "guests can only browse. create an account to write and create."
}
```

### Node Linking
- Links are **reciprocal** - both nodes update their links[] arrays
- No hierarchy - all connections are equal
- Links create **network effects** not tree structures

### Content Creation
- **Local-first** - content saved locally until offered
- **Attribution required** - every contribution is credited
- **Non-destructive** - edits add to history, don't replace

## File Structure
```
/src
  /components
    FieldNodesTerminal.tsx    # Main terminal interface
  /types
    index.ts                  # Node, User, Field interfaces
  /commands
    orient.ts                 # Orientation flow
    account.ts                # Login/creation
    content.ts                # Node/link operations
  /data
    fields.ts                 # Available fields
    nodes.ts                  # Node storage
  /utils
    formatHandle.ts           # Username formatting
    validation.ts             # Input validation
```

## Development Notes

### Terminal Interface
- **Typewriter animation** for authentic feel
- **Fast, responsive** typing (2ms delay)
- **Clear visual hierarchy** with boxes and emojis
- **Natural input** - no complex formats required

### State Management
- **React hooks** for stage and user state
- **Local storage** for draft persistence
- **Account step tracking** for multi-step flows

### Error Handling
- **Clear, helpful messages** for validation errors
- **Graceful degradation** for guest users
- **Consistent command responses** across all stages

## Ethics & Principles
- **Care over competition** - system rewards thoughtful contribution
- **Attribution over ownership** - ideas belong to the collective
- **Relation over hierarchy** - connections grow sideways, not up
- **Context over speed** - slow, considered participation preferred
