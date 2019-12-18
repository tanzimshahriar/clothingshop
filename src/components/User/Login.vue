<template>
  <v-container fluid fill-height>
    <v-layout column fill-height no-gutters align-center>
      <v-flex row no-gutters>
        <v-card :width="cardWidth" class="my-auto pb-12 pt-2">
          <v-card-title class="font-weight-light">Login Form</v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row px-2>
                <v-icon left>mdi-account</v-icon>
                <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  :error-messages="emailerror"
                  v-on:keyup.enter="login"
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
                  v-on:keyup.enter="login"
                />
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text small rounded color="blue darken-2"
              >Forgot Password</v-btn
            >
            <v-spacer />
            <v-btn color="primary" elevation="3" @click="login">Login</v-btn>
          </v-card-actions>
          <v-divider class="divider"></v-divider>
          <v-card-text align="center">Or</v-card-text>
          <v-layout class="my-4" column align-center>
            <GoogleLogin
              class="mb-2"
              :params="params"
              :onSuccess="onSuccessGoogleLogin"
              :onFailure="onFailureGoogleLogin"
              :renderParams="renderParams"
              >Login
            </GoogleLogin>
            <v-btn
              width="204"
              class="white--text"
              color="blue darken-2"
              @click="facebooklogin"
              large
            >
              <v-icon left outline color="white">mdi-facebook-box</v-icon>
              <span class="fb-text">Login with Facebook</span>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import facebookLogin from "./facebook/facebook-login";
import { loadFbSdk, fbLogin } from "./facebook/helpers";
import GoogleLogin from "vue-google-login";
export default {
  name: "login",
  components: {
    GoogleLogin
  },
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
    FB: window.FB,
    params: {
      client_id:
        "195083085254-5k27lmfqp0of11n8tjil5fbj7lbpv57t.apps.googleusercontent.com"
    },
    renderParams: {
      width: 200,
      height: 44,
      longtitle: true
    }
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
          this.$router.push("/");
          let payload = {
            text: "Welcome " + res.data.email,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
          this.$store.dispatch("checkAdmin", this.$store.state.user.token);
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
    sendFbAccessTokenToApi(accessToken) {
      var postData = {
        access_token: accessToken
      };
      this.$store
        .dispatch("fbLogin", postData)
        .then(res => {
          this.$router.push("/");
          let payload = {
            text: "Welcome " + res.data.email,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        })
        //eslint-disable-next-line
        .catch(err => {
          let payload = {
            text: "Login failed, please try again",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    },
    onSuccessGoogleLogin(user) {
      var postData = {
        access_token: user.WE.Zi.access_token
      };
      this.$store
        .dispatch("googleLogin", postData)
        .then(res => {
          this.$router.push("/");
          let payload = {
            text: "Welcome " + res.data.email,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        })
        //eslint-disable-next-line
        .catch(err => {
          let payload = {
            text: "Login failed, please try again successlogin()",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    },
    onFailureGoogleLogin() {
      let payload = {
        text: "Login failed, please try again faillogin()",
        timeout: 5000
      };
      this.$store.commit("showSnackbar", payload);
    }
  },
  mounted() {
    const fbappId = 2239772502981983;
    const fbversion = "v2.10";
    loadFbSdk(fbappId, fbversion);
  },
  computed: {
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 350;
        case "sm":
          return 350;
        case "md":
          return 350;
        case "lg":
          return 350;
        case "xl":
          return 400;
        default:
          return 350;
      }
    }
  }
};
</script>

<style scoped>
.divider {
  margin-top: 50px;
}
.fb-text {
  text-transform: none !important;
}
</style>
