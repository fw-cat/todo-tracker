import axiosInstance from './api';
import { navigate } from 'gatsby';

export const handleLogin = async (email, password) => {
  console.log(email, password)
  try {
    const response = await axiosInstance.post('/login', {
      email,
      password,
    });
    
    // Assuming the backend sets authentication cookies
    console.log(response)
    navigate('/')
    // return response.data;

  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw to allow caller to handle error
  }
};

export const handlePreRegister = async (user_name, email, password, password_confirmation) => {
  try {
    const response = await axiosInstance.post('/pre_register', {
      user_name,
      email,
      password,
      password_confirmation,
    });
    
    // Assuming the backend sets authentication cookies
    navigate('/');
    return response.data;
  } catch (error) {
    console.error('Pre-registration failed:', error);
    throw error; // Re-throw to allow caller to handle error
  }
};

export const handleLogout = async () => {
  try {
    await axiosInstance.post('/logout');
    // Clear any local storage if needed
    navigate('/user/login');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// Optional: Add a function to check authentication status
export const checkAuthStatus = async () => {
  try {
    const response = await axiosInstance.get('/me');
    // Return true only if the status code is 200
    return response.status === 200;
  } catch (error) {
    // Any error (including non-200 status codes) means not authenticated
    console.error('Authentication check failed', error);
    return false;
  }
};