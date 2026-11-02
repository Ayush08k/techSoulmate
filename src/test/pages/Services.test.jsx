import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Services from '../../pages/Services'

describe('Services Page', () => {
  const mockOpenContactModal = vi.fn()

  it('renders services page title and all service tab selectors', () => {
    render(<Services openContactModal={mockOpenContactModal} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/specialized engineering services/i)
    expect(screen.getByRole('button', { name: /custom software development/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /it support & managed services/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /software maintenance & upgradation/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mock technical interview/i })).toBeInTheDocument()
  })

  it('switches active service details when tab is clicked', async () => {
    render(<Services openContactModal={mockOpenContactModal} />)
    const itSupportTab = screen.getByRole('button', { name: /it support & managed services/i })
    fireEvent.click(itSupportTab)

    expect(await screen.findByText(/24\/7\/365 real-time system health monitoring/i)).toBeInTheDocument()
    expect(await screen.findByText(/strict 15-minute sla response times/i)).toBeInTheDocument()
  })

  it('switches to mock technical interview service tab with scheduling details', async () => {
    const mockSetCurrentPage = vi.fn()
    render(<Services openContactModal={mockOpenContactModal} setCurrentPage={mockSetCurrentPage} />)
    const interviewTab = screen.getByRole('button', { name: /mock technical interview/i })
    fireEvent.click(interviewTab)

    expect(await screen.findByText(/live coding & data structures pair programming/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /schedule mock interview/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /schedule mock interview/i }))
    expect(mockSetCurrentPage).toHaveBeenCalledWith('interview')
  })

  it('triggers contact modal when clicking consultation button', () => {
    render(<Services openContactModal={mockOpenContactModal} />)
    const quoteBtn = screen.getByRole('button', { name: /request custom proposal/i })
    fireEvent.click(quoteBtn)
    expect(mockOpenContactModal).toHaveBeenCalled()
  })
})
