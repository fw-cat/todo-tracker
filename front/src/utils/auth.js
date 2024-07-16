import axiosInstance from './api'
import { navigate } from 'gatsby';

const setToken = (id) => {
  localStorage.setItem("auth_token", id)
}

export const handleLogin = async (email, password) => {
  try {
    let login = await axiosInstance.post(`/login`, {
      email: email,
      password: password,
    });
    setToken(login.data.user.id);

    navigate('/');

  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const handlePreRegister = async (user_name, email, password, password_confirmation) => {
  try {
    let login = await axiosInstance.post(`/pre_register`, {
      user_name: user_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });
    setToken(login.data.user.id);

    navigate('/');

  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const handleLogout = async () => {
  try {
    await axiosInstance.post('/logout');
    // ログアウト成功処理
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
