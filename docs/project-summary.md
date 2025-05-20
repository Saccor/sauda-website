# SAUDA Website Project Summary

## Core Structure

### App Directory (`src/app/`)
```
src/app/
├── layout.tsx          # Root layout with providers and metadata
├── page.tsx           # Homepage
├── about/             # About page
├── api/               # API routes
├── cart/              # Shopping cart
├── products/          # Product listings
├── success/           # Payment success
└── video/             # Video content
```

### Components Directory (`src/components/`)
```
src/components/
├── ui/                # Reusable UI components
├── sections/          # Page sections
├── layout/           # Layout components
├── social-media/     # Social integration
└── common/           # Shared components
```

### Context Directory (`src/context/`)
```
src/context/
├── CartContext.tsx    # Main cart context provider
└── cart/             # Cart-related utilities
    ├── cartReducer.ts        # Cart state management
    └── useCartOperations.ts  # Cart operations hooks
```

### Library Directory (`src/lib/`)
```
src/lib/
├── error-handling.ts  # Error handling system
├── utils.ts          # General utilities
├── shopify/          # Shopify integration
├── social-media/     # Social media utilities
├── utils/            # Utility functions
│   ├── format.ts     # Formatting utilities
│   └── url.ts        # URL handling
├── supabase/         # Supabase integration
└── cart/             # Cart utilities
```

### Styles Directory (`src/styles/`)
```
src/styles/
└── globals.css       # Global styles and gradients
    - Blue gradient for social buttons
    - Store gradient background
    - Custom transitions
```

### Types Directory (`src/types/`)
```
src/types/
├── supabase.ts       # Supabase type definitions
├── social-media.ts   # Social media types
└── shopify/          # Shopify type definitions
    ├── index.ts      # Type exports
    ├── cart/         # Cart types
    ├── api/          # API types
    └── core/         # Core Shopify types
```

## Key Components

### UI Components
- `button.tsx` - Base button with variants
- `card.tsx` - Content display
- `dialog.tsx` - Modal dialogs
- `sheet.tsx` - Slide-out panels
- `gradient-button.tsx` - Custom animated buttons
- `FlyToCartProvider.tsx` - Cart animations

### Section Components
- `HeroSection.tsx` - Main hero
- `FeaturedArtistSection.tsx` - Artist showcase
- `MerchandiseSection.tsx` - Product display
- `TourDatesSection.tsx` - Event calendar
- `ProductsSection.tsx` - Product listings
- `AboutSection.tsx` - About content
- `MusicPlayerSection.tsx` - Audio player

### Layout Components
- `Header.tsx` & `ClientHeader.tsx` - Navigation
- `Footer.tsx` & `ClientFooter.tsx` - Footer
- `Main.tsx` - Layout wrapper
- `ClientCart.tsx` - Cart UI

### Context Management
- **CartContext**
  - Global cart state management
  - Cart operations (add, remove, update)
  - Local storage persistence
  - Error handling
  - Checkout functionality
  - Cart state reducer
  - Custom cart operations hooks

### Library Utilities
- **Error Handling**
  - Custom error classes (AppError, ShopifyError, NetworkError, ValidationError)
  - Error type guards
  - Error formatting utilities
  - Error handling functions

- **Utility Functions**
  - Formatting utilities
  - URL handling
  - General helper functions

- **Integration Modules**
  - Shopify integration
  - Supabase integration
  - Social media utilities
  - Cart utilities

### Type System
- **Supabase Types**
  - Database models
  - API responses
  - Query types

- **Shopify Types**
  - Cart types
  - API types
  - Core product types
  - Order types

- **Social Media Types**
  - Platform integrations
  - Share functionality
  - Social links

### Styling System
- **Global Styles**
  - Custom gradients
  - Transitions
  - Theme variables
  - Responsive utilities

## Tech Stack
- Next.js 15.3.2
- TypeScript
- Tailwind CSS
- Supabase (Database)
- Stripe (Payments)
- Radix UI (Components)
- Framer Motion (Animations)

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

## Key Features
1. E-commerce with Stripe
2. Audio player integration
3. Tour dates management
4. Product listings
5. Shopping cart
6. Social media integration
7. Responsive design

## Development Guidelines
1. Use functional components with TypeScript
2. Follow existing component structure
3. Implement proper error handling
4. Use Tailwind for styling
5. Keep components modular
6. Maintain type safety

## Project Status
- Core functionality implemented
- E-commerce system working
- Audio player integrated
- Tour dates system in place
- Product management active
- Cart system functional

## Next Steps
1. Optimize performance
2. Enhance error handling
3. Improve accessibility
4. Add more features
5. Refine UI/UX 