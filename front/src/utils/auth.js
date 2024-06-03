import axios from 'axios';
import { navigate } from 'gatsby';

const isBrowser = typeof window !== "undefined";

export const isLoggedIn = () => {
  if (!isBrowser) return false;
  const token = localStorage.getItem('token');
  return !!token;
};

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/oauth/token', {
      grant_type: 'password',
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      username: username,
      password: password,
      scope: '',
    });
    localStorage.setItem('token', response.data.access_token);
    navigate('/tasks');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};
