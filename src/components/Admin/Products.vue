<template>
  <v-container fill-height fluid>
    <v-layout row align-start justify-center class="mx-3">
      <v-flex row justify-center>
        <Title title="Products"></Title>
        <v-row justify="center">
          <Dropdown 
            :selectedItem="selectedSort" 
            :items="sortOptions" 
            @select="selectSort">
          </Dropdown>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Title from "../../views/CustomComponents/title";
import Dropdown from "../../views/CustomComponents/Dropdown";
export default {
  name: "Products",
  components: {
    Title,
    Dropdown
  },
  data: () => ({
    sortOptions: [
      {
        title: "Sort By Name",
        icon: "mdi-sort-ascending"
      },
      {
        title: "Sort By Name",
        icon: "mdi-sort-descending"
      },
      {
        title: "Sort By Price",
        icon: "mdi-sort-ascending"
      },
      {
        title: "Sort By Price",
        icon: "mdi-sort-descending"
      },
      {
        title: "Sort By Quantity",
        icon: "mdi-sort-ascending"
      },
      {
        title: "Sort By Quantity",
        icon: "mdi-sort-descending"
      }
    ],
    selectedSort: {
      title: "Sort By Name",
      icon: "mdi-sort-ascending"
    }
  }),
  methods: {
      selectSort(item){
          this.selectedSort = item;
      }
  },
  computed: {
    buttonHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 35;
        case "sm":
          return 40;
        case "md":
          return 50;
        case "lg":
          return 60;
        case "xl":
          return 65;
        default:
          return 35;
      }
    },
    buttonWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "50";
        case "sm":
          return "57";
        case "md":
          return "65";
        case "lg":
          return "100";
        case "xl":
          return "120";
        default:
          return "50";
      }
    }
  }
};
</script>
