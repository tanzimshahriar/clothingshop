import axios from "axios";
import router from "../router";
export default {
  signup(context, payload) {
    return new Promise((resolve, reject) => {
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/signup"
          : "http://localhost:8080/signup";
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
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/login"
          : "http://localhost:8080/login";
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
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/oauth/facebook"
          : "http://localhost:8080/oauth/facebook";
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
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/oauth/google"
          : "http://localhost:8080/oauth/google";
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
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/checkuseradmin"
          : "http://localhost:8080/checkuseradmin";
      axios
        .post(
          url,
          {},
          {
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
  // eslint-disable-next-line no-unused-vars
  getProducts(_context, params) {
    return new Promise((resolve, reject) => {
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/getproducts"
          : "http://localhost:8080/getproducts";
      axios
        .get(url, { params })
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
      if (context.getters.isAdmin) {
        reject("Admin cannot add items to cart");
      }
      //if user is logged in make a api req to add the item to users cart
      // if (context.getters.loggedin) {
      //   const url = "http://localhost:8080/additemtocart";
      //   axios
      //     .get(url)
      //     .then(res => {
      //       resolve(res);
      //     })
      //     .catch(err => {
      //       reject(err);
      //     });
      // }
      // //if user isnt logged in save the item to cookies
      // else {
      //1. add the item to cart in state

      var existingItem = false;
      var numberOfItems =
        context.getters.cart &&
        context.getters.cart.items &&
        context.getters.cart.items.length
          ? context.getters.cart.items.length
          : 0;
      for (var i = 0; i < numberOfItems; i++) {
        if (item._id == context.getters.cart.items[i]._id) {
          existingItem = true;
          break;
        }
      }

      //set the item to add to cart
      var cartItem = {};
      cartItem._id = item._id;
      cartItem.name = item.name;

      if (existingItem) {
        //increment quantity of the item in cart and save to local storage
        context.commit("incrementItemQuantity", item._id);
        context.commit("updateCartItemCookies");
      } else {
        //initialize cartQuantity so it can be used later

        cartItem.cartQuantity = 1;

        if (numberOfItems != 0) {
          //if the cart isnt empty push the item to cart and add the price to cart
          context.state.user.cart.items.push(cartItem);
        } else {
          //if cart is empty initialize the cart
          var cart = {
            items: [cartItem]
          };
          context.state.user.cart = cart;
        }
      }

      //2. update the local storage cart
      context.commit("updateCartItemCookies", item);
      resolve({
        message: item.name + " has been added to your cart"
      });
      // }
    });
  },
  decreaseItemQuantityFromCart(context, item) {
    return new Promise((resolve, reject) => {
      if (context.getters.isAdmin) {
        reject("Admin cannot add items to cart");
      }
      //if user is logged in make a api req to decrease the item quantity from users cart

      // if (context.getters.loggedin) {
      //   const url = "http://localhost:8080/decreaseitemquantityfromcart";
      //   axios
      //     .get(url)
      //     .then(res => {
      //       resolve(res);
      //     })
      //     .catch(err => {
      //       reject(err);
      //     });
      // } else {

      //if user isnt logged in update the cart in state and local storage
      //1. find the cartquantity of item
      var cart = context.getters.cart;
      var index = -1;
      var numberOfCartQuantity = -1;
      for (var i = 0; i < cart.items.length; i++) {
        if (item._id == cart.items[i]._id) {
          index = i;
          numberOfCartQuantity = cart.items[i].cartQuantity;
          break;
        }
      }
      //2. if cartQuantity is more than one then decrease cart quantity
      if (numberOfCartQuantity > 1) {
        cart.items[index].cartQuantity = cart.items[index].cartQuantity - 1;
        context.state.user.cart = cart;
      } else {
        cart.items.splice(index, 1);
        context.state.user.cart = cart;
      }
      context.commit("updateCartItemCookies");
      resolve({
        message: "1 X " + item.name + " has been removed"
      });
      // }
    });
  },
  deleteItemFromCart(context, item) {
    return new Promise((resolve, reject) => {
      if (context.getters.isAdmin) {
        reject("Admin cannot add items to cart");
      }
      // if (context.getters.loggedin) {
      //   const url = "http://localhost:8080/deleteitemfromcart";
      //   axios
      //     .get(url)
      //     .then(res => {
      //       resolve(res);
      //     })
      //     .catch(err => {
      //       reject(err);
      //     });
      // } else {
      //if user isnt logged in update the cart in local storage
      var cart = context.getters.cart;
      var index = -1;

      for (var i = 0; i < cart.items.length; i++) {
        if (item._id == cart.items[i]._id) {
          index = i;
          break;
        }
      }
      cart.items.splice(index, 1);
      context.state.user.cart = cart;

      context.commit("updateCartItemCookies");
      resolve({
        message: item.name + " has been removed from you cart"
      });
      // }
    });
  },
  //send api request if successful empty cart in state and update the localstorage cart
  checkout(context) {
    return new Promise((resolve, reject) => {
      if (context.getters.isAdmin) {
        reject("Admin cannot add items to cart");
      }

      const cart = context.getters.cart;
      const token = context.state.user.token;
      //1. if logged in send authorization too
      if (context.getters.loggedIn) {
        const url =
          process.env.NODE_ENV === "production"
            ? process.env.VUE_APP_API_URL + "/orderloggedin"
            : "http://localhost:8080/orderloggedin";
        const headers = {
          "Content-Type": "application/json",
          Authorization: token
        };

        axios
          .post(url, cart, { headers })
          .then(res => {
            if (res.data.result == "success") {
              context.state.user.cart = [];
              context.commit("updateCartItemCookies");
              resolve({ message: "You order has been placed" });
            } else {
              reject("Failed to complete order.");
            }
          })
          .catch(err => {
            reject("Error. Failed to complete order.", err);
          });
      } else {
        const url =
          process.env.NODE_ENV === "production"
            ? process.env.VUE_APP_API_URL + "/order"
            : "http://localhost:8080/order";
        axios
          .post(url, cart)
          .then(res => {
            if (res.data.result == "success") {
              context.state.user.cart = [];
              context.commit("updateCartItemCookies");
              resolve({ message: "Your order has been placed" });
            } else {
              reject("Network Error. Failed to complete order.");
            }
          })
          .catch(err => {
            reject("Network Error. Failed to complete order.", err);
          });
      }
    });
  },
  getSizes(context, size) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: context.state.user.token
      };
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/getsizes"
          : "http://localhost:8080/getsizes";
      const params = new URLSearchParams();
      size && size != "" ? params.append("_id", size) : null;
      axios
        .get(url, { params, headers })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getCategories(context, category) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: context.state.user.token
      };
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/getcategories"
          : "http://localhost:8080/getcategories";
      const params = new URLSearchParams();
      category && category != "" ? params.append("category", category) : null;
      axios
        .get(url, { params, headers })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
