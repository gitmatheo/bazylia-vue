import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Raports from "./views/Raports.vue";
import Completed from "./views/Completed.vue";
import Invoice from "./views/Invoice.vue";

Vue.use(Router);

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
      name: "completed",
      // route level code-splitting
      // this generates a separate chunk (completed.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "completed" */ "./views/Completed.vue")
    },
    {
      path: "/raports",
      name: "raports",
      component: () => import(/* webpackChunkName: "raports" */ "./views/Raports.vue")
    },
    {
      path: "/invoice",
      name: "invoice",
      component: () => import(/* webpackChunkName: "raports" */ "./views/Invoice.vue")
    }
  ]
});
