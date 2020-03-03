<template>
  <v-container class="px-0 mx-0 py-0 my-0" fluid fill-height>
    <v-layout fill-height no-gutters>
      <v-flex row no-gutters>
        <v-row no-gutters class="mt-1">
          <v-col no-gutters class="grey lighten-4 py-2 px-2" align="center">
            <FilterComponent />
            <v-flex no-gutters row align-self-center align-center justify-center class="py-3">
              <v-card v-if="loading"
                class="mt-2 mb-2 ml-2 mr-2"
                :width="cardWidth"
                elevation="1"
              >
                <v-sheet 
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-card>
              <v-card v-if="loading"
                class="mt-2 mb-2 ml-2 mr-2"
                :width="cardWidth"
                elevation="1"
              >
                <v-sheet 
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-card>
              <v-card v-if="loading"
                class="mt-2 mb-2 ml-2 mr-2"
                :width="cardWidth"
                elevation="1"
              >
                <v-sheet 
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-card>
              <v-card v-if="loading"
                class="mt-2 mb-2 ml-2 mr-2"
                :width="cardWidth"
                elevation="1"
              >
                <v-sheet 
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="px-3 pt-3 pb-3"
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
                  ></v-skeleton-loader>
                </v-sheet>
              </v-card>
              <v-card
                v-for="product in products"
                v-bind:key="product.name"
                class="mt-2 mb-2 ml-2 mr-2"
                :height="cardHeight"
                :width="cardWidth"
                elevation="1"
              >
                <v-card-subtitle class="py-0 px-0 mx-0 my-0">{{ product.name }}</v-card-subtitle>
                <v-card-text class="py-0 px-0 mx-0 my-0" v-if="product.sale==0">${{product.price}}</v-card-text>
                <v-card-text class="py-0 px-0 mx-0 my-0" v-else>
                  <strike>${{product.price}}</strike>
                  <span class="red-text">${{product.price-product.price*(product.sale/100)}}</span>
                  (ON {{product.sale}}% SALE)
                </v-card-text>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterComponent from "./FilterComponent";
export default {
  name: "home",
  inject: ['theme'],
  components: {
    FilterComponent
  },
  data: () => ({
    products: [],
    loading: true
  }),
  mounted() {
    this.updateProducts();
  },
  // updated(){
  //   this.updateProducts();
  // },
  methods: {
    updateProducts() {
      this.$store
        .dispatch("getProducts")
        .then(res => {
          //show product added message with snackbar
          this.products = res.data.products;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          //show error with snackbar
        });
    }
  },
  computed: {
    cardHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "318px";
        case "sm":
          return "230px";
        case "md":
          return "300px";
        case "lg":
          return "420px";
        case "xl":
          return "660px";
        default:
          return "300px";
      }
    },

    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "265px";
        case "sm":
          return "192px";
        case "md":
          return "250px";
        case "lg":
          return "300px";
        case "xl":
          return "550px";
        default:
          return "250px";
      }
    }
  }
};
</script>
<style lang="css" scoped>
.red-text {
  color: red;
  padding: 0;
  margin: 0;
}
</style>