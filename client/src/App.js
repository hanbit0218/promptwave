import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Components
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import GlobalStyle from './styles/GlobalStyle';

// Theme
const theme = {
  colors: {
    primary: '#0F172A',          // Dark blue (main color)
    secondary: '#90D5FF',        // Light blue (titles and headers)
    accent: '#3B82F6',           // Bright blue accent
    background: '#1E293B',       // Slightly lighter dark blue for background
    cardBg: '#0F172A',           // Dark blue for cards
    text: '#A3B7CA',             // Chat text color
    lightText: '#64748B',        // Lighter text for secondary content
    userMessage: '#1E40AF',      // Dark blue for user messages
    botMessage: '#1E293B',       // Slightly lighter blue for bot messages
    darkPrimary: '#020617',      // Darker shade for hover states
    border: '#334155',           // Border color
    success: '#10B981',          // Success color (green)
    warning: '#F59E0B',          // Warning color (amber)
  },
  breakpoints: {
    mobile: '768px',
  }
};

function App() {
  // State to track conversation history (shared across components)
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m PromptWave, a free AI chatbot powered by Hugging Face. How can I help you today?'
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={
                <ChatPage 
                  conversationHistory={conversationHistory}
                  setConversationHistory={setConversationHistory}
                />
              } />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;