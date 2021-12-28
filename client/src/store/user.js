import { readonly, reactive, computed } from 'vue'
import { setLoading, resetLoading } from './loadingHandler'
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

// used when register to keep email in stored if need resend validation email
const SET_EMAIL = (email) => {
  stateUser.email = email
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

const authCheck = async () => {
  setLoading()
  const res = await api.authCheck()

  // Not logged in or revoked, do not set user data and auth
  if (res.data.activation === 'REVOKED' || res.data === '') {
    resetLoading()
    return
  }

  SET_USER_DATA(res.data)
  SET_USER_AUTH()
  resetLoading()
  return
}

const useLogout = async () => {
  setLoading()
  await api.logout()
  RESET_USER()
  resetLoading()
}

const setUser = (data) => {
  SET_USER_DATA(data)
}

// GETTERS
const isAuth = computed(() => {
  return stateUser.isAuth
})

export { storeUser, authCheck, setUser, useLogin, useLogout, register, isAuth }
