import { render, screen, fireEvent } from '@testing-library/react'
import Cart from '../Cart'
import { CartProvider, useCart } from '@/context/CartContext'
import '@testing-library/jest-dom'

type CartContextType = {
  items: Array<{
    product: {
      id: string;
      title: string;
      featuredImage: { url: string };
      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
    };
    quantity: number;
  }>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type CartItem = CartContextType['items'][0];

// Mock the useCart hook
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(() => ({
    items: [],
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    total: 0,
    isOpen: true,
    setIsOpen: jest.fn(),
  })),
  CartProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Cart Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('renders empty cart message when cart is empty', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    )
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('renders cart items when cart has items', () => {
    // Mock cart data
    const mockItems: CartItem[] = [{
      product: {
        id: '1',
        title: 'Test Product',
        featuredImage: { url: '/test.jpg' },
        priceRange: {
          minVariantPrice: {
            amount: '19.99',
            currencyCode: 'SEK',
          },
        },
      },
      quantity: 1,
    }];

    // Mock useCart with items
    (useCart as jest.Mock).mockReturnValue({
      items: mockItems,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      total: 19.99,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    )
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('19,99 kr')).toBeInTheDocument()
  })

  it('calls setIsOpen when close button is clicked', () => {
    const mockSetIsOpen: jest.Mock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      total: 0,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
    })

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    )
    
    const closeButton = screen.getByRole('button', { name: /close cart/i })
    fireEvent.click(closeButton)
    
    expect(mockSetIsOpen).toHaveBeenCalledWith(false)
  })

  it('calls removeItem when remove button is clicked', () => {
    const mockRemoveItem: jest.Mock = jest.fn();
    const mockItems: CartItem[] = [{
      product: {
        id: '1',
        title: 'Test Product',
        featuredImage: { url: '/test.jpg' },
        priceRange: {
          minVariantPrice: {
            amount: '19.99',
            currencyCode: 'SEK',
          },
        },
      },
      quantity: 1,
    }];

    (useCart as jest.Mock).mockReturnValue({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: jest.fn(),
      total: 19.99,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    )
    
    const removeButton = screen.getByRole('button', { name: /remove item/i })
    fireEvent.click(removeButton)
    
    expect(mockRemoveItem).toHaveBeenCalledWith('1')
  })

  it('calls updateQuantity when quantity buttons are clicked', () => {
    const mockUpdateQuantity: jest.Mock = jest.fn();
    const mockItems: CartItem[] = [{
      product: {
        id: '1',
        title: 'Test Product',
        featuredImage: { url: '/test.jpg' },
        priceRange: {
          minVariantPrice: {
            amount: '19.99',
            currencyCode: 'SEK',
          },
        },
      },
      quantity: 1,
    }];

    (useCart as jest.Mock).mockReturnValue({
      items: mockItems,
      removeItem: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      total: 19.99,
      isOpen: true,
      setIsOpen: jest.fn(),
    })

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    )
    
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i })
    const decreaseButton = screen.getByRole('button', { name: /decrease quantity/i })
    
    fireEvent.click(increaseButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 2)
    
    fireEvent.click(decreaseButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 0)
  })
}) 