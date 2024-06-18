import axios from 'axios';
import { navigate } from 'gatsby';

const isBrowser = typeof window !== "undefined";

export const isLoggedIn = () => {
  if (!isBrowser) return false;
  console.log('isLoggedIn');
  const token = localStorage.getItem('user');
  return !!token;
};

export const user = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    navigate('/');

  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const handleLogout = () => {
  localStorage.removeItem('user');
  navigate('/login');
};
