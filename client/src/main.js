import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

createApp(App).use(router).use(moshaToast).mount('#app')
