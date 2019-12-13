import Home from "../components/Home.vue";
import Login from "../components/User/Login.vue";
import Signup from "../components/User/Signup.vue";
import Profile from "../components/User/Profile.vue";
import Cart from "../components/cart.vue";
import Admin from "../components/Admin/adminPanel.vue";
import Products from "../components/Admin/Products.vue";

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
    component: Profile,
    meta: {
      requiresLoggedIn: true
    }
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
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      requiresLoggedIn: true,
      requiresAdmin: true
    }
  },
  {
    path: "/admin/products",
    name: "products",
    component: Products,
    meta: {
      requiresLoggedIn: true,
      requiresAdmin: true
    }
  }
];

export default routes;
