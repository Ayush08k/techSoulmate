import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ currentPage, setCurrentPage, openContactModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'careers', label: 'Careers' },
    { id: 'interview', label: 'Interview' }
  ]

  const handleNavClick = (id) => {
    setCurrentPage(id)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`navbar-header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container nav-container">
        {/* Brand Logo */}
        <button
          className="brand-logo"
          onClick={() => handleNavClick('home')}
          aria-label="TechSoulmate Home"
        >
          <div className="logo-icon-wrap">
            <Layers className="logo-icon" />
          </div>
          <span className="brand-name">
            Tech<span className="brand-accent">Soulmate</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="nav-active-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="nav-actions-desktop">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn btn-primary nav-contact-btn"
            onClick={openContactModal}
          >
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-drawer-inner container">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link ${currentPage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="btn btn-primary mobile-cta-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  openContactModal()
                }}
              >
                <span>Contact Us</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
