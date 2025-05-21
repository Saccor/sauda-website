# SAUDA Website Routes Documentation

## Page Routes

### 1. Home Page (`/`)
**File:** `src/app/page.tsx`
```typescript
export default function Home() {
  // Renders Main component
  // No data fetching
}
```

### 2. About Page (`/about`)
**File:** `src/app/about/page.tsx`
```typescript
export default function AboutPage() {
  // Client-side rendered
  // Renders AboutSection component
  // No data fetching
}
```

### 3. Products Page (`/products`)
**File:** `src/app/products/page.tsx`
```typescript
export default async function ProductsPage() {
  // Server-side data fetching
  // Fetches products from Shopify API
  interface Props {
    products: Product[];
    error: string | null;
  }
}
```

### 4. Cart Page (`/cart`)
**File:** `src/app/cart/page.tsx`
```typescript
// Client-side rendered
// Uses CartContext for state management
// Handles Stripe checkout integration
interface Props {
  // Uses cart context for:
  items: CartItem[];
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
}
```

### 5. Video Page (`/video`)
**File:** `src/app/video/page.tsx`
```typescript
// Client-side rendered
// Renders social media feed
// Uses SocialMediaContainer component
```

### 6. Success Page (`/success`)
**File:** `src/app/success/page.tsx`
```typescript
// Client-side rendered
// Handles post-purchase success state
// Uses URL search params for session_id
// Clears cart on successful purchase
```

## API Routes

### 1. Social Feed API (`/api/social-feed`)
**File:** `src/app/api/social-feed/route.ts`
- Method: `GET`
- Parameters: 
  - `page` (query param, default: 1)
- Description: Fetches paginated social media feed with 10 posts per page
- Returns: 
```typescript
{
  posts: Post[];
  hasMore: boolean;
  page: number;
  totalItems: number;
}
```

### 2. Stripe Checkout API (`/api/stripe`)
**File:** `src/app/api/stripe/route.ts`
- Method: `POST`
- Description: Creates a Stripe checkout session for cart items
- Request Body:
```typescript
{
  items: CartItem[]  // Array of cart items with product and quantity
}
```
- Returns:
```typescript
{
  sessionId: string  // Stripe checkout session ID
}
```
- Payment Methods: Card, Klarna
- Currency: SEK (Swedish Krona)

### 3. Facebook Auth Callback (`/api/auth/facebook/callback`)
**File:** `src/app/api/auth/facebook/callback/route.ts`
- Method: `GET`
- Parameters:
  - `code` (query param, required)
- Description: Handles Facebook OAuth callback and token exchange
- Process:
  1. Exchanges authorization code for short-lived access token
  2. Converts short-lived token to long-lived token
- Returns:
```typescript
{
  long_lived_token: string;
  expires_in: number;
}
```

## Root Layout
**File:** `src/app/layout.tsx`
```typescript
// Applied to all pages
// Includes metadata configuration
// Wraps all pages with:
// - CartProvider
// - FlyToCartProvider
// - Header
// - Footer
// - FloatingSocialButton
```

## Key Features
- Most pages are client-side rendered (marked with "use client")
- Products page uses server-side data fetching from Shopify
- Cart integration with Stripe for checkout
- Social media feed with pagination
- Global layout with cart context and providers
- All pages use the same gradient background styling
- Motion animations used throughout for smooth transitions

## Page Styling
All pages use a consistent gradient background:
```css
bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]
```

## Data Flow
1. Products are fetched server-side from Shopify
2. Cart state is managed client-side using Context
3. Checkout process:
   - Cart items → Stripe checkout session
   - Success redirect → Clear cart
4. Social media feed:
   - Paginated API endpoint
   - Client-side rendering with infinite scroll 

## UI Components

### Common Components

1. **EmptyState** (`src/components/common/EmptyState.tsx`)
```typescript
interface EmptyStateProps {
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}
```

2. **ErrorDisplay** (`src/components/common/ErrorDisplay.tsx`)
```typescript
interface ErrorDisplayProps {
  message: string;
  retry?: () => void;
}
```

3. **ErrorState** (`src/components/common/ErrorState.tsx`)
```typescript
interface ErrorStateProps {
  title: string;
  message: string;
  verificationSteps?: string[];
}
```

### UI Components

1. **Button** (`src/components/ui/button.tsx`)
```typescript
interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
```

2. **GradientButton** (`src/components/ui/gradient-button.tsx`)
```typescript
interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean;
  color?: "default" | "blue";
  variant?: "default" | "variant";
}
```

3. **Section** (`src/components/ui/Section.tsx`)
```typescript
interface SectionProps {
  bgClass?: string;
  className?: string;
  children: React.ReactNode;
}
```

4. **Card** (`src/components/ui/card.tsx`)
```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}
```

5. **Sheet** (`src/components/ui/sheet.tsx`)
- Multiple components exported with standard React div props:
- `Sheet`: Extends RadixUI Dialog Root props
- `SheetHeader`: Extends React.ComponentProps<"div">
- `SheetContent`
- `SheetFooter`
- `SheetTitle`
- `SheetDescription`

### Layout Components

1. **ClientHeader** (`src/components/layout/ClientHeader.tsx`)
```typescript
interface ClientHeaderProps {
  menuItems: MenuItem[];
  error: string | null;
  heroRef?: React.RefObject<HTMLElement>;
}
```

2. **ClientFooter** (`src/components/layout/ClientFooter.tsx`)
```typescript
interface ClientFooterProps {
  menuItems: MenuItem[];
  error: string | null;
}
```

## Test Targets

### Component Unit Tests
1. `EmptyState` ✅ - Assert title, message, optional action URL and text render correctly
2. `ErrorDisplay` ✅ - Assert message renders, retry callback fires when present
3. `ErrorState` ✅ - Assert title, message, optional verification steps render
4. `Section` ✅ - Assert bgClass applies, children render correctly
5. `Card` ✅ - Assert className passes through, children render correctly
6. `Sheet` components ✅ - Assert Dialog functionality, header/footer/content areas render correctly
7. `ClientHeader` ✅ - Assert menu items render, error state handles correctly, hero ref functionality
8.  `ClientFooter` ✅ - Assert menu items render, error state handles correctly

### Page Integration Tests
1. `/` (Home) - Assert Main component renders correctly
2. `/about` - Assert AboutSection renders with correct content
3. `/products` - Assert server-side product fetching, product list renders correctly
4. `/cart` - Assert cart items display, quantity updates, removal works, Stripe checkout integration
5. `/video` - Assert social media feed renders, SocialMediaContainer functions
6. `/success` - Assert post-purchase state, session_id handling, cart clearing

### API Route Tests
1. `/api/social-feed` ✅(GET)
   - Input: page query param (optional)
   - Assert: Returns paginated posts array, hasMore flag, page number, totalItems count
   - Test: pagination, error handling

2. `/api/stripe` (POST)
   - Input: {items: CartItem[]} with valid product data
   - Assert: Returns valid Stripe sessionId
   - Test: Invalid items handling, currency conversion, payment method availability

3. `/api/auth/facebook/callback` (GET)
   - Input: code query param
   - Assert: Returns long_lived_token and expires_in
   - Test: Missing code handling, token exchange process, error scenarios 