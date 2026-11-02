import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Careers from '../../pages/Careers'

describe('Careers Page', () => {
  const mockOpenApplyModal = vi.fn()

  it('renders careers hero, company perks, and job listings', () => {
    render(<Careers openApplyModal={mockOpenApplyModal} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/build the future with techsoulmate/i)
    expect(screen.getByText(/work from anywhere/i)).toBeInTheDocument()
    expect(screen.getByText(/senior full-stack engineer \(react & node.js\)/i)).toBeInTheDocument()
  })

  it('filters job positions by department', () => {
    render(<Careers openApplyModal={mockOpenApplyModal} />)
    const itSupportFilter = screen.getByRole('button', { name: /^it support$/i })
    fireEvent.click(itSupportFilter)

    expect(screen.getByText(/devops & it support engineer/i)).toBeInTheDocument()
    expect(screen.queryByText(/mobile app developer/i)).not.toBeInTheDocument()
  })

  it('calls openApplyModal when Apply Now is clicked on a job card', () => {
    render(<Careers openApplyModal={mockOpenApplyModal} />)
    const applyButtons = screen.getAllByRole('button', { name: /apply now/i })
    fireEvent.click(applyButtons[0])

    expect(mockOpenApplyModal).toHaveBeenCalled()
  })
})
