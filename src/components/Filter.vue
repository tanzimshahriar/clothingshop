<template>
  <div class="filter">
    <v-col class="my-0 mx-0 py-0 px-0 font-weight-regular hidden-sm-and-down overline">Filter</v-col>
      <v-row justify="center" align="center">
        <Dropdown :selectedItem="defaultSort" :items="sortOptions" @select="selectSort"></Dropdown>
      <Dropdown
        :selectedItem="defaultSize"
        :items="sizeOptions"
        v-bind:radio="true"
        @select="checkSizeClick"
      ></Dropdown>
      <v-col align="start" cols="12" sm="6" md="3" xl="3" class="py-0">
        <v-col class="px-0 mt-2 mb-0 mx-8 py-0 font-weight-medium">PRICE BETWEEN</v-col>
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
  </div>
</template>

<script>
import Dropdown from "../views/CustomComponents/Dropdown";
export default {
  name: "filter",
  components: {
    Dropdown
  },
  data: () => ({
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
        title: "All",
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
    max: 2500,
    slider: 1,
    range: [1, 2500]
  }),
  methods: {
    selectSort(item) {
      this.defaultSort = item;
      //call api to fetch sorted products
    },
    checkSizeClick(item) {
      if (item.title == "All") {
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
  }
};
</script>
