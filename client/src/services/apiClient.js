import axios from 'axios'

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
    const res = await apiClient.post('/auth/register', credentials)
    return res
  },
  // First email validation after registration
  async verifyEmail(token) {
    const res = await apiClient.post('/auth/verify-email', { token })
    return res
  },
  // Resend a validation email
  async genEmailValidation(email) {
    const res = await apiClient.post('/auth/gen-email-validation', { email })
    return res
  },
  async login(credentials) {
    await apiClient.post('/auth/login', credentials)
    const res = await apiClient.get('/auth/auth-check')
    return res
  },
  async passwordResetRequest(email) {
    const res = await apiClient.post('/auth/password-reset-request', {
      email,
    })
    return res
  },
  async passwordResetSet(token, password) {
    const res = await apiClient.post('/auth/password-reset-set', {
      token,
      password,
    })
    return res
  },
  async logout() {
    await apiClient.get('/auth/logout')
    return
  },
  // When vue app load first check if user is connect, should not throw error
  async authCheck() {
    const res = await apiClient.get('/auth/auth-check')
    return res
  },
}
