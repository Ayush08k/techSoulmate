import '@testing-library/jest-dom'

// Mock IntersectionObserver for testing components with scroll or visibility hooks
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock window.scrollTo
globalThis.scrollTo = () => {}
