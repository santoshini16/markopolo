
import './App.css'
import ChatBot from './components/Chart'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';

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

  return (
   <div>
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
    {/* <ChatBot config={chatbotConfig}/> */}
 </div>
  )
}

export default App
