<template>
  <div class="title">
    <v-layout column align-center width>
      <v-card-title :class="titleClass">{{ this.title }}</v-card-title>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "adminPanel",
  props: {
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    titleClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "display-0 font-weight-light py-0";
        case "sm":
          return "display-0 font-weight-light py-0";
        case "md":
          return "display-1 font-weight-light py-0";
        case "lg":
          return "display-2 font-weight-light py-0";
        case "xl":
          return "display-2 font-weight-light py-0";
        default:
          return "display-1 font-weight-light py-0";
      }
    }
  },
  watch: {
    title: function(newVal) {
      this.title = newVal;
    }
  }
};
</script>
<style scoped>
.title {
  width: 100%;
}
</style>
