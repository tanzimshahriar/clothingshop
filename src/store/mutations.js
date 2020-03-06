export default {
  saveUser(state, payload) {
    localStorage.setItem("JWT_TOKEN", payload.token);
    localStorage.setItem("ACCOUNT_TYPE", payload.type);
    state.user.token = payload.token;
    state.user.type = payload.type;
  },
  setAdmin(state) {
    state.user.admin = true;
  },
  logout(state) {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("ACCOUNT_TYPE");
    state.user.token = null;
    state.user.type = null;
    state.user.admin = false;
  },
  resetErrorMessage(state) {
    state.errorMessage = "";
  },
  showSnackbar(state, payload) {
    state.snackbar.text = payload.text;
    state.snackbar.multiline = payload.text.length > 50 ? true : false;
    if (payload.multiline) {
      state.snackbar.multiline = payload.multiline;
    }
    if (payload.timeout) {
      state.snackbar.timeout = payload.timeout;
    }

    state.snackbar.visible = true;
  },
  closeSnackbar(state) {
    state.snackbar.visible = false;
    state.snackbar.multiline = false;
    state.snackbar.timeout = 5000;
    state.snackbar.text = null;
  },
  incrementItemQuantity(state, code){
    var cart = state.cart;
    for(var i = 0; i < cart.length; i++){
      if(cart[i].code == code){
        cart[i].cartQuantity = cart[i].cartQuantity + 1;
        break;
      }
    }
    state.cart = cart;
  },
  updateCartItemCookies(state) {
    localStorage.removeItem("CART");
    localStorage.setItem("CART",JSON.stringify(state.cart))
  },
  addCartItemToStateFromLocalStorage(state){
    state.cart = JSON.parse(localStorage.getItem("CART"));
  }
};
