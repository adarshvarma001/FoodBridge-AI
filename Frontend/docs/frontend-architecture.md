# FoodBridge AI Frontend Architecture

## Architectural Overview

The FoodBridge AI frontend follows a modular, role-based architecture with clear separation of concerns. The application is structured around user roles (Donor, NGO, Volunteer, Admin) with shared components and layouts.

### Core Architectural Principles
1. **Role-Based Isolation**: Each user role has dedicated pages and services
2. **Composition Over Inheritance**: UI built from reusable, composable components
3. **Context-Driven State**: Global state managed via React Context API
4. **Route-Guarded Navigation**: Protected routes enforce role-based access
5. **Mock-First Development**: Services simulate API interactions for demo purposes

## Layered Architecture

### Presentation Layer
- **Pages**: Role-specific views organized in `src/pages/`
- **Layouts**: Wrapper components providing consistent structure (`src/layouts/`)
- **Components**: Reusable UI primitives (`src/components/ui/`) and shared components (`src/components/common/`)

### State Management Layer
- **AuthContext**: Manages user authentication state, login/logout/register functions
- **AppContext**: Manages application-wide state (theme, notifications, command palette)
- **Local Storage**: Persistence layer for user data and theme preferences

### Service Layer
- **Mock Services**: Simulate API endpoints in `src/services/mockServices.js`
- **Data Layer**: Mock data stores in `src/data/mock/index.js`

### Routing Layer
- **AppRoutes.jsx**: Central route definition with protection logic
- **ProtectedRoute Component**: Wrapper for route-level authentication and authorization

### Asset Layer
- **Static Assets**: Images, videos in `public/` and referenced in components
- **Styles**: TailwindCSS configuration and global styles in `src/index.css`

## Component Architecture

### UI Component Hierarchy
```
Application
├── Layout (PublicLayout || DashboardLayout)
│   ├── Header/Navigation
│   ├── Sidebar (DashboardLayout only)
│   ├── Main Content Area (Outlet for routes)
│   └── Footer (PublicLayout only)
├── Route-Specific Pages
│   ├── Dashboard Views
│   ├── Form Pages
│   └── Informational Pages
├── Shared Components
│   ├── Button, Card, Badge (primitives)
│   └── CommandPalette (global utility)
└── Context Providers
    ├── AuthProvider
    └── AppProvider
```

### Component Responsibilities

#### Layout Components
- **PublicLayout**: Marketing site layout with animated navbar, hero sections, footer
- **DashboardLayout**: Authenticated app layout with collapsible sidebar, topnav, main content

#### UI Primitives
- **Button**: Styled button with variants (primary, secondary, accent, danger, ghost, link)
- **Card**: Container component with elevation, hover effects, and motion capabilities
- **Badge**: Status indicator with color variants (default, success, warning, danger, info, teal, premium)

#### Shared Components
- **CommandPalette**: Global search/navigation accessible via Ctrl+K

#### Page Components
- Role-specific dashboards with statistics, data tables, and action buttons
- Form components with validation and multi-step wizards
- Data visualization components using Recharts
- Interactive maps using React Leaflet

## State Management Approach

### AuthContext
Manages:
- Current user object (from localStorage or null)
- Authentication loading states
- Login, register, logout, updateProfile methods
- Derived values: `isAuthenticated`, `user.role`

### AppContext
Manages:
- Theme preference (light/dark/system)
- Notification list with read/unread states
- Command palette open/closed state
- Theme persistence to localStorage
- System preference detection via `window.matchMedia`

### Local Storage Patterns
- User data: `'auth_user'` key
- Theme preference: `'theme'` key
- Mock service data: Namespaced keys (`fb_donations`, `fb_ngos`, `fb_volunteers`)

## Routing Architecture

### Route Protection Strategy
1. **Public Routes**: Landing, login, register, role selection
2. **Protected Routes**: All role-specific pages requiring authentication
3. **Role-Gated Routes**: Within protected routes, additional role validation
4. **Admin-Only Routes**: Require ADMIN role specifically
5. **Fallback Routes**: 404 page for unmatched paths

### ProtectedRoute Implementation
- Checks authentication status via AuthContext
- Redirects unauthenticated users to login
- Checks role requirements against current user
- Shows Forbidden component for insufficient privileges
- Renders children for authorized access

### Route Structure
```
Public Routes:
- "/" -> LandingPage
- "/login" -> LoginPage
- "/register" -> RegisterPage
- "/register/:role" -> RoleSelectionPage

Protected Role Routes:
Donor:
- "/donor/dashboard" -> DonorDashboard
- "/donor/donations" -> CreateDonation
- "/donor/urgency" -> DonorDashboard (alias)
- "/donor/analytics" -> DonorDashboard (alias)

NGO:
- "/ngo/dashboard" -> NgoDashboard
- "/ngo/discover" -> NgoDashboard (alias)
- "/ngo/demand" -> NgoDashboard (alias)
- "/ngo/capacity" -> NgoDashboard (alias)

Volunteer:
- "/volunteer/dashboard" -> VolunteerDashboard
- "/volunteer/tasks" -> VolunteerDashboard (alias)
- "/volunteer/route" -> VolunteerDashboard (alias)

Agent Center (All Roles):
- "/agents" -> AgentCenter

Admin:
- "/admin/dashboard" -> AdminDashboard

Fallback:
- "*" -> NotFound
```

## Styling Architecture

### TailwindCSS Configuration
- Custom color palette with brand semantics (emerald, amber, brand, cream, charcoal)
- Extended font families (Plus Jakarta Sans, Inter)
- Custom box shadows (premium, emerald-glow, amber-glow)
- Dark mode support via class strategy
- Responsive breakpoints following Tailwind defaults

### CSS Layering Approach
- `@tailwind base;` - Base styles including custom scrollbars and typography utilities
- `@tailwind components;` - Component base styles
- `@tailwind utilities;` - Utility classes
- Custom utilities in `src/index.css`:
  - Gradient text helpers
  - Glassmorphism helpers
  - Scroll reveal animations
  - Background glow effects
  - React Leaflet overrides

### Animation System
- Framer Motion for page transitions and micro-interactions
- Variant-based animations for consistency
- Viewport-based animations using `useInView` hook
- Preset motion configurations for reusable patterns
- Hover, tap, and focus animations throughout UI

## Data Flow Patterns

### User Interaction Flow
1. User interacts with UI component
2. Component state updated via React hooks (useState, useReducer)
3. Side effects triggered via useEffect (data fetching, subscriptions)
4. Service methods called to simulate API interactions
5. Mock services update localStorage and return simulated responses
6. Component state updated with new data
7. UI re-renders with updated information

### Service Interaction Pattern
- All service methods return Promises with simulated network delays
- Consistent error handling patterns (try/catch in components)
- Loading states managed locally in components
- Success states trigger navigation or UI updates
- Data mutations persist to localStorage for demo persistence

### Real-time Simulation
- Notifications added via AppContext for simulated real-time updates
- Dashboard components refresh data on mount/useEffect
- Agent status updates simulated through mock data
- No actual WebSocket or real-time backend integration

## Performance Considerations

### Code Splitting
- Vite automatic code splitting
- Dynamic imports not heavily utilized (small bundle size)
- Route-based splitting implicit in React Router

### Asset Optimization
- Images optimized and served via Vite
- Video asset (hero-video.mp4) large but essential for hero section
- Icons sourced from Lucide React (tree-shakable)
- Fonts loaded via Google Fonts with preconnect hints

### Rendering Optimization
- React 18 concurrent rendering features not explicitly utilized
- Memoization not extensively applied (components relatively small)
- Virtual scrolling not implemented (data sets small in demo)
- Efficient re-renders through proper state localization

### Bundle Analysis
- Dependencies: React ecosystem, Tailwind, Framer Motion, Lucide, Sonner, etc.
- Development experience prioritized over micro-optimizations
- Production build includes minification and asset hashing

## Security Considerations

### Authentication Security
- Client-side only authentication (no actual JWT or OAuth)
- Passwords handled in plaintext in mock services
- No actual API endpoint protection
- Role-based access control enforced client-side only

### Data Security
- Mock data stored in localStorage
- No sensitive data encryption
- No actual PII handling in demo
- XSS prevention through React's automatic escaping

### Dependency Security
- npm audit not performed in this environment
- Dependencies appear to be recent versions
- No known critical vulnerabilities reported in used packages

## Accessibility Implementation

### Semantic Structure
- Proper heading hierarchy in pages
- Landmark elements (header, nav, main, footer)
- Button elements for actions
- Form elements with proper labels

### Keyboard Navigation
- Tab-order logical in forms and navigation
- Escape key closes modals/command palette
- Ctrl+K opens command palette globally
- Focus management in modals and dialogs

### Visual Accessibility
- Color contrast ratios meeting WCAG AA standards
- Focus rings visible on interactive elements
- Scalable units (rem, em) used throughout
- Responsive design for various viewport sizes
- Reduced motion respects system preferences

### ARIA Attributes
- Limited use (mostly implicit through semantic HTML)
- Button labels clear and descriptive
- Icon buttons have accessible labels through context
- Form fields properly associated with labels

## Internationalization Readiness

### Current State
- No i18n framework implemented
- All text hardcoded in English
- Date formats hardcoded (ISO strings, locale-specific display)
- Number formatting not abstracted
- Right-to-left (RTL) not considered

### Potential Improvement Points
- Extract strings to translation files
- Use react-i18next or similar framework
- Implement locale-based date/number formatting
- Consider dir attribute for RTL support