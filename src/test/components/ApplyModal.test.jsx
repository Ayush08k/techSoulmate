import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ApplyModal from '../../components/ApplyModal'

describe('ApplyModal Component', () => {
  const mockOnClose = vi.fn()
  const mockJob = {
    id: 'dev-01',
    title: 'Senior Full-Stack Engineer',
    department: 'Software Development',
    location: 'Remote'
  }

  it('renders job title and form fields when open', () => {
    render(<ApplyModal isOpen={true} onClose={mockOnClose} job={mockJob} />)
    expect(screen.getByText(/apply for senior full-stack engineer/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/resume \/ cv link or details/i)).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<ApplyModal isOpen={false} onClose={mockOnClose} job={mockJob} />)
    expect(screen.queryByText(/apply for senior full-stack engineer/i)).not.toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    render(<ApplyModal isOpen={true} onClose={mockOnClose} job={mockJob} />)
    const closeBtn = screen.getByRole('button', { name: /close application modal/i })
    fireEvent.click(closeBtn)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('submits application and displays confirmation message', async () => {
    render(<ApplyModal isOpen={true} onClose={mockOnClose} job={mockJob} />)
    fireEvent.change(screen.getByLabelText(/your full name/i), { target: { value: 'Jane Engineer' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText(/resume \/ cv link or details/i), { target: { value: 'https://linkedin.com/in/jane' } })

    const submitBtn = screen.getByRole('button', { name: /submit application/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByText(/application submitted/i)).toBeInTheDocument()
  })
})
