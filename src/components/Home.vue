<template>
  <v-container class="px-0 mx-0 py-0 my-0" fluid fill-height>
    <v-layout fill-height no-gutters>
      <v-flex fill-height row no-gutters>
        <v-row no-gutters align-self="start">
          <v-col no-gutters class="pb-2" align="center">
            <DropdownMenu />
            <FilterComponent v-if="!showProduct" />

            <v-card class="px-2 mx-8 my-8 py-3" v-if="loadingFailed">
              <v-card-title class="font-weight-light justify-center">
                Loading failed<v-icon right light
                  >mdi-emoticon-sad-outline</v-icon
                >
              </v-card-title>
              <v-card-subtitle
                >Please try loading the page again.</v-card-subtitle
              >
            </v-card>

            <v-flex
              v-if="!showProduct"
              no-gutters
              row
              align-self-center
              align-center
              justify-center
              class="py-3"
            >
              <v-flex
                v-if="loading"
                no-gutters
                row
                align-self-center
                align-center
                justify-center
              >
                <v-card
                  v-for="n in 10"
                  v-bind:key="n"
                  class="mt-2 mb-2 ml-2 mr-2"
                  :width="cardWidth"
                  :height="cardHeight"
                  align-bottom
                  elevation="1"
                >
                  <v-sheet
                    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                    :width="cardWidth"
                    :height="cardHeight"
                  >
                    <v-skeleton-loader
                      class="mx-auto"
                      type="image,image,image"
                      :height="cardHeight"
                    ></v-skeleton-loader>
                  </v-sheet>
                </v-card>
              </v-flex>
              <v-card
                v-show="!loading"
                class="mt-2 mb-2 ml-2 mr-2 .d-flex flex-column"
                v-for="product in products"
                v-bind:key="product.name"
                :height="cardHeight"
                :width="cardWidth"
                elevation="1"
                @click="openProduct(product)"
              >
                <v-img
                  v-if="product.images && product.images.length >= 1"
                  class="align-end .d-flex"
                  aspect-ratio="1"
                  contain
                  :src="productImg(product)"
                >
                  <v-flex row>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mx-2 my-2"
                      fab
                      light
                      small
                      color="white"
                      @click.stop="productHearted(product)"
                    >
                      <v-icon color="black">mdi-heart-outline</v-icon>
                    </v-btn>
                  </v-flex>
                </v-img>
                <v-spacer></v-spacer>
                <v-card-subtitle
                  class="pt-2 pb-0 px-0 mx-0 my-0 font-weight-medium black--text"
                  >{{ product.name }}</v-card-subtitle
                >
                <v-card-text
                  class="pt-0 pb-2 px-0 mx-0 my-0 font-weight-light black--text"
                  v-if="product.sale == 0"
                  >${{ product.price.toFixed(2) }}</v-card-text
                >
                <v-card-text
                  class="pt-0 pb-2 px-0 mx-0 my-0 font-weight-light black--text"
                  v-else
                >
                  <strike>${{ product.price }}</strike>
                  <span class="red-text font-weight-bold">
                    ${{
                      (
                        product.price -
                        product.price * (product.sale / 100)
                      ).toFixed(2)
                    }}
                  </span>
                  (ON {{ product.sale }}% SALE)
                </v-card-text>
              </v-card>
            </v-flex>
            <Item v-if="showProduct" :item="product" @close="closeItem" />
            <v-row justify="center" align="end" v-if="!loading">
          <v-pagination
            class="py-2"
            v-model="currentPage"
            :length="noOfPages"
          ></v-pagination>
        </v-row>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterComponent from "./FilterComponent";
import DropdownMenu from "./DropdownMenu";
import Item from "./Item";
export default {
  name: "home",
  inject: ["theme"],
  components: {
    FilterComponent,
    DropdownMenu,
    Item
  },
  data: () => ({
    products: [],
    loading: true,
    tempimg: null,
    product: {},
    showProduct: false,
    loadingFailed: false,
    currentPage: 1,
    noOfPages: 0,
    maxNoOfItems: 10
  }),
  mounted() {
    this.updateProducts();
  },
  methods: {
    //load the products on the home page
    updateProducts() {
      this.loading = true;
      const params = new URLSearchParams();

      //set pagination, maxiumum no of items and the current page
      params.append("max", this.maxNoOfItems ? this.maxNoOfItems : 10);
      params.append("page", this.currentPage ? this.currentPage : 1);
      this.$store
        .dispatch("getProducts", params)
        .then(res => {
          this.products = res.data.products;
          this.noOfPages = res.data.noOfPages;
          this.loading = false;
          // this.getImageOfProduct(0);
        })
        .catch(err => {
          this.loading = false;
          this.loadingFailed = true;
          console.log(err);
        });
    },
    productImg(product) {
      var image =
        "data:" +
        product.images[0].contentType +
        ";base64," +
        product.images[0].image;
      var img = new Image();
      img.src = image;
      return img.src;
    },
    openProduct(product) {
      this.product = product;
      this.showProduct = true;
    },
    productHearted(product) {
      console.log("hearted product: ");
      console.log(product.name);
    },
    closeItem() {
      this.showProduct = false;
    }
  },
  computed: {
    cardHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "328px";
        case "sm":
          return "250px";
        case "md":
          return "310px";
        case "lg":
          return "360px";
        case "xl":
          return "610px";
        default:
          return "310px";
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
  },
  watch: {
    currentPage: function() {
      this.updateProducts();
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
