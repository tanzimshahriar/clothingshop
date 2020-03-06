import axios from "axios";
import router from "../router";
export default {
  signup(context, payload) {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8080/signup";
      axios
        .post(url, payload)
        .then(res => {
          const payload = {
            token: res.data.token,
            type: "local"
          };
          context.commit("saveUser", payload);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  login(context, payload) {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8080/login";
      axios
        .post(url, payload)
        .then(res => {
          const payload = {
            token: res.data.token,
            type: "local"
          };
          context.commit("saveUser", payload);
          //send a request to save users cart
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  fbLogin(context, payload) {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8080/oauth/facebook";
      axios
        .post(url, payload)
        .then(res => {
          const token = res.data.token;
          context.commit("saveUser", {
            token,
            type: "facebook"
          });
          //send a request to save users cart
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  googleLogin(context, payload) {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8080/oauth/google";
      axios
        .post(url, payload)
        .then(res => {
          const token = res.data.token;
          context.commit("saveUser", {
            token,
            type: "google"
          });
          //send a request to save users cart
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  checkAdmin(context, token) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token
      };
      const url = "http://localhost:8080/checkuseradmin";
      axios
        .post(
          url, {}, {
            headers
          }
        )
        .then(res => {
          if (res.data.result) {
            context.commit("setAdmin");
            router.push("/admin");
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addProduct(context, data) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: context.state.user.token
      };
      var url = "http://localhost:8080/addproduct";
      axios
        .post(url, data.formdata, {
          headers
        })
        .then(res => {
          //returns the response to the addProduct action call
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getProducts() {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:8080/getproducts";
      axios
        .get(url)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addItemToCart(context, item) {
    return new Promise((resolve, reject) => {
      //if user is logged in make a api req to add the item to users cart
      if (context.getters.loggedin) {
        const url = "http://localhost:8080/additemtocart";
        axios
          .get(url)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      }
      //if user isnt logged in save the item to cookies
      else {
        //1. add the item to cart in state
        var cart = context.state.cart ? context.state.cart : [];
        var existingItem = false;
        for (var i = 0; i < cart.length; i++) {
          if (item.code == cart[i].code) {
            existingItem = true;
            break;
          }
        }
        if (existingItem) {
          //increment quantity of the item in cart
          context.commit("incrementItemQuantity", item.code)
        } else {
          //initialize cartQuantity so it can be used later
          item.cartQuantity = 1;
          cart.push(item)
          context.state.cart = cart;
        }

        //2. update the local storage cart
        context.commit("updateCartItemCookies", item)
        resolve({
          message: item.name + " has been added to your cart"
        })
      }
    });
  },
  decreaseItemQuantityFromCart(context, item) {
    return new Promise((resolve, reject) => {
      if (context.getters.loggedin) {
        const url = "http://localhost:8080/decreaseitemquantityfromcart";
        axios
          .get(url)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        //if user isnt logged in update the cart in local storage
        var cart = context.state.cart ? context.state.cart : [];
        var index = -1;
        var numberOfCartQuantity = -1;
        for (var i = 0; i < cart.length; i++) {
          if (item.code == cart[i].code) {
            index = i;
            numberOfCartQuantity = cart[i].cartQuantity;
            break;
          }
        }
        //if cartQuantity is more than one then simply decrease cart quantity
        if (numberOfCartQuantity > 1) {
          cart[index].cartQuantity = cart[index].cartQuantity - 1;
          context.state.cart = cart;
          //if user is logged in make a api req to decrease the item quantity from users cart
        } else {
          cart.splice(index,1)
          context.state.cart = cart;
        }
        context.commit("updateCartItemCookies")
        resolve({message: "1 X " + item.name + " has been removed"});
      }      
    })
  }
};