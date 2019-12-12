<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
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
          <v-btn small text>Privacy</v-btn>
          <v-btn small text class="mr-3">Terms and Conditions</v-btn>
          <v-btn class="mr-3" small text>Contact Us</v-btn>
        </v-layout>
      </v-card-title>
      <div class="footer-title">&copy; 2019 Clothing Shop</div>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-google-plus", "mdi-instagram"]
  })
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
