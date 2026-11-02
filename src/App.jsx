import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import ApplyModal from './components/ApplyModal'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Interview from './pages/Interview'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [applyModalState, setApplyModalState] = useState({
    isOpen: false,
    job: null
  })

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  const openApplyModal = (job) => {
    setApplyModalState({
      isOpen: true,
      job
    })
  }

  const closeApplyModal = () => {
    setApplyModalState({
      isOpen: false,
      job: null
    })
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} openContactModal={openContactModal} />
      case 'about':
        return <About openContactModal={openContactModal} />
      case 'services':
        return <Services openContactModal={openContactModal} setCurrentPage={setCurrentPage} />
      case 'careers':
        return <Careers openApplyModal={openApplyModal} />
      case 'interview':
        return <Interview />
      case 'contact':
        return <Contact />
      default:
        return <Home setCurrentPage={setCurrentPage} openContactModal={openContactModal} />
    }
  }

  return (
    <div className="app-root">
      {/* Dynamic Animated Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openContactModal={openContactModal}
      />

      {/* Animated Page Transitions */}
      <main id="main-content">
        <AnimatePresence>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        openContactModal={openContactModal}
      />

      {/* Global Interactive Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />

      <ApplyModal
        isOpen={applyModalState.isOpen}
        onClose={closeApplyModal}
        job={applyModalState.job}
      />
    </div>
  )
}
