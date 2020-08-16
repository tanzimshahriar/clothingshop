<template>
  <v-container fill-height fluid>
    <v-layout column>
      <v-flex xs12 align-start>
        <Title title="Orders"></Title>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Title from "../../views/CustomComponents/title";
export default {
  name: "adminPanel",
  components: {
    Title
  }
};
</script>
