import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from '../../pages/Home'

describe('Home Page', () => {
  const mockSetCurrentPage = vi.fn()
  const mockOpenContactModal = vi.fn()

  it('renders hero headline, subtitle and primary CTAs', () => {
    render(
      <Home
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Engineering Digital Excellence/i)
    expect(screen.getByRole('button', { name: /explore services/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get free consultation/i })).toBeInTheDocument()
  })

  it('renders all 3 core service cards', () => {
    render(
      <Home
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    expect(screen.getByRole('heading', { name: /custom software development/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /it support & managed services/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /software maintenance & upgradation/i })).toBeInTheDocument()
  })

  it('navigates to services page when clicking Explore Services', () => {
    render(
      <Home
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    const exploreBtn = screen.getByRole('button', { name: /explore services/i })
    fireEvent.click(exploreBtn)
    expect(mockSetCurrentPage).toHaveBeenCalledWith('services')
  })

  it('opens contact modal when clicking consultation CTA', () => {
    render(
      <Home
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    const consultBtn = screen.getByRole('button', { name: /get free consultation/i })
    fireEvent.click(consultBtn)
    expect(mockOpenContactModal).toHaveBeenCalled()
  })
})
