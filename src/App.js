import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, useMediaQuery, CircularProgress } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Box } from '@mui/material';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';

// Lazy load components
const UserList = lazy(() => import('./components/users/UserList'));
const RoleList = lazy(() => import('./components/roles/RoleList'));
const AdminDashboard = lazy(() => import('./components/dashboard/AdminDashboard'));
const ManagerDashboard = lazy(() => import('./components/dashboard/ManagerDashboard'));
const UserDashboard = lazy(() => import('./components/dashboard/UserDashboard'));

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:960px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const AdminLayout = ({ children }) => (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          mt: 8,
          ml: { xs: 0, md: '240px' },
          width: { xs: '100%', md: `calc(100% - 240px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );

  return (
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Suspense fallback={<CircularProgress />}>

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminLayout>
                      <UserList />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/roles"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminLayout>
                      <RoleList />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Manager Route */}
              <Route
                path="/manager"
                element={
                  <ProtectedRoute allowedRoles={["manager"]}>
                    <AdminLayout>
                      <ManagerDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* User Route */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <AdminLayout>
                      <UserDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
