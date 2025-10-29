# Contributing to Field Nodes

Thank you for your interest in contributing to Field Nodes! This guide will help you get started with development and ensure your contributions align with our project goals.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Supabase account (for database development)
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. **Fork and clone** the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/FieldNode.git
   cd FieldNode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces for all data structures
- Avoid `any` types - use proper typing or `unknown`
- Use strict mode settings

### React Best Practices

- Use functional components with hooks
- Prefer `useCallback` and `useMemo` for performance optimization
- Use proper dependency arrays in useEffect
- Follow the component composition pattern

### Design System

- **Always use design tokens** from `/src/theme/tokens.ts`
- **Never hard-code colors, spacing, or typography**
- Follow the Field Nodes aesthetic (terminal minimalism meets coral feminism)
- Use semantic naming for colors (`tokens.color.field.lilac` not `#A28AFF`)

### File Organization

```
/src
  /components
    /ComponentName
      - ComponentName.tsx
      - ComponentName.test.tsx
      - ComponentName.stories.tsx
  /services
  /theme
  /types
  /utils
```

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/node-creation-form`
- `fix/terminal-input-overlap`
- `docs/update-readme`
- `refactor/auth-provider`

### Commit Messages

Follow conventional commits:
```
feat: add node creation form
fix: resolve terminal input overlap issue
docs: update README with setup instructions
refactor: simplify auth provider logic
test: add unit tests for node storage
```

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the code style guidelines
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Design System Compliance
- [ ] Uses design tokens (no hard-coded values)
- [ ] Follows Field Nodes aesthetic
- [ ] Responsive design implemented
- [ ] Accessibility standards met
```

## Testing Guidelines

### Unit Tests

- Write tests for all new components and utilities
- Use React Testing Library for component tests
- Aim for 80%+ code coverage on critical paths
- Test both happy path and edge cases

```typescript
// Example test structure
describe('NodeCreationForm', () => {
  it('should create a node with valid input', () => {
    // Test implementation
  });
  
  it('should show error for invalid input', () => {
    // Test implementation
  });
});
```

### E2E Tests

- Write E2E tests for critical user flows
- Use Playwright for cross-browser testing
- Test authentication, node creation, and collaboration features

### Manual Testing

- Test on different screen sizes
- Verify keyboard navigation works
- Check for accessibility compliance
- Test with different user roles

## Design System Guidelines

### Colors

Use semantic color tokens:
```typescript
// Good
color: tokens.color.field.lilac
background: tokens.color.bg.canvas

// Bad
color: '#A28AFF'
background: '#0B0B0D'
```

### Typography

Use the defined type scale:
```typescript
// Good
fontSize: tokens.typography.size.lg
fontFamily: tokens.typography.family.mono

// Bad
fontSize: '18px'
fontFamily: 'monospace'
```

### Spacing

Use consistent spacing tokens:
```typescript
// Good
padding: tokens.spacing.lg
margin: `${tokens.spacing.xl} 0`

// Bad
padding: '24px'
margin: '32px 0'
```

### Motion

Follow motion principles:
- Use slow, contemplative transitions (200-300ms)
- Prefer `ease-in-out` easing
- Animate only state changes, not decorative elements
- Respect `prefers-reduced-motion`

## Accessibility Guidelines

### Semantic HTML

- Use proper heading hierarchy (`h1`, `h2`, `h3`)
- Use semantic elements (`button`, `input`, `nav`)
- Provide alt text for images
- Use `aria-label` for icon-only buttons

### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Provide visible focus indicators
- Support Tab navigation order
- Handle Escape key for modals/overlays

### Screen Readers

- Use proper ARIA attributes
- Provide descriptive labels
- Announce dynamic content changes
- Test with screen reader software

## Performance Guidelines

### Bundle Size

- Use dynamic imports for large components
- Optimize images and assets
- Remove unused dependencies
- Monitor bundle size with `npm run build`

### Runtime Performance

- Use React.memo for expensive components
- Implement proper useCallback/useMemo usage
- Avoid unnecessary re-renders
- Optimize database queries

## Security Guidelines

### Input Validation

- Validate all user inputs with Zod schemas
- Sanitize HTML content from rich text editors
- Use parameterized queries for database operations
- Implement rate limiting for API endpoints

### Authentication

- Use Supabase RLS policies for data access
- Validate JWT tokens on server-side
- Implement proper session management
- Follow OAuth best practices for Are.na integration

## Documentation

### Code Documentation

- Write JSDoc comments for complex functions
- Document component props and usage
- Explain business logic and decisions
- Keep README files up to date

### API Documentation

- Document all API endpoints
- Provide request/response examples
- Explain authentication requirements
- Document error codes and messages

## Getting Help

### Resources

- **Design System**: `/brand/` directory
- **Component Examples**: `/src/components/`
- **API Documentation**: `/docs/api/`
- **Architecture Guide**: `/docs/architecture.md`

### Community

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and ideas
- **Discord**: For real-time chat (if available)

### Code Review Process

1. **Automated checks** must pass (linting, tests, type checking)
2. **Design system compliance** verified
3. **Accessibility** standards met
4. **Performance** impact assessed
5. **Security** review completed
6. **Documentation** updated

## Release Process

### Versioning

We follow semantic versioning (SemVer):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.0.1): Bug fixes, backward compatible

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes written
- [ ] Deployed to production

## Questions?

If you have questions about contributing:

1. Check existing GitHub issues and discussions
2. Read the documentation in `/docs/`
3. Review the design system in `/brand/`
4. Open a new issue with the `question` label

Thank you for contributing to Field Nodes! Together, we're building a system that learns through care.

---

*"collaborative research, grown slowly."*
