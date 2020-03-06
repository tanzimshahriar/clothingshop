<template>
  <v-col align-self="start" justify-self="start" cols="12">
    <v-row justify="center">
      <v-card-title class="font-weight-medium">
        <v-icon left color="black">mdi-cart</v-icon>Shopping Cart
      </v-card-title>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="8" lg="8" xl="8" :class="paddingItemsContainer">
        <v-card class="px-2 py-1">
          <v-row justify="center">
            <v-card-title>Items</v-card-title>
          </v-row>
          <v-row v-for="(item, i) in cart" :key="i">
            <v-card-text class="px-0 py-0 mx-2 my-0">
              <v-divider></v-divider>
            </v-card-text>
            <v-layout fill-height>
              <v-flex no-gutters row align-self-center class="px-1">
                <v-row align="center" no-gutters>
                  <v-col justify="start" cols="5" sm="3" md="3" lg="3" xl="3">
                    <v-img class="mx-2 my-2" aspect-ratio="1" :src="returnImage(item)"></v-img>
                  </v-col>
                  <v-col class="ml-7" cols="4" sm="2" md="2" lg="2" xl="2">
                    <v-row class="font-weight-medium">{{item.name}}</v-row>
                    <v-row v-if="item.sale && item.sale!==0">
                      <strike>${{item.price}}</strike>
                    </v-row>
                    <v-row v-if="item.sale && item.sale!==0">
                      <span class="red-text">${{returnPrice(item)}}</span>
                    </v-row>
                    <v-row v-else>${{returnPrice(item)}}</v-row>
                    
                  </v-col>
                  <v-col cols="4" sm="2" md="2" lg="2" xl="2">Size</v-col>
                  <v-col cols="4" sm="2" md="2" lg="2" xl="2">Quantity</v-col>
                  <v-col cols="4" sm="2" md="2" lg="2" xl="2">Total Price</v-col>
                </v-row>
                
                  <v-btn right icon>
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
              <v-card-text class="py-0">${{countSubtotal}}</v-card-text>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-card-subtitle class="py-0">Shipping:</v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" class="py-0">
              <v-card-text class="py-0">${{shippingPrice}}.00</v-card-text>
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-card-subtitle class="py-0">Total:</v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" class="pt-0">
              <v-card-text class="py-0">${{(parseFloat(countSubtotal)+10).toFixed(2)}}</v-card-text>
            </v-col>
          </v-row>
          <v-row class="mx-3 mb-2" justify="end">
            <v-btn color="primary" small @click="openConfirmPayment">Checkout</v-btn>
          </v-row>
        </v-card>
      </v-col>
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
import { mapState } from "vuex";
import Dialog from "../views/CustomComponents/Dialog";
export default {
  name: "Cart",
  components: {
    Dialog
  },
  data: () => ({
    subtotal: "",
    shippingPrice: "10",
    confirmPayment: false
  }),
  methods: {
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
    openConfirmPayment() {
      this.confirmPayment = true;
    },
    closeConfirmPayment() {
      this.confirmPayment = false;
    },
    checkout() {
      //dispatch the action to call the api to confirm purchase
      console.log("checkout called");
      this.closeConfirmPayment();
    }
  },
  computed: {
    ...mapState(["cart"]),
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
    },
    countSubtotal() {
      console.log("countSubtotal");
      var subtotal = 0;
      console.log(this.$store.state.cart);
      this.$store.state.cart.forEach(item => {
        subtotal = subtotal + parseFloat(this.returnPrice(item));
      });
      return subtotal && subtotal != 0 ? subtotal.toFixed(2) : 0;
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
