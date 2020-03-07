import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem("JWT_TOKEN") || null,
      type: localStorage.getItem("ACCOUNT_TYPE") || null,
      email: "",
      name: "",
      admin: false,
      cart: {
        items: [],
        subtotal: 0,
        shipping: 10
      }
    },
    snackbar: {
      visible: false,
      text: null,
      timeout: 5000,
      multiline: false
    },
    error: {
      networkError: false,
      errorMsg: ""
    }
  },
  getters: {
    loggedIn(state) {
      return state.user.token == null ? false : true;
    },
    isAdmin(state) {
      return state.user.admin;
    },
    cart(state) {
      return state.user.cart;
    }
  },
  mutations,
  actions,
  modules: {}
});
