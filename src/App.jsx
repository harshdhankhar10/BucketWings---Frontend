import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Routes from './pages/Routes';
import './App.css';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const userAgent = navigator.userAgent;
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;

        const ipInfoResponse = await axios.get(
          `https://ipinfo.io/${ipAddress}?token=${import.meta.env.VITE_REACT_APP_IPINFO}`
        );
        const ipInfo = ipInfoResponse.data;

        await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/visitor/log-visitor`,
          {
            ipAddress,
            userAgent,
            operatingSystem: navigator.platform,
            browser: navigator.appCodeName,
            country: ipInfo.country,
          }
        );
      } catch (error) {
        console.error('Error logging visitor information:', error);
      }
    };

    const checkMaintenanceMode = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/maintenance/check`
        );

        if (response.data.success && response.data.maintenanceMode.isMaintenanceMode) {
          const user = JSON.parse(localStorage.getItem('auth'));
          const isLoginPage = location.pathname === '/login';

          if (!isLoginPage && (!user || user.user.role !== 'admin')) {
            navigate('/maintenance');
          }
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
      }
    };

    fetchVisitor();
    checkMaintenanceMode();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, [navigate, location]);

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
