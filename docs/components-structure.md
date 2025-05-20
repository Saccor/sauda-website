# Components Directory Structure Documentation

This document provides a detailed overview of the `src/components` directory structure and its contents.

## Directory Structure

### `/ui` - Reusable UI Components
- **`button.tsx`** (2.1KB)
  - Base button component
  - Variants and styling options
  - Accessibility features

- **`card.tsx`** (1.9KB)
  - Card component for content display
  - Flexible layout options
  - Consistent styling

- **`dialog.tsx`** (3.7KB)
  - Modal dialog component
  - Accessible dialog implementation
  - Customizable content

- **`sheet.tsx`** (4.0KB)
  - Slide-out panel component
  - Responsive design
  - Customizable content

- **`aspect-ratio.tsx`** (154B)
  - Maintains consistent aspect ratios
  - Used for media content

- **`Section.tsx`** (757B)
  - Base section component
  - Consistent spacing and layout

- **`gradient-button.tsx`** (1.5KB)
  - Custom gradient button
  - Animated hover effects
  - Custom styling module

- **`FlyToCartProvider.tsx`** (2.9KB)
  - Cart animation provider
  - Handles add-to-cart animations
  - State management for animations

### `/sections` - Page Section Components
- **`HeroSection.tsx`** (1.5KB)
  - Main hero section
  - Full-viewport design
  - Background image handling

- **`FeaturedArtistSection.tsx`** (4.7KB)
  - Artist showcase section
  - Dynamic content
  - Responsive layout

- **`MerchandiseSection.tsx`** (4.0KB)
  - Product showcase
  - Grid layout
  - Product cards integration

- **`TourDatesSection.tsx`** (5.5KB)
  - Tour dates display
  - Date formatting
  - Event details

- **`ProductsSection.tsx`** (4.3KB)
  - Product listing
  - Filtering options
  - Grid layout

- **`AboutSection.tsx`** (4.5KB)
  - About page content
  - Team information
  - Biography display

- **`MusicPlayerSection.tsx`** (1.2KB)
  - Audio player integration
  - Playlist management
  - Player controls

### `/layout` - Layout Components
- **`Header.tsx`** (737B)
  - Main navigation header
  - Server-side component
  - Basic structure

- **`ClientHeader.tsx`** (11KB)
  - Client-side header
  - Interactive features
  - Navigation state

- **`Footer.tsx`** (578B)
  - Main footer
  - Server-side component
  - Basic structure

- **`ClientFooter.tsx`** (3.5KB)
  - Client-side footer
  - Interactive features
  - Social links

- **`Main.tsx`** (670B)
  - Main layout wrapper
  - Content structure
  - Layout management

- **`ClientCart.tsx`** (121B)
  - Client-side cart
  - Cart state management
  - Cart UI

### `/social-media` - Social Media Components
- Social media integration
- Share buttons
- Social links

### `/common` - Common Components
- Shared components
- Utility components
- Reusable elements

## Component Architecture

1. **Component Organization**
   - Clear separation of concerns
   - Modular structure
   - Reusable components
   - Consistent naming

2. **Component Types**
   - UI Components (reusable)
   - Section Components (page-specific)
   - Layout Components (structural)
   - Common Components (shared)

3. **State Management**
   - Context providers
   - Client-side components
   - Server-side components
   - State handling

4. **Styling Approach**
   - Tailwind CSS
   - CSS Modules
   - Custom styling
   - Responsive design

## Best Practices

1. **Component Design**
   - Single responsibility
   - Props typing
   - Error handling
   - Loading states

2. **Performance**
   - Code splitting
   - Lazy loading
   - Optimized renders
   - Memoization

3. **Accessibility**
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Focus management

4. **Code Quality**
   - TypeScript usage
   - Consistent formatting
   - Documentation
   - Error boundaries

## Dependencies

- React
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion
- Custom hooks
- Context providers 