import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: {},
    user: {
      token: localStorage.getItem("JWT_TOKEN") || null,
      type: localStorage.getItem("ACCOUNT_TYPE") || null,
      email: '',
      name: '',
    },
    snackbar: {
      visible: false,
      text: null,
      timeout: 5000,
      multiline: false
    }
  },
  getters: {
    loggedIn(state) {
      return state.user.token == null ? false : true;
    },
    getCart(state) {
      return state.cart;
    }
  },
  mutations,
  actions,
  modules: {}
});
