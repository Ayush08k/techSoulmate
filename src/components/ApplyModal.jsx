import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Briefcase, MapPin, Sparkles } from 'lucide-react'
import './ApplyModal.css'

export default function ApplyModal({ isOpen, onClose, job }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    resumeLink: '',
    coverNote: ''
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
      portfolio: '',
      resumeLink: '',
      coverNote: ''
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            className="modal-container glass-card apply-modal-box"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Application Modal"
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
                <h3>Application Submitted!</h3>
                <p>
                  Thank you for applying to <strong>{job?.title}</strong>, <strong>{formData.fullName}</strong>. Our talent team reviews every submission thoroughly. We will get back to you at <strong>{formData.email}</strong> within 3 business days.
                </p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Back to Careers
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="apply-header">
                  <span className="badge badge-cyan">Join Our Engineering Pod</span>
                  <h2>Apply for {job?.title || 'Open Position'}</h2>
                  <div className="apply-meta">
                    <span className="meta-tag">
                      <Briefcase size={14} /> {job?.department}
                    </span>
                    <span className="meta-tag">
                      <MapPin size={14} /> {job?.location}
                    </span>
                  </div>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Your Full Name *</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        placeholder="e.g. Maya Patel"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="maya@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone / WhatsApp</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="portfolio">GitHub / Portfolio URL</label>
                      <input
                        id="portfolio"
                        name="portfolio"
                        type="url"
                        placeholder="https://github.com/username"
                        value={formData.portfolio}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="resumeLink">Resume / CV Link or Details *</label>
                    <input
                      id="resumeLink"
                      name="resumeLink"
                      type="text"
                      required
                      placeholder="Google Drive, Dropbox, or LinkedIn Profile URL"
                      value={formData.resumeLink}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="coverNote">Why do you want to join TechSoulmate?</label>
                    <textarea
                      id="coverNote"
                      name="coverNote"
                      rows="3"
                      placeholder="Tell us what excites you about software engineering, IT infrastructure, or building great products..."
                      value={formData.coverNote}
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
                    <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
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
