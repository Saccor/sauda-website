import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
} from '../sheet'

describe('Sheet', () => {
  it('opens and closes the dialog when trigger and close are clicked', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Dialog Title</SheetTitle>
          <SheetDescription>Dialog Description</SheetDescription>
          <div>Sheet Content</div>
        </SheetContent>
      </Sheet>
    )
    const user = userEvent.setup()
    // Sheet content should not be visible initially
    expect(screen.queryByText('Sheet Content')).not.toBeInTheDocument()
    // Open the sheet
    await user.click(screen.getByText('Open Sheet'))
    expect(screen.getByText('Sheet Content')).toBeInTheDocument()
    // Close the sheet
    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)
    expect(screen.queryByText('Sheet Content')).not.toBeInTheDocument()
  })

  it('renders header, footer, and content areas', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Dialog Title</SheetTitle>
          <SheetDescription>Dialog Description</SheetDescription>
          <SheetHeader>Header Area</SheetHeader>
          <div>Main Content</div>
          <SheetFooter>Footer Area</SheetFooter>
        </SheetContent>
      </Sheet>
    )
    const user = userEvent.setup()
    await user.click(screen.getByText('Open Sheet'))
    // Check for header, footer, and content
    const header = screen.getByText('Header Area')
    const footer = screen.getByText('Footer Area')
    const content = screen.getByText('Main Content')
    expect(header).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    // Check data-slot attributes directly
    expect(header).toHaveAttribute('data-slot', 'sheet-header')
    expect(footer).toHaveAttribute('data-slot', 'sheet-footer')
    // The content area is inside the element with data-slot="sheet-content"
    expect(content.closest('[data-slot="sheet-content"]')).toBeTruthy()
  })
}) 