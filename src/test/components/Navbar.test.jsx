import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navbar from '../../components/Navbar'

describe('Navbar Component', () => {
  const mockSetCurrentPage = vi.fn()
  const mockOpenContactModal = vi.fn()

  it('renders brand name TechSoulmate with icon', () => {
    render(
      <Navbar
        currentPage="home"
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    expect(screen.getByText(/Soulmate/i)).toBeInTheDocument()
    expect(screen.getByText(/Tech/i)).toBeInTheDocument()
  })

  it('renders all primary navigation links', () => {
    render(
      <Navbar
        currentPage="home"
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    expect(screen.getByRole('button', { name: /^home$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^about us$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^services$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^careers$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^interview$/i })).toBeInTheDocument()
  })

  it('calls setCurrentPage when navigation button is clicked', () => {
    render(
      <Navbar
        currentPage="home"
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    const servicesBtn = screen.getByRole('button', { name: /^services$/i })
    fireEvent.click(servicesBtn)
    expect(mockSetCurrentPage).toHaveBeenCalledWith('services')
  })

  it('triggers openContactModal when Contact Us button is clicked', () => {
    render(
      <Navbar
        currentPage="home"
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    const contactBtn = screen.getByRole('button', { name: /contact us/i })
    fireEvent.click(contactBtn)
    expect(mockOpenContactModal).toHaveBeenCalled()
  })
})
