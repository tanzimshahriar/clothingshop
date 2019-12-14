<template>
  <v-container fluid fill-height>
    <v-layout column fill-height no-gutters align-center>
      <v-flex row no-gutters>
        <v-card :width="cardWidth" min-height="560" class="my-auto pb-12 pt-2">
          <v-card-title class="font-weight-light">Signup Form</v-card-title>
          <v-card-text>
            <v-form>
              <v-layout row px-2>
                <v-icon left>mdi-email</v-icon>
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
                  :hint="hint"
                  :error-messages="passworderror"
                  loading
                  @click:append="showpass = !showpass"
                >
                  <template v-slot:progress>
                    <v-progress-linear
                      v-if="custom"
                      :value="passwordProgress"
                      :color="passwordcolor"
                      absolute
                      height="2"
                    ></v-progress-linear>
                  </template>
                </v-text-field>
              </v-layout>
              <v-layout row px-2>
                <v-icon left>mdi-check-circle-outline</v-icon>
                <v-text-field
                  v-model="confirmPassword"
                  :append-icon="showpassconfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Confirm Password"
                  :type="showpassconfirm ? 'text' : 'password'"
                  loading
                  @click:append="showpassconfirm = !showpassconfirm"
                  :error-messages="confirmpassworderror"
                >
                  <template v-slot:progress>
                    <v-progress-linear
                      v-if="custom"
                      :value="confirmPasswordProgress"
                      :color="confirmPasswordcolor"
                      absolute
                      height="2"
                    ></v-progress-linear>
                  </template>
                </v-text-field>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="signup" color="primary">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup",
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    custom: true,
    showpass: false,
    showpassconfirm: false,
    emailerror: "",
    passworderror: "",
    confirmpassworderror: ""
  }),
  methods: {
    signup() {
      //eslint-disable-next-line
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.emailerror = "";
      } else {
        this.emailerror = "Enter a valid email";
        return;
      }
      if (this.password.length < 8) {
        this.passworderror = "Password must be 8 characters at least";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.confirmpassworderror = "Password doesn't match";
        return;
      } else {
        this.passworderror = "";
        this.confirmpassworderror = "";
        //make post request
        var postData = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("signup", postData)
          .then(res => {
            this.$router.push("/");
            let payload = {
              text: "Signup Successful" + res.data,
              timeout: 5000
            };
            this.$store.commit("showSnackbar", payload);
          })
          .catch(err => {
            console.log(err);
            this.emailerror = "User already Exists";
          });
      }
    }
  },
  computed: {
    passwordProgress() {
      return Math.min(100, this.password.length * 10);
    },
    confirmPasswordProgress() {
      return Math.min(100, this.confirmPassword.length * 10);
    },
    passwordcolor() {
      if (this.password.length <= 4) {
        return "error";
      } else if (this.password.length <= 7) {
        return "warning";
      } else {
        return "success";
      }
    },
    confirmPasswordcolor() {
      if (
        this.confirmPassword.length <= 4 ||
        this.password !== this.confirmPassword
      ) {
        return "error";
      } else if (this.confirmPassword.length <= 7) {
        return "warning";
      } else {
        return "success";
      }
    },
    hint() {
      if (this.password.length < 8) {
        return "Password must be at least 8 characters";
      } else {
        return "";
      }
    },
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
