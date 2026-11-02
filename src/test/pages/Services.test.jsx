import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Services from '../../pages/Services'

describe('Services Page', () => {
  const mockOpenContactModal = vi.fn()

  it('renders services page title and all 3 core service tab selectors', () => {
    render(<Services openContactModal={mockOpenContactModal} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/specialized engineering services/i)
    expect(screen.getByRole('button', { name: /custom software development/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /it support & managed services/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /software maintenance & upgradation/i })).toBeInTheDocument()
  })

  it('switches active service details when tab is clicked', async () => {
    render(<Services openContactModal={mockOpenContactModal} />)
    const itSupportTab = screen.getByRole('button', { name: /it support & managed services/i })
    fireEvent.click(itSupportTab)

    expect(await screen.findByText(/24\/7\/365 real-time system health monitoring/i)).toBeInTheDocument()
    expect(await screen.findByText(/strict 15-minute sla response times/i)).toBeInTheDocument()
  })

  it('triggers contact modal when clicking consultation button', () => {
    render(<Services openContactModal={mockOpenContactModal} />)
    const quoteBtn = screen.getByRole('button', { name: /request custom proposal/i })
    fireEvent.click(quoteBtn)
    expect(mockOpenContactModal).toHaveBeenCalled()
  })
})
