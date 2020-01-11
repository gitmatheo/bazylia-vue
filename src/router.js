import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Raports from "./views/Raports.vue";
// import Completed from "./views/Completed.vue";
// import Invoice from "./views/Invoice.vue";

Vue.use(Router);
Vue.use(require('vue-moment'));

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/completed",
      name: "Completed",
      // route level code-splitting
      // this generates a separate chunk (completed.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "completed" */ "./views/Completed.vue")
    },
    {
      path: "/raports",
      name: "Raports",
      component: () => import(/* webpackChunkName: "raports" */ "./views/Raports.vue")
    },
    {
      path: "/invoice",
      name: "Invoice",
      component: () => import(/* webpackChunkName: "invoice" */ "./views/Invoice.vue")
    },
    {
      path: "/add-patient",
      name: "AddPatient",
      component: () =>
        import(/* webpackChunkName: "add-patient" */ "./views/AddPatient.vue")
    },
    {
      path: "/rozliczenia",
      name: "Rozliczenia",
      component: () =>
        import(/* webpackChunkName: "add-patient" */ "./views/Rozliczenia.vue")
    },
    {
      path: "/registration",
      name: "Registration",
      component: () =>
        import(/* webpackChunkName: "registration" */ "./views/Registration.vue")
    },
    {
      path: "/specjalistyka",
      name: "Specjalistyka",
      component: () =>
        import(/* webpackChunkName: "specjalistyka" */ "./views/Specjalistyka.vue")
    },
    {
      path: "/medycyna-pracy",
      name: "MedycynaPracy",
      component: () =>
        import(/* webpackChunkName: "medycyna-pracy" */ "./views/MedycynaPracy.vue")
    }
  ]
});
