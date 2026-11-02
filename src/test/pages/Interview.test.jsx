import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Interview from '../../pages/Interview'

describe('Interview Page', () => {
  it('renders hero headline, highlights and booking form with all required fields', () => {
    render(<Interview />)

    // Heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/book your 1-on-1/i)
    expect(screen.getByText(/mock technical interview/i)).toBeInTheDocument()

    // Required Form Fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/country code/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/position of mock interview/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date from calendar/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/time to schedule/i)).toBeInTheDocument()
  })

  it('submits interview booking form and renders confirmation summary', async () => {
    render(<Interview />)

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Alex Morgan' }
    })
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'alex.morgan@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/country code/i), {
      target: { value: '+1' }
    })
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '5551234567' }
    })
    fireEvent.change(screen.getByLabelText(/position of mock interview/i), {
      target: { value: 'Backend Engineer (Node.js / Python / Go)' }
    })
    fireEvent.change(screen.getByLabelText(/date from calendar/i), {
      target: { value: '2026-12-15' }
    })
    fireEvent.change(screen.getByLabelText(/time to schedule/i), {
      target: { value: '02:00 PM - 03:00 PM' }
    })

    const submitBtn = screen.getByRole('button', { name: /book mock interview now/i })
    fireEvent.click(submitBtn)

    // Assert confirmation view
    expect(await screen.findByRole('heading', { name: /interview scheduled successfully!/i })).toBeInTheDocument()
    expect(screen.getByText(/alex.morgan@test.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Backend Engineer \(Node\.js \/ Python \/ Go\)/i)).toBeInTheDocument()
    expect(screen.getByText(/2026-12-15/i)).toBeInTheDocument()
    expect(screen.getByText(/02:00 PM - 03:00 PM/i)).toBeInTheDocument()
    expect(screen.getByText(/\+1 5551234567/i)).toBeInTheDocument()

    // Can reset to book another
    const resetBtn = screen.getByRole('button', { name: /book another mock interview/i })
    fireEvent.click(resetBtn)

    expect(await screen.findByRole('heading', { name: /schedule your session/i })).toBeInTheDocument()
  })
})
