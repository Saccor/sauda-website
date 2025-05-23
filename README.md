# Sauda Website

## Table of Contents
- [Project Overview](#project-overview)
- [Structure](#structure)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Component Overview](#component-overview)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)

## Project Overview
A modern web application for the band Sauda, built with Next.js and React. The site features e-commerce capabilities, social media integration, and a dynamic content management system.

### Key Features
- E-commerce integration with Shopify Storefront API
- Social media feed aggregation (Instagram, YouTube and soon Tiktok)
- Music player with Spotify integration
- Tour dates management
- Responsive design with Tailwind CSS
- Performance optimized with Lighthouse CI

### Tech Stack
- **Frontend**: 
  - Next.js 15.3.2 (App Router)
  - React 18.0.0
  - TypeScript 5
- **Styling**: 
  - Tailwind CSS 4
  - shadcn/ui components
  - Framer Motion for animations
- **E-commerce**: 
  - Shopify Hydrogen
  - Stripe for payments
- **Backend**: 
  - Supabase for database
  - GraphQL for API
- **Testing**: 
  - Jest for unit tests
  - Playwright for E2E
  - Lighthouse CI for performance

## Structure
```
sauda-website/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── (routes)/          # Page routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   │   ├── ClientHeader.tsx
│   │   │   └── ClientFooter.tsx
│   │   ├── ui/               # UI components
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── common/           # Common components
│   │   │   ├── Cart.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   └── TourDatesSection.tsx
│   │   └── social-media/     # Social media components
│   ├── utils/                # Utility functions
│   ├── lib/                  # External integrations
│   │   ├── shopify.ts       # Shopify client
│   │   └── stripe.ts        # Stripe client
│   ├── types/               # TypeScript types
│   ├── context/             # React context
│   └── styles/              # Global styles
├── public/                  # Static assets
│   ├── images/             # Image assets
│   └── fonts/              # Font files
├── docs/                   # Documentation
│   ├── context.md         # Project context
├── tests/                 # Test files
│   ├── __tests__/        # Jest tests
│   └── e2e/              # Playwright tests
├── .next/                 # Next.js build output
├── .swc/                  # SWC compiler cache
├── test-results/         # Test output directory
├── playwright-report/    # Playwright test reports
├── summary/              # Project documentation
└── Configuration Files:
    ├── next.config.js    # Next.js configuration
    ├── tailwind.config.js # Tailwind CSS configuration
    ├── tsconfig.json     # TypeScript configuration
    ├── jest.config.js    # Jest configuration
    ├── jest.setup.js     # Jest setup
    ├── playwright.config.ts # Playwright configuration
    ├── lighthouserc.js   # Lighthouse CI configuration
    ├── eslint.config.mjs # ESLint configuration
    ├── postcss.config.mjs # PostCSS configuration
    └── components.json   # shadcn/ui configuration
```

## Installation

### Prerequisites
- Node.js 18+ (LTS version recommended)
- npm 9+ or yarn 1.22+
- Git
- Shopify Partner account
- Stripe account
- Supabase account

### Environment Variables
Create a `.env.local` file with:
```bash
# Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Social Media
YOUTUBE_CHANNEL_ID=
YOUTUBE_API_KEY=
INSTAGRAM_APP_SECRET=
INSTAGRAM_ACCESS_TOKEN=
```

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/sauda-website.git
   cd sauda-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Start development server
   ```bash
   npm run dev
   ```

## Usage

### Development
```bash
# Start development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run linting
npm run lint

# Check types
npm run type-check

# Build for production
npm run build
```

### Production
```bash
# Start production server
npm start

# Start production server with watch mode
npm run start:dev

# Run Lighthouse CI
npm run lighthouse
```

## Architecture

### Frontend Architecture
- **Next.js App Router**: Modern routing with server components
- **React Server Components**: Optimized server-side rendering
- **Client Components**: Interactive UI elements
- **Context Providers**: State management
  - CartProvider
  - FlyToCartProvider

### Backend Architecture
- **Next.js API Routes**: Server-side API endpoints
  - `/api/social-feed`: Social media content aggregation
  - `/api/stripe`: Payment processing
  - `/api/auth`: Authentication handling

- **Database Layer**:
  - Supabase (PostgreSQL) for data storage
  - Tables:
    - `posts`: Social media content
    - `users`: User management
    - `orders`: E-commerce transactions

- **External Service Integrations**:
  - Shopify API for e-commerce
  - Stripe API for payments
  - Social Media APIs (Instagram, YouTube, TikTok)

- **Security Features**:
  - Environment variables for sensitive data
  - API key management
  - Rate limiting
  - Error handling
  - Input validation

- **Performance Optimizations**:
  - Caching strategies
  - Pagination for large datasets
  - Error boundaries
  - Request validation
  - Response compression

## Component Overview

### Layout Components
- `ClientHeader`: 
  - Responsive navigation
  - Cart integration
  - Mobile menu
- `ClientFooter`: 
  - Social links
  - Navigation
  - Copyright

### UI Components
- `Button`: 
  - Multiple variants
  - Loading states
  - Icon support
- `Card`: 
  - Product display
  - Content sections
  - Interactive elements

### Section Components
- `HeroSection`: 
  - Background video/image
  - Call-to-action
  - Animated content
- `TourDatesSection`: 
  - Calendar integration
  - Ticket links
  - Location maps

## API Endpoints

### Internal API
- `/api/stripe`:
  - Payment processing
  - Webhook handling
- `/api/social-feed`:
  - Instagram feed
  - YouTube videos
  - TikTok content
- `/api/auth`:
  - OAuth integration
  - Session management

### External APIs
- **Shopify**:
  - Storefront API
  - Admin API
- **Stripe**:
  - Payment processing
  - Subscription management
- **Social Media**:
  - Instagram Graph API
  - YouTube Data API
  - TikTok API

## Deployment

### Build Process
1. **Dependencies**:
   ```bash
   npm ci
   ```
2. **Type Checking**:
   ```bash
   npm run type-check
   ```
3. **Linting**:
   ```bash
   npm run lint
   ```
4. **Testing**:
   ```bash
   npm test
   npm run test:e2e
   ```
5. **Build**:
   ```bash
   npm run build
   ```
6. **Performance**:
   ```bash
   npm run lighthouse
   ```

### Deployment Steps
1. **Verification**:
   - Type checking
   - Linting
   - Tests
2. **Optimization**:
   - Image optimization
   - Code splitting
   - Bundle analysis
3. **Configuration**:
   - Environment variables
   - API keys
   - Domain setup
4. **Deployment**:
   - Vercel deployment (automatic with Next.js)
   - Database migration
   - Cache invalidation
5. **Post-deployment**:
   - Health checks
   - Performance monitoring
   - Error tracking

## Testing

### Test Types
- **Unit Tests** (Jest):
  - Component testing
  - Utility functions
  - API handlers
- **Integration Tests**:
  - API routes
  - Data flow
  - State management
- **E2E Tests** (Playwright):
  - User flows
  - Critical paths
  - Cross-browser testing
- **Performance Tests** (Lighthouse):
  - Core Web Vitals
  - Accessibility
  - Best practices

### E2E Test Structure
The E2E tests are located in `tests/e2e/` and cover the following key areas:

1. **Homepage Tests** (`home.spec.ts`):
   - Page loading and title verification
   - Header navigation functionality
   - Footer navigation functionality
   - Featured content sections
   - Product listings
   - Tour dates section
   - Social media integration

2. **Test Coverage**:
   - Navigation links (header and footer)
   - Product display and pricing
   - Tour date information
   - Social media links
   - Content sections visibility
   - Responsive design elements

### Running Tests
```bash
# Unit tests
npm test

# Watch mode for unit tests
npm run test:watch

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui

# E2E tests in debug mode
npm run test:e2e:debug

# Performance tests
npm run lighthouse
```

### Test Reports
After running the tests, you can view the HTML report:
```bash
npx playwright show-report
```

## Contributing

### Development Process
1. **Setup**:
   - Fork repository
   - Clone locally
   - Install dependencies
2. **Development**:
   - Create feature branch
   - Make changes
   - Run tests
3. **Submission**:
   - Update documentation
   - Create pull request
   - Request review

### Code Standards
- **TypeScript**:
  - Strict mode
  - Type definitions
  - Interface usage
- **ESLint**:
  - Next.js rules
  - TypeScript rules
  - Import sorting
- **Prettier**:
  - Code formatting
  - File organization
  - Line endings

### Pull Request Process
1. **Documentation**:
   - Update README
   - Add comments
   - Update types
2. **Testing**:
   - Add unit tests
   - Add E2E tests
   - Update snapshots
3. **Quality**:
   - Run linter
   - Check types
   - Verify tests
4. **Version**:
   - Update package.json
   - Update changelog
   - Tag release

### Commit Guidelines
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting
- **refactor**: Code restructuring
- **test**: Adding tests
- **chore**: Maintenance

