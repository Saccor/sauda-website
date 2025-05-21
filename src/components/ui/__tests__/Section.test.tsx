import { render, screen } from '@testing-library/react'
import { Section } from '../Section'

describe('Section', () => {
  it('applies default background class when no bgClass is provided', () => {
    render(
      <Section>
        <div>Test content</div>
      </Section>
    )
    
    const section = screen.getByTestId('section')
    expect(section).toHaveClass('bg-black')
  })

  it('applies custom background class when provided', () => {
    render(
      <Section bgClass="bg-gradient-hero">
        <div>Test content</div>
      </Section>
    )
    
    const section = screen.getByTestId('section')
    expect(section).toHaveClass('bg-gradient-hero')
  })

  it('renders children correctly', () => {
    render(
      <Section>
        <div data-testid="test-child">Test content</div>
      </Section>
    )
    
    const child = screen.getByTestId('test-child')
    expect(child).toBeInTheDocument()
    expect(child).toHaveTextContent('Test content')
  })

  it('applies additional className when provided', () => {
    render(
      <Section className="custom-class">
        <div>Test content</div>
      </Section>
    )
    
    const section = screen.getByTestId('section')
    expect(section).toHaveClass('custom-class')
  })
}) 