import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from '../../pages/Contact'

describe('Contact Page', () => {
  it('renders contact page heading, channels and inquiry form', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/get in touch with our engineering team/i)
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service interested in/i)).toBeInTheDocument()
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument()
  })

  it('toggles FAQ accordion answer on click', () => {
    render(<Contact />)
    const faqQuestion = screen.getByText(/how quickly can techsoulmate kick off a new software project\?/i)
    fireEvent.click(faqQuestion)

    expect(screen.getByText(/statement of work \(sow\) within 48 to 72 hours/i)).toBeInTheDocument()
  })

  it('submits contact form and displays success state', async () => {
    render(<Contact />)
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Tech Lead' } })
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'lead@enterprise.com' } })
    fireEvent.change(screen.getByLabelText(/message \/ project details/i), { target: { value: 'We need 24/7 IT support.' } })

    const submitBtn = screen.getByRole('button', { name: /send inquiry & get estimate/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByText(/inquiry received!/i)).toBeInTheDocument()
  })
})
