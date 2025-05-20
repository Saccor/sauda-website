# App Directory Structure Documentation

This document provides a detailed overview of the `src/app` directory structure and its contents.

## Root Files

### `layout.tsx`
- Root layout component for the entire application
- Implements metadata configuration for SEO
- Sets up global providers (CartProvider, FlyToCartProvider)
- Includes global components (Header, Footer, ClientCart)
- Configures custom font (Nord Medium)
- Implements responsive layout with gradient background
- Handles social media integration

### `globals.css`
- Global styles for the application
- Tailwind CSS imports and configurations
- Custom CSS variables and utilities

### `page.tsx`
- Main homepage component
- Entry point for the root route (/)

### `favicon.ico`
- Website favicon
- Size: 25KB

## Directory Structure

### `/about`
- Contains the about page components
- Route: `/about`

### `/api`
- API route handlers
- Contains server-side API endpoints
- Handles backend functionality

### `/cart`
- Shopping cart page components
- Route: `/cart`
- Handles cart management and checkout process

### `/products`
- Product listing and detail pages
- Route: `/products`
- Displays merchandise and product information

### `/success`
- Payment success page
- Route: `/success`
- Shown after successful payment processing

### `/video`
- Video content page
- Route: `/video`
- Displays music videos and related content

## Key Features

1. **Layout System**
   - Responsive design
   - Gradient background
   - Custom font integration
   - Global providers for state management

2. **SEO Optimization**
   - Comprehensive metadata
   - OpenGraph tags
   - Twitter card support
   - Dynamic image handling

3. **State Management**
   - Cart context
   - Fly to cart animations
   - Client-side cart functionality

4. **Navigation**
   - Header component
   - Footer component
   - Social media integration

5. **Styling**
   - Tailwind CSS integration
   - Custom CSS variables
   - Responsive design patterns
   - Gradient backgrounds

## Best Practices

1. **File Organization**
   - Clear separation of concerns
   - Modular component structure
   - Consistent naming conventions

2. **Performance**
   - Font optimization with next/font
   - Image optimization
   - Client-side components where needed

3. **SEO**
   - Comprehensive metadata
   - Dynamic image handling
   - Proper semantic structure

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation support

## Environment Variables

The following environment variables are used:
- `NEXT_PUBLIC_SITE_URL`: Base URL for metadata
- Other environment variables as needed for specific features

## Dependencies

- Next.js
- React
- Tailwind CSS
- Custom fonts
- Context providers
- UI components 