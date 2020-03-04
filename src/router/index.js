import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import routes from "./routes";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  //console.log(`navigating to ${to.name} from ${from.name}`);
  if (to.matched.some(route => route.meta.requiresLoggedOut)) {
    if (!store.getters.loggedIn) {
      next();
    } else {
      //logged in users redirected to home when requiresLoggedOut=true
      next({
        name: "home"
      });
    }
  } else if (to.matched.some(route => route.meta.requiresLoggedIn)) {
    if (!store.getters.loggedIn) {
      next({
        name: "home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
