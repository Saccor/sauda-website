// Mock framer-motion lazy components FIRST
jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
      return <div {...props}>{children}</div>;
    },
  },
  AnimatePresence: function AnimatePresence({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  },
}))

import { render, screen, act } from '@testing-library/react'
import React, { Suspense } from 'react'
import ClientHeader from '../ClientHeader'

// Mock dependencies
const CartButton = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <button ref={ref} {...props}>Cart</button>
))
CartButton.displayName = 'CartButton'

const ErrorDisplay = ({ message }: { message: string }) => (
  <div data-testid="error">{message}</div>
)
ErrorDisplay.displayName = 'ErrorDisplay'

jest.mock('../../common/CartButton', () => CartButton)
jest.mock('../../common/ErrorDisplay', () => ErrorDisplay)
jest.mock('@/context/CartContext', () => ({ useCart: () => ({ setIsOpen: jest.fn(), isOpen: false }) }))
jest.mock('@/components/ui/FlyToCartProvider', () => ({ useFlyToCart: () => ({ setCartButtonRef: jest.fn() }) }))

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query.includes('min-width: 768px'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

const menuItems = [
  { id: '1', title: 'Home', url: '/', items: [] },
  { id: '2', title: 'Shop', url: '/shop', items: [] },
  { id: '3', title: 'About', url: '/about', items: [] },
  { id: '4', title: 'Contact', url: '/contact', items: [] },
]

describe('ClientHeader', () => {
  beforeEach(() => {
    // Set viewport to desktop
    window.innerWidth = 1024
    window.dispatchEvent(new Event('resize'))
  })

  it('renders menu items as links', async () => {
    render(
      <Suspense fallback={null}>
        <ClientHeader menuItems={menuItems} error={null} />
      </Suspense>
    )
    expect(await screen.findByText('Home')).toBeInTheDocument()
    expect(await screen.findByText('Shop')).toBeInTheDocument()
    expect(await screen.findByText('About')).toBeInTheDocument()
    expect(await screen.findByText('Contact')).toBeInTheDocument()
    // Should render Cart button
    expect(screen.getAllByText('Cart').length).toBeGreaterThan(0)
  })

  it('renders error state and hides menu items', () => {
    render(<ClientHeader menuItems={menuItems} error="Something went wrong" />)
    expect(screen.getByTestId('error')).toHaveTextContent('Something went wrong')
    // Menu items should not be present
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('Shop')).not.toBeInTheDocument()
    expect(screen.queryByText('About')).not.toBeInTheDocument()
    expect(screen.queryByText('Contact')).not.toBeInTheDocument()
  })

  it('changes header background when scrolling past heroRef', () => {
    const hero = document.createElement('div')
    hero.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
      toJSON: () => ''
    })
    document.body.appendChild(hero)
    const heroRef = { current: hero }
    render(<ClientHeader menuItems={menuItems} error={null} heroRef={heroRef} />)
    // Simulate scroll past hero
    act(() => {
      window.scrollY = 150
      window.dispatchEvent(new Event('scroll'))
    })
    // The header should have bg-neutral-dark/80 class
    const header = document.querySelector('header')
    expect(header?.className).toMatch(/bg-neutral-dark\/80/)
    document.body.removeChild(hero)
  })
}) 