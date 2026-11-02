import { motion } from 'framer-motion'
import {
  Quote,
  CheckCircle,
  ExternalLink,
  Globe,
  Mail,
  Award,
  Shield,
  HeartHandshake,
  Target,
  Sparkles
} from 'lucide-react'
import { ceoDetails, leadershipTeam, companyValues } from '../data/teamData'
import './About.css'

export default function About({ openContactModal }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="about-hero-section">
        <div className="container">
          <motion.div
            className="about-hero-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="badge badge-cyan">
              <Sparkles size={14} /> Who We Are
            </motion.span>
            <motion.h1 variants={itemVariants} className="about-hero-title">
              Our Story & Commitment: <br />
              <span className="text-gradient">Your Human-First Technology Partner</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="about-hero-sub">
              TechSoulmate was founded on a simple realization: businesses don't need transactional code factories; they need an empathetic, fiercely reliable technology partner who cares as deeply about their product's success as they do.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CEO Dedicated Spotlight Section */}
      <section className="section-py ceo-spotlight-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-emerald">Executive Leadership</span>
            <h2>Meet Our CEO & Founder</h2>
            <p>Guiding our technical architecture, culture of quality, and client-first commitment.</p>
          </div>

          <div className="glass-card ceo-profile-card">
            <div className="ceo-card-grid">
              {/* Left Column: Portrait and Quick Meta */}
              <div className="ceo-portrait-col">
                <div className="ceo-image-wrapper">
                  <img
                    src={ceoDetails.avatarUrl}
                    alt={ceoDetails.name}
                    className="ceo-avatar-img"
                  />
                  <div className="ceo-active-pill">
                    <span className="dot-pulse"></span>
                    <span>Direct Client Access</span>
                  </div>
                </div>

                <div className="ceo-social-links">
                  <a
                    href={ceoDetails.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="LinkedIn Profile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a
                    href={ceoDetails.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="CEO Website"
                  >
                    <Globe size={18} />
                  </a>
                  <a
                    href={`mailto:${ceoDetails.socials.email}`}
                    className="social-btn"
                    aria-label="Email CEO"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              {/* Right Column: Bio, Vision & Credentials */}
              <div className="ceo-info-col">
                <div className="ceo-title-block">
                  <h3 className="ceo-name">{ceoDetails.name}</h3>
                  <div className="ceo-role">{ceoDetails.role}</div>
                  <p className="ceo-tagline">{ceoDetails.tagline}</p>
                </div>

                {/* CEO Vision Quote */}
                <div className="ceo-quote-box">
                  <Quote size={28} className="quote-icon" />
                  <p className="quote-text">"{ceoDetails.quote}"</p>
                </div>

                {/* Extended Bio */}
                <p className="ceo-bio-text">{ceoDetails.bio}</p>

                {/* Credentials / Badges */}
                <div className="ceo-credentials-block">
                  <h4 className="credentials-heading">Leadership Benchmarks & Credentials</h4>
                  <div className="credentials-grid">
                    {ceoDetails.credentials.map((cred, idx) => (
                      <div key={idx} className="cred-item">
                        <CheckCircle size={16} className="cred-icon" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="section-py leadership-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Engineering Leadership</span>
            <h2>The Minds Powering TechSoulmate</h2>
            <p>Our multidisciplinary team brings decades of combined experience across enterprise architecture, DevOps, and QA.</p>
          </div>

          <div className="leadership-grid">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                className="glass-card leader-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ translateY: -4 }}
              >
                <div className="leader-role-badge">{leader.role}</div>
                <h4 className="leader-name">{leader.name}</h4>
                <p className="leader-bio">{leader.bio}</p>
                <div className="leader-expertise">
                  <span className="expertise-label">Core Focus:</span>
                  <span className="expertise-val">{leader.expertise}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Company Values */}
      <section className="section-py values-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Our DNA</span>
            <h2>Values That Drive Every Line of Code</h2>
            <p>The non-negotiable principles that guide our day-to-day decisions.</p>
          </div>

          <div className="values-grid">
            {companyValues.map((val, idx) => (
              <div key={idx} className="glass-card value-card">
                <div className="value-num">0{idx + 1}</div>
                <h4 className="value-title">{val.title}</h4>
                <p className="value-desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
