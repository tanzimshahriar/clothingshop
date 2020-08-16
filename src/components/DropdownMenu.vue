<template>
  <v-row
    class="px-0 py-0 mx-0 my-0 grey lighten-1 hidden-md-and-down"
    justify="center"
  >
    <v-card-subtitle v-for="(category, i) in categories" :key="i">
      {{ category }}
      <v-icon small color="black">mdi-chevron-down</v-icon>
    </v-card-subtitle>
  </v-row>
</template>

<script>
export default {
  name: "DropdownMenu",
  //   components: {
  //     Dropdown
  //   },
  data: () => ({
    categories: ["New", "Tops", "Bottoms", "Shoes", "Accessories", "Sale"]
  })
  //   methods: {

  //   }
};
</script>
