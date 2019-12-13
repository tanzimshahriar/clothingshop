<template>
  <v-row no-gutters class="mt-1">
    <v-col no-gutters class="grey lighten-4 py-2 px-2" align="center">
      <v-col class="my-0 mx-0 py-0 px-0 font-weight-regular hidden-sm-and-down overline">Filter</v-col>
      <v-row justify="center" align="center">
        <Dropdown :selectedItem="defaultSort" :items="sortOptions" @select="selectSort"></Dropdown>
      <Dropdown
        :selectedItem="defaultSize"
        :items="sizeOptions"
        v-bind:radio="true"
        @select="checkSizeClick"
      ></Dropdown>
      <v-col align="center" cols="12" sm="3" md="3" xl="3" class="py-0">
        <v-col class="px-0 mt-2 mb-0 mx-0 py-0 font-weight-bold">PRICE</v-col>
        <v-range-slider
          v-model="range"
          thumb-label
          :max="max"
          :min="min"
          hide-details
          color="grey"
          class="align-center mx-8"
        >
          <template v-slot:prepend>
            <v-card-text class="px-0 py-0 mx-0 my-0 font-weight-light">${{range[0]}}</v-card-text>
          </template>
          <template v-slot:append>
            <v-card-text class="px-0 py-0 mx-0 my-0 font-weight-light">${{range[1]}}</v-card-text>
          </template>
        </v-range-slider>
      </v-col>
      </v-row>
      
    </v-col>
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
  </v-row>
</template>

<script>
import Dropdown from "../views/CustomComponents/Dropdown";
export default {
  name: "home",
  components: {
    Dropdown
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
    ],
    sortOptions: [
      {
        title: "Sort: none",
        icon: "mdi-menu-down"
      },
      {
        title: "Name",
        icon: "mdi-sort-ascending"
      },
      {
        title: "Name",
        icon: "mdi-sort-descending"
      },
      {
        title: "Price",
        icon: "mdi-sort-ascending"
      },
      {
        title: "Price",
        icon: "mdi-sort-descending"
      },
      {
        title: "Quantity",
        icon: "mdi-sort-ascending"
      },
      {
        title: "Quantity",
        icon: "mdi-sort-descending"
      }
    ],
    defaultSort: {
      title: "Sort: none",
      icon: "mdi-menu-down"
    },
    defaultSize: {
      title: "Size",
      icon: "mdi-menu-down"
    },
    sizeOptions: [
      {
        title: "All Sizes",
        radio: false
      },
      {
        title: "XXL",
        radio: false
      },
      {
        title: "XL",
        radio: false
      },
      {
        title: "M",
        radio: false
      },
      {
        title: "S",
        radio: false
      }
    ],
    min: 1,
    max: 2999,
    slider: 1,
    range: [1, 2999]
  }),
  methods: {
    selectSort(item) {
      this.defaultSort = item;
      //call api to fetch sorted products
    },
    checkSizeClick(item) {
      if (item.title == "All Sizes") {
        if (item.radio) {
          this.sizeOptions.forEach(opti => {
            opti.radio = true;
          });
          this.sizeOptions = this.sizeOptions;
        } else {
          this.sizeOptions.forEach(opt => {
            opt.radio = false;
          });
          this.sizeOptions = this.sizeOptions;
        }
      } else {
        //deselect all button when something is deselected
        if (!item.radio) {
          this.sizeOptions.forEach(optio => {
            optio.radio = false;
          });
        }
      }
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
