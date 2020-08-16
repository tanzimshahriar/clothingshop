<template>
  <v-card class="px-0 py-0 mx-0 my-0">
    <v-overlay :value="uploading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-layout
      no-gutters
      fill-height
      align-center
      justify-start
      class="px-0 py-0 mx-0 my-0"
    >
      <v-flex no-gutters column :class="flexClass">
        <v-row justify="center" class="px-0 py-0 mx-0 my-0">
          <v-card-title class="font-weight-light" primary-title>
            {{ header }}
          </v-card-title>
        </v-row>
        <v-card-subtitle class="overline px-0 mx-0">Details</v-card-subtitle>
        <v-text-field
          class="mb-2"
          dense
          label="Name"
          :error-messages="nameError"
          v-model="item.name"
          type="text"
        />
        <v-text-field
          class="mb-2"
          dense
          label="Product Code"
          :error-messages="codeError"
          v-model="item.code"
          type="text"
        />
        <v-text-field
          v-if="type == 'edit'"
          disabled
          class="mt-2"
          dense
          :error-messages="codeError"
          v-model="item._id"
          type="text"
        >
          <template v-slot:label>
            <div>
              Product ID
              <small>(Product id can't be changed)</small>
            </div>
          </template>
        </v-text-field>
        <v-textarea
          class="description"
          :error-messages="descriptionError"
          label="Description"
          v-model="item.description"
        />
        <v-card-subtitle class="overline px-0 mx-0"
          >Item for Gender</v-card-subtitle
        >
        <div class="gender-row" v-if="item.gender">
          <v-checkbox
            v-model="item.gender.male"
            label="Male"
            color="primary"
            class="pr-4"
          ></v-checkbox>
          <v-checkbox
            v-model="item.gender.female"
            label="Female"
            color="primary"
          ></v-checkbox>
        </div>
        <v-card-subtitle class="overline px-0 mx-0">Category</v-card-subtitle>
        <v-card-subtitle class="pt-0"
          >*Click to select categories for this item</v-card-subtitle
        >
        <v-card
          class="d-flex align-content-space-around flex-wrap py-2"
          outlined
        >
          <div v-for="(category, index) in availableCategories" :key="index">
            <v-btn
              @click="selectCategory(category._id)"
              small
              class="mx-3 my-2"
              :color="isCategorySelected(category._id)"
            >
              {{ category.name }}
            </v-btn>
          </div>
        </v-card>
        <v-card-subtitle class="overline px-0 mx-0">Images</v-card-subtitle>
        <v-card
          class="d-flex align-content-space-around flex-wrap px-0"
          flat
          tile
        >
          <v-card
            v-for="(n, index) in item.images"
            :key="index"
            class="pr-4"
            tile
            flat
            width="100"
            height="120"
          >
            <v-img
              alt="product-image"
              contain
              width="100"
              height="100"
              :src="returnImage(n)"
            >
              <v-btn
                fab
                color="red"
                x-small
                top
                right
                @click="deleteImage(index)"
              >
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
          >{{ this.imageError }}</v-row
        >
        <v-row class="mx-0 my-0">
          <v-card-subtitle
            v-if="this.fileError && this.fileError !== ''"
            class="font-weight-light mx-0 my-0 py-0 px-0 red--text text--lighten-1"
            >{{ this.fileError }}</v-card-subtitle
          >
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
            <v-text-field
              dense
              type="number"
              suffix="%"
              v-model="item.sale"
              step="any"
            >
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
        <v-card-subtitle class="pt-0"
          >*Click to select the sizes for this item</v-card-subtitle
        >
        <v-card
          class="d-flex align-content-space-around flex-wrap py-2 mb-8"
          outlined
        >
          <div v-for="(size, index) in availableSizes" :key="index">
            <v-btn
              @click="selectSize(size._id)"
              small
              class="mx-3 my-2"
              :color="isSizeSelected(size._id)"
            >
              {{ size.name }}
            </v-btn>
          </div>
        </v-card>
        <v-card-subtitle class="pt-0"
          >*fill the quantity of each size</v-card-subtitle
        >
        <v-card
          class="d-flex align-content-space-around flex-wrap px-0 mt-8"
          flat
          tile
        >
          <v-card
            v-for="(n, i) in item.sizeAndQuantityAvailable"
            :key="i"
            class="pr-4"
            tile
            flat
            max-width="200"
          >
            <v-text-field
              dense
              type="number"
              step="any"
              min="0"
              v-model="n.quantityAvailable"
            >
              <template v-slot:label>
                <div>
                  Quantity
                  <small>{{ getSizeFromId(n.size) }}</small>
                </div>
              </template>
            </v-text-field>
          </v-card>
        </v-card>
        <v-card-actions class="mt-0 px-0 mb-6">
          <v-spacer></v-spacer>
          <v-btn :disabled="uploading" @click="cancel">Cancel</v-btn>
          <v-btn
            :disabled="uploading"
            color="primary"
            @click="submitBtnClicked"
            >{{ btnLabel }}</v-btn
          >
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import axios from "axios";
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
    code: "",
    fileError: "",
    nameError: "",
    codeError: "",
    descriptionError: "",
    priceError: "",
    imageError: "",
    deletedOldImages: [],
    availableSizes: [],
    availableCategories: []
  }),
  methods: {
    //get all categories from api
    loadCategoriesFromApi() {
      this.$store
        .dispatch("getCategories")
        .then(res => {
          this.availableCategories = res.data.categories;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // get all sizes from api
    loadSizesFromApi() {
      this.$store
        .dispatch("getSizes")
        .then(res => {
          this.availableSizes = res.data.sizes;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSizeFromId(id) {
      var name = "";
      this.availableSizes.forEach(function(size) {
        if (size._id == id) {
          name = size.name;
        }
      });
      return name == "" ? null : name;
    },
    //if category is selected return primary color otherwise return light
    isCategorySelected(id) {
      var selected = false;
      this.item.categories.forEach(function(category) {
        if (category === id) {
          selected = true;
        }
      });
      return selected ? "primary" : "light";
    },

    //if size is selected return primary color otherwise return light
    isSizeSelected(id) {
      var selected = false;
      this.item.sizeAndQuantityAvailable.forEach(function(size) {
        if (size.size === id) {
          selected = true;
        }
      });
      return selected ? "primary" : "light";
    },

    selectCategory(id) {
      //check if the category already exists
      var exists = false;
      var index = -1;
      this.item.categories.forEach(function(category, i) {
        if (category === id) {
          exists = true;
          index = i;
        }
      });
      //if it exists then delete it, otherwise create the category
      if (exists) {
        this.item.categories.splice(index, 1);
      } else {
        this.item.categories.push(id);
      }
    },
    selectSize(id) {
      //check if the category already exists
      var exists = false;
      var index = -1;
      this.item.sizeAndQuantityAvailable.forEach(function(size, i) {
        if (size.size === id) {
          exists = true;
          index = i;
        }
      });
      //if it exists then delete it, otherwise add the size for the item
      if (exists) {
        this.item.sizeAndQuantityAvailable.splice(index, 1);
      } else {
        var temp = { size: id, quantityAvailable: 0 };
        this.item.sizeAndQuantityAvailable.push(temp);
      }
    },

    submitBtnClicked() {
      if (!this.item.code || this.item.code == "") {
        this.codeError = "Product code can not be empty";
      } else {
        this.codeError = "";
      }
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
      //if an old image is edited save that image path
      if (this.item.images[index].contentType) {
        this.deletedOldImages.push(this.item.images[index].path);
      }
      this.item.images.splice(index, 1);
    },
    makeApiRequestForSaveProduct() {
      const item = this.item;
      const data = new FormData();
      const deletedOldImages = this.deletedOldImages;

      var isNewProduct = this.type == "add" ? true : false;
      this.item._id ? data.append("_id", item._id) : null;
      data.append("isNewProduct", isNewProduct);
      data.append("code", item.code);
      data.append("name", item.name);
      data.append("description", item.description);
      data.append("price", item.price);
      data.append("gender", JSON.stringify(item.gender));
      data.append("categories", JSON.stringify(item.categories));
      data.append(
        "sizeAndQuantityAvailable",
        JSON.stringify(item.sizeAndQuantityAvailable)
      );
      data.append("sale", item.sale);
      deletedOldImages.length == 0
        ? null
        : deletedOldImages.length == 1
        ? data.append("deletedOldImage", deletedOldImages[0])
        : Object.keys(deletedOldImages).forEach(function(key) {
            var deletedOldImage = Object.values(deletedOldImages)[key];
            data.append("deletedOldImages", deletedOldImage);
          });

      //add images to formdata
      Object.keys(item.images).forEach(function(key) {
        var image = Object.values(item.images)[key];
        image.contentType ? null : data.append("images", image);
      });

      const headers = {
        Authorization: this.$store.state.user.token
      };
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/addproduct"
          : "http://localhost:8080/addproduct";
      axios
        .post(url, data, {
          headers
        })
        .then(async res => {
          let payload = {
            text:
              this.type == "add"
                ? item.name + " has been added successfully."
                : item.name + " has been updated successfully.",
            timeout: 5000
          };
          if (res.data.result == "success" && res.status == 200) {
            setTimeout(() => {
              this.uploading = false;
              this.$emit("click");
              this.$store.commit("showSnackbar", payload);
            }, 3000);
          } else {
            const errorPayload = {
              text: "Failed to add item. Try Again.",
              timeout: 5000
            };
            this.$store.commit("showSnackbar", errorPayload);
          }
        })
        .catch(err => {
          console.log(err);
          let payload = {
            text: "Failed. " + err,
            timeout: 5000
          };
          this.$store.commit("showSnackbar", payload);
        });
    },
    saveProduct() {
      this.uploading = true;
      this.makeApiRequestForSaveProduct();
    },
    //when a file or multiple files are updloaded, add it to this.items.images but no color is selected for all images
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
      if (file.contentType) {
        var image = "data:" + file.contentType + ";base64," + file.image;
        var img = new Image();
        img.src = image;
        return img.src;
      } else {
        return URL.createObjectURL(file);
      }
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
    this.loadSizesFromApi();
    this.loadCategoriesFromApi();
  },
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
<style scoped>
.gender-row {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
}
</style>
