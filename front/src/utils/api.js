// api.js
import axios from 'axios';
import { navigate } from 'gatsby';

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const BASE_URL = process.env.GATSBY_APP_API_BASE_URL;

// ローディング表示を制御する関数
const toggleLoading = (show) => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    if (show) {
      loadingElement.classList.add('show');
    } else {
      loadingElement.classList.remove('show');
    }
  }
};

// Create axios instance with Sanctum CSRF protection
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // 'Origin': BASE_URL,
    // 'Referer': BASE_URL,
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});


// Intercept requests to ensure CSRF token is set
axiosInstance.interceptors.request.use(async (config) => {
  toggleLoading(true)

  const requestMethod = config.method.toUpperCase()
  if (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'DELETE') {
    try {
      const response = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
        headers: {
          // 'Origin': BASE_URL,
          // 'Referer': BASE_URL,
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Extract the XSRF-TOKEN from cookies
      const xsrfToken = response.headers['x-xsrf-token'] ||
                        response.headers['X-XSRF-TOKEN'] ||
                        document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]


      if (xsrfToken) {
        // Add the XSRF-TOKEN to the request headers
        config.headers['X-XSRF-TOKEN'] = xsrfToken
      }
  
    } catch (csrfError) {
      console.error('CSRF cookie fetch failed', csrfError)
      toggleLoading(false)
    }
  }
  return config
}, (error) => {
  toggleLoading(false)
  return Promise.reject(error);
});

// Response interceptor for handling authentication errors
axiosInstance.interceptors.response.use(
  (response) => {
    toggleLoading(false)
    return response
  },
  (error) => {
    toggleLoading(false)
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
