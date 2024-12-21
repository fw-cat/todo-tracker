// api.js
import axios from 'axios';
import { navigate } from 'gatsby';

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const BASE_URL = process.env.GATSBY_APP_API_BASE_URL;

// Create axios instance with Sanctum CSRF protection
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Origin': BASE_URL,
    'Referer': BASE_URL,
    'Referrer-Policy': 'strict-origin',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});


// Intercept requests to ensure CSRF token is set
axiosInstance.interceptors.request.use(async (config) => {
  const requestMethod = config.method.toUpperCase()
  if (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'DELETE') {
    try {
      const response = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
        headers: {
          'Origin': BASE_URL,
          'Referer': BASE_URL,
          'Referrer-Policy': 'strict-origin',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      console.log(response, document.cookie)
      // Extract the XSRF-TOKEN from cookies
      const xsrfToken = response.headers['x-xsrf-token'] ||
                        response.headers['X-XSRF-TOKEN'] ||
                        document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]

      console.log(xsrfToken)
      if (xsrfToken) {
        // Add the XSRF-TOKEN to the request headers
        config.headers['X-XSRF-TOKEN'] = xsrfToken
      }
  
    } catch (csrfError) {
      console.error('CSRF cookie fetch failed', csrfError)
    }
  }
  return config
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for handling authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 419:
          // Redirect to login on unauthorized or expired token
          console.log('Unauthorized or token expired', error);
          navigate("/user/login");
          break;
        default:
          console.log('API error', error);
      }
    } else if (error.request) {
      console.error('No response received', error.request);
    } else {
      console.error('Error setting up request', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
