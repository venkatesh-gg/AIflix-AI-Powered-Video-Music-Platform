import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import Generate from './pages/Generate';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Watch from './pages/Watch';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <div className="min-h-screen bg-dark-900">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/watch/:id" element={<Watch />} />
              
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/browse" element={<Browse />} />
                      <Route path="/generate" element={<Generate />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1E293B',
                  color: '#F1F5F9',
                  border: '1px solid #334155'
                }
              }}
            />
          </div>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;