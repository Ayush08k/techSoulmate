import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  Headphones,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react'
import { servicesData, processSteps } from '../data/servicesData'
import './Services.css'

export default function Services({ openContactModal }) {
  const [activeTabId, setActiveTabId] = useState(servicesData[0].id)

  const activeService = servicesData.find((s) => s.id === activeTabId) || servicesData[0]

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={24} />
      case 'Headphones':
        return <Headphones size={24} />
      case 'RefreshCw':
        return <RefreshCw size={24} />
      default:
        return <Code2 size={24} />
    }
  }

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="services-hero-section">
        <div className="container">
          <motion.div
            className="services-hero-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-cyan">
              <Sparkles size={14} /> Full Lifecycle Capabilities
            </span>
            <h1 className="services-hero-title">
              Specialized Engineering Services <br />
              <span className="text-gradient">Engineered to Outperform</span>
            </h1>
            <p className="services-hero-sub">
              Whether you need greenfield software development, proactive 24/7 IT support, or complex legacy code modernization, TechSoulmate provides the expertise, velocity, and reliability you need.
            </p>
          </motion.div>

          {/* Interactive Service Tab Switcher */}
          <div className="services-tab-bar">
            {servicesData.map((service) => {
              const isActive = activeTabId === service.id
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTabId(service.id)}
                  className={`service-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span className="tab-icon">{getServiceIcon(service.icon)}</span>
                  <span className="tab-label">{service.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabPill"
                      className="active-tab-glow"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Deep-Dive Active Service Showcase */}
      <section className="section-py active-service-details">
        <div className="container">
          <AnimatePresence>
            <motion.div
              key={activeService.id}
              className="glass-card active-service-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="service-detail-grid">
                {/* Left side details */}
                <div className="service-main-col">
                  <div className="detail-badge-row">
                    <span className="badge badge-emerald">{activeService.badge}</span>
                    <span className="service-pill-id">Tier-1 SLA</span>
                  </div>

                  <h2 className="detail-title">{activeService.title}</h2>
                  <p className="detail-desc">{activeService.shortDescription}</p>

                  <h4 className="features-subheading">Core Scope & Capabilities</h4>
                  <ul className="detail-features-list">
                    {activeService.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle size={18} className="feature-bullet" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="detail-deliverables-box">
                    <div className="deliverable-header">
                      <ShieldCheck size={18} className="deliverable-icon" />
                      <span>Guaranteed Delivery Standard</span>
                    </div>
                    <p>{activeService.deliverables}</p>
                  </div>
                </div>

                {/* Right side: Tech Stack & CTA */}
                <div className="service-sidebar-col">
                  <div className="sidebar-tech-card">
                    <div className="tech-header">
                      <Cpu size={18} className="tech-header-icon" />
                      <h4>Key Tech Stack & Tooling</h4>
                    </div>
                    <div className="tech-badges-grid">
                      {activeService.technologies.map((tech, i) => (
                        <div key={i} className="tech-badge-item">
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar-cta-card">
                    <h4>Need {activeService.title}?</h4>
                    <p>Discuss scope, sprint velocity, and get a tailored estimate within 24 hours.</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn btn-primary cta-proposal-btn"
                      onClick={openContactModal}
                    >
                      <span>Request Custom Proposal</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Engineering Process & Methodology */}
      <section className="section-py process-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Our Methodology</span>
            <h2>How We Deliver Predictable Success</h2>
            <p>From initial discovery to continuous 24/7 support, our 4-stage delivery pipeline eliminates risk.</p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                className="glass-card process-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
              >
                <div className="process-step-num">{step.step}</div>
                <h4 className="process-step-title">{step.title}</h4>
                <p className="process-step-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
