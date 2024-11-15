import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

export default function AdminPrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [auth, , authLoading] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      if (!auth?.token && !authLoading) { 
        console.log("No token found, redirecting to login...");
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/user-auth`, {
          headers: {
            Authorization: `${auth.token}`,
          },
        });
        setLoading(false);

      } catch (error) {
        console.error('Error during  authentication check:', error);
        setLoading(false);
        navigate('/login'); 
      }
    };

    if (!authLoading) {
      authCheck();
    }
  }, [auth?.token, authLoading, navigate]);

  return loading || authLoading ? <Spinner /> : <Outlet />;
}
