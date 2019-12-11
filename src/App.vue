<template>
  <v-app>
    <Snackbar />
    <v-toolbar dense flat max-height="50">
      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-up">
        <span class="text-uppercase">{{ this.$route.name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text small color="black" to="/">
          <v-icon left dark>mdi-home</v-icon>Home
        </v-btn>
        <v-btn v-if="!loggedIn" text small color="black" to="/login">
          <v-icon left dark>mdi-login</v-icon>Login
        </v-btn>
        <v-btn v-if="!loggedIn" text small color="black" to="/signup">
          <v-icon left dark>mdi-account-plus-outline</v-icon>Signup
        </v-btn>
        <v-btn v-if="loggedIn" text small color="black" @click="logout">
          <v-icon left dark>mdi-logout</v-icon>Logout
        </v-btn>
        <v-btn v-if="loggedIn" text small color="black" to="/myaccount">
          <v-icon left dark>mdi-account-circle</v-icon>My Account
        </v-btn>
        <v-btn text small color="black" to="/cart">
          <v-icon left dark>mdi-cart</v-icon>Cart
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute v-model="sideNav">
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Home</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!loggedIn" to="/login">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!loggedIn" to="/signup">
          <v-list-item-icon>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Signup</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" to="/myaccount">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>My Account</v-list-item-content>
        </v-list-item>
        <v-list-item to="/cart">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Cart</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height" fluid>
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
    goHome() {
      this.$route.name == "home" ? null : this.$router.push("/");
    },
    goAbout() {
      this.$route.name == "about" ? null : this.$router.push("/about");
    },
    logout() {
      if (this.$store.state.user.type == "facebook") {
        fbLogout();
      }
      this.$store.commit("logout");
      let payload = {
        text: "Logged out successfully",
        timeout: 5000
      };
      this.$store.commit("showSnackbar", payload);
    }
  },
  data() {
    return {
      sideNav: false,
      menuItems: [
        {
          title: "Home",
          icon: "mdi-home",
          link: "/",
          show: true
        },
        {
          title: "Login",
          icon: "mdi-login",
          link: "/login",
          show: !this.loggedIn
        },
        {
          title: "Signup",
          icon: "mdi-account-plus-outline",
          link: "/signup",
          show: !this.loggedIn
        },
        {
          title: "Logout",
          icon: "mdi-logout",
          link: "/logout",
          show: this.loggedIn
        },
        {
          title: "My Account",
          icon: "mdi-account-circle",
          link: "/myaccount",
          show: this.loggedIn
        },
        {
          title: "Cart",
          icon: "mdi-cart",
          link: "/cart",
          show: true
        }
      ]
    };
  },
  watch: {
    loggedIn(newValue) {
      if (newValue) {
        console.log("logged in");
        this.menuItems[1].show = false;
        this.menuItems[2].show = false;
        this.menuItems[3].show = true;
        this.menuItems[4].show = true;
      } else {
        this.menuItems[1].show = true;
        this.menuItems[2].show = true;
        this.menuItems[3].show = false;
        this.menuItems[4].show = false;
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    activeMenuItems() {
      return this.menuItems.filter(function(u) {
        return u.show;
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
