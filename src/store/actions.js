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
  addProduct(context, data) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: context.state.user.token
      };
      var url = "http://localhost:8080/addproduct";
      axios
        .post(
          url,
          { data },
          {
            headers
          }
        )
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
        if (item.code == context.getters.cart.items[i].code) {
          existingItem = true;
          break;
        }
      }
      if (existingItem) {
        //increment quantity of the item in cart and save to local storage
        context.commit("incrementItemQuantity", item.code);
        context.commit("updateCartItemCookies");
      } else {
        //initialize cartQuantity so it can be used later
        item.cartQuantity = 1;
        var price =
          item.sale && item.sale > 0
            ? item.price - item.price * (item.sale / 100)
            : item.price;
        if (numberOfItems != 0) {
          //if the cart isnt empty
          context.state.user.cart.items.push(item);
          context.state.user.cart.subtotal =
            context.getters.cart.subtotal + price;
        } else {
          //if cart is empty initialize the cart
          var cart = {
            items: [item],
            subtotal: price,
            shipping: 0
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
      console.log(cart);
      for (var i = 0; i < cart.items.length; i++) {
        if (item.code == cart.items[i].code) {
          index = i;
          numberOfCartQuantity = cart.items[i].cartQuantity;
          break;
        }
      }
      var price =
        cart.items[index].sale && cart.items[index].sale > 0
          ? cart.items[index].price -
            cart.items[index].price * (cart.items[index].sale / 100)
          : cart.items[index].price;
      //2. if cartQuantity is more than one then decrease cart quantity
      if (numberOfCartQuantity > 1) {
        cart.items[index].cartQuantity = cart.items[index].cartQuantity - 1;
        cart.subtotal = cart.subtotal - price;
        context.state.user.cart = cart;
      } else {
        cart.items.splice(index, 1);
        cart.subtotal = cart.subtotal - price;
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
        if (item.code == cart.items[i].code) {
          index = i;
          break;
        }
      }
      var price =
        cart.items[index].sale && cart.items[index].sale > 0
          ? cart.items[index].price -
            cart.items[index].price * (cart.items[index].sale / 100)
          : cart.items[index].price;
      var cartQuantity = cart.items[index].cartQuantity;
      cart.items.splice(index, 1);
      cart.subtotal = cart.subtotal - price * cartQuantity;
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
      console.log("checkout");
      if (context.getters.isAdmin) {
        reject("Admin cannot add items to cart");
      }

      const cart = context.getters.cart;
      const token = context.state.user.token;
      console.log("token");
      console.log(token);
      //1. if logged in send authorization too
      if (context.getters.loggedIn) {
        const url = "http://localhost:8080/orderloggedin";
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
            console.log(err);
            reject("Error. Failed to complete order.");
          });
      } else {
        const url = "http://localhost:8080/order";
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
            console.log(err);
            reject("Network Error. Failed to complete order.");
          });
      }
    });
  }
};
