# Field Nodes

A collaborative research network for atomic thought sharing.

## Quick Start

1. Clone repo: `git clone https://github.com/candiikay/FieldNode.git`
2. Install: `npm install`
3. Create `.env.local` (see `.env.example`)
4. Run: `npm run dev`

## What is Field Nodes?

Field Nodes is a living commons for interlinked thought. It's designed for researchers, writers, and thinkers who want to build knowledge collaboratively through connected ideas.

### Core Concepts

- **Raw Nodes**: Atomic thoughts, questions, or observations
- **Support Nodes**: Evidence, citations, and grounding material
- **Reflection Nodes**: Analysis, commentary, and deeper thinking
- **Fields**: Research areas where nodes connect and grow

### Philosophy

Field Nodes operates on principles of:
- **Care over competition**: Slow, thoughtful collaboration
- **Material honesty**: Text-based, terminal-inspired interface
- **Contextual connection**: Ideas grow through relationship
- **Evidence grounding**: Sources matter for credibility

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Supabase (Postgres, Auth, Realtime)
- **Styling**: Token-based design system, CSS-in-JS
- **Rich Text**: Tiptap editor with slash commands
- **Visualization**: D3.js, react-force-graph-2d
- **Testing**: Vitest, React Testing Library, Playwright

## Project Structure

```
/pages              # Next.js routes
/src
  /components       # React components
    /auth           # Authentication components
    /terminal       # Terminal-style UI components
  /services         # Data layer and API clients
  /theme            # Design tokens and styling
  /styles           # Shared CSS-in-JS styles
  /types            # TypeScript definitions
  /utils            # Helper functions
/brand              # Brand guidelines and design system
/docs               # Documentation
```

## Environment Variables

See `.env.example` for required keys:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_ARENA_API_KEY` - Are.na API key (optional)
- `ARENA_OAUTH_CLIENT_ID` - Are.na OAuth client ID (optional)
- `ARENA_OAUTH_CLIENT_SECRET` - Are.na OAuth client secret (optional)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Code Style

- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for git messages
- Token-based design system (no hard-coded values)

### Testing

- **Unit tests**: Vitest + React Testing Library
- **E2E tests**: Playwright for user flows
- **Coverage**: Aim for 80%+ coverage on critical paths

## Design System

Field Nodes uses a comprehensive design system based on:

- **Aesthetic**: Terminal minimalism meets coral feminism
- **Colors**: Dark backgrounds with lilac/magenta accents
- **Typography**: Space Grotesk + IBM Plex Mono
- **Motion**: Slow, contemplative transitions (200-300ms)
- **Voice**: Calm, poetic, technical

See `/brand/` directory for complete guidelines.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the design system and coding standards
4. Write tests for new functionality
5. Submit a pull request

## Architecture

### Data Flow

1. **Authentication**: Supabase Auth with RLS policies
2. **Data Storage**: PostgreSQL with real-time subscriptions
3. **State Management**: React Context + Zustand for global state
4. **Real-time**: Supabase Realtime for collaborative features
5. **External APIs**: Are.na integration for cross-platform sync

### Security

- Row Level Security (RLS) policies in Supabase
- Input validation with Zod schemas
- Rate limiting for API endpoints
- CSRF protection and secure headers

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build: `npm run build`
2. Start: `npm run start`
3. Configure reverse proxy (nginx/Apache)

## Roadmap

### Phase 0: Design System ✅
- Brand guidelines and design tokens
- Typography and color system
- Motion principles and interaction patterns

### Phase 1: Infrastructure (Current)
- Supabase setup and database schema
- Authentication and user management
- Basic CRUD operations

### Phase 2: Core Features
- Node creation and editing
- Field management
- Real-time collaboration

### Phase 3: Advanced Features
- Graph visualization
- Are.na integration
- Mobile optimization

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Support

- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Documentation**: `/docs` directory for detailed guides

---

*"a system that learns through care."*
