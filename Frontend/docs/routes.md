# FoodBridge AI Route Architecture

## Route Definitions

All routes are defined in `src/routes/AppRoutes.jsx`.

### Route Protection Levels

| Level | Description | Access |
|-------|-------------|--------|
| Public | No authentication required | Anyone |
| Protected | Authentication required | Logged-in users |
| Role-Gated | Authentication + role check | Specific role |
| Admin-Only | Authentication + ADMIN role | Admin users |

### Route Table

| Path | Component | Layout | Protection | Notes |
|------|-----------|--------|------------|-------|
| `/` | LandingPage | PublicLayout | Public | Marketing landing page |
| `/login` | LoginPage | PublicLayout | Public | User authentication |
| `/register` | RegisterPage | PublicLayout | Public | Role selection page |
| `/register/:role` | RoleSelectionPage | PublicLayout | Public | Role-specific registration form |
| `/donor/dashboard` | DonorDashboard | DashboardLayout | DONOR | Donor main dashboard |
| `/donor/donations` | CreateDonation | DashboardLayout | DONOR | Donation creation form |
| `/donor/urgency` | DonorDashboard | DashboardLayout | DONOR | Alias for dashboard |
| `/donor/analytics` | DonorDashboard | DashboardLayout | DONOR | Alias for dashboard |
| `/ngo/dashboard` | NgoDashboard | DashboardLayout | NGO | NGO main dashboard |
| `/ngo/discover` | NgoDashboard | DashboardLayout | NGO | Alias for dashboard |
| `/ngo/demand` | NgoDashboard | DashboardLayout | NGO | Alias for dashboard |
| `/ngo/capacity` | NgoDashboard | DashboardLayout | NGO | Alias for dashboard |
| `/volunteer/dashboard` | VolunteerDashboard | DashboardLayout | VOLUNTEER | Volunteer main dashboard |
| `/volunteer/tasks` | VolunteerDashboard | DashboardLayout | VOLUNTEER | Alias for dashboard |
| `/volunteer/route` | VolunteerDashboard | DashboardLayout | VOLUNTEER | Alias for dashboard |
| `/agents` | AgentCenter | DashboardLayout | Protected (all roles) | Agent monitoring center |
| `/admin/dashboard` | AdminDashboard | DashboardLayout | ADMIN | Admin platform dashboard |
| `*` | NotFound | - | - | 404 fallback page |

## ProtectedRoute Implementation

### Authentication Check
```javascript
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // ...
};
```

### Authorization Logic
- If `requiredRole` is specified, user must match that role OR be an ADMIN
- Mismatched role renders `<Forbidden />` component
- ADMIN role grants access to all protected routes regardless of requiredRole

### Route Nesting Strategy
- Outer `ProtectedRoute` checks authentication only
- Inner `ProtectedRoute` (per route) checks role requirements
- Layout wraps all protected routes for consistent UI

## Navigation Patterns

### Sidebar Navigation
- DashboardLayout provides role-specific sidebar with navigation links
- Links defined in `roleConfig` object in DashboardLayout
- Active link highlighting based on `window.location.pathname`
- Sidebar collapsible on desktop
- Mobile drawer navigation with slide-in animation

### Command Palette
- Global navigation accessible via Ctrl+K
- Filterable list of available actions
- Context-aware (shows role-appropriate actions)
- Escape key closes palette
- Click-outside closes palette

### Breadcrumbs
- Not currently implemented
- Could be added as a shared component for complex flows

### Direct Navigation
- Login success redirects to `/${role.toLowerCase()}/dashboard`
- Registration success redirects to `/${role.toLowerCase()}/dashboard`
- Logout redirects to `/login`
- All internal navigation uses `Link` component from React Router

## Route Edge Cases

### Unauthenticated Access
- Attempting to access protected routes redirects to `/login`
- `replace` prop used to prevent back-navigation to protected pages
- Session persistence via localStorage (`auth_user` key)

### Role Mismatch
- User accessing wrong role dashboard sees 403 Forbidden page
- Admin users bypass role checks
- Forbidden page provides link back to home

### Invalid Routes
- Unknown paths render NotFound component
- NotFound page provides link to home
- No automatic redirect from invalid routes

### Session Expiry
- Not currently implemented
- No token refresh mechanism
- User data persists until explicit logout

## Route Maintenance Notes

### Adding New Routes
1. Import component at top of AppRoutes.jsx
2. Add Route element within appropriate Route group
3. Apply ProtectedRoute wrapper as needed
4. Add requiredRole prop if role-gated
5. Update roleConfig in DashboardLayout if adding sidebar link

### Route Aliases
Multiple paths render the same component:
- `/donor/urgency` and `/donor/analytics` both render DonorDashboard
- `/ngo/discover`, `/ngo/demand`, `/ngo/capacity` all render NgoDashboard
- `/volunteer/tasks` and `/volunteer/route` both render VolunteerDashboard

These aliases exist for future page implementations but currently share the same component.