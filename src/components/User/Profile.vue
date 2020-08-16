<template>
  <v-col cols="12">
    <v-row align="center" justify="center"
      ><v-card-title class="font-weight-medium">Orders</v-card-title></v-row
    >
    <v-row class="mx-0 my-0 px-0 py-0">
      <v-card-text v-if="loading">Loading</v-card-text>
      <v-col v-else :class="expansionPanelClass" justify-self="center">
        <v-expansion-panels>
          <v-expansion-panel v-for="(order, index) in orders" :key="index">
            <v-expansion-panel-header>
              <v-col
                class="mx-0 my-0 py-0 px-0"
                align-self="center"
                justify-self="center"
              >
                <v-row justify="center" class="mx-0 mb-2 py-0 px-0 overline"
                  >Order id#{{ order._id }}</v-row
                >
                <v-row class="mx-0 my-0 py-0 px-0">
                  <v-col class="mx-0 my-0 py-0 px-0">
                    <v-row class="px-1 py-1">
                      {{ getDate(order.time) }}
                    </v-row>
                    <v-row class="px-1 py-1">
                      {{ getTime(order.time) }}
                    </v-row>
                  </v-col>
                  <v-col class="mx-0 my-0 py-0 px-0">
                    <v-row class="px-1 py-2 my-0 mx-0" justify="end">
                      Total: ${{
                        (order.subtotal + order.shippingPrice).toFixed(2)
                      }}
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card
                flat
                class=".d-flex flex-direction: column px-1 py-1 mx-0 my-0"
                v-for="(item, i) in order.items"
                :key="i"
              >
                <v-divider class="my-2"></v-divider>
                <v-row justify="center" class="title font-weight-light">{{
                  item.name
                }}</v-row>
                <v-row>
                  <v-card-subtitle
                    >Price: ${{ getPrice(item).toFixed(2) }}</v-card-subtitle
                  >
                  <v-card-subtitle
                    >QTY X {{ item.cartQuantity }}</v-card-subtitle
                  >
                  <v-card-subtitle
                    >Subtotal: ${{
                      (getPrice(item) * item.cartQuantity).toFixed(2)
                    }}</v-card-subtitle
                  >
                </v-row>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import axios from "axios";
export default {
  name: "profile",
  data() {
    return {
      orders: [],
      loading: true
    };
  },
  methods: {
    getOrdersFromApi() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.$store.state.user.token
      };
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/getorders"
          : "http://localhost:8080/getorders";
      axios
        .get(url, { headers })
        .then(res => {
          this.orders = res.data;
          this.loading = false;
        })
        .catch(err => {
          //eslint-disable
          throw err;
          //show sncakbar that item hasnt been deleted
          //eslint-enable
        });
    },
    getDate(datetime) {
      var newDateTime = new Date(datetime);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return newDateTime.toLocaleDateString(undefined, options);
    },
    getTime(datetime) {
      var newDateTime = new Date(datetime);
      const options = { hour: "2-digit", minute: "2-digit", hour12: true };
      return newDateTime.toLocaleTimeString([], options);
    },
    getPrice(item) {
      return item.sale && item.sale != 0
        ? item.price - item.price * (item.sale / 100).toFixed(2)
        : item.price;
    }
  },
  computed: {
    expansionPanelClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "py-0 my-0";
        case "sm":
          return "mx-2 py-0 my-0";
        case "md":
          return "mx-8 px-8 py-0 my-0";
        case "lg":
          return "mx-12 px-12";
        case "xl":
          return "mx-12 px-12";
        default:
          return "py-0 my-0";
      }
    }
  },
  mounted() {
    this.getOrdersFromApi();
  }
};
</script>
