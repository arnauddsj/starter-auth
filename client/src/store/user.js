import { readonly, reactive, computed } from 'vue'
import api from '../services/apiClient'

const stateUser = reactive({
  isAuth: false,
  email: '',
  activation: '',
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
}

const SET_USER_AUTH = () => {
  stateUser.isAuth = true
}

const RESET_USER = () => {
  stateUser.isAuth = false
  stateUser.email = ''
  stateUser.activation = ''
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
  const res = await api.initialAuthCheck()

  if (res.data.activation === 'REVOKED') {
    return
  }
  SET_USER_DATA(res.data)
  SET_USER_AUTH()
  return
}

const routeAuthCheck = async () => {
  const res = await api.routeAuthCheck()
  return res
}

const useLogout = async () => {
  await api.logout()
  RESET_USER()
}

const setUser = (data) => {
  SET_USER(data)
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
