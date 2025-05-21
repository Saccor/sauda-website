import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorState } from '../ErrorState';

describe('ErrorState', () => {
  it('renders title and message', () => {
    render(<ErrorState title="Test Title" message="Test Message" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders verification steps if provided', () => {
    const steps = ['Step 1', 'Step 2'];
    render(
      <ErrorState title="Error" message="Something went wrong" verificationSteps={steps} />
    );
    expect(screen.getByText('Verification steps:')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('does not render verification steps section if none provided', () => {
    render(<ErrorState title="Error" message="Something went wrong" />);
    expect(screen.queryByText('Verification steps:')).not.toBeInTheDocument();
  });
}); 