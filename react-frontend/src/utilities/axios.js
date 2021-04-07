import _axios from 'axios';

const axios = baseURL => {
  const instance = _axios.create({
    baseURL: baseURL || 'http://localhost:3001'
  })

  // 攔截器, 在 request 的時候將 jwToken 設置在請求表頭
  instance.interceptors.request.use(
    config => {
      // Do something before request is sent
      const jwToken = global.auth.getToken()
      config.headers['Authorization'] = 'Bearer ' + jwToken
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  return instance
}

export { axios }
export default axios()
