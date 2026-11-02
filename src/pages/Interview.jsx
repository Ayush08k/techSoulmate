import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Award,
  Video,
  FileText,
  ShieldCheck,
  Globe,
  ArrowRight
} from 'lucide-react'
import {
  countryCodes,
  interviewPositions,
  timeSlots,
  interviewTypes,
  mockInterviewPerks
} from '../data/interviewData'
import './Interview.css'

export default function Interview() {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    email: '',
    date: '',
    time: timeSlots[0],
    position: interviewPositions[0],
    notes: ''
  })

  const [submittedData, setSubmittedData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Get tomorrow's date string YYYY-MM-DD as minimum selectable date
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Instant submission in test environment or short animation in production
    const delay = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test' ? 0 : 250
    setTimeout(() => {
      setLoading(false)
      setSubmittedData({ ...formData })
    }, delay)
  }

  const handleReset = () => {
    setSubmittedData(null)
    setFormData({
      name: '',
      countryCode: '+91',
      phone: '',
      email: '',
      date: '',
      time: timeSlots[0],
      position: interviewPositions[0],
      notes: ''
    })
  }

  return (
    <div className="interview-page">
      {/* Hero Section */}
      <section className="interview-hero-section">
        <div className="container">
          <motion.div
            className="interview-hero-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-pink">
              <Sparkles size={14} /> Practice With Tech Leads
            </span>
            <h1 className="interview-hero-title">
              Book Your 1-on-1 <br />
              <span className="text-gradient">Mock Technical Interview</span>
            </h1>
            <p className="interview-hero-sub">
              Experience realistic engineering rounds tailored to your target job profile. Get granular feedback, live code assessment, and confidence before the big day.
            </p>

            {/* Feature Highlights Banner */}
            <div className="interview-features-bar">
              {mockInterviewPerks.map((perk, idx) => (
                <div key={idx} className="interview-feature-item glass-card">
                  <div className="interview-feature-icon">
                    {idx === 0 ? <Award size={22} /> : idx === 1 ? <FileText size={22} /> : <Video size={22} />}
                  </div>
                  <div className="interview-feature-text">
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="section-py interview-booking-section">
        <div className="container">
          <div className="interview-booking-grid">
            {/* Left Column: Booking Form or Confirmation */}
            <div className="interview-form-col">
              <AnimatePresence mode="wait">
                {!submittedData ? (
                  <motion.div
                    key="booking-form"
                    className="glass-card interview-form-card"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="interview-card-header">
                      <h2>Schedule Your Session</h2>
                      <p>Fill out the details below to lock in your preferred date and time slot.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="interview-form" aria-label="Mock Interview Booking Form">
                      {/* Name Field */}
                      <div className="form-group">
                        <label htmlFor="interview-name" className="form-label">
                          Full Name *
                        </label>
                        <div className="input-field-wrap">
                          <User size={18} className="input-icon-prefix" />
                          <input
                            id="interview-name"
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            className="form-input input-with-icon"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="form-group">
                        <label htmlFor="interview-email" className="form-label">
                          Email Address *
                        </label>
                        <div className="input-field-wrap">
                          <Mail size={18} className="input-icon-prefix" />
                          <input
                            id="interview-email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="form-input input-with-icon"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Phone with Country Code */}
                      <div className="form-group">
                        <label htmlFor="interview-phone" className="form-label">
                          Phone Number *
                        </label>
                        <div className="phone-input-group">
                          <div>
                            <label htmlFor="interview-country-code" className="sr-only">
                              Country Code
                            </label>
                            <select
                              id="interview-country-code"
                              name="countryCode"
                              aria-label="Country Code"
                              className="form-select country-code-select"
                              value={formData.countryCode}
                              onChange={handleChange}
                            >
                              {countryCodes.map((item) => (
                                <option key={item.code} value={item.code}>
                                  {item.flag} {item.code}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="input-field-wrap">
                            <Phone size={18} className="input-icon-prefix" />
                            <input
                              id="interview-phone"
                              name="phone"
                              type="tel"
                              required
                              placeholder="98765 43210"
                              className="form-input input-with-icon"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Position Selection */}
                      <div className="form-group">
                        <label htmlFor="interview-position" className="form-label">
                          Position of Mock Interview *
                        </label>
                        <div className="input-field-wrap">
                          <Briefcase size={18} className="input-icon-prefix" />
                          <select
                            id="interview-position"
                            name="position"
                            required
                            className="form-select input-with-icon"
                            value={formData.position}
                            onChange={handleChange}
                          >
                            {interviewPositions.map((pos) => (
                              <option key={pos} value={pos}>
                                {pos}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Date & Time Row */}
                      <div className="form-row-2col">
                        <div className="form-group">
                          <label htmlFor="interview-date" className="form-label">
                            Date from Calendar *
                          </label>
                          <div className="input-field-wrap">
                            <Calendar size={18} className="input-icon-prefix" />
                            <input
                              id="interview-date"
                              name="date"
                              type="date"
                              required
                              min={minDate}
                              className="form-input input-with-icon"
                              value={formData.date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="interview-time" className="form-label">
                            Time to Schedule *
                          </label>
                          <div className="input-field-wrap">
                            <Clock size={18} className="input-icon-prefix" />
                            <select
                              id="interview-time"
                              name="time"
                              required
                              className="form-select input-with-icon"
                              value={formData.time}
                              onChange={handleChange}
                            >
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Optional Notes */}
                      <div className="form-group">
                        <label htmlFor="interview-notes" className="form-label">
                          Specific Topics or Target Company (Optional)
                        </label>
                        <textarea
                          id="interview-notes"
                          name="notes"
                          rows="3"
                          placeholder="e.g. Preparing for System Design round at Uber, or React performance optimization."
                          className="form-textarea"
                          value={formData.notes}
                          onChange={handleChange}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary interview-submit-btn"
                      >
                        {loading ? 'Confirming Slot...' : 'Book Mock Interview Now'}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-card"
                    className="glass-card interview-success-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="success-check-badge">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3>Interview Scheduled Successfully!</h3>
                    <p className="success-lead-text">
                      A calendar invitation with Google Meet link and prep material has been sent to{' '}
                      <strong>{submittedData.email}</strong>.
                    </p>

                    <div className="scheduled-summary-box">
                      <div className="summary-title">
                        <Calendar size={18} />
                        <span>Confirmed Booking Details</span>
                      </div>
                      <div className="summary-item-list">
                        <div className="summary-row">
                          <span className="label">Candidate:</span>
                          <span className="val">{submittedData.name}</span>
                        </div>
                        <div className="summary-row">
                          <span className="label">Role:</span>
                          <span className="val">{submittedData.position}</span>
                        </div>
                        <div className="summary-row">
                          <span className="label">Date:</span>
                          <span className="val">{submittedData.date}</span>
                        </div>
                        <div className="summary-row">
                          <span className="label">Time Slot:</span>
                          <span className="val">{submittedData.time}</span>
                        </div>
                        <div className="summary-row">
                          <span className="label">Phone:</span>
                          <span className="val">
                            {submittedData.countryCode} {submittedData.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button onClick={handleReset} className="btn btn-secondary">
                      Book Another Mock Interview
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Track Types & Preparation Tips */}
            <div className="interview-side-col">
              <div className="glass-card interview-types-card">
                <h3>Interview Tracks</h3>
                <p>Tailored rounds conducted by seasoned engineering leaders.</p>

                <div className="types-stack">
                  {interviewTypes.map((type) => (
                    <div key={type.id} className="type-item-box">
                      <div className="type-item-top">
                        <h4>{type.title}</h4>
                        <span className="duration-pill">{type.duration}</span>
                      </div>
                      <p>{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card interview-prep-tips-card">
                <h3>Session Guidelines</h3>
                <p>What to expect once your interview is scheduled:</p>

                <div className="tips-bullet-list">
                  <div className="tip-bullet">
                    <CheckCircle2 size={18} />
                    <span>Join the private video room 5 minutes prior with camera & mic enabled.</span>
                  </div>
                  <div className="tip-bullet">
                    <CheckCircle2 size={18} />
                    <span>Have your IDE or browser coding workspace ready for live pair coding.</span>
                  </div>
                  <div className="tip-bullet">
                    <CheckCircle2 size={18} />
                    <span>Receive instant verbal debrief immediately followed by your written rubric score.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
