import { Layers, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer({ setCurrentPage, openContactModal }) {
  const handleNav = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-wrap">
      <div className="container">
        {/* Top CTA Banner */}
        <div className="footer-banner glass-card">
          <div className="banner-content">
            <span className="badge badge-emerald">Ready To Scale?</span>
            <h3>Build, Support, & Modernize With TechSoulmate</h3>
            <p>
              Get a comprehensive technical assessment and architectural roadmap tailored to your product.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary banner-btn"
            onClick={openContactModal}
          >
            <span>Schedule Consultation</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="brand-logo" onClick={() => handleNav('home')}>
              <div className="logo-icon-wrap">
                <Layers className="logo-icon" />
              </div>
              <span className="brand-name">
                Tech<span className="brand-accent">Soulmate</span>
              </span>
            </div>
            <p className="footer-bio">
              We engineer dependable digital systems and provide 24/7 IT operations. From inception to enterprise modernization, we are your true technology partner.
            </p>
            <div className="security-badge">
              <ShieldCheck size={16} />
              <span>ISO 27001 & SOC-2 Compliant Processes</span>
            </div>
          </div>

          {/* Core Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Core Services</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNav('services')} className="footer-link-btn">
                  Custom Software Development
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="footer-link-btn">
                  IT Support & Managed Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="footer-link-btn">
                  Software Maintenance & Upgradation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="footer-link-btn">
                  Cloud Architecture & Migration
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="footer-link-btn">
                  24/7 Incident Response
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNav('home')} className="footer-link-btn">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="footer-link-btn">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="footer-link-btn">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="footer-link-btn">
                  Careers (Hiring!)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('interview')} className="footer-link-btn">
                  Mock Interview
                </button>
              </li>
              <li>
                <button onClick={openContactModal} className="footer-link-btn">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <span>contact@techsoulmate.com</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span>+1 (800) 589-SOUL</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>Innovation Park, Cyber City, Global Hub</span>
            </div>
            <div className="emergency-support-notice">
              <span className="dot-pulse"></span>
              <span>24/7 Monitoring Center Active</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TechSoulmate Inc. All rights reserved.</p>
          <div className="built-with">
            <span>Crafted with</span>
            <Heart size={14} className="heart-icon" />
            <span>and Test-Driven Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
