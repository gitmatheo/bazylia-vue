import Vue from 'vue';
import './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';

import router from './router';
import store from '@/store/store';
import './registerServiceWorker';
import './style/style.styl';
import './style/variables.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
