import { BrowserRouter, Routes, Route } from "react-router-dom";
import HubPage from "./pages/HubPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import ConsentPage from "./pages/ConsentPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col font-sans">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HubPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/consent" element={<ConsentPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
