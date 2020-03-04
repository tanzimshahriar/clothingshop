<template>
  <v-footer dark padless>
    <Dialog
      :show="privacy"
      title="Privacy Policy"
      description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      buttonLabel="I understand"
      @click="closePrivacy"
    />
    <Dialog
      :show="tAndC"
      title="Terms And Conditions"
      description1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      buttonLabel="I accept"
      @click="closeTAndC"
    />
    <Dialog
      :show="contactUs"
      title="Contact Us"
      description1="Email: abcd@abc.com"
      description2="Phone:0470086814"
      buttonLabel="Close"
      @click="closeContactUs"
    />
    <v-card class="flex" flat tile>
      <v-card-title class="teal py-2">
        <v-layout column align-center class="hidden-sm-and-up">
          <strong class="subheading"
            >Get connected with us on social networks!</strong
          >
          <v-spacer></v-spacer>
          <v-layout row align-center>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-layout>
        </v-layout>
        <v-layout align-center justify-center row class="hidden-xs-only">
          <strong class="subheading"
            >Get connected with us on social networks!</strong
          >
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-layout>
        <v-layout align-center justify-end row>
          <v-btn x-small @click="showPrivacy" text class="mr-3">Privacy</v-btn>
          <v-btn x-small @click="showTAndC" text class="mr-3"
            >Terms and Conditions</v-btn
          >
          <v-btn x-small @click="showContactUs" text class="mr-3"
            >Contact Us</v-btn
          >
        </v-layout>
      </v-card-title>
      <div class="footer-title">&copy; 2019 Clothing Shop</div>
    </v-card>
  </v-footer>
</template>

<script>
import Dialog from "../views/CustomComponents/Dialog";
export default {
  components: {
    Dialog
  },
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-google-plus", "mdi-instagram"],
    privacy: false,
    tAndC: false,
    contactUs: false
  }),
  methods: {
    closePrivacy() {
      this.privacy = false;
    },
    closeTAndC() {
      this.tAndC = false;
    },
    closeContactUs() {
      this.contactUs = false;
    },
    showPrivacy() {
      this.privacy = true;
    },
    showTAndC() {
      this.tAndC = true;
    },
    showContactUs() {
      this.contactUs = true;
    }
  }
};
</script>
<style scoped>
* {
  font-size: 11px;
}
.link {
  color: white;
  padding-left: 8px;
  font-weight: lighter;
  cursor: pointer;
}
.subheading {
  font-size: 14px;
}
.footer-title {
  text-align: center;
}
</style>
