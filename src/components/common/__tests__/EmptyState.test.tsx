import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders title and message correctly', () => {
    const title = 'Test Title';
    const message = 'Test Message';
    
    render(<EmptyState title={title} message={message} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders action button when actionUrl and actionText are provided', () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const actionUrl = 'https://example.com';
    const actionText = 'Click Me';
    
    render(
      <EmptyState 
        title={title} 
        message={message} 
        actionUrl={actionUrl} 
        actionText={actionText} 
      />
    );
    
    const actionButton = screen.getByText(actionText);
    expect(actionButton).toBeInTheDocument();
    expect(actionButton.closest('a')).toHaveAttribute('href', actionUrl);
  });

  it('does not render action button when actionUrl or actionText is missing', () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const actionText = 'Click Me';
    
    render(
      <EmptyState 
        title={title} 
        message={message} 
        actionText={actionText} 
      />
    );
    
    expect(screen.queryByText(actionText)).not.toBeInTheDocument();
  });
}); 