import axios from 'axios';
import { navigate } from 'gatsby';

const BASE_URL = process.env.GATSBY_APP_API_BASE_URL
console.dir(process.env.REACT_APP_API_BASE_URL)
console.log(process.env.GATSBY_APP_API_BASE_URL)

const getToken = () => {
  let token = localStorage.getItem("auth_token")
  return "Bearer " + (token ?? "");
};

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
});

// CSRFトークンを自動的にヘッダーに追加するミドルウェア
axiosInstance.interceptors.request.use((config) => {

  // トークン情報を取得
  config.headers['Authorization'] = getToken()

  return config;
}, (error) => {
  return Promise.reject(error);
});

// レスポンスインターセプター
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
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
export default axiosInstance;