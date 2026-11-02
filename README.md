# TechSoulmate 🚀
> **Your Dedicated Engineering Partner & Modern IT Operations Platform**

TechSoulmate is a high-performance, modern React web application built with clean architecture, fluid micro-animations, glassmorphism design, and test-driven engineering. It showcases software development capabilities, 24/7 IT operations, software maintenance/modernization, and 1-on-1 mock technical interview mentorship.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/tests-36%20passed-success.svg)]()
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-14-pink.svg)](https://www.framer.com/motion/)

---

## 🌟 Key Features

### 1. 🎯 1-on-1 Mock Technical Interview Scheduling
- **Comprehensive Booking Engine**: Candidates schedule live 1-on-1 interview practice sessions with staff engineers and tech leads.
- **Form Controls**:
  - Full Candidate Name & Email verification.
  - International Country Code Selector (`+91`, `+1`, `+44`, `+61`, `+49`, `+33`, `+65`, `+971`, etc.) with flag indicators paired with phone input.
  - Role/Position dropdown (*Senior Full-Stack*, *Frontend*, *Backend*, *DevOps*, *Mobile*, *QA Automation*, *AI/ML*).
  - Native Calendar Date Picker restricted to future dates.
  - Time slot selection across morning, afternoon, and evening windows.
  - Optional custom preparation topics / target companies.
- **Session Confirmation State**: Real-time summary overview with confirmed slot, calendar invite notice, and 1-click rebooking.
- **Track Options**: Live pair-programming, system design deep-dives, managerial/STAR behavioral evaluation, and end-to-end FAANG simulations.

### 2. 🛠️ Specialized Engineering Services
- **Custom Software Development**: Enterprise SaaS, full-stack React/Node.js, mobile apps (React Native/Flutter), cloud microservices.
- **IT Support & Managed Services**: 24/7/365 infrastructure monitoring, incident response with strict 15-minute SLA, disaster recovery, cloud security.
- **Software Maintenance & Upgradation**: Legacy refactoring, performance optimization, database query tuning, tech stack modernization.
- **Mock Technical Interview & Mentorship**: Live pair programming, distributed systems architecture, rubric scorecard evaluation within 2 hours.

### 3. 🎨 Visual Design & UI System
- **Glassmorphism Aesthetics**: Layered cards with `backdrop-filter: blur()`, frosted translucent surfaces, and subtle light gradients.
- **Dynamic Colored Hover States**: Each card in grid sections transitions into a unique light pastel tone with a wide `2px` colored border and ambient matching shadow glow ring.
- **Glass Frosted Navbar**: Translucent header that increases blur on scroll with responsive mobile drawer navigation.
- **Micro-Animations**: Framer Motion tab indicators, page transitions, button hover/press scales, and modal dialogs.

### 4. 💼 Careers & Direct Application Flow
- Interactive job board filtering by engineering departments (*Software Development*, *IT Support*, *Software Maintenance*).
- Modal application flow with instant client-side validation.
- Company culture perks overview (hardware stipend, learning budget, flexible PTO).

### 5. 📞 Direct Consultation & Inquiry Modals
- Interactive contact modal accessible from global navbar and footer CTAs.
- Full contact channels, enterprise inquiry forms, and accordion FAQ assistance.

---

## 📂 Project Structure

```bash
soulmate-tech/
├── public/                 # Static assets, SVG favicons
├── src/
│   ├── assets/             # Branding graphics and visual assets
│   ├── components/         # Reusable global components
│   │   ├── Navbar.jsx      # Glassmorphic header with active indicator & mobile drawer
│   │   ├── Navbar.css
│   │   ├── Footer.jsx      # Universal footer with service & quick links
│   │   ├── Footer.css
│   │   ├── ContactModal.jsx# Consultation modal dialog
│   │   ├── ContactModal.css
│   │   ├── ApplyModal.jsx  # Job application modal dialog
│   │   └── ApplyModal.css
│   ├── data/               # Structured data stores
│   │   ├── servicesData.js # Service definitions, features, process steps
│   │   ├── careersData.js  # Open positions and company perks
│   │   ├── interviewData.js# Country codes, positions, tracks, time slots
│   │   ├── teamData.js     # Leadership team and company values
│   │   └── testimonialsData.js # Testimonials and FAQs
│   ├── pages/              # Application views
│   │   ├── Home.jsx        # Hero, services grid, code terminal, testimonials
│   │   ├── About.jsx       # Mission, CEO details, leadership team, values
│   │   ├── Services.jsx    # Interactive tab showcase & methodology
│   │   ├── Careers.jsx     # Job listings & department filtering
│   │   ├── Interview.jsx   # Mock interview booking engine & confirmation
│   │   └── Contact.jsx     # Direct channels, inquiry form, FAQ accordion
│   ├── test/               # Vitest & React Testing Library test suites
│   │   ├── components/     # Unit tests for Navbar, Footer, Modals
│   │   ├── pages/          # Unit tests for Home, Services, Careers, Interview, About, Contact
│   │   └── integration/    # Full app flow multi-page navigation tests
│   ├── App.jsx             # Main routing and modal state management
│   ├── App.css
│   ├── index.css           # Design tokens, color system, card hover palettes
│   └── main.jsx            # Application entry point
├── index.html              # HTML shell with Google Fonts
├── vite.config.js          # Vite configuration with React & Vitest
└── package.json            # Scripts & dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayush08k/techSoulmate.git
   cd techSoulmate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:5173/`.

---

## 🧪 Testing

The codebase maintains automated test coverage across unit components, individual pages, and multi-step integration flows using **Vitest** and **React Testing Library**.

- **Run all tests once:**
  ```bash
  npm test
  ```

- **Run tests in interactive watch mode:**
  ```bash
  npm run test:watch
  ```

### Test Coverage Highlights:
- ✅ **Navbar & Navigation**: Brand rendering, active route indicator, mobile drawer toggling.
- ✅ **Interview Booking Flow**: All required input fields, country code selector, date/time scheduling, and confirmation summary render.
- ✅ **Services & Tabs**: Tab switching across all 4 services and direct CTA scheduling routing.
- ✅ **Careers & Application**: Department filtering and job application submission modal.
- ✅ **Full App Integration Flow**: Seamless multi-page traversal and modal workflows.

---

## 🛠️ Build & Deployment

To compile an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🧰 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component rendering |
| **Vite 8** | High-speed frontend tooling and bundler |
| **Framer Motion** | Micro-animations and page transitions |
| **Lucide React** | Clean, accessible vector icons |
| **Vanilla CSS** | Tailored glassmorphism design system & variables |
| **Vitest & RTL** | Test-driven development and integration assertions |
| **Oxlint** | Fast code linting and code quality validation |

---

## 📄 License
This project is licensed under the MIT License - feel free to use and adapt for your own products.