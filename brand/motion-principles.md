# Field Nodes — Motion Principles

## Animation Philosophy

Motion in Field Nodes should feel like **breathing** - natural, slow, and purposeful. Every animation expresses the core values of care, contemplation, and material honesty.

## Core Principles

### 1. Slowness as Affordance

**Speed Guidelines**:
- **Fast**: 150ms (micro-interactions only)
- **Base**: 200ms (standard transitions)
- **Slow**: 300ms (content changes, state transitions)
- **Slowest**: 500ms (major page transitions, reflections)

**Why Slow**: Slowness creates space for reflection. Users should feel the transition, not just see it.

### 2. Natural Easing

**Easing Functions**:
- **Primary**: `ease-in-out` (most transitions)
- **Enter**: `ease-out` (elements appearing)
- **Exit**: `ease-in` (elements disappearing)

**Never Use**: `linear`, `ease`, or custom cubic-bezier curves that feel mechanical.

### 3. Purposeful Motion

**Animate Only**:
- State changes
- Content loading
- User feedback
- Focus changes

**Never Animate**:
- Decorative elements
- Background patterns
- Loading spinners (use pulse instead)
- Hover effects (use color/opacity changes)

## Standard Animations

### Fade In/Out

**Usage**: Content appearing/disappearing, page transitions

```css
@keyframes fadeIn {
  from { 
    opacity: 0; 
  }
  to { 
    opacity: 1; 
  }
}

@keyframes fadeOut {
  from { 
    opacity: 1; 
  }
  to { 
    opacity: 0; 
  }
}

.fade-in {
  animation: fadeIn 200ms ease-out;
}

.fade-out {
  animation: fadeOut 200ms ease-in;
}
```

**Duration**: 200ms
**Easing**: ease-out (in), ease-in (out)
**Use Cases**: Modal appearances, content loading, page transitions

### Terminal Cursor Blink

**Usage**: Terminal prompts, input cursors

```css
@keyframes blink {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}

.cursor-blink {
  animation: blink 1.4s ease-in-out infinite;
}
```

**Duration**: 1.4s (infinite)
**Easing**: ease-in-out
**Use Cases**: Terminal prompts, text input cursors

### Typewriter Effect

**Usage**: Terminal output, system messages

```css
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 2s ease-out;
}
```

**Duration**: 2s (or calculated based on text length)
**Easing**: ease-out
**Use Cases**: Terminal boot sequences, system announcements

### Gentle Pulse

**Usage**: Loading states, attention-grabbing

```css
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

**Duration**: 2s (infinite)
**Easing**: ease-in-out
**Use Cases**: Loading indicators, important notifications

### Dissolve Transition

**Usage**: Page transitions, content replacement

```css
@keyframes dissolve {
  0% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0; 
    transform: scale(0.98);
  }
  100% { 
    opacity: 1; 
    transform: scale(1);
  }
}

.dissolve {
  animation: dissolve 300ms ease-in-out;
}
```

**Duration**: 300ms
**Easing**: ease-in-out
**Use Cases**: Page transitions, content replacement

## Interaction Animations

### Button Press

**Usage**: Button clicks, form submissions

```css
.button-press {
  transition: transform 100ms ease-out;
}

.button-press:active {
  transform: scale(0.98);
}
```

**Duration**: 100ms
**Easing**: ease-out
**Use Cases**: All interactive buttons

### Focus Glow

**Usage**: Input focus, active states

```css
.focus-glow {
  transition: box-shadow 200ms ease-out;
}

.focus-glow:focus {
  box-shadow: 0 0 12px rgba(162, 138, 255, 0.33);
}
```

**Duration**: 200ms
**Easing**: ease-out
**Use Cases**: Form inputs, interactive elements

### Hover Lift

**Usage**: Card hover states, interactive elements

```css
.hover-lift {
  transition: transform 200ms ease-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

**Duration**: 200ms
**Easing**: ease-out
**Use Cases**: Cards, interactive elements

## Content Animations

### Staggered List Items

**Usage**: Lists appearing, search results

```css
.list-item {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 200ms ease-out forwards;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Duration**: 200ms + 50ms stagger
**Easing**: ease-out
**Use Cases**: Search results, node lists, activity feeds

### Terminal Line Appear

**Usage**: Terminal output, command results

```css
.terminal-line {
  opacity: 0;
  animation: terminalAppear 300ms ease-out forwards;
}

@keyframes terminalAppear {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Duration**: 300ms
**Easing**: ease-out
**Use Cases**: Terminal output, command results

## Performance Considerations

### GPU Acceleration

Use `transform` and `opacity` for smooth animations:

```css
/* Good - GPU accelerated */
.animate {
  transform: translateX(0);
  opacity: 1;
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}

/* Bad - causes layout thrashing */
.animate {
  left: 0;
  width: 100px;
  transition: left 200ms ease-out, width 200ms ease-out;
}
```

### Reduced Motion Support

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Performance

- Use `will-change` sparingly and remove after animation
- Avoid animating layout properties (width, height, top, left)
- Use `transform` and `opacity` for smooth 60fps animations
- Test on lower-end devices

## Implementation Guidelines

### CSS Classes

Create reusable animation classes:

```css
/* Base animation classes */
.animate-fade-in { animation: fadeIn 200ms ease-out; }
.animate-fade-out { animation: fadeOut 200ms ease-in; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-blink { animation: blink 1.4s ease-in-out infinite; }

/* Transition classes */
.transition-all { transition: all 200ms ease-out; }
.transition-opacity { transition: opacity 200ms ease-out; }
.transition-transform { transition: transform 200ms ease-out; }
```

### JavaScript Integration

Use CSS classes for animations, JavaScript for timing:

```javascript
// Show element with fade-in
function showElement(element) {
  element.classList.add('animate-fade-in');
}

// Hide element with fade-out
function hideElement(element) {
  element.classList.add('animate-fade-out');
  setTimeout(() => {
    element.style.display = 'none';
    element.classList.remove('animate-fade-out');
  }, 200);
}
```

## What NOT to Animate

### Avoid These Patterns

- **Slide transitions**: Too aggressive, breaks calm aesthetic
- **Bounce effects**: Too playful, not contemplative
- **Parallax scrolling**: Distracting, not purposeful
- **Rotating loaders**: Use pulse instead
- **Scale animations**: Too dramatic for Field Nodes
- **Color transitions**: Use opacity changes instead

### Anti-Patterns

```css
/* Don't do this */
.bounce {
  animation: bounce 0.5s ease-in-out;
}

.slide-in {
  animation: slideIn 300ms ease-out;
}

.rotate {
  animation: rotate 1s linear infinite;
}
```

## Validation Checklist

Before implementing any animation:

- [ ] Is the animation purposeful (not decorative)?
- [ ] Is the duration appropriate (200-300ms standard)?
- [ ] Does it use natural easing (ease-in-out)?
- [ ] Does it respect reduced motion preferences?
- [ ] Is it GPU accelerated (transform/opacity)?
- [ ] Does it feel calm and contemplative?
- [ ] Is it accessible (doesn't cause motion sickness)?
- [ ] Does it enhance the user experience?

---

*motion should feel like breathing - natural, slow, and purposeful*
