# Cosmo Kramer Ideas Tool

## Overview

The Cosmo Kramer Ideas Tool is a creative web application that generates entrepreneurial business ideas inspired by the chaotic creativity of Cosmo Kramer from Seinfeld. The application uses Google Gemini API to generate unique, creative business ideas based on user-selected filters (industry, budget, complexity, and target audience). Users can save favorite ideas, export them as PDFs, and even generate completely random ideas with the "Try My Luck" feature. The design embraces a retro-modern fusion aesthetic that channels Kramer's playful energy through a polished, contemporary interface.

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
- Design philosophy: Modern, professional interface with calming blue tones
- Typography: Space Grotesk (headlines), Inter (body), Righteous (accent/playful elements)
- Color palette: Blue-cyan gradient system
  - C5EFF8 (192° 74% 87%): Light background
  - AAE5F6 (194° 80% 82%): Card surfaces
  - 5CBED7 (192° 61% 60%): Primary actions/buttons
  - 285F88 (206° 55% 35%): Dark accents
  - 192123 (192° 17% 12%): Dark mode background

**State Management:**
- React Query for server state (API responses, caching)
- React Context for theme management (ThemeProvider) and saved ideas (SavedIdeasContext)
- Local component state for UI interactions (filters, loading states)
- localStorage for persisting favorite ideas across sessions

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
- Google Gemini API integration for idea generation
- Uses gemini-2.5-flash model
- Structured prompt engineering to maintain Kramer's creative persona
- JSON response parsing for consistent idea format
- Supports both filtered and random idea generation (all filters null)
- **Idea Variety System:**
  - 4 rotating prompt templates for diverse outputs
  - Creativity levels: balanced (0.9), creative (1.2), wild (1.5 temperature)
  - Random seed + timestamp injection for uniqueness
  - Smart caching: tracks last 30 ideas per filter to avoid duplicates
  - Optimized for speed: generates 4 ideas per request (reduced from 6)

**Architecture Decisions:**
- Separation of concerns: routes, storage, and external services in dedicated modules
- Middleware pattern for request logging and error handling
- Vite development mode integration for HMR and optimal DX
- Environment-based configuration (development vs production)

### External Dependencies

**AI Service:**
- Google Gemini API (gemini-2.5-flash model) for creative idea generation
- Requires GEMINI_API_KEY environment variable
- Generates ideas with title, description, category, budget, complexity, uniqueness rating, roadmap, pros/cons, skills, and market analysis

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
- jsPDF and html2canvas for PDF export functionality

**Development Tools:**
- Replit-specific plugins for development experience (cartographer, dev banner, runtime error overlay)
- PostCSS with Tailwind and Autoprefixer for CSS processing
- TSX for TypeScript execution in development

**Build & Deployment:**
- Vite for frontend bundling and optimization
- esbuild for server-side bundling (production builds)
- Static file serving in production mode

## Key Features

### 1. Idea Generation with Smart Filtering
- 19 industry categories (Technology, Food & Beverage, Fashion, etc.)
- 5 budget ranges (0-5,000₺ to 500,000₺+)
- 5 complexity levels (Very Simple to Very Complex)
- 11 audience types (B2B, B2C, Students, Entrepreneurs, etc.)
- Color-coded filter cards with gradient backgrounds
- Real-time idea generation powered by Google Gemini AI

### 2. Random Idea Generator ("Şansımı Dene")
- "Try My Luck" button for completely random ideas
- Bypasses all filters for unexpected creative combinations
- Uses dice icon and special gradient styling
- Perfect for users seeking inspiration without constraints
- Toast notification: "🎲 Şansın Yaver Gitti!"

### 3. Favorites/Save System
- Save favorite ideas with heart icon on each idea card
- Persistent storage using localStorage
- Dedicated "/saved" route for viewing all saved ideas
- Badge counter in navbar showing number of saved ideas
- Toast notifications for save/unsave actions
- "Clear All" button to remove all favorites at once
- Empty state with call-to-action when no favorites exist

### 4. PDF Export & Print Functionality
- Export idea details as professional PDF reports
- Print-friendly CSS with dedicated media queries
- Includes full roadmap, pros/cons, required skills, and market analysis
- Filename format: {idea_title}_KramerAI.pdf
- Footer with generation date and KramerAI branding
- Uses jsPDF and html2canvas for high-quality rendering

### 5. Detailed Idea Analysis
- Comprehensive roadmap with phases, durations, and tasks
- Pros and cons analysis
- Required skills breakdown
- Potential revenue estimates
- Target market size information
- Uniqueness rating (1-5 lightbulbs)
- Category, budget, and complexity badges

### 6. Social Sharing Features
- Share ideas via WhatsApp with formatted text
- Share ideas via Telegram
- Send ideas via Email with subject and body
- Copy idea text to clipboard
- Native Web Share API support for mobile devices
- Popover menu with all sharing options
- Toast notifications for each sharing action

### 7. Responsive Design & Navigation
- Mobile-first responsive layout
- Sticky navbar with smooth scrolling
- Desktop and mobile menu variants
- Theme toggle (light/dark mode)
- Gradient animations and glassmorphism effects
- Print-optimized layouts

## Routes
- `/` - Homepage with hero, filters, and idea generator
- `/saved` - Saved/favorite ideas page

## Recent Updates (October 2024)

### Pre-Launch UX & SEO Improvements (Latest)
- **Open Graph Tags**: Added comprehensive OG meta tags for social media sharing (Twitter, Facebook, WhatsApp, LinkedIn)
- **Loading Skeleton Cards**: Implemented 3 skeleton cards during idea generation for better loading feedback
- **Welcome/Intro State**: Added initial welcome card with call-to-action buttons for first-time user experience
- **State Management**: Clean state transitions between welcome → loading → results with proper visual feedback

### Performance & Variety Enhancements
- **Idea Variety System**: Implemented multi-template prompt rotation (4 variants) with creativity levels
- **Smart Caching**: Added deduplication system tracking last 30 ideas per filter combination
- **Performance Optimization**: Reduced idea count from 6 to 4 for ~33% faster response time
- **Dynamic Parameters**: Temperature ranges 0.9-1.5 based on creativity level (balanced/creative/wild)
- **Randomness Injection**: Unique seed + timestamp per request for maximum variety

### Design & Features
- Dark, professional color scheme with slate/charcoal/navy tones
- Simplified button designs (removed gradients for cleaner UI)
- Added SavedIdeasContext for global favorites management
- Implemented PDF export with jspdf and html2canvas
- Created print-friendly CSS styles
- Added random idea generator feature ("Şansımı Dene")
- Enhanced navbar with favorites badge counter
- Created dedicated saved ideas page with empty states
- Implemented social sharing features (WhatsApp, Telegram, Email, Copy to Clipboard)
- Added native Web Share API support for mobile devices
- Improved accessibility with proper contrast ratios in both light and dark modes