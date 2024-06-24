import api from './api'
import { navigate } from 'gatsby';

const isBrowser = typeof window !== "undefined";

export const handleLogin = async (email, password) => {
  try {
    const response = await api.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    navigate('/');

  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const handleLogout = async () => {
  try {
    await api.post('/logout');
    // ログアウト成功処理
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
