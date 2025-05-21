import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'
import Cart from '../Cart'
import { CartProvider } from '@/context/CartContext'
import { useCartOperations } from '@/context/cart/useCartOperations'
import { getStripe } from '@/lib/stripe/client'

// Mock the useCartOperations hook
jest.mock('@/context/cart/useCartOperations', () => ({
  useCartOperations: jest.fn(),
}))

// Mock the Stripe client
jest.mock('@/lib/stripe/client', () => ({
  getStripe: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

describe('Cart', () => {
  const mockRemoveItem = jest.fn()
  const mockUpdateQuantity = jest.fn()
  const mockSetIsOpen = jest.fn()
  const mockLoadCart = jest.fn()

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Default mock implementation
    ;(useCartOperations as jest.Mock).mockImplementation(() => ({
      items: [],
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      total: 0,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      loadCart: mockLoadCart,
    }))

    // Mock fetch response
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ sessionId: 'test-session-id' }),
    })

    // Mock Stripe
    ;(getStripe as jest.Mock).mockResolvedValue({
      redirectToCheckout: jest.fn().mockResolvedValue({ error: null }),
    })
  })

  it('renders empty cart message when no items and cart is open', async () => {
    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      )
    })

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('renders cart items when items are present', async () => {
    const mockItems = [
      {
        product: {
          id: '1',
          title: 'Test Product',
          featuredImage: { url: '/test-image.jpg' },
          priceRange: {
            minVariantPrice: {
              amount: '100.00',
              currencyCode: 'SEK',
            },
          },
        },
        quantity: 1,
      },
    ]

    ;(useCartOperations as jest.Mock).mockImplementation(() => ({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      total: 100,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      loadCart: mockLoadCart,
    }))

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      )
    })

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('100,00 kr', { selector: 'p.text-sm.text-gray-400' })).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('100,00 kr', { selector: 'span.text-white.font-bold' })).toBeInTheDocument()
  })

  it('calls removeItem when remove button is clicked', async () => {
    const mockItems = [
      {
        product: {
          id: '1',
          title: 'Test Product',
          featuredImage: { url: '/test-image.jpg' },
          priceRange: {
            minVariantPrice: {
              amount: '100.00',
              currencyCode: 'SEK',
            },
          },
        },
        quantity: 1,
      },
    ]

    ;(useCartOperations as jest.Mock).mockImplementation(() => ({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      total: 100,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      loadCart: mockLoadCart,
    }))

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      )
    })

    const removeButton = screen.getByRole('button', { name: /remove item/i })
    await act(async () => {
      fireEvent.click(removeButton)
    })
    expect(mockRemoveItem).toHaveBeenCalledWith('1')
  })

  it('calls updateQuantity when quantity buttons are clicked', async () => {
    const mockItems = [
      {
        product: {
          id: '1',
          title: 'Test Product',
          featuredImage: { url: '/test-image.jpg' },
          priceRange: {
            minVariantPrice: {
              amount: '100.00',
              currencyCode: 'SEK',
            },
          },
        },
        quantity: 1,
      },
    ]

    ;(useCartOperations as jest.Mock).mockImplementation(() => ({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      total: 100,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      loadCart: mockLoadCart,
    }))

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      )
    })

    const plusButton = screen.getByRole('button', { name: /increase quantity/i })
    const minusButton = screen.getByRole('button', { name: /decrease quantity/i })

    await act(async () => {
      fireEvent.click(plusButton)
    })
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 2)

    await act(async () => {
      fireEvent.click(minusButton)
    })
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 0)
  })

  it('calls setIsOpen when close button is clicked', async () => {
    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      )
    })

    const closeButton = screen.getByRole('button', { name: /close cart/i })
    await act(async () => {
      fireEvent.click(closeButton)
    })
    expect(mockSetIsOpen).toHaveBeenCalledWith(false)
  })

  it('handles checkout process', async () => {
    const mockItems = [
      {
        product: {
          id: '1',
          title: 'Test Product',
          featuredImage: { url: '/test-image.jpg' },
          priceRange: {
            minVariantPrice: {
              amount: '100.00',
              currencyCode: 'SEK',
            },
          },
        },
        quantity: 1,
      },
    ]

    ;(useCartOperations as jest.Mock).mockImplementation(() => ({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      total: 100,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      loadCart: mockLoadCart,
    }))

    await act(async () => {
      render(
        <CartProvider>
          <Cart />
        </CartProvider>
      )
    })

    const checkoutButton = screen.getByRole('button', { name: /checkout/i })
    await act(async () => {
      fireEvent.click(checkoutButton)
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: mockItems }),
    })
  })
}) 