import axios from "axios";
import router from "../router";
export default {
  signup(context, payload) {
    return new Promise((resolve, reject) => {
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL+"/signup") :"http://localhost:8080/signup";
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
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL + "/login") : "http://localhost:8080/login";
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
  fbLogin(context, payload) {
    return new Promise((resolve, reject) => {
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL + "/oauth/facebook") :"http://localhost:8080/oauth/facebook";
      axios
        .post(url, payload)
        .then(res => {
          const token = res.data.token;
          context.commit("saveUser", {
            token,
            type: "facebook"
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  googleLogin(context, payload) {
    return new Promise((resolve, reject) => {
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL + "/oauth/google") : "http://localhost:8080/oauth/google";
      axios
        .post(url, payload)
        .then(res => {
          const token = res.data.token;
          context.commit("saveUser", {
            token,
            type: "google"
          });
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
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL + "/checkuseradmin") : "http://localhost:8080/checkuseradmin";
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
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL + "/addproduct") : "http://localhost:8080/addproduct";
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
      const url =  process.env.NODE_ENV === "production"? (process.env.API_URL + "/getproducts") : "http://localhost:8080/getproducts";
      axios
        .get(url)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
