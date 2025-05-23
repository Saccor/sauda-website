import { render, screen } from '@testing-library/react'
import { Card } from '../card'

describe('Card', () => {
  it('applies className prop to the card', () => {
    render(
      <Card className="custom-class test-card">
        <div>Test content</div>
      </Card>
    )
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    render(
      <Card>
        <div data-testid="test-child">Test content</div>
      </Card>
    )
    const child = screen.getByTestId('test-child')
    expect(child).toBeInTheDocument()
    expect(child).toHaveTextContent('Test content')
  })
}) 