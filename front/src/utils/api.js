import axios from 'axios';
import { navigate } from 'gatsby';

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// CSRFトークンを取得する関数
const getCsrfToken = async () => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, { 
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  } catch (error) {
    console.error('Failed to get CSRF token', error);
    throw error; // エラーを上位に伝播
  }
};

// リクエストインターセプター
api.interceptors.request.use(async (config) => {
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    try {
      await getCsrfToken();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未認証エラーの処理
          console.log('Unauthorized', error);
          // ここでログインページへのリダイレクトなどを行う
          navigate("/user/login");
        break;
        case 419:
          // CSRFトークンの期限切れ
          console.log('CSRF token mismatch', error);
          navigate("/user/login");
        break;
        default:
          console.log('API error', error);
      }
    } else if (error.request) {
      // リクエストは作られたがレスポンスを受け取れなかった
      console.error('No response received', error.request);
    } else {
      // リクエストの作成中にエラーが発生
      console.error('Error setting up request', error.message);
    }
    return false;
  }
);

// その他のAPI呼び出しメソッドをここに追加
export default api;