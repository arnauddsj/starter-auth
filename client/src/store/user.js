import { readonly, reactive, computed } from 'vue'
import { setLoading, resetLoading, storeLoading } from './loadingHandler'
import api from '../services/apiClient'

const stateUser = reactive({
  isAuth: false,
  email: '',
  activation: '',
  userType: '',
})

function storeUser() {
  return {
    stateUser: readonly(stateUser),
  }
}

// MUTATIONS
const SET_USER_DATA = (data) => {
  stateUser.email = data.email
  stateUser.activation = data.activation
  stateUser.userType = data.userType
}

const SET_USER_AUTH = () => {
  stateUser.isAuth = true
}

const RESET_USER = () => {
  stateUser.isAuth = false
  stateUser.email = ''
  stateUser.activation = ''
  stateUser.userType = ''
}

// ACTIONS
const register = async (credentials) => {
  const res = await api.register(credentials)
  SET_EMAIL(credentials.email)
  return res
}

const useLogin = async (credentials) => {
  const res = await api.login(credentials)

  if (res.data.activation === 'REVOKED') {
    return res
  }
  SET_USER_DATA(res.data)
  SET_USER_AUTH()
  return res
}

const initialAuthCheck = async () => {
  setLoading()
  const res = await api.initialAuthCheck()

  // Not logged in or revoked, do not set user data and auth
  if (res.data.activation === 'REVOKED' || res.data === '') {
    resetLoading()
    return
  }

  resetLoading()
  SET_USER_DATA(res.data)
  SET_USER_AUTH()
  return
}

const routeAuthCheck = async () => {
  const res = await api.routeAuthCheck()
  return res
}

const useLogout = async () => {
  setLoading()
  await api.logout()
  RESET_USER()
}

const setUser = (data) => {
  SET_USER_DATA(data)
}

// GETTERS
const isAuth = computed(() => {
  return stateUser.isAuth
})

export {
  storeUser,
  initialAuthCheck,
  routeAuthCheck,
  setUser,
  useLogin,
  useLogout,
  register,
  isAuth,
}
