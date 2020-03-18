import Vue from 'vue'
import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from '@/store/store'
import './registerServiceWorker'
import './style/style.styl'
import './style/variables.scss'
import MyButton from '@/components/MyButton'

Vue.component('MyButton', MyButton)

Vue.config.productionTip = false

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.withCredentials = true
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    router.push({ path: '/login' })
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
