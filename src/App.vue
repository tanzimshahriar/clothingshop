<template>
  <v-app>
    <Snackbar />
    <v-toolbar dense max-height="50" elevation="2">
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-up">
        <span class="text-uppercase">{{ this.$route.name }}</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <v-icon left color="black">mdi-aspect-ratio</v-icon>
        <div class="clothing-shop">Clothing Shop</div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text small to="/" exact-active-class="active" v-if="!admin">
          <v-icon left>mdi-home</v-icon>Home
        </v-btn>
        <v-btn
          v-if="!loggedIn"
          text
          small
          color="black"
          to="/login"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-login</v-icon>Login
        </v-btn>
        <v-btn
          v-if="!loggedIn"
          text
          small
          color="black"
          to="/signup"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-account-plus-outline</v-icon>Signup
        </v-btn>
        <v-btn
          v-if="loggedIn"
          text
          small
          color="black"
          @click="logout"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-logout</v-icon>Logout
        </v-btn>
        <v-btn
          v-if="loggedIn && !admin"
          text
          small
          color="black"
          to="/myaccount"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-account-circle</v-icon>My Account
        </v-btn>
        <v-btn text small color="black" to="/cart" exact-active-class="active" v-if="!admin">
          <v-icon left dark>mdi-cart</v-icon>Cart
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute v-model="sideNav">
      <v-list>
        <v-list-item to="/" exact-active-class="active" v-if="!admin">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Home</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!loggedIn" to="/login" exact-active-class="active">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!loggedIn" to="/signup" exact-active-class="active">
          <v-list-item-icon>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Signup</v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="loggedIn"
          @click="logout"
          exact-active-class="active"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="loggedIn && !admin"
          to="/myaccount"
          exact-active-class="active"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>My Account</v-list-item-content>
        </v-list-item>
        <v-list-item to="/cart" exact-active-class="active" v-if="!admin">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Cart</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height mx-0 my-0 px-0 py-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <FooterComponent />
  </v-app>
</template>
<script>
import FooterComponent from "./views/Footer";
import Snackbar from "./views/Snackbar";
import { fbLogout } from "./components/User/facebook/helpers";

export default {
  components: {
    FooterComponent,
    Snackbar
  },
  methods: {
    logout() {
      if (this.$store.state.user.type == "facebook") {
        fbLogout();
      }
      this.$store.commit("logout");

      //If in private route redirect to home
      if(this.$router.currentRoute.meta.requiresLoggedIn) {
        this.$router.push("/");
      }

      let payload = {
        text: "Logged out successfully",
        timeout: 5000
      };
      this.$store.commit("showSnackbar", payload);
    }
  },
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    admin() {
      return this.$store.getters.isAdmin;
    },
    activeMenuItems() {
      return this.menuItems.filter(function(u) {
        return u.show;
      });
    }
  },
  mounted() {
    console.log("mounted");
    if(this.$store.getters.loggedIn){
      this.$store.dispatch("checkAdmin", this.$store.state.user.token);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: white;
  color: #2c3e50;
}
.active {
  background: black;
  span {
    color: white;
    font-weight: bolder;
  }
  div {
    color: white;
    font-weight: bold;
  }
}
.clothing-shop {
  padding-top: 6px;
  font-size: 25px;
  font-weight: lighter;
  text-align: center;
}
</style>
