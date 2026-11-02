import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Phone, Mail, Clock, ShieldCheck } from 'lucide-react'
import './ContactModal.css'

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'software-development',
    budget: '$5k - $15k',
    details: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 400)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: 'software-development',
      budget: '$5k - $15k',
      details: ''
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            className="modal-container glass-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <motion.div
                className="modal-success-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon-wrap">
                  <CheckCircle2 size={56} className="success-icon" />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you, <strong>{formData.fullName}</strong>. Our senior solutions architect has received your inquiry and will reach out to <strong>{formData.email}</strong> within 12 hours.
                </p>
                <div className="success-info-pill">
                  <ShieldCheck size={18} />
                  <span>Strict NDA Protected. Your technical details remain 100% confidential.</span>
                </div>
                <button className="btn btn-primary" onClick={handleReset}>
                  Done
                </button>
              </motion.div>
            ) : (
              <div className="modal-grid">
                {/* Left Side: Contact Pitch & Fast Facts */}
                <div className="modal-sidebar">
                  <span className="badge badge-cyan">Let's Connect</span>
                  <h2 className="modal-title">Start Your Project With TechSoulmate</h2>
                  <p className="modal-subtitle">
                    Partner with an engineering team dedicated to your scalable growth. Tell us about your vision or operational needs.
                  </p>

                  <div className="sidebar-contact-items">
                    <div className="sidebar-contact-item">
                      <div className="item-icon-wrap">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="item-label">Direct Inquiries</div>
                        <div className="item-val">contact@techsoulmate.com</div>
                      </div>
                    </div>

                    <div className="sidebar-contact-item">
                      <div className="item-icon-wrap">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="item-label">Emergency Tech Hotline</div>
                        <div className="item-val">+1 (800) 589-SOUL / +91 98200 12345</div>
                      </div>
                    </div>

                    <div className="sidebar-contact-item">
                      <div className="item-icon-wrap">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="item-label">Guaranteed Response</div>
                        <div className="item-val">Within 15 minutes for critical incidents</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form */}
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Work Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number (Optional)</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="service">Service of Interest *</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="software-development">Custom Software Development</option>
                        <option value="it-support">24/7 IT Support & Managed Infrastructure</option>
                        <option value="software-maintenance">Software Maintenance & Upgradation</option>
                        <option value="all-in-one">Complete Tech Partnership (All 3)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="budget">Estimated Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="Under $5k">Under $5k (Sprint / Audit)</option>
                        <option value="$5k - $15k">$5k - $15k (Standard MVP / Pod)</option>
                        <option value="$15k - $50k">$15k - $50k (Enterprise Scale)</option>
                        <option value="$50k+">$50k+ (Dedicated Pod / Cloud Migration)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="details">Project Details & Requirements *</label>
                    <textarea
                      id="details"
                      name="details"
                      rows="4"
                      required
                      placeholder="Briefly describe your objectives, existing tech stack, or challenges you'd like us to solve..."
                      value={formData.details}
                      onChange={handleChange}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary modal-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    <span>{loading ? 'Submitting...' : 'Send Consultation Request'}</span>
                    <Send size={16} />
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
