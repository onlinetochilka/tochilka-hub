import { BrowserRouter, Routes, Route } from "react-router-dom";
import HubPage from "./pages/HubPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import ConsentPage from "./pages/ConsentPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/consent" element={<ConsentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
