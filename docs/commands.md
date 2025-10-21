# Field Nodes Commands Reference

## Navigation Commands

### `/orient`
**Purpose**: Show system introduction and guide
**Usage**: `> /orient`
**Response**: Multi-page orientation with system overview, commands, and best practices
**Available in**: `origin` stage
**Example**:
```
> /orient
orientation initiated...
welcome to FIELD NODES
──────────────────────────────────────────────
a shared environment for collaborative thinking
...
```

### `/explore`
**Purpose**: Browse existing fields and nodes
**Usage**: `> /explore`
**Response**: Shows available fields with node counts
**Available in**: `orient`, `lineage` stages
**Example**:
```
> /explore
exploration mode initiated...
┌─ ACTIVE FIELDS ─────────────────────────────┐
│  system_design     (14 connected nodes)     │
│  feminist_theory   (22 connected nodes)     │
│  mutual_aid        (17 connected nodes)     │
└─────────────────────────────────────────────┘
```

### `/help`
**Purpose**: List all available commands
**Usage**: `> /help`
**Response**: Shows commands available in current stage
**Available in**: All stages
**Example**:
```
> /help
available: /orient · /join · /reflect
```

## Account Commands

### `/login`
**Purpose**: Login with existing account
**Usage**: `> /login`
**Response**: Prompts for username and password
**Available in**: `origin`, `identify` stages
**Example**:
```
> /login
do you have an account?
just type your username below:
> alex
username: alex
password:
> mypassword
welcome back, alex
```

### `/guest`
**Purpose**: Continue as read-only guest
**Usage**: `> /guest`
**Response**: Sets user as guest with browse-only access
**Available in**: `identify` stage
**Example**:
```
> /guest
welcome, guest! you can browse and explore.
to write and create, you'll need an account.
```

## Content Commands

### `/node`
**Purpose**: Create new node (account holders only)
**Usage**: `> /node "title" "content"`
**Response**: Creates new node and sets as current
**Available in**: `reflect` stage (account holders only)
**Example**:
```
> /node "care as computation" "thinking about how care work operates..."
node created: FN_2.15 "care as computation"
you are now tending this node
```

### `/link`
**Purpose**: Connect two nodes
**Usage**: `> /link <node_id_a> <node_id_b>`
**Response**: Creates reciprocal link between nodes
**Available in**: `reflect` stage (account holders only)
**Example**:
```
> /link FN_1.12 FN_2.15
link created between FN_1.12 and FN_2.15
both nodes now reference each other
```

### `/reflect`
**Purpose**: Add reflection to current node
**Usage**: `> /reflect`
**Response**: Enters reflection mode for writing
**Available in**: `lineage` stage (account holders only)
**Example**:
```
> /reflect
reflection mode active
write your thoughts below:
[textarea appears]
```

### `/tend`
**Purpose**: Maintain node (add sources, notes)
**Usage**: `> /tend`
**Response**: Enters maintenance mode
**Available in**: `reflect`, `link` stages (account holders only)
**Example**:
```
> /tend
tending mode: add sources, citations, or care-notes
format: source: [url] or note: [your note]
> source: https://example.com
source added: https://example.com
```

### `/offer`
**Purpose**: Publish to shared system
**Usage**: `> /offer`
**Response**: Publishes current work to collective
**Available in**: `reflect`, `link` stages (account holders only)
**Example**:
```
> /offer
publishing flow coming soon.
```

## System Commands

### `/map`
**Purpose**: View network visualization
**Usage**: `> /map`
**Response**: Shows network graph of connected nodes
**Available in**: `lineage` stage
**Example**:
```
> /map
rendering network map… (prototype placeholder)
```

### `/done`
**Purpose**: Complete current operation
**Usage**: `> /done`
**Response**: Exits current mode
**Available in**: `tend` stage
**Example**:
```
> /done
tending complete. node maintained.
```

## Guest Restrictions

Guests can only use:
- `/explore` - Browse fields and nodes
- `/map` - View network
- `/help` - Get help

Guests **cannot** use:
- `/node` - Create content
- `/link` - Connect nodes
- `/reflect` - Write reflections
- `/tend` - Maintain nodes
- `/offer` - Publish content

When guests try to use restricted commands:
```
guests can only browse. create an account to write and create.
type /login to create an account.
```

## Command Flow Examples

### New User Journey
```
> /orient
[orientation pages...]
> /explore
[field selection...]
> alex
name set: alex
now choose a password:
> mypassword
password set!
welcome, alex@fieldnodes
```

### Returning User Journey
```
> /login
just type your username below:
> alex
username: alex
password:
> mypassword
welcome back, alex
```

### Content Creation
```
> /reflect
[write reflection...]
> /link FN_1.12
link recorded with FN_1.12. thank you for tending the field.
> /tend
[add sources/notes...]
> /done
tending complete.
```
