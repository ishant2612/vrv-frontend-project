# RBAC Admin Panel

A Role-Based Access Control (RBAC) Admin Panel built with React.js and Firebase Authentication. This application provides a secure and user-friendly interface for managing users, roles, and permissions in an organization.

## Features

### Authentication

- Email/Password login
- Google Sign-in integration
- Password reset functionality
- Protected routes based on user roles
- Persistent authentication state

### Role-Based Access Control

- Three user roles: Admin, Manager, and User
- Dynamic permission management
- Role-specific dashboards
- Granular access control

### User Management

- View, create, edit, and delete users
- Assign multiple roles to users
- User status management (Active/Inactive)
- Real-time user list updates
- Search and filter functionality
- Pagination for large datasets

### Role Management

- Create and modify roles
- Assign permissions to roles
- View role permissions
- Delete roles with confirmation
- Role-based navigation

### Performance Optimizations

- Lazy loading of components
- Data caching
- Debounced search
- Pagination
- Local storage synchronization
- Real-time updates

### UI/UX Features

- Responsive design for all screen sizes
- Dark/Light theme toggle
- Mobile-friendly navigation
- Loading states and error handling
- Confirmation dialogs for critical actions
- User-friendly forms with validation
- Search and filter capabilities

## Technology Stack

- **Frontend Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **Authentication**: Firebase Auth
- **State Management**: React Context
- **Routing**: React Router
- **Form Handling**: Native React forms with validation
- **Data Storage**: Mock API with localStorage persistence
- **Code Quality**: ESLint
