import './App.css';
import ChatBot from './components/Chart'; // Ensure this path is correct
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const chatbotConfig = {
    borderColor: '#000',
    borderRadius: '10px',
    titleBgColor: '#0078d7',
    botBubbleBg: '#f1f1f1',
    botTextColor: '#000',
    userBubbleBg: '#0078d7',
    userTextColor: '#fff',
    font: 'Arial, sans-serif',
  };

  const [state, setState] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

      {/* Button to open the chatbot */}
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#0078d7',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setState(!state)}
      >
        {state ? 'Close ChatBot' : 'Ask me anything'}
      </button>

      {/* ChatBot rendering */}
      {state && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex:'100'
          }}
        >
          <ChatBot config={chatbotConfig} />
        </div>
      )}
    </div>
  );
}

export default App;

