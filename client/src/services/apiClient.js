import axios from 'axios'
import { setError } from '../store/errorHandler'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': import.meta.env.VITE_API_URL,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  },
})

// apiClient.interceptors.response.use((response) => {
//   console.log(response)
//   return response
// })

export default {
  async register(credentials) {
    try {
      const res = await apiClient.post('/auth/register', credentials)
      return res
    } catch (error) {
      setError(error)
    }
  },
  // First email validation after registration
  async verifyEmail(token) {
    try {
      const res = await apiClient.post('/auth/verify-email', { token })
      return res
    } catch (error) {
      setError(error)
    }
  },
  // Resend a validation email
  async genEmailValidation(email) {
    try {
      const res = await apiClient.post('/auth/gen-email-validation', { email })
      return res
    } catch (error) {
      setError(error)
    }
  },
  async login(credentials) {
    try {
      await apiClient.post('/auth/login', credentials)
      const res = await apiClient.get('/auth/auth-check')
      return res
    } catch (error) {
      setError(error)
    }
  },
  async passwordResetRequest(email) {
    try {
      const res = await apiClient.post('/auth/password-reset-request', {
        email,
      })
      return res
    } catch (error) {
      setError(error)
    }
  },
  async passwordResetSet(token, password) {
    try {
      const res = await apiClient.post('/auth/password-reset-set', {
        token,
        password,
      })
      return res
    } catch (error) {
      setError(error)
    }
  },
  async logout() {
    try {
      await apiClient.get('/auth/logout')
      return
    } catch (error) {
      setError(error)
    }
  },
  // When vue app load first check if user is connect, should not throw error
  async authCheck() {
    try {
      const res = await apiClient.get('/auth/auth-check')
      return res
    } catch (error) {
      setError(error)
    }
  },
}
