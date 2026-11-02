import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Laptop,
  Globe,
  GraduationCap,
  HeartPulse,
  Clock,
  TrendingUp,
  Briefcase,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { careerPerks, openPositions } from '../data/careersData'
import './Careers.css'

export default function Careers({ openApplyModal }) {
  const [selectedDept, setSelectedDept] = useState('All')

  const departments = ['All', 'Software Development', 'IT Support', 'Software Maintenance']

  const filteredJobs = selectedDept === 'All'
    ? openPositions
    : openPositions.filter((job) => job.department === selectedDept)

  const getPerkIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={24} />
      case 'Globe': return <Globe size={24} />
      case 'GraduationCap': return <GraduationCap size={24} />
      case 'HeartPulse': return <HeartPulse size={24} />
      case 'Clock': return <Clock size={24} />
      case 'TrendingUp': return <TrendingUp size={24} />
      default: return <Sparkles size={24} />
    }
  }

  return (
    <div className="careers-page">
      {/* Careers Hero */}
      <section className="careers-hero-section">
        <div className="container">
          <motion.div
            className="careers-hero-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-emerald">
              <Sparkles size={14} /> We're Expanding Our Pods
            </span>
            <h1 className="careers-hero-title">
              Build the Future With <br />
              <span className="text-gradient">TechSoulmate</span>
            </h1>
            <p className="careers-hero-sub">
              Join a team of passionate engineers, systems architects, and modernization specialists. We value high agency, test-driven craftsmanship, and genuine work-life balance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks and Culture */}
      <section className="section-py perks-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Life At TechSoulmate</span>
            <h2>Engineered for People, Not Burnout</h2>
            <p>We provide the resources, flexibility, and compensation you need to do the best work of your career.</p>
          </div>

          <div className="perks-grid">
            {careerPerks.map((perk, idx) => (
              <motion.div
                key={idx}
                className="glass-card perk-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ translateY: -4 }}
              >
                <div className="perk-icon-wrap">
                  {getPerkIcon(perk.icon)}
                </div>
                <h4 className="perk-title">{perk.title}</h4>
                <p className="perk-desc">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="section-py jobs-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-emerald">Open Opportunities</span>
            <h2>Current Open Positions</h2>
            <p>Find your next challenge in software engineering, managed IT operations, or legacy modernization.</p>
          </div>

          {/* Department Filter Tabs */}
          <div className="dept-filter-bar">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`dept-filter-btn ${selectedDept === dept ? 'active' : ''}`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          <div className="jobs-list">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                className="glass-card job-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="job-info-left">
                  <div className="job-dept-pill">{job.department}</div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-desc">{job.description}</p>
                  <div className="job-meta-row">
                    <span className="job-meta-item">
                      <MapPin size={15} /> {job.location}
                    </span>
                    <span className="job-meta-item">
                      <Briefcase size={15} /> {job.type}
                    </span>
                    <span className="job-meta-item">
                      <Clock size={15} /> {job.experience}
                    </span>
                  </div>
                </div>

                <div className="job-action-right">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary apply-now-btn"
                    onClick={() => openApplyModal(job)}
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spontaneous Application Callout */}
          <div className="spontaneous-talent-box glass-card">
            <div>
              <h3>Don’t See Your Exact Role?</h3>
              <p>We are always looking for exceptional engineers, architects, and QA leads. Pitch us your superpower.</p>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => openApplyModal({ title: 'Spontaneous Application', department: 'General Talent Pool', location: 'Remote' })}
            >
              <span>Submit General Application</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
