import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/User/Login.vue";
import Signup from "../components/User/Signup.vue";
import Profile from "../components/User/Profile.vue";
import Cart from "../components/cart.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/myaccount",
    name: "myaccount",
    component: Profile
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresLoggedOut: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      requiresLoggedOut: true
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  }
];

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
      next({
        name: "home"
      });
    }
  } else {
    next();
  }
});

export default router;
