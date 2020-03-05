<template>
  <v-app>
    <Snackbar />
    <v-toolbar fluid dense elevation="3" max-height="48px">
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-up px-0 font-weight-light">
        <span class="text-uppercase">{{ this.$route.name }}</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <v-row
          row
          align-start
          align="center"
          overflow-y:auto
          class="flex-nowrap"
        >
          <v-icon class="mx-2" color="black">mdi-aspect-ratio</v-icon>
          <v-toolbar-title class="font-weight-light" color="black"
            >Clothing Shop</v-toolbar-title
          >
        </v-row>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          elevation="1"
          v-if="loggedIn && admin"
          text
          small
          color="dark"
          to="/admin"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-view-dashboard-outline</v-icon>Dashboard
        </v-btn>
        <v-btn
          elevation="1"
          v-if="loggedIn && admin"
          text
          small
          color="dark"
          to="/admin/products"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-format-list-bulleted</v-icon>Products
        </v-btn>
        <v-btn
          elevation="1"
          text
          small
          to="/"
          exact-active-class="active"
          v-if="!admin"
        >
          <v-icon left>mdi-home</v-icon>Home
        </v-btn>
        <v-btn
          elevation="1"
          v-if="!loggedIn"
          text
          small
          color="dark"
          to="/login"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-login</v-icon>Login
        </v-btn>
        <v-btn
          elevation="1"
          v-if="!loggedIn"
          text
          small
          color="dark"
          to="/signup"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-account-plus</v-icon>Signup
        </v-btn>
        <v-btn
          elevation="1"
          v-if="loggedIn"
          text
          small
          color="dark"
          @click="confirmLogout"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-logout</v-icon>Logout
        </v-btn>
        <v-btn
          elevation="1"
          v-if="loggedIn && !admin"
          text
          small
          color="dark"
          to="/myaccount"
          exact-active-class="active"
        >
          <v-icon left dark>mdi-account-circle</v-icon>My Account
        </v-btn>
        <v-btn
          elevation="1"
          text
          small
          color="dark"
          to="/cart"
          exact-active-class="active"
          v-if="!admin"
        >
          <v-icon left dark>mdi-cart</v-icon>Cart
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute v-model="sideNav">
      <v-list class="py-0">
        <v-list-item
          v-if="loggedIn & admin"
          to="/admin"
          exact-active-class="active"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Dashboard</v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="loggedIn & admin"
          to="/admin/products"
          exact-active-class="active"
        >
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Products</v-list-item-content>
        </v-list-item>

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
            <v-icon>mdi-account-plus</v-icon>
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
      <v-container class="fill-height px-0 py-0 px-0 py-0" fluid>
        <router-view></router-view>
      </v-container>
      <Dialog
        :show="showMockWebsiteDialog"
        title="IMPORTANT"
        description1="This is not a real website. It is a mock website for development and testing purposes."
        description2="Do not make a payment through this website."
        buttonLabel="I Understand"
        @click="hideMockWebsiteDialog"
      />
      <Dialog
        :show="showConfirmLogout"
        title="Logout?"
        description1="Are you sure you want to logout?"
        buttonLabel="Confirm"
        buttonLabel2="Cancel"
        @click="logout"
        @click2="cancelLogout"
      />
    </v-content>
    <FooterComponent v-if="!admin" />
  </v-app>
</template>
<script>
import FooterComponent from "./views/Footer";
import Snackbar from "./views/Snackbar";
import Dialog from "./views/CustomComponents/Dialog";
import { fbLogout } from "./components/User/facebook/helpers";

export default {
  components: {
    FooterComponent,
    Snackbar,
    Dialog
  },
  methods: {
    hideMockWebsiteDialog(){
      this.showMockWebsiteDialog = false;
    },
    confirmLogout() {
      this.showConfirmLogout = true;
    },
    cancelLogout() {
      this.showConfirmLogout = false;
    },
    logout() {
      if (this.$store.state.user.type == "facebook") {
        fbLogout();
      }
      this.showConfirmLogout = false;
      this.$store.commit("logout");
      //If in private route redirect to home
      if (this.$router.currentRoute.meta.requiresLoggedIn) {
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
      sideNav: false,
      showConfirmLogout: false,
      showMockWebsiteDialog: false
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
    },
    titleSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "31px";
        case "sm":
          return "36px";
        case "md":
          return "39px";
        case "lg":
          return "43px";
        case "xl":
          return "50px";
        default:
          return "35px";
      }
    }
  },
  mounted() {
    if (this.$store.getters.loggedIn) {
      this.$store.dispatch("checkAdmin", this.$store.state.user.token);
    }
    this.showMockWebsiteDialog = true;
  }
};
</script>

<style lang="scss">
#app {
  background: white;
}
.active {
  background: #424242;
  span {
    color: white;
    font-weight: bolder;
  }
  div {
    color: white;
    font-weight: 400;
  }
}
</style>
