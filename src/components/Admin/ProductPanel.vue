<template>
  <v-card class="px-0 py-0 mx-0 my-0">
    <v-layout no-gutters fill-height align-center justify-start class="px-0 py-0 mx-0 my-0">
      <v-flex no-gutters column :class="flexClass">
        <v-row justify="center" class="px-0 py-0 mx-0 my-0">
          <v-card-title class="font-weight-light" primary-title>
            {{
            header
            }}
          </v-card-title>
        </v-row>
        <v-card-subtitle class="overline px-0 mx-0">Details</v-card-subtitle>
        <v-text-field
          dense
          label="Name"
          :error-messages="nameError"
          v-model="item.name"
          type="text"
        />
        <v-textarea
          class="description"
          :error-messages="descriptionError"
          label="Description"
          v-model="item.description"
        />

        <v-card-subtitle class="overline px-0 mx-0">Images</v-card-subtitle>
        <v-card  v-if="type=='add'" class="d-flex align-content-space-around flex-wrap px-0" flat tile>
          <v-card
            v-for="(n, index) in item.images"
            :key="index"
            class="pr-4"
            tile
            flat
            width="100"
            height="120"
          >
            <v-img contain width="100" height="100" :src="returnImage(n)">
              <v-btn fab color="red" x-small top right @click="deleteImage(index)">
                <v-icon color="white">mdi-close</v-icon>
              </v-btn>
            </v-img>
          </v-card>
        </v-card>
        <v-row class="mx-0 my-0 px-0 align-self-start">
          <v-btn small text @click="$refs.inputUpload.click()">
            <v-icon small left>mdi-camera</v-icon>Add Image
          </v-btn>
        </v-row>
        <v-row
          class="mx-0 my-0 px-0 align-self-start font-weight-light red--text"
          v-if="this.imageError && this.imageError != ''"
        >{{ this.imageError }}</v-row>
        <v-row class="mx-0 my-0">
          <v-card-subtitle
            v-if="this.fileError && this.fileError !== ''"
            class="font-weight-light mx-0 my-0 py-0 px-0 red--text text--lighten-1"
          >{{ this.fileError }}</v-card-subtitle>
          <v-spacer></v-spacer>
        </v-row>
        <input
          ref="inputUpload"
          accept="image/png, image/jpeg"
          type="file"
          multiple="multiple"
          v-show="false"
          @change="onFileSelected"
        />
        <!-- <v-file-input @change="onFileSelected" v-model="file" v-bind:clearable="false" :rules="rules" accept="image/png, image/jpeg" flat label="Add Image" prepend-icon="mdi-camera"></v-file-input> -->
        <v-card-subtitle class="overline">Price</v-card-subtitle>

        <v-card class="d-flex align-content-space-around flex-wrap px-0" flat>
          <v-card class="pr-4" flat max-width="200">
            <v-text-field
              dense
              prefix="$"
              label="Price"
              v-model="item.price"
              type="number"
              step="any"
              :error-messages="priceError"
            />
          </v-card>
          <v-card class="pr-4" flat max-width="200">
            <v-text-field dense type="number" suffix="%" v-model="item.sale" step="any">
              <template v-slot:label>
                <div>
                  Sale
                  <small>(optional)</small>
                </div>
              </template>
            </v-text-field>
          </v-card>
        </v-card>

        <v-card-subtitle class="overline">Quantity and Size</v-card-subtitle>

        <v-card class="d-flex align-content-space-around flex-wrap px-0" flat tile>
          <v-card v-for="n in item.quantity" :key="n.size" class="pr-4" tile flat max-width="200">
            <v-text-field dense type="number" step="any" min="0" v-model="n.number">
              <template v-slot:label>
                <div>
                  Quantity
                  <small>{{ n.size }}</small>
                </div>
              </template>
            </v-text-field>
          </v-card>
        </v-card>
        <v-card-actions class="mt-0 px-0 mb-6">
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="btnClicked">{{ btnLabel }}</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    product: {
      type: Object
    }
  },
  data: () => ({
    item: {},
    uploading: false,
    fileError: "",
    nameError: "",
    descriptionError: "",
    priceError: "",
    imageError: ""
  }),
  methods: {
    btnClicked() {
      if (!this.item.name || this.item.name == "") {
        this.nameError = "Name can not be empty";
      } else {
        this.nameError = "";
      }
      if (!this.item.description || this.item.description == "") {
        this.descriptionError = "Description can not be empty";
      } else {
        this.descriptionError = "";
      }
      if (!this.item.price) {
        this.priceError = "Price can not be empty";
      } else {
        this.priceError = "";
      }
      if (!this.item.images || this.item.images.length == 0) {
        this.imageError = "Add at least one image";
      } else {
        this.imageError = "";
      }
      if (this.hasErrors()) {
        return;
      }
      this.saveProduct();
    },
    cancel() {
      this.$emit("cancel");
    },
    deleteImage(index) {
      this.item.images.splice(index, 1);
    },

    saveProduct() {
      const item = this.item;
      if (this.type == "add") {
        const data = new FormData();

        data.append("name", item.name);
        data.append("description", item.description);
        data.append("price", item.price);
        item.sale ? data.append("sale", item.sale) : null;

        Object.keys(item.quantity).forEach(function(key) {
          var quantity = Object.values(item.quantity)[key];
          data.append(
            "size:" + quantity.size,
            quantity.number ? quantity.number : 0
          );
        });

        Object.keys(item.images).forEach(function(key) {
          var image = Object.values(item.images)[key];
          data.append("image:" + key, image);
        });

        this.$store
          .dispatch("addProduct", data)
          .then(res => {
            //show product added message with snackbar
            console.log(res);
            this.$emit("click", this.item);
          })
          .catch(err => {
            console.log(err);
            //show error with snackbar
          });
        console.log("Call api to add " + this.item.name);
      } else {
        console.log(
          "Call api to edit " + this.product.name + " to " + this.item.name
        );
        this.$emit("click", this.item);
      }
      //reload table
    },
    onFileSelected(e) {
      var images = [];
      var files = e.target.files;
      for (var i = 0; i < files.length; i++) {
        if (!(files[i].type == "image/jpeg" || files[i].type == "image/png")) {
          this.fileError = "*must be an image";
          return;
        } else if (files[i].size > 2000000) {
          this.fileError = "*all files must be less than 2 MB";
          return;
        } else {
          this.fileError = "";
          images.push(files[i]);
        }
      }
      this.item.images = this.item.images.concat(images);
      this.$refs.inputUpload.value = "";
    },
    hasErrors() {
      return this.nameError == "" &&
        this.descriptionError == "" &&
        this.priceError == "" &&
        this.imageError == "" &&
        this.fileError == ""
        ? false
        : true;
    },
    returnImage(file) {
      return URL.createObjectURL(file);
    }
  },
  watch: {
    type: function(newVal) {
      this.type = newVal;
    },
    product: function(newVal) {
      this.product = newVal;
    }
  },
  mounted() {
    this.item = { ...this.product };
  },
  // updated() {
  //   console.log(this.product.title);
  // },
  computed: {
    header() {
      return this.type == "add" ? "Add Product" : "Edit Product";
    },
    btnLabel() {
      return this.type == "add" ? "Add" : "Save";
    },
    flexClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "mx-2 my-2";
        case "sm":
          return "mx-2 my-2";
        case "md":
          return "mx-12 my-12";
        case "lg":
          return "mx-12 px-12 my-12";
        case "xl":
          return "mx-12 px-12 my-12";
        default:
          return "mx-2 my-2";
      }
    }
  }
};
</script>
