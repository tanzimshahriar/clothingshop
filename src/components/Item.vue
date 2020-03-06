<template>
  <v-col align-self="start" justify-self="start">
    <v-card class="d-flex flex-direction: row">
      <v-col cols="12" sm="12" md="7" lg="7" xl="7">
        <v-row class="pl-3" align-content="left">
        <v-btn small rounded text @click="goBack">
          <v-icon color="black">mdi-arrow-left</v-icon>back
        </v-btn>
        </v-row>
        <v-carousel height="100%" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item contain v-for="(image, i) in item.images" :key="i">
            <v-img contain class="align-end .d-flex" aspect-ratio="1" :src="returnImg(image)"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col class="px-6">
        <v-row>
          <v-card-subtitle class="overline px-0 mx-0 py-1">Name</v-card-subtitle>
        </v-row>
        <v-row class="font-weight-light headline pb-3">{{item.name}}</v-row>
        <v-row>
          <v-card-subtitle class="overline px-0 mx-0 py-1">Price</v-card-subtitle>
        </v-row>
        <v-row v-if="item.sale && item.sale!=0" class="headline font-weight-light pb-2">
          <strike>${{ item.price }}</strike>
          <span class="red-text font-weight-bold">${{ finalPrice }}</span>
          <span class="sale-text">(ON {{ item.sale }}% SALE)</span>
        </v-row>
        <v-row>
          <v-card-subtitle class="overline px-0 mx-0 py-1">Description</v-card-subtitle>
        </v-row>
        <v-row class="font-weight-light headline pb-2">{{item.description}}</v-row>
        <v-row class="py-2">
          <v-btn color="primary" @click="addItemToCart">Add to Cart</v-btn>
          <v-btn
            class="align-end ml-4"
            fab
            light
            x-small
            color="white"
            @click="itemHearted(product)"
          >
            <v-icon color="black">mdi-heart-outline</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  // mounted(){
  //     console.log(this.item.images.length)
  // },
  // data: () => ({

  // }),
  methods: {
    itemHearted(item) {
      console.log("hearted item: ");
      console.log(item.name);
    },
    returnImg(file) {
      var image = "data:" + file.contentType + ";base64," + file.image;
      var img = new Image();
      img.src = image;
      return img.src;
    },
    goBack() {
      this.$emit("close");
    },
    addItemToCart() {
      this.$store
        .dispatch("addItemToCart", this.item)
        .then(res => {
          let payload = {
            text: res.message,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        })
        .catch(err => {
          console.log(err);
          let payload = {
            text: "Failed to add item to cart. Try again.",
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    }
  },
  computed: {
    finalPrice() {
      return this.item.sale && this.item.sale != 0
        ? this.item.price - this.item.price * (this.item.sale / 100).toFixed(2)
        : this.item.price;
    }
  }
};
</script>
<style scoped>
.red-text {
  color: red;
  padding: 0;
  margin: 0;
}
.sale-text {
  font-size: 15px;
  padding-left: 5px;
}
</style>