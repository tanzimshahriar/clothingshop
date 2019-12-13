<template>
  <v-container class="px-0 mx-0 py-0 my-0" fluid fill-height>
    <v-layout fill-height>
      <v-flex row>
        <v-row no-gutters class="mt-1">
          <v-col no-gutters class="grey lighten-4 py-2 px-2" align="center">
            <FilterComponent />
            <v-flex no-gutters row align-self-center align-center justify-center class="py-3">
              <v-card
                v-for="product in products"
                v-bind:key="product.id"
                class="mt-2 mb-2 ml-2 mr-2"
                :height="cardHeight"
                :width="cardWidth"
                elevation="1"
              >
                <v-card-title>{{ product.title }}</v-card-title>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterComponent from "./Filter";
export default {
  name: "home",
  components: {
    FilterComponent
  },
  data: () => ({
    products: [
      {
        title: "T-Shirt",
        price: 15,
        desc: "yjfjhj"
      },
      {
        title: "Jeans",
        price: 40,
        desc: "kghhjghjghgj"
      },
      {
        title: "Cap",
        price: 60,
        desc: "kghhjghjghgj"
      },
      {
        title: "Shoe",
        price: 90,
        desc: "kghhjghjghgj"
      },
      {
        title: "Watch",
        price: 80,
        desc: "kghhjghjghgj"
      },
      {
        title: "Belt",
        price: 80,
        desc: "kghhjghjghgj"
      },
      {
        title: "Dress",
        price: 60,
        desc: "kghhjghjghgj"
      }
    ]
  }),
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
