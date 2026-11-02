import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import { faqs } from '../data/testimonialsData'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Software Development',
    budget: '$5k - $15k',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

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
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Custom Software Development',
      budget: '$5k - $15k',
      message: ''
    })
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  return (
    <div className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero-section">
        <div className="container">
          <motion.div
            className="contact-hero-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-cyan">
              <Sparkles size={14} /> Direct Engagement
            </span>
            <h1 className="contact-hero-title">
              Get in Touch with Our <br />
              <span className="text-gradient">Engineering Team</span>
            </h1>
            <p className="contact-hero-sub">
              Have a product to build, an IT infrastructure to secure, or a legacy system to modernize? Connect directly with our technical leadership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Grid: Form & Channels */}
      <section className="section-py contact-main-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column: Direct Channels & Map Card */}
            <div className="contact-info-col">
              <div className="glass-card contact-channel-card">
                <h3>Direct Channels</h3>
                <p>We pride ourselves on responsive, engineer-to-engineer communication.</p>

                <div className="channel-items-list">
                  <div className="channel-item">
                    <div className="channel-icon-wrap">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="channel-label">General & Project Inquiries</div>
                      <div className="channel-value">contact@techsoulmate.com</div>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-wrap">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="channel-label">Direct Phone & WhatsApp</div>
                      <div className="channel-value">+1 (800) 589-SOUL / +91 98200 12345</div>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-wrap">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="channel-label">Operations Center Availability</div>
                      <div className="channel-value">24 Hours / 7 Days / 365 Days a Year</div>
                    </div>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-wrap">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="channel-label">Global Engineering Hubs</div>
                      <div className="channel-value">Innovation Park, Cyber City, Bangalore & San Francisco</div>
                    </div>
                  </div>
                </div>

                <div className="channel-guarantee-pill">
                  <ShieldCheck size={18} />
                  <span>All project discussions are protected under a bilateral NDA.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="contact-form-col">
              <div className="glass-card contact-form-card">
                {submitted ? (
                  <motion.div
                    className="contact-success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={56} className="success-icon" />
                    </div>
                    <h2>Inquiry Received!</h2>
                    <p>
                      Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <strong>{formData.service}</strong> has reached our senior solutions architect. We will reach back to <strong>{formData.email}</strong> shortly.
                    </p>
                    <button className="btn btn-primary" onClick={handleReset}>
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    <div className="form-card-header">
                      <h3>Request a Proposal or Consultation</h3>
                      <p>Fill out the technical brief below and we will prepare a preliminary roadmap.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="contact-main-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Your Name *</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">Work Email *</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="company">Company / Startup Name</label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Acme Innovations"
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 019-2834"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="service">Service Interested In *</label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                          >
                            <option value="Custom Software Development">Custom Software Development</option>
                            <option value="IT Support & Managed Services">IT Support & Managed Services</option>
                            <option value="Software Maintenance & Upgradation">Software Maintenance & Upgradation</option>
                            <option value="Comprehensive Partner (All Services)">Comprehensive Partner (All Services)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="budget">Approximate Budget</label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                          >
                            <option value="Under $5k">Under $5k (Initial Audit / Proof of Concept)</option>
                            <option value="$5k - $15k">$5k - $15k (Sprint / MVP)</option>
                            <option value="$15k - $50k">$15k - $50k (Mid-Market Scale)</option>
                            <option value="$50k+">$50k+ (Dedicated Pod / Cloud Modernization)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Message / Project Details *</label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          required
                          placeholder="Tell us what you are trying to build, your timeline, or any technical hurdles you are facing..."
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="btn btn-primary submit-inquiry-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                      >
                        <span>{loading ? 'Submitting...' : 'Send Inquiry & Get Estimate'}</span>
                        <Send size={16} />
                      </motion.button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="section-py faq-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Answers You Need</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear answers to common questions about our delivery, SLAs, and technical partnerships.</p>
          </div>

          <div className="faq-accordion-wrap">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={index} className="glass-card faq-item-card">
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
