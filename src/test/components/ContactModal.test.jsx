import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactModal from '../../components/ContactModal'

describe('ContactModal Component', () => {
  const mockOnClose = vi.fn()

  it('renders form inputs and contact modal heading when isOpen is true', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByRole('heading', { name: /start your project/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service of interest/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument()
  })

  it('does not render modal content when isOpen is false', () => {
    render(<ContactModal isOpen={false} onClose={mockOnClose} />)
    expect(screen.queryByRole('heading', { name: /start your project/i })).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    const closeBtn = screen.getByRole('button', { name: /close modal/i })
    fireEvent.click(closeBtn)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('submits form with user inputs and displays success confirmation', async () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/project details/i), { target: { value: 'We need custom software development.' } })

    const submitBtn = screen.getByRole('button', { name: /send consultation request/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument()
  })
})
