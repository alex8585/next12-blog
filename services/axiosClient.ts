import axios from 'axios'
import queryString from 'query-string'
import cookie from 'cookie'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (typeof window !== 'undefined') {
      let token: string | null = cookie.parse(document.cookie).token
      if (!token) {
        token = localStorage.getItem('token')
      }
      const auth = token ? `Bearer ${token}` : ''
      config.headers!.Authorization = auth
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosClient
