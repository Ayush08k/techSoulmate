import { useState, useMemo } from 'react'
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
  Star,
  ExternalLink,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Brain,
  Layers,
  Code2,
  MessageSquare,
  HelpCircle,
  BarChart3,
  Sliders,
  Check
} from 'lucide-react'
import {
  countryCodes,
  interviewPositions,
  timeSlots,
  interviewTypes,
  mockInterviewPerks,
  interviewMentors,
  practiceQuestions,
  rubricCriteria
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

  // Question Hub State
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const [revealedSolutionId, setRevealedSolutionId] = useState(null)

  // Interactive Rubric Simulation State (scores 1-5 for 4 dimensions)
  const [rubricScores, setRubricScores] = useState({
    rc1: 5,
    rc2: 4,
    rc3: 5,
    rc4: 4
  })

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
    setTimeout(() => {
      setLoading(false)
      setSubmittedData({ ...formData })
    }, 300)
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

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return practiceQuestions.filter((q) => {
      const matchesCat = activeCategory === 'All' || q.category === activeCategory
      const matchesQuery =
        searchQuery.trim() === '' ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCat && matchesQuery
    })
  }, [activeCategory, searchQuery])

  // Calendar Helpers (.ics file download & Google Calendar link)
  const parseDateTime = (dateStr, timeRangeStr) => {
    try {
      const [startStr] = timeRangeStr.split(' - ')
      const [time, modifier] = startStr.trim().split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      if (modifier === 'PM' && hours < 12) hours += 12
      if (modifier === 'AM' && hours === 12) hours = 0

      const d = new Date(dateStr)
      d.setHours(hours, minutes, 0, 0)
      const endD = new Date(d.getTime() + 60 * 60 * 1000)

      const toICSString = (dt) => {
        return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      }

      return { start: toICSString(d), end: toICSString(endD) }
    } catch {
      return { start: '', end: '' }
    }
  }

  const handleDownloadICS = () => {
    if (!submittedData) return
    const { start, end } = parseDateTime(submittedData.date, submittedData.time)
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TechSoulmate//Mock Interview//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:TechSoulmate Mock Interview - ${submittedData.position}`,
      `DESCRIPTION:1-on-1 Mock Technical Interview session for ${submittedData.name}. Joining link and rubric will be shared.`,
      `LOCATION:Google Meet (Link will be sent to ${submittedData.email})`,
      start ? `DTSTART:${start}` : '',
      end ? `DTEND:${end}` : '',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(Boolean).join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `techsoulmate-mock-interview-${submittedData.date}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getGoogleCalendarURL = () => {
    if (!submittedData) return '#'
    const { start, end } = parseDateTime(submittedData.date, submittedData.time)
    const title = encodeURIComponent(`TechSoulmate Mock Technical Interview (${submittedData.position})`)
    const details = encodeURIComponent(
      `Candidate: ${submittedData.name}\nRole: ${submittedData.position}\nPrep Notes: ${submittedData.notes || 'None'}\nVideo Room: Google Meet`
    )
    const location = encodeURIComponent('Google Meet')
    const dates = start && end ? `${start}/${end}` : ''
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dates ? `&dates=${dates}` : ''}`
  }

  // Simulated Total Rubric Score
  const totalRubricPercentage = useMemo(() => {
    const rawScore =
      (rubricScores.rc1 * 0.25 +
        rubricScores.rc2 * 0.3 +
        rubricScores.rc3 * 0.25 +
        rubricScores.rc4 * 0.2) /
      5
    return Math.round(rawScore * 100)
  }, [rubricScores])

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

                    {/* Calendar Action Buttons */}
                    <div className="calendar-actions-wrapper">
                      <h4 className="calendar-actions-title">
                        <Sparkles size={16} /> Save to Your Personal Calendar
                      </h4>
                      <div className="calendar-actions-btns">
                        <a
                          href={getGoogleCalendarURL()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm calendar-action-btn"
                          aria-label="Add to Google Calendar"
                        >
                          <ExternalLink size={16} /> Add to Google Calendar
                        </a>
                        <button
                          type="button"
                          onClick={handleDownloadICS}
                          className="btn btn-secondary btn-sm calendar-action-btn"
                          aria-label="Download .ics Calendar File"
                        >
                          <Download size={16} /> Download .ics (Outlook/Apple)
                        </button>
                      </div>
                    </div>

                    <button onClick={handleReset} className="btn btn-secondary" style={{ marginTop: '20px' }}>
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

      {/* NEW SECTION 1: Featured Mentors & Interviewers Showcase */}
      <section className="section-py interview-mentors-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-purple">
              <Award size={14} /> Tier-1 Engineering Leaders
            </span>
            <h2 className="section-title">Meet Your Mock Interviewers</h2>
            <p className="section-subtitle">
              Learn from engineers who have conducted 500+ hiring loops at leading tech organizations.
            </p>
          </div>

          <div className="mentors-grid">
            {interviewMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                className="glass-card mentor-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mentor-header">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="mentor-avatar"
                    loading="lazy"
                  />
                  <div className="mentor-info">
                    <h3 className="mentor-name">{mentor.name}</h3>
                    <p className="mentor-role">{mentor.role}</p>
                    <span className="mentor-company-pill">{mentor.company}</span>
                  </div>
                </div>

                <div className="mentor-rating-bar">
                  <div className="rating-stars">
                    <Star size={16} className="star-filled" fill="currentColor" />
                    <span className="rating-num">{mentor.rating}</span>
                    <span className="rating-count">({mentor.reviewsCount} mock interviews)</span>
                  </div>
                </div>

                <p className="mentor-bio">{mentor.bio}</p>

                <div className="mentor-tags">
                  {mentor.tags.map((tag) => (
                    <span key={tag} className="mentor-tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Practice Question Hub & Cheatsheets */}
      <section className="section-py interview-questions-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-blue">
              <Code2 size={14} /> High-Yield Preparation
            </span>
            <h2 className="section-title">Practice Question Hub & Cheatsheets</h2>
            <p className="section-subtitle">
              Explore curated System Design, Data Structures, and STAR behavioral scenarios commonly asked in top-tier interviews.
            </p>
          </div>

          {/* Question Category Tabs & Search Bar */}
          <div className="questions-control-bar glass-card">
            <div className="question-category-pills">
              {['All', 'System Design', 'Data Structures & Algorithms', 'Behavioral (STAR)'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cat-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="questions-search-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, questions, or tags..."
                className="questions-search-input"
                aria-label="Search questions"
              />
            </div>
          </div>

          {/* Question List Accordion */}
          <div className="questions-accordion-list">
            {filteredQuestions.length === 0 ? (
              <div className="no-questions-card glass-card">
                <HelpCircle size={32} />
                <p>No questions matched your search query. Try another keyword!</p>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isExpanded = expandedQuestionId === q.id
                const isSolutionOpen = revealedSolutionId === q.id

                return (
                  <div key={q.id} className="glass-card question-card-item">
                    <div
                      className="question-card-head"
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setExpandedQuestionId(isExpanded ? null : q.id)
                        }
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div className="question-title-group">
                        <span className={`diff-pill diff-${q.difficulty.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                          {q.difficulty}
                        </span>
                        <h4 className="question-title">{q.title}</h4>
                        <span className="target-company-badge">Asked at {q.targetCompany}</span>
                      </div>
                      <div className="question-toggle-icon">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="question-expanded-content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="question-description">{q.description}</p>

                          <div className="question-concepts-row">
                            <span className="concepts-label">Key Focus Concepts:</span>
                            <div className="concepts-list">
                              {q.keyConcepts.map((c) => (
                                <span key={c} className="concept-pill">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="question-hint-box">
                            <strong>💡 Interviewer Hint:</strong> {q.hint}
                          </div>

                          <div className="solution-actions-row">
                            <button
                              type="button"
                              onClick={() => setRevealedSolutionId(isSolutionOpen ? null : q.id)}
                              className="btn btn-outline btn-sm toggle-solution-btn"
                            >
                              {isSolutionOpen ? 'Hide Solution Breakdown' : 'View Recommended Approach'}
                            </button>
                          </div>

                          {isSolutionOpen && (
                            <motion.div
                              className="question-solution-box"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <h5>Architectural & Implementation Strategy:</h5>
                              <p>{q.solutionOverview}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: Interactive Interview Rubric & Scorecard Preview */}
      <section className="section-py interview-rubric-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-emerald">
              <BarChart3 size={14} /> Evaluation Standards
            </span>
            <h2 className="section-title">Interview Rubric & Scorecard Preview</h2>
            <p className="section-subtitle">
              Explore how candidates are assessed across core engineering competencies. Simulate scores to see what it takes to land a "Strong Hire" recommendation.
            </p>
          </div>

          <div className="rubric-interactive-grid">
            {/* Left: Criteria Breakdown Cards */}
            <div className="rubric-cards-col">
              {rubricCriteria.map((item) => (
                <div key={item.id} className="glass-card rubric-criterion-card">
                  <div className="criterion-header">
                    <div className="criterion-title-wrap">
                      <div className="criterion-icon-badge">
                        {item.dimension.includes('Problem') ? (
                          <Brain size={20} />
                        ) : item.dimension.includes('System') ? (
                          <Layers size={20} />
                        ) : item.dimension.includes('Code') ? (
                          <Code2 size={20} />
                        ) : (
                          <MessageSquare size={20} />
                        )}
                      </div>
                      <div>
                        <h4>{item.dimension}</h4>
                        <span className="criterion-weight-label">Weight: {item.weight}</span>
                      </div>
                    </div>

                    {/* Interactive Score Selector (1-5) */}
                    <div className="score-selector-wrap">
                      <label htmlFor={`score-${item.id}`} className="score-select-label">
                        Rating:
                      </label>
                      <select
                        id={`score-${item.id}`}
                        value={rubricScores[item.id] || 4}
                        onChange={(e) =>
                          setRubricScores((prev) => ({
                            ...prev,
                            [item.id]: Number(e.target.value)
                          }))
                        }
                        className="form-select score-dropdown"
                        aria-label={`Score for ${item.dimension}`}
                      >
                        <option value="5">5 - Exceptional</option>
                        <option value="4">4 - Strong Hire</option>
                        <option value="3">3 - Leaning Hire</option>
                        <option value="2">2 - Developing</option>
                        <option value="1">1 - Needs Focus</option>
                      </select>
                    </div>
                  </div>

                  <div className="criterion-levels-grid">
                    <div className="level-box level-excellent">
                      <span className="level-badge">
                        <Check size={14} /> Strong Hire Standard (4-5)
                      </span>
                      <p>{item.excellent}</p>
                    </div>
                    <div className="level-box level-developing">
                      <span className="level-badge developing-badge">Developing (1-2)</span>
                      <p>{item.developing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Real-Time Scorecard Summary Simulator */}
            <div className="rubric-simulator-col">
              <div className="glass-card rubric-summary-sticky">
                <div className="simulator-header">
                  <Sliders size={20} className="simulator-icon" />
                  <h3>Simulated Scorecard</h3>
                </div>

                <div className="score-gauge-box">
                  <div className="score-percentage-ring">
                    <span className="score-percentage-num">{totalRubricPercentage}%</span>
                    <span className="score-percentage-label">Overall Index</span>
                  </div>

                  <div className="hire-decision-badge">
                    {totalRubricPercentage >= 85 ? (
                      <span className="decision-tag tag-strong-hire">🌟 Recommendation: Strong Hire</span>
                    ) : totalRubricPercentage >= 70 ? (
                      <span className="decision-tag tag-hire">✅ Recommendation: Hire</span>
                    ) : (
                      <span className="decision-tag tag-leaning">⚠️ Recommendation: More Practice Recommended</span>
                    )}
                  </div>
                </div>

                <div className="rubric-weights-list">
                  <div className="weight-item">
                    <span>Problem Solving</span>
                    <strong>{rubricScores.rc1}/5</strong>
                  </div>
                  <div className="weight-item">
                    <span>System Architecture</span>
                    <strong>{rubricScores.rc2}/5</strong>
                  </div>
                  <div className="weight-item">
                    <span>Code Quality</span>
                    <strong>{rubricScores.rc3}/5</strong>
                  </div>
                  <div className="weight-item">
                    <span>Communication</span>
                    <strong>{rubricScores.rc4}/5</strong>
                  </div>
                </div>

                <div className="rubric-cta-wrap">
                  <p className="rubric-note">
                    All candidates receive this rubric scorecard with timestamped feedback delivered within 2 hours after the session.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('interview-name')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="btn btn-primary btn-block"
                  >
                    Schedule Your Session Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

