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
    expect(await screen.findByRole('heading', { name: /interview scheduled successfully!/i }, { timeout: 3000 })).toBeInTheDocument()
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

  it('renders mentors showcase with tier-1 engineering leaders', () => {
    render(<Interview />)

    expect(screen.getByRole('heading', { name: /meet your mock interviewers/i })).toBeInTheDocument()
    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument()
    expect(screen.getByText(/Ex-Google Cloud/i)).toBeInTheDocument()
    expect(screen.getByText(/Devon Vance/i)).toBeInTheDocument()
    expect(screen.getByText(/Aarav Mehta/i)).toBeInTheDocument()
  })

  it('renders question hub, allows category filtering, searching and expanding hints', () => {
    render(<Interview />)

    expect(screen.getByRole('heading', { name: /practice question hub & cheatsheets/i })).toBeInTheDocument()

    // Filter by System Design
    const sysDesignBtn = screen.getByRole('button', { name: /^system design$/i })
    fireEvent.click(sysDesignBtn)

    expect(screen.getByText(/Design a Real-Time Distributed Notification System/i)).toBeInTheDocument()

    // Expand accordion question to view hint
    const questionItem = screen.getByText(/Design a Real-Time Distributed Notification System/i)
    fireEvent.click(questionItem)

    expect(screen.getByText(/Interviewer Hint:/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view recommended approach/i })).toBeInTheDocument()

    // Toggle solution breakdown
    fireEvent.click(screen.getByRole('button', { name: /view recommended approach/i }))
    expect(screen.getByText(/Architectural & Implementation Strategy:/i)).toBeInTheDocument()
  })

  it('renders interview rubric preview and simulates score changes', () => {
    render(<Interview />)

    expect(screen.getByRole('heading', { name: /interview rubric & scorecard preview/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /simulated scorecard/i })).toBeInTheDocument()
    expect(screen.getAllByText(/Strong Hire Standard \(4-5\)/i).length).toBeGreaterThan(0)

    // Rating selector can be changed
    const problemSolvingSelect = screen.getByLabelText(/score for problem solving & approach/i)
    expect(problemSolvingSelect).toBeInTheDocument()
    fireEvent.change(problemSolvingSelect, { target: { value: '5' } })
    expect(problemSolvingSelect.value).toBe('5')
  })

  it('renders calendar buttons (Google Calendar & .ics) upon successful booking', async () => {
    // Mock URL.createObjectURL and URL.revokeObjectURL
    window.URL.createObjectURL = vitest.fn(() => 'blob:mock-url')
    window.URL.revokeObjectURL = vitest.fn()

    render(<Interview />)

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Jordan Lee' }
    })
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'jordan@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' }
    })
    fireEvent.change(screen.getByLabelText(/date from calendar/i), {
      target: { value: '2026-11-20' }
    })

    const submitBtn = screen.getByRole('button', { name: /book mock interview now/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByRole('heading', { name: /interview scheduled successfully!/i }, { timeout: 3000 })).toBeInTheDocument()

    // Check calendar actions
    const gCalBtn = screen.getByRole('link', { name: /add to google calendar/i })
    expect(gCalBtn).toBeInTheDocument()
    expect(gCalBtn.getAttribute('href')).toContain('calendar.google.com')

    const icsBtn = screen.getByRole('button', { name: /download \.ics/i })
    expect(icsBtn).toBeInTheDocument()
    fireEvent.click(icsBtn)
    expect(window.URL.createObjectURL).toHaveBeenCalled()
  })
})

