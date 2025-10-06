# Cosmo Kramer Ideas Tool

## Overview

The Cosmo Kramer Ideas Tool is a creative web application that generates entrepreneurial business ideas inspired by the chaotic creativity of Cosmo Kramer from Seinfeld. The application uses OpenAI's GPT API to generate unique, creative business ideas based on user-selected filters (industry, budget, complexity, and target audience). The design embraces a retro-modern fusion aesthetic that channels Kramer's playful energy through a polished, contemporary interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API data fetching
- Tailwind CSS for utility-first styling with custom design tokens

**UI Component System:**
- Shadcn/ui component library (Radix UI primitives with custom styling)
- Custom theme system supporting light/dark modes
- Design philosophy balances 90s Seinfeld nostalgia with modern UX patterns
- Typography: Space Grotesk (headlines), Inter (body), Righteous (accent/playful elements)
- Color palette: Brand orange (Kramer's energy), deep burgundy (Seinfeld warmth), with cream/dark backgrounds

**State Management:**
- React Query for server state (API responses, caching)
- React Context for theme management (ThemeProvider)
- Local component state for UI interactions (filters, loading states)

**Key Design Patterns:**
- Component composition with reusable UI primitives
- Custom hooks for shared logic (useToast, useIsMobile, useTheme)
- Path aliases for clean imports (@/, @shared/, @assets/)

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js for the HTTP server
- TypeScript for type safety across the stack
- ESM (ES Modules) for modern JavaScript module system

**API Design:**
- RESTful endpoint: POST /api/generate-ideas
- Request validation using Zod schemas
- Centralized error handling middleware
- Request/response logging for development debugging

**Data Layer:**
- In-memory storage (MemStorage) for user data (development/demo setup)
- Drizzle ORM configured for PostgreSQL with schema definitions
- Schema includes users table with username/password authentication fields
- Prepared for database integration (Neon serverless PostgreSQL via connection string)

**AI Integration:**
- OpenAI API integration for idea generation
- Uses GPT-5 model (latest as of specification)
- Structured prompt engineering to maintain Kramer's creative persona
- JSON response parsing for consistent idea format

**Architecture Decisions:**
- Separation of concerns: routes, storage, and external services in dedicated modules
- Middleware pattern for request logging and error handling
- Vite development mode integration for HMR and optimal DX
- Environment-based configuration (development vs production)

### External Dependencies

**AI Service:**
- OpenAI API (GPT-5 model) for creative idea generation
- Requires OPENAI_API_KEY environment variable
- Generates ideas with title, description, category, budget, complexity, and uniqueness rating

**Database:**
- PostgreSQL (via Neon serverless)
- Connection managed through DATABASE_URL environment variable
- Drizzle ORM for schema management and migrations
- Currently using in-memory storage as fallback

**UI Libraries:**
- Radix UI for accessible component primitives (dialogs, popovers, accordions, etc.)
- Embla Carousel for carousel functionality
- React Hook Form with Zod resolvers for form validation
- Lucide React for consistent iconography

**Development Tools:**
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)
- PostCSS with Tailwind and Autoprefixer for CSS processing
- TSX for TypeScript execution in development

**Build & Deployment:**
- Vite for frontend bundling and optimization
- esbuild for server-side bundling (production builds)
- Static file serving in production mode