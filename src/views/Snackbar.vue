<template>
  <div>
    <v-snackbar
      bottom
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :multi-line="snackbar.multiline === true"
    >
      {{ snackbar.text }}

      <v-btn text @click="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  methods: {
    ...mapMutations(["closeSnackbar"])
  }
};
</script>
