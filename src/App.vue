<template>
  <v-app>
    <v-toolbar dense flat max-height="50">
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-up">
        <span class="text-uppercase">{{ this.$route.name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          small
          color="black"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute v-model="sideNav">
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content v-text="item.title"></v-list-item-content>
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
export default {
  components: {
    FooterComponent
  },
  methods: {
    goHome() {
      this.$route.name == "home" ? null : this.$router.push("/");
    },
    goAbout() {
      this.$route.name == "about" ? null : this.$router.push("/about");
    }
  },
  data() {
    return {
      sideNav: false,
      menuItems: [
        {
          title: "Home",
          icon: "mdi-home",
          link: "/"
        },
        {
          title: "Login",
          icon: "mdi-login",
          link: "/login"
        },
        {
          title: "Signup",
          icon: "mdi-account-plus-outline",
          link: "/signup"
        },
        {
          title: "Logout",
          icon: "mdi-logout",
          link: "/logout"
        },
        {
          title: "My Account",
          icon: "mdi-account-circle",
          link: "/myaccount"
        },
        {
          title: "Cart",
          icon: "mdi-cart",
          link: "/cart"
        }
      ]
    };
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
