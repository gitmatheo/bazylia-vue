import Vue from 'vue'
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

Vue.config.productionTip = false

axios.interceptors.request.use(
  function(config) {
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
    console.log('3')
    store.commit('LOADER', false)
    return response
  },
  function(error) {
    store.commit('LOADER', false)
    store.commit('SAVE_ERROR_DATA', error)
    store.commit('SNACKBAR', true)

    if (error.response.status == 401) {
      router.push({ path: '/login' })
    }

    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
