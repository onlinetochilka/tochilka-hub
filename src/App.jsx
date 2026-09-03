import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppShell from './layouts/AppShell';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ConsentPage from './pages/ConsentPage';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-page">
        <img
          src="/logo.svg"
          alt="Загрузка..."
          className="w-12 h-12 animate-[spin_2s_linear_infinite] opacity-40"
        />
      </div>
    );
  }

  return (
    <Routes>
      {user ? (
        /* ─── Authenticated: Dashboard with sidebar ─── */
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Route>
      ) : (
        /* ─── Guest: Landing page ─── */
        <Route path="/" element={<LandingPage />} />
      )}

      {/* ─── Standalone pages ─── */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/consent" element={<ConsentPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
