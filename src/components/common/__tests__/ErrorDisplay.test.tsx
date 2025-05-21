import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorDisplay from '../ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renders error message correctly', () => {
    const message = 'Test error message';
    render(<ErrorDisplay message={message} />);
    
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders retry button when retry callback is provided', () => {
    const message = 'Test error message';
    const handleRetry = jest.fn();
    
    render(<ErrorDisplay message={message} retry={handleRetry} />);
    
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button when retry callback is not provided', () => {
    const message = 'Test error message';
    
    render(<ErrorDisplay message={message} />);
    
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('renders error icon', () => {
    const message = 'Test error message';
    render(<ErrorDisplay message={message} />);
    
    const errorIcon = screen.getByRole('img', { hidden: true });
    expect(errorIcon).toBeInTheDocument();
  });
}); 