import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pl from 'vuetify/es5/locale/pl' //javascript
// import pl from 'vuetify/src/locale/pl' //typescript

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#20CE99',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#f44336',
    info: '#2196F3',
    success: '#20CE99',
    warning: '#FB8C00',
    indigo: '#8F3985',
    customWhite: '#F0F7F4',
    backgroundLight: 'F6F9FC'
  },
  lang: {
    locales: { pl },
    current: 'pl'
  }
})
