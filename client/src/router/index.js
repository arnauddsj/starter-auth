import { createRouter, createWebHistory } from 'vue-router'
import { isAuth, setUser, authCheck, storeUser } from '../store/user'

const { stateUser } = storeUser()

import { resetAllValidationErrors } from '../store/validations'

import home from '../views/Home.vue'
import userProfile from '../views/member/Profile.vue'
import pageNotFound from '../views/404.vue'

import auth from '../views/auth/Auth.vue'
import login from '../views/auth/Login.vue'
import register from '../views/auth/Register.vue'
import registerConfirmation from '../views/auth/RegisterConfirmation.vue'
import verifyEmail from '../views/auth/VerifyEmail.vue'
import passwordResetRequest from '../views/auth/PasswordResetRequest.vue'
import passwordResetConfirmation from '../views/auth/PasswordResetConfirmation.vue'
import passwordResetSet from '../views/auth/PasswordResetSet.vue'
import passwordResetSuccess from '../views/auth/PasswordResetSuccess.vue'
import accountNeedValidation from '../views/auth/AccountNeedValidation.vue'
import accountRevoked from '../views/auth/AccountRevoked.vue'

const routes = [
  {
    path: '/',
    component: home,
    name: 'home',
  },
  {
    path: '/member/profile',
    component: userProfile,
    name: 'user-profile',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    component: auth,
    name: 'auth',
    meta: { hideNavigation: true },
    children: [
      {
        // Root of parent route
        path: '',
        component: login,
        name: 'login',
      },
      {
        path: '/register',
        component: register,
        name: 'register',
      },
      {
        path: '/registration-success',
        component: registerConfirmation,
        name: 'registration-success',
      },
      {
        path: '/verify-email',
        component: verifyEmail,
        name: 'verify-email',
      },
      {
        path: '/account-need-validation',
        component: accountNeedValidation,
        name: 'account-need-validation',
      },
      {
        path: '/account-revoked',
        component: accountRevoked,
        name: 'account-revoked',
      },

      {
        path: '/password-reset',
        component: passwordResetRequest,
        name: 'password-reset',
      },
      {
        path: '/password-reset-confirmation',
        component: passwordResetConfirmation,
        name: 'password-reset-confirmation',
      },
      {
        path: '/password-reset-set',
        component: passwordResetSet,
        name: 'password-reset-set',
      },
      {
        path: '/password-reset-success',
        component: passwordResetSuccess,
        name: 'password-reset-success',
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: pageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // Reset Errors on navigation
  resetAllValidationErrors()

  // 1. Check if route need auth, if not next()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 2. If authRequired, check in store if user isAuth
    if (!isAuth.value) {
      // 3. If not Auth, check if there is a cookie and validate it, used on page load
      try {
        const res = await authCheck()
        // 5. If cookie is validated, store user data in store
        if (res.data.activation === 'PENDING') {
          // 6. If user email is not validated redirect to validation request page
          next({ name: 'account-need-validation' })
        } else if (res.data.activation === 'REVOKED') {
          next({ name: 'account-revoked' })
        } else {
          // 7. Everything is OK, user can continue to account
          setUser(res.data)
          next()
        }
      } catch (error) {
        // 4. If no cookie go to login page
        next({ name: 'login' })
        return
      }
      // Is logged in, double check activation, this is more likely to be a navigation
    } else if (stateUser.activation === 'PENDING') {
      next({ name: 'account-need-validation' })
    } else if (stateUser.activation === 'REVOKED') {
      next({ name: 'account-revoked' })
    } else {
      next()
    }
  } else {
    // Page don't need auth
    next()
  }
})

export default router
