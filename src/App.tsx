import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import LandingPage from './pages/LandingPage';
import SpeechToTextPage from './pages/SpeechToTextPage';
import TextToSpeechPage from './pages/TextToSpeechPage';
import FeaturesPage from './pages/FeaturesPage';
import HowToUsePage from './pages/HowToUsePage';
import AboutPage from './pages/AboutPage';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Header theme={theme} onThemeToggle={toggleTheme} />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/speech-to-text" element={<SpeechToTextPage />} />
          <Route path="/text-to-speech" element={<TextToSpeechPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-to-use" element={<HowToUsePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App