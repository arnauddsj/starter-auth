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

const setUser = (data) => {
  stateUser.email = data.email
  stateUser.activation = data.activation
  stateUser.userType = data.userType
}

const register = async (credentials) => {
  const res = await api.register(credentials)

  // used when register to keep email in store if need to resend validation email
  stateUser.email = credentials.email

  return res
}

const useLogin = async (credentials) => {
  const res = await api.login(credentials)

  if (res.data.activation === 'REVOKED') {
    return res
  } else if (res.data.activation === 'PENDING') {
    setUser(res.data)
    stateUser.isAuth = true
    return res
  }

  setUser(res.data)
  stateUser.isAuth = true
  return res
}

const authCheck = async () => {
  setLoading()
  const res = await api.authCheck()

  // Not logged in or revoked, do not set user data and auth
  if (res.data.activation === 'REVOKED' || res.data === '') {
    setUser(res.data)
    resetLoading()
    return res
  } else if (res.data.activation === 'PENDING') {
    setUser(res.data)
    stateUser.isAuth = true
    resetLoading()
    return res
  }

  setUser(res.data)
  stateUser.isAuth = true
  resetLoading()
  return res
}

const useLogout = async () => {
  setLoading()
  await api.logout()

  stateUser.isAuth = false
  stateUser.email = ''
  stateUser.activation = ''
  stateUser.userType = ''

  resetLoading()
}


// GETTERS
const isAuth = computed(() => {
  return stateUser.isAuth
})

export { storeUser, authCheck, setUser, useLogin, useLogout, register, isAuth }
