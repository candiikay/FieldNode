# Field Nodes — Typography Specifications

## Font Families

### Primary Fonts

**Space Grotesk** (Headings & UI)
- **Usage**: Page titles, section headers, UI labels, buttons
- **Why**: Humanist sans-serif that balances technical precision with warmth
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold)
- **Fallback**: `-apple-system, BlinkMacSystemFont, sans-serif`

**IBM Plex Mono** (Body & Code)
- **Usage**: Terminal output, code blocks, body text, forms
- **Why**: Warm monospace designed for readability, not cold terminal aesthetic
- **Weights**: 400 (Regular), 500 (Medium)
- **Fallback**: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`

### Alternative Fonts

**Geist Mono** (Clean Technical)
- **Usage**: Alternative to IBM Plex Mono for cleaner, more minimal aesthetic
- **When**: When IBM Plex Mono feels too warm or characterful
- **Weights**: 400 (Regular), 500 (Medium)

**Suisse Int'l** (Premium Alternative)
- **Usage**: Alternative to Space Grotesk for more refined, editorial feel
- **When**: When Space Grotesk feels too technical
- **Weights**: 400 (Regular), 500 (Medium)

## Type Scale

### Base Size: 14px

All sizes are relative to the base 14px for consistent scaling.

```
xs:   11px  (0.786em)  // metadata, timestamps, small labels
sm:   13px  (0.929em)  // secondary text, captions
base: 14px  (1em)      // body text, form inputs
md:   15px  (1.071em)  // emphasized body text
lg:   18px  (1.286em)  // section headers, card titles
xl:   20px  (1.429em)  // page titles, major headings
2xl:  24px  (1.714em)  // hero text, splash screens
3xl:  32px  (2.286em)  // terminal splash, major announcements
```

### Usage Guidelines

**xs (11px)**:
- Node IDs: `FN-RN.042`
- Timestamps: `2 hours ago`
- Status labels: `draft`, `grounded`
- Metadata: `Type: Raw Node`

**sm (13px)**:
- Secondary information
- Help text
- Captions
- Terminal prompts: `> `

**base (14px)**:
- Primary body text
- Form inputs
- Terminal output
- Most UI text

**md (15px)**:
- Emphasized body text
- Important descriptions
- Node statements (when not in terminal)

**lg (18px)**:
- Section headers
- Card titles
- Terminal splash text
- Important announcements

**xl (20px)**:
- Page titles
- Major headings
- Terminal welcome messages

**2xl (24px)**:
- Hero text
- Major splash screens
- Important announcements

**3xl (32px)**:
- Terminal splash
- Major system announcements
- Brand moments

## Font Weights

### Weight Guidelines

**400 (Regular)**:
- Primary weight for all text
- Body text, terminal output
- UI labels, buttons
- Most headings

**500 (Medium)**:
- Emphasis within body text
- Important UI elements
- Button text
- Subtle hierarchy

**600 (Semibold)**:
- Major headings only
- Page titles
- Important announcements
- Terminal splash text

### Weight Restrictions

**Never Use**:
- **Bold (700+)**: Too aggressive, breaks calm aesthetic
- **Thin (100-200)**: Too fragile, poor readability
- **Black (900)**: Overwhelming, not Field Nodes voice

## Line Heights

### Line Height Scale

```
tight:   1.2  // headings, titles, compact layouts
normal:  1.6  // body text, forms, general UI
relaxed: 1.9  // terminal output, code blocks, long-form reading
```

### Usage Guidelines

**tight (1.2)**:
- Page titles
- Section headers
- Card titles
- Compact terminal layouts
- Button text

**normal (1.6)**:
- Body text
- Form inputs
- UI labels
- General interface text
- Short descriptions

**relaxed (1.9)**:
- Terminal output
- Code blocks
- Long-form reading
- Help documentation
- Node descriptions

## Letter Spacing

### Letter Spacing Guidelines

**Default**: Normal letter spacing for most text

**Tight (-0.02em)**:
- Large headings (2xl, 3xl)
- Terminal splash text
- Brand moments

**Wide (0.05em)**:
- Small caps text
- Terminal commands
- Code snippets

## Font Loading Strategy

### Web Font Loading

```css
/* Preload critical fonts */
<link rel="preload" href="/fonts/SpaceGrotesk-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/IBMPlexMono-Regular.woff2" as="font" type="font/woff2" crossorigin>

/* Font face declarations */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/IBMPlexMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/IBMPlexMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

## Typography in Components

### Terminal Components

```css
.terminal-output {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 18px;
  line-height: 1.9;
  letter-spacing: 0.15px;
}

.terminal-prompt {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 18px;
  font-weight: 500;
  color: #D65CA9; /* magenta */
}

.terminal-command {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.05em;
}
```

### UI Components

```css
.page-title {
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.section-header {
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
}

.body-text {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}

.button-text {
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}
```

## Accessibility Considerations

### Readability Standards

- **Minimum font size**: 11px (xs) for metadata only
- **Primary text size**: 14px (base) minimum
- **Contrast ratio**: 4.5:1 minimum for normal text, 3:1 for large text
- **Line length**: Maximum 75 characters for optimal reading

### Screen Reader Support

- Use semantic HTML elements (`h1`, `h2`, `p`, etc.)
- Provide alt text for images
- Use `aria-label` for icon-only buttons
- Ensure proper heading hierarchy

### Responsive Typography

```css
/* Mobile adjustments */
@media (max-width: 768px) {
  .page-title {
    font-size: 20px; /* xl instead of 2xl */
  }
  
  .terminal-output {
    font-size: 16px; /* md instead of lg */
  }
  
  .body-text {
    font-size: 15px; /* md instead of base */
  }
}
```

## Implementation Checklist

Before implementing typography:

- [ ] Are fonts properly loaded with `font-display: swap`?
- [ ] Is the type scale consistent across all components?
- [ ] Are font weights appropriate (400-600 only)?
- [ ] Is line height optimized for readability?
- [ ] Are fallback fonts specified?
- [ ] Is responsive typography implemented?
- [ ] Are accessibility standards met?
- [ ] Does the typography feel calm and contemplative?

---

*typography is the voice of the interface*
