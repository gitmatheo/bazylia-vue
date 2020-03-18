import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Raports from "./views/Raports.vue";
// import Completed from "./views/Completed.vue";
// import Invoice from "./views/Invoice.vue";

Vue.use(Router)
Vue.use(require('vue-moment'))

function guardMyroute(to, from, next) {
  var isAuthenticated = localStorage.getItem('isAuthenticated')

  if (isAuthenticated) {
    next() // allow to enter route
  } else {
    next('/login') // go to '/login';
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: guardMyroute,
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/success',
      name: 'Success',
      beforeEnter: guardMyroute,
      component: () => import('./views/Success.vue')
    },
    {
      path: '/error',
      name: 'Error',
      beforeEnter: guardMyroute,
      component: () => import('./views/Error.vue')
    },
    {
      path: '/invoice/:id',
      name: 'Invoice',
      beforeEnter: guardMyroute,
      component: () => import('./views/Invoice.vue')
    },
    {
      path: '/add-patient',
      name: 'AddPatient',
      beforeEnter: guardMyroute,
      component: () => import('./views/AddPatient.vue')
    },
    {
      path: '/rozliczenia',
      name: 'Rozliczenia',
      beforeEnter: guardMyroute,
      component: () => import('./views/Rozliczenia.vue')
    },
    {
      path: '/specjalistyka',
      name: 'Specjalistyka',
      beforeEnter: guardMyroute,
      component: () => import('./views/Specjalistyka.vue')
    },
    {
      path: '/medycyna-pracy',
      name: 'MedycynaPracy',
      beforeEnter: guardMyroute,
      component: () => import('./views/MedycynaPracy.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.requiresAuth)) {
//     if (Auth.currentUser) {
//       next();
//     } else {
//       next({ path: '/login' });
//     }
//   }
//   next();
// });

export default router
