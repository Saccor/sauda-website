import { render, screen } from '@testing-library/react'
import React from 'react'
import ClientFooter from '../ClientFooter'

jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv({
      whileHover: _whileHover,
      whileTap: _whileTap,
      animate: _animate,
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      whileHover?: unknown;
      whileTap?: unknown;
      animate?: unknown;
    }) {
      return <div {...props}>{children}</div>;
    },
  },
}))

const menuItems = [
  { id: '1', title: 'Home', url: '/', items: [] },
  { id: '2', title: 'Shop', url: '/shop', items: [] },
  { id: '3', title: 'About', url: '/about', items: [] },
  { id: '4', title: 'Contact', url: '/contact', items: [] },
]

// Mock dependencies
jest.mock('../../common/ErrorDisplay', () => {
  const ErrorDisplay = ({ message }: { message: string }) => (
    <div data-testid="error">{message}</div>
  )
  ErrorDisplay.displayName = 'ErrorDisplay'
  return ErrorDisplay
})

describe('ClientFooter', () => {
  it('renders menu items as links', () => {
    render(<ClientFooter menuItems={menuItems} error={null} />)
    
    // Check if all menu items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()

    // Check if links have correct href attributes
    expect(screen.getByText('Home')).toHaveAttribute('href', '/')
    expect(screen.getByText('Shop')).toHaveAttribute('href', '/shop')
    expect(screen.getByText('About')).toHaveAttribute('href', '/about')
    expect(screen.getByText('Contact')).toHaveAttribute('href', '/contact')
  })

  it('renders error state and hides menu items', () => {
    render(<ClientFooter menuItems={menuItems} error="Something went wrong" />)
    
    // Check if error is displayed
    expect(screen.getByTestId('error')).toHaveTextContent('Something went wrong')
    
    // Menu items should not be present
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('Shop')).not.toBeInTheDocument()
    expect(screen.queryByText('About')).not.toBeInTheDocument()
    expect(screen.queryByText('Contact')).not.toBeInTheDocument()
  })
}) 