import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Footer from '../../components/Footer'

describe('Footer Component', () => {
  const mockSetCurrentPage = vi.fn()
  const mockOpenContactModal = vi.fn()

  it('renders company brand and all 3 core service links', () => {
    render(
      <Footer
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    expect(screen.getAllByText(/Soulmate/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Custom Software Development/i)).toBeInTheDocument()
    expect(screen.getByText(/IT Support & Managed Services/i)).toBeInTheDocument()
    expect(screen.getByText(/Software Maintenance & Upgradation/i)).toBeInTheDocument()
  })

  it('navigates to pages when footer navigation links are clicked', () => {
    render(
      <Footer
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    const aboutBtn = screen.getByRole('button', { name: /^about us$/i })
    fireEvent.click(aboutBtn)
    expect(mockSetCurrentPage).toHaveBeenCalledWith('about')
  })

  it('triggers openContactModal when consultation button is clicked', () => {
    render(
      <Footer
        setCurrentPage={mockSetCurrentPage}
        openContactModal={mockOpenContactModal}
      />
    )
    const talkBtn = screen.getByRole('button', { name: /schedule consultation/i })
    fireEvent.click(talkBtn)
    expect(mockOpenContactModal).toHaveBeenCalled()
  })
})
