import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Raports from "./views/Raports.vue";
// import Completed from "./views/Completed.vue";
// import Invoice from "./views/Invoice.vue";

Vue.use(Router);
Vue.use(require('vue-moment'));

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/invoice/:id',
      name: 'Invoice',
      // route level code-splitting
      // this generates a separate chunk (invoice.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "invoice" */ './views/Invoice.vue')
    },
    {
      path: '/add-patient',
      name: 'AddPatient',
      component: () => import('./views/AddPatient.vue')
    },
    {
      path: '/rozliczenia',
      name: 'Rozliczenia',
      component: () => import('./views/Rozliczenia.vue')
    },
    {
      path: '/specjalistyka',
      name: 'Specjalistyka',
      component: () => import('./views/Specjalistyka.vue')
    },
    {
      path: '/medycyna-pracy',
      name: 'MedycynaPracy',
      component: () => import('./views/MedycynaPracy.vue')
    }
  ]
});
