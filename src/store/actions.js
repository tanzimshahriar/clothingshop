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
      if(context.getters.loggedin){
        const url = "http://localhost:8080/getproducts";
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
        context.commit("addItemToCartInState", item)
        context.commit("updateCartItemCookies", item)
        resolve({message: item.name + " has been added to your cart"})
      }
    });
      
  }
};