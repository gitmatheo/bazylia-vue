import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#20CE99',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#b71c1c',
    info: '#2196F3',
    success: '#4caf50',
    warning: '#FB8C00',
    indigo: '#8F3985',
    customWhite: '#F0F7F4',
    backgroundLight: 'F6F9FC'
  }
});
