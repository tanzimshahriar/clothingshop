<template>
  <v-col align-self="start" justify-self="start" cols="12">
    <v-row justify="center">
      <v-card-title class="font-weight-medium">
        <v-icon left color="black">mdi-cart</v-icon>Your Cart
      </v-card-title>
    </v-row>
    <v-row
      v-if="cartItems && cartItems.length && cartItems.length > 0"
      justify="center"
    >
      <v-col
        cols="12"
        sm="12"
        md="8"
        lg="8"
        xl="8"
        :class="paddingItemsContainer"
      >
        <v-card class="px-2 py-1">
          <v-row justify="center">
            <v-card-title>Items</v-card-title>
          </v-row>
          <v-row v-for="(item, i) in cartItems" :key="i">
            <v-card-text class="px-0 py-0 mx-2 my-0">
              <v-divider></v-divider>
            </v-card-text>
            <v-layout fill-height>
              <v-flex no-gutters row align-self-center class="px-1">
                <v-row align="center" no-gutters>
                  <v-col justify="start" cols="5" sm="2" md="2" lg="3" xl="3">
                    <v-img
                      class="mx-2 my-2"
                      aspect-ratio="1"
                      :src="returnImage(item)"
                    ></v-img>
                  </v-col>
                  <v-col class="ml-7" cols="4" sm="2" md="2" lg="2" xl="2">
                    <v-row class="font-weight-medium">{{ item.name }}</v-row>
                    <v-row v-if="item.sale && item.sale !== 0">
                      <strike>${{ item.price }}</strike>
                    </v-row>
                    <v-row v-if="item.sale && item.sale !== 0">
                      <span class="red-text">${{ returnPrice(item) }}</span>
                    </v-row>
                    <v-row v-else>${{ returnPrice(item) }}</v-row>
                  </v-col>
                  <v-col
                    class="font-weight-medium mx-2"
                    cols="3"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                    >SIZE:XL</v-col
                  >
                  <v-col
                    class="ml-2 mr-2 my-3"
                    cols="4"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                  >
                    <v-row class="px-0 py-0">
                      <v-card
                        class="d-flex flex-col font-weight-medium"
                        flat
                        tile
                        >QTY X {{ item.cartQuantity }}</v-card
                      >
                    </v-row>
                    <v-row class="px-0 py-0">
                      <v-card class="d-flex flex-row" flat tile>
                        <v-btn
                          @click="increaseCartQuantity(item)"
                          class="px-0 mr-1"
                          left
                          x-small
                          outlined
                          >Add</v-btn
                        >
                        <v-btn
                          @click="decreaseCartQuantity(item)"
                          class="px-0"
                          right
                          x-small
                          outlined
                          >Del</v-btn
                        >
                      </v-card>
                    </v-row>
                  </v-col>
                  <v-col
                    class="font-weight-medium"
                    cols="3"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                    >${{
                      (
                        item.cartQuantity * parseFloat(returnPrice(item))
                      ).toFixed(2)
                    }}</v-col
                  >
                </v-row>

                <v-btn @click="deleteItemFromCart(item)" right icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-row>
        </v-card>
      </v-col>
      <v-col :class="paddingCheckoutContainer">
        <v-card class="px-2 py-1">
          <v-row justify="center">
            <v-card-title>Checkout</v-card-title>
          </v-row>
          <v-divider></v-divider>
          <v-row class="container">
            <v-col class="pb-0" cols="6">
              <v-card-subtitle class="py-0">Subtotal:</v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" class="pb-0">
              <v-card-text class="py-0"
                >${{ subtotalPrice.toFixed(2) }}</v-card-text
              >
            </v-col>
            <v-col cols="6" class="py-0">
              <v-card-subtitle class="py-0">Shipping:</v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" class="py-0">
              <v-card-text v-if="shippingPrice" class="py-0"
                >${{ shippingPrice }}.00</v-card-text
              >
              <v-card-text v-else class="py-0">$0.00</v-card-text>
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-card-subtitle class="py-0">Total:</v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col v-if="shippingPrice" cols="6" class="pt-0">
              <v-card-text class="py-0"
                >${{ (subtotalPrice + shippingPrice).toFixed(2) }}</v-card-text
              >
            </v-col>
            <v-col v-else cols="6" class="pt-0">
              <v-card-text class="py-0"
                >${{ subtotalPrice.toFixed(2) }}</v-card-text
              >
            </v-col>
          </v-row>
          <v-row class="mx-3 mb-2" justify="end">
            <v-btn color="primary" small @click="openConfirmPayment"
              >Checkout</v-btn
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="cartIsEmpty && !loading">
      <v-card class="px-2 mx-8">
        <v-card-title class="font-weight-light">
          Your Cart is Empty<v-icon right light
            >mdi-emoticon-sad-outline</v-icon
          >
        </v-card-title>
        <v-card-subtitle
          >Items are stored temporarily in your browser as cookies. Login to
          your account to save the items in your account</v-card-subtitle
        >
      </v-card>
    </v-row>
    <v-row justify="center" v-if="loading">
      LOADING
    </v-row>
    <Dialog
      :show="confirmPayment"
      title="Confirm Your Order"
      description1="Are you sure you want to purchase the items in your cart?"
      buttonLabel="Yes"
      buttonLabel2="Cancel"
      @click="checkout"
      @click2="closeConfirmPayment"
    />
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Dialog from "../views/CustomComponents/Dialog";
export default {
  name: "Cart",
  components: {
    Dialog
  },
  data: () => ({
    confirmPayment: false,
    items: [],
    subtotal: 0,
    shipping: 0,
    loading: true,
    loadingFailed: false,
    cartIsEmpty: true
  }),
  mounted() {
    this.updateCart();
    this.loading = false;
  },
  methods: {
    updateCart() {
      this.loading = true;
      //set local cart and subtotal to empty first
      var tempItems = [];
      var tempSubtotal = 0;

      //if the cart is not empty
      if (this.cart.items && this.cart.items.length != 0) {
        this.cartIsEmpty = false;

        //for each item in cart
        //1 get images and prices from api and save it to cartItems
        //2 update subtotal price
        this.cart.items.forEach(item => {
          const url =
            process.env.NODE_ENV === "production"
              ? process.env.VUE_APP_API_URL + "/getproducts"
              : "http://localhost:8080/getproducts";
          const params = new URLSearchParams();
          params.append("code", item.code);
          axios
            .get(url, { params })
            .then(res => {
              var tempItem = res.data.product;
              var price =
                tempItem.sale && tempItem.sale > 0
                  ? tempItem.price - tempItem.price * (tempItem.sale / 100)
                  : tempItem.price;
              console.log("price" + price);
              console.log("cart Quantty");
              console.log(item.cartQuantity);
              tempItem.cartQuantity = item.cartQuantity;
              tempItems.push(tempItem);
              tempSubtotal = tempSubtotal + price * item.cartQuantity;
              console.log("subtotal" + tempSubtotal);
              this.items = tempItems;
              this.subtotal = tempSubtotal;
            })
            .catch(err => {
              console.log(err);
            });
        });
      } else {
        //if the cart is empty then set cartItems to empty
        this.cartIsEmpty = true;
        this.items = [];
        this.loading = false;
        this.subtotal = 0;
      }
    },
    returnImage(file) {
      if (file.images) {
        var image =
          "data:" +
          file.images[0].contentType +
          ";base64," +
          file.images[0].image;
        var img = new Image();
        img.src = image;
        return img.src;
      } else {
        return "";
      }
    },
    returnPrice(item) {
      return item.sale && item.sale != 0 && item.price && item.price != 0
        ? (item.price - (item.sale / 100) * item.price).toFixed(2)
        : item.price && item.price != 0
        ? item.price.toFixed(2)
        : 0;
    },
    increaseCartQuantity(item) {
      this.$store
        .dispatch("addItemToCart", item)
        .then(res => {
          let payload = {
            text: res.message,
            timeout: 5000
          };
          this.updateCart();
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          let payload = {
            text: "Failed to add item to cart. Try again.",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    },
    decreaseCartQuantity(item) {
      this.$store
        .dispatch("decreaseItemQuantityFromCart", item)
        .then(res => {
          let payload = {
            text: res.message,
            timeout: 5000
          };
          this.updateCart();
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          let payload = {
            text: "Failed to add item to cart. Try again.",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    },
    deleteItemFromCart(item) {
      this.$store
        .dispatch("deleteItemFromCart", item)
        .then(res => {
          let payload = {
            text: res.message,
            timeout: 5000
          };
          this.updateCart();
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          let payload = {
            text: "Failed to delete item from cart. Try again.",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    },
    openConfirmPayment() {
      this.confirmPayment = true;
    },
    closeConfirmPayment() {
      this.confirmPayment = false;
    },
    checkout() {
      //dispatch the action to call the api to confirm purchase
      this.$store
        .dispatch("checkout")
        .then(res => {
          let payload = {
            text: res.message,
            timeout: 5000
          };
          this.$forceUpdate();
          this.$store.commit("showSnackbar", payload);
        })
        .catch(err => {
          console.log(err);
          let payload = {
            text: "Failed to checkout. Try again.",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
      this.closeConfirmPayment();
    }
  },
  computed: {
    ...mapGetters(["cart"]),
    cartItems() {
      return this.items;
    },
    subtotalPrice() {
      return this.subtotal;
    },
    shippingPrice() {
      return this.shipping;
    },
    paddingItemsContainer() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "mx-1";
        case "sm":
          return "mx-1";
        case "md":
          return "mx-2";
        case "lg":
          return "ml-12";
        case "xl":
          return "ml-12";
        default:
          return "mx-1";
      }
    },
    paddingCheckoutContainer() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "";
        case "sm":
          return "";
        case "md":
          return "mx-2";
        case "lg":
          return "mr-12 ml-2";
        case "xl":
          return "mr-12 ml-2";
        default:
          return "mx-1";
      }
    }
  },
  watch: {
    cart: function() {
      this.updateCart();
    }
  }
};
</script>
<style lang="css" scoped>
.red-text {
  color: red;
  margin: 0;
  font-weight: bold;
}
</style>
