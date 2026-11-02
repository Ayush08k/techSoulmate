import { motion } from 'framer-motion'
import {
  Code2,
  Headphones,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  Star,
  Users,
  Award,
  Terminal,
  Activity
} from 'lucide-react'
import { servicesData } from '../data/servicesData'
import { testimonials } from '../data/testimonialsData'
import './Home.css'

export default function Home({ setCurrentPage, openContactModal }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={28} className="service-icon" />
      case 'Headphones':
        return <Headphones size={28} className="service-icon" />
      case 'RefreshCw':
        return <RefreshCw size={28} className="service-icon" />
      default:
        return <Code2 size={28} className="service-icon" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <span className="badge badge-cyan">
                <Terminal size={14} /> Next-Gen Technology Solutions
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title">
              Engineering Digital Excellence, <br />
              <span className="text-gradient">Partnering for Growth.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle">
              At <strong>TechSoulmate</strong>, we don’t just write code — we become your dedicated technology partner. From custom web & mobile apps to 24/7 IT operations and zero-downtime legacy upgrades, we scale your vision.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-cta-group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={openContactModal}
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                onClick={() => {
                  setCurrentPage('services')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Explore Services</span>
              </motion.button>
            </motion.div>

            {/* Quick Proof Badges */}
            <motion.div variants={itemVariants} className="hero-proof-badges">
              <div className="proof-item">
                <CheckCircle size={16} className="proof-icon" />
                <span>Test-Driven Development</span>
              </div>
              <div className="proof-item">
                <Activity size={16} className="proof-icon" />
                <span>15-Minute Support SLA</span>
              </div>
              <div className="proof-item">
                <ShieldCheck size={16} className="proof-icon" />
                <span>Enterprise NDA Protected</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Floating Tech Card / Visual Showcase */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card hero-code-card">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-filename">techsoulmate.config.ts</span>
                <span className="code-status">Production Ready</span>
              </div>

              <div className="code-body">
                <pre>
                  <code>{`// Initialize your dedicated technology partner
import { TechSoulmate } from '@techsoulmate/core';

export const partnership = new TechSoulmate({
  services: [
    'Custom Software Development',
    '24/7 Proactive IT Support',
    'Legacy Refactoring & Upgradation'
  ],
  engineeringStandard: 'Test-Driven (TDD)',
  availabilitySLA: '99.99%',
  incidentResponseTime: '< 15 mins',
  status: 'ONLINE & DEPLOYED'
});

await partnership.deliverSuccess();`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">50+</h3>
            <p className="stat-title">Enterprise Projects Delivered</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">99.99%</h3>
            <p className="stat-title">System Uptime Maintained</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">&lt; 15 min</h3>
            <p className="stat-title">P1 Incident Response SLA</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">100%</h3>
            <p className="stat-title">TDD Test Suite Coverage</p>
          </div>
        </div>
      </section>

      {/* Three Core Pillars / Services Section */}
      <section className="section-py services-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">What We Do</span>
            <h2>Our Core Technology Offerings</h2>
            <p>
              We provide three integrated pillars of technical engineering, crafted to support businesses through every lifecycle phase.
            </p>
          </div>

          <div className="services-cards-grid">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                className="glass-card service-preview-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ translateY: -6 }}
              >
                <div className="service-card-top">
                  <div className="service-icon-box">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="badge badge-cyan">{service.badge}</span>
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDescription}</p>

                <ul className="service-features-list">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i}>
                      <CheckCircle size={15} className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-tech-tags">
                  {service.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="tech-chip">{tech}</span>
                  ))}
                </div>

                <div className="service-card-footer">
                  <button
                    className="service-learn-more"
                    onClick={() => {
                      setCurrentPage('services')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <span>View Specifications</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TechSoulmate */}
      <section className="section-py why-us-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-emerald">Why TechSoulmate</span>
            <h2>The Engineering Partner You Can Count On</h2>
            <p>
              We don't take shortcuts. We design, test, build, and support with enterprise rigor.
            </p>
          </div>

          <div className="why-grid">
            <div className="glass-card why-card">
              <div className="why-icon-wrap">
                <Zap size={24} />
              </div>
              <h4>Agile Velocity Without Debt</h4>
              <p>We deliver high-cadence bi-weekly release cycles backed by strict automated unit and integration tests.</p>
            </div>

            <div className="glass-card why-card">
              <div className="why-icon-wrap">
                <Headphones size={24} />
              </div>
              <h4>24/7 Managed Reliability</h4>
              <p>Continuous cloud monitoring, immediate incident escalation, and proactive system hardening.</p>
            </div>

            <div className="glass-card why-card">
              <div className="why-icon-wrap">
                <RefreshCw size={24} />
              </div>
              <h4>Zero-Downtime Modernization</h4>
              <p>Incrementally refactor legacy applications and migrate to scalable cloud stacks without disrupting users.</p>
            </div>

            <div className="glass-card why-card">
              <div className="why-icon-wrap">
                <Award size={24} />
              </div>
              <h4>Direct Senior Engineering</h4>
              <p>Direct access to seasoned software architects and technical leads — no middle management layers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-py testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Client Trust</span>
            <h2>What Industry Leaders Say</h2>
            <p>Real stories from businesses that rely on TechSoulmate for development and IT operations.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                  ))}
                </div>
                <p className="testimonial-quote">"{item.feedback}"</p>
                <div className="testimonial-author">
                  <img src={item.avatar} alt={item.name} className="author-avatar" />
                  <div>
                    <h5 className="author-name">{item.name}</h5>
                    <p className="author-role">{item.role}</p>
                    <span className="author-service">{item.service}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
