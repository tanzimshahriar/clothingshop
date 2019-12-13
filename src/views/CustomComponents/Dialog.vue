<template>
  <div class="text-xs-center">
    <v-dialog v-model="this.show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{
          this.title
        }}</v-card-title>

        <v-card-text class="py-3">{{ this.description1 }}</v-card-text>
        <v-card-text v-if="description2Exists" class="pb-3 pt-0">{{
          this.description2
        }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="btnClicked">{{
            this.buttonLabel
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description1: {
      type: String,
      required: true
    },
    description2: {
      type: String
    },
    buttonLabel: {
      type: String,
      required: true
    }
  },
  methods: {
    btnClicked() {
      this.$emit("click");
    }
  },
  watch: {
    show: function(newVal) {
      this.show = newVal;
    },
    title: function(newVal) {
      this.show = newVal;
    },
    description1: function(newVal) {
      this.show = newVal;
    },
    description2: function(newVal) {
      this.show = newVal;
    },
    buttonLabel: function(newVal) {
      this.show = newVal;
    }
  },
  computed: {
    description2Exists() {
      return this.description2 && this.description2 !== "" ? true : false;
    }
  }
};
</script>
