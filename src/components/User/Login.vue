<template>
  <v-container fluid fill-height>
    <v-layout align-top justify-center>
      <v-flex xs12 sm8 md4>
        <v-card max-width="344" height="100%" class="mx-auto">
          <v-card-title>Login Form</v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row px-2>
                <v-icon left>mdi-account</v-icon>
                <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  :error-messages="emailerror"
                />
              </v-layout>
              <v-layout row px-2>
                <v-icon left>mdi-lock</v-icon>
                <v-text-field
                  v-model="password"
                  :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password"
                  :type="showpass ? 'text' : 'password'"
                  :error-messages="passworderror"
                  @click:append="showpass = !showpass"
                />
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text small rounded color="indigo">Forgot Password</v-btn>
            <v-spacer />
            <v-btn @click="login" color="primary">Login</v-btn>
          </v-card-actions>
          <v-divider class="divider"></v-divider>
          <v-card-text class="social-media-login" align="center">Or Login with Social Media</v-card-text>
          <v-layout justify-center>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon large target="_blank" v-on="on">
                  <v-icon outline color="red">mdi-google</v-icon>
                </v-btn>
              </template>
              <span>Login with google</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn @click="facebooklogin" icon large v-on="on">
                  <v-icon outline color="blue darken-2">mdi-facebook-box</v-icon>
                </v-btn>
              </template>
              <span>Login With Facebook</span>
            </v-tooltip>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import facebookLogin from "./facebook/facebook-login";
import { loadFbSdk, fbLogin } from "./facebook/helpers";
export default {
  name: "login",
  // components: {
  //   facebookLogin
  // },
  data: () => ({
    email: "",
    password: "",
    showpass: false,
    emailerror: "",
    passworderror: "",
    idImage: null,
    loginImage: null,
    mailImage: null,
    faceImage: null,
    name: "",
    personalID: "",
    FB: window.FB
  }),
  methods: {
    login() {
      //eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.emailerror = "";
      } else {
        this.emailerror = "Enter a valid email";
        return;
      }
      if (this.password.length == 0) {
        this.passworderror = "Password cannot be empty";
        return;
      }
      var postData = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", postData)
        .then(res => {
          this.$router.push("./");
          let payload = {
            text: "Welcome" + res.data,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        })
        .catch(err => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data == "Unauthorized"
          ) {
            this.passworderror = "Invalid email or password";
          } else {
            (this.passworderror = "setErrorMessage"),
              "Login failed. Please try again";
          }
        });
    },
    facebooklogin() {
      fbLogin(this.loginOptions).then(response => {
        //connected successfully
        if (response.status === "connected") {
          this.sendFbAccessTokenToApi(response.authResponse.accessToken);
        } else {
          this.isConnected = false;
        }
      });
    },
    sendFbAccessTokenToApi(accessToken){
      var postData = {
        "access_token": accessToken
      };
      this.$store
        .dispatch("fbLogin", postData)
        .then(res => {
          this.$router.push("./");
          let payload = {
            text: "Welcome" + res.data,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        })
        .catch(err => { // eslint-disable-line no-unused-vars
          let payload = {
            text: "Login failed, please try Again",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    }
  },
  mounted() {
    const fbappId = 2239772502981983;
    const fbversion = "v2.10";
    loadFbSdk(fbappId, fbversion)
  }
};
</script>

<style>
.social-media-login {
  margin-top: 8px;
}
.divider {
  margin-top: 50px;
}
</style>
