import Vue from 'vue'
import VueI18n from 'vue-i18n'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from '@/store/store'
import './registerServiceWorker'
import './style/style.styl'
import './style/variables.scss'
import MyButton from '@/components/MyButton'
import Loader from '@/components/Loader'

Vue.component('MyButton', MyButton)
Vue.component('Loader', Loader)

Vue.use(VueI18n)

Vue.config.productionTip = false

axios.interceptors.request.use(
  function(config) {
    const token = `Bearer ${localStorage.getItem('auth_token')}`
    config.headers['Authorization'] = token

    config.withCredentials = true
    store.commit('LOADER', true)
    return config
  },
  function(error) {
    store.commit('LOADER', false)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    store.commit('LOADER', false)
    return response
  },
  function(error) {
    if (error.response.status == 401) {
      if (router.history.current.path == '/login') {
        store.commit('SAVE_ERROR_DATA', error)
        store.commit('SNACKBAR', true)
      } else {
        router.push({ path: '/login' })
      }
    } else {
      store.commit('SAVE_ERROR_DATA', error)
      store.commit('SNACKBAR', true)
    }
    store.commit('LOADER', false)

    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
