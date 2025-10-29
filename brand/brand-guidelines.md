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
```

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
```

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
