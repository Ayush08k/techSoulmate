import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../../App'

describe('Full App Integration Flow', () => {
  it('navigates seamlessly across all pages and executes modal flows', async () => {
    render(<App />)

    const mainNav = screen.getByRole('navigation', { name: /main navigation/i })

    // 1. Initial State: Home Page
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/engineering digital excellence/i)

    // 2. Navigate to About Us
    const aboutNavBtn = within(mainNav).getByRole('button', { name: /^about us$/i })
    fireEvent.click(aboutNavBtn)
    expect(await screen.findByRole('heading', { name: /vikram malhotra/i })).toBeInTheDocument()
    expect(screen.getByText(/technology without empathy is just code/i)).toBeInTheDocument()

    // 3. Navigate to Services
    const servicesNavBtn = within(mainNav).getByRole('button', { name: /^services$/i })
    fireEvent.click(servicesNavBtn)
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/specialized engineering services/i)

    // 4. Navigate to Careers and Open Apply Modal
    const careersNavBtn = within(mainNav).getByRole('button', { name: /^careers$/i })
    fireEvent.click(careersNavBtn)
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/build the future with techsoulmate/i)

    const applyButtons = screen.getAllByRole('button', { name: /apply now/i })
    fireEvent.click(applyButtons[0])

    // Verify Apply Modal opens
    expect(screen.getByRole('heading', { name: /apply for senior full-stack engineer/i })).toBeInTheDocument()

    // Fill application form
    fireEvent.change(screen.getByLabelText(/your full name/i), { target: { value: 'Candidate One' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'candidate@domain.com' } })
    fireEvent.change(screen.getByLabelText(/resume \/ cv link or details/i), { target: { value: 'https://linkedin.com/in/candidate' } })

    const submitAppBtn = screen.getByRole('button', { name: /submit application/i })
    fireEvent.click(submitAppBtn)

    expect(await screen.findByText(/application submitted!/i)).toBeInTheDocument()

    // Close application modal
    const backToCareersBtn = screen.getByRole('button', { name: /back to careers/i })
    fireEvent.click(backToCareersBtn)

    // 5. Navigate to Interview Page & Schedule Mock Interview
    const interviewNavBtn = within(mainNav).getByRole('button', { name: /^interview$/i })
    fireEvent.click(interviewNavBtn)
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/book your 1-on-1/i)

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Sam Smith' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'sam@test.com' } })
    fireEvent.change(screen.getByLabelText(/country code/i), { target: { value: '+91' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '9876543210' } })
    fireEvent.change(screen.getByLabelText(/date from calendar/i), { target: { value: '2026-12-20' } })
    fireEvent.change(screen.getByLabelText(/time to schedule/i), { target: { value: '10:30 AM - 11:30 AM' } })

    const bookBtn = screen.getByRole('button', { name: /book mock interview now/i })
    fireEvent.click(bookBtn)
    expect(await screen.findByRole('heading', { name: /interview scheduled successfully!/i })).toBeInTheDocument()

    // 6. Open Global Contact Modal from Navbar CTA
    const headerBanner = screen.getByRole('banner')
    const contactNavBtn = within(headerBanner).getByRole('button', { name: /contact us/i })
    fireEvent.click(contactNavBtn)

    expect(await screen.findByRole('heading', { name: /start your project with techsoulmate/i })).toBeInTheDocument()

    // Fill and submit contact form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Enterprise Partner' } })
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'partner@enterprise.com' } })
    fireEvent.change(screen.getByLabelText(/project details & requirements/i), { target: { value: 'Interested in software development & 24/7 IT support.' } })

    const sendConsultationBtn = screen.getByRole('button', { name: /send consultation request/i })
    fireEvent.click(sendConsultationBtn)

    expect(await screen.findByText(/message sent successfully!/i)).toBeInTheDocument()
  }, 20000)
})
