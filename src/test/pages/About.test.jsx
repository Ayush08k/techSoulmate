import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from '../../pages/About'

describe('About Page', () => {
  it('renders about us heading and company mission', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /our story & commitment/i })).toBeInTheDocument()
    expect(screen.getByText(/human-first technology partner/i)).toBeInTheDocument()
  })

  it('renders dedicated CEO details section with bio, quote and credentials', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /vikram malhotra/i })).toBeInTheDocument()
    expect(screen.getByText(/founder & chief executive officer/i)).toBeInTheDocument()
    expect(screen.getByText(/technology without empathy is just code/i)).toBeInTheDocument()
    expect(screen.getByText(/certified aws solutions architect professional/i)).toBeInTheDocument()
  })

  it('renders leadership team and company values', () => {
    render(<About />)
    expect(screen.getByText(/ananya deshmukh/i)).toBeInTheDocument()
    expect(screen.getByText(/rohan mehra/i)).toBeInTheDocument()
    expect(screen.getByText(/test-driven excellence/i)).toBeInTheDocument()
  })
})
