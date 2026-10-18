# FoodBridge AI Frontend Implementation

## Overview
FoodBridge AI is a React-based frontend application for an intelligent surplus food redistribution platform connecting donors, NGOs, and volunteers.

## Technology Stack
- **Framework**: React 18.3.1 with Vite 8.3.4
- **Styling**: TailwindCSS 3.4.19 with custom configuration
- **State Management**: React Context API (AuthContext, AppContext)
- **Routing**: React Router DOM v7.18.4
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Maps**: Leaflet with React Leaflet
- **Data Visualization**: Recharts
- **UI Components**: Custom component library with shadcn/ui influence

## Project Structure
```
src/
├── assets/                 # Static assets
├── components/             # Reusable UI components
│   ├── common/             # Shared components (CommandPalette)
│   └── ui/                 # Primitive UI components (Button, Card, Badge)
├── context/                # React Context providers
│   ├── AppContext.jsx      # Theme, notifications, command palette
│   └── AuthContext.jsx     # Authentication state and user management
├── data/                   # Mock data and services
│   ├── mock/               # Mock data stores
│   └── services/           # API service simulations
├── layouts/                # Page layout wrappers
│   ├── DashboardLayout.jsx # Authenticated user layout with sidebar
│   └── PublicLayout.jsx    # Public facing layout
├── pages/                  # Application pages organized by role
│   ├── admin/              # Admin dashboard
│   ├── agents/             # Agent monitoring center
│   ├── auth/               # Authentication flows
│   ├── common/             # Shared pages (404, forbidden)
│   ├── donor/              # Donor portal
│   ├── landing/            # Marketing landing page
│   ├── ngo/                # NGO portal
│   └── volunteer/          # Volunteer portal
├── routes/                 # Route definitions and protection logic
└── App.jsx                 # Root application component
```

## Key Features Implemented

### Authentication System
- Role-based authentication (DONOR, NGO, VOLUNTEER, ADMIN)
- Local storage persistence
- Mock login/register flows with simulated API delays
- Protected route handling with role-based access control

### Role-Based Dashboards
- **Donor Dashboard**: Create and manage food donations, view impact statistics
- **NGO Dashboard**: Browse available donations, view demand forecasts
- **Volunteer Dashboard**: Accept and manage delivery tasks, route optimization
- **Admin Dashboard**: Platform-wide statistics and user management
- **Agent Center**: Monitoring of autonomous AI agents

### Core Functionality
- Food donation creation with multi-step form
- AI-powered urgency prediction simulation
- Real-time dashboards with live data updates
- Interactive maps for location visualization
- Notification system with Sonner
- Dark/Light theme toggle with system preference detection
- Responsive design for mobile and desktop
- Command palette (Ctrl+K) for quick navigation

### UI/UX Characteristics
- Custom TailwindCSS theme with brand colors (emerald, amber)
- Glassmorphism effects and premium shadows
- Animated background gradients and glows
- Micro-interactions and motion using Framer Motion
- Custom cursors and hover states
- Accessible color contrast ratios
- Loading states and skeleton screens
- Empty state handling

## Build & Deployment
- Vite-based build system
- Development server on port 3000
- Production build optimization
- Asset fingerprinting for cache busting