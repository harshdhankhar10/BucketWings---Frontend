import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext.jsx';
import {ChatProvider} from './context/AIChatContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>      
        <ChatProvider>
         
            <App />
         
        </ChatProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
)