<template>
  <v-container grey lighten-4 class="px-0 py-0 mx-0 my-0" fill-height fluid>
    <v-layout no-gutters row>
      <v-flex col no-gutters>
        <v-col no-gutters>
          <v-col no-gutters align="center" class="px-0 py-0">
            <FilterComponent v-if="!this.showProductPanel"/>
            <v-row v-if="!showProductPanel" justify="end" class="pt-3" no-gutters>
              <v-btn
                @click="addProduct"
                class="mx-1"
                x-small
                dark
                color="indigo"
              >
                <v-icon small left dark>mdi-plus</v-icon>Add Product
              </v-btn>
            </v-row>

            <ProductPanel class="product-panel"
              v-if="showProductPanel"
              :type="productPanelType"
              :product="currentProduct"
              @click="save"
              @cancel="closeProductPanel"
            />

            <v-simple-table v-if="!showProductPanel" class="my-3 mx-2">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Sale</th>
                    <th class="text-left">Images</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">Sizes</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">Orders</th>
                    <th v-if="edit" class="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products" :key="item.name">
                    <td>
                      <v-card-text>{{ item.name }}</v-card-text>
                    </td>
                    <td>
                      <v-card-text>${{ item.price }}</v-card-text>
                    </td>
                    <td v-if="item.sale">{{ item.sale }}%</td>
                    <td v-if="!item.sale">None</td>
                    <td></td>
                    <td>{{ item.description }}</td>
                    <td>S,M,L</td>
                    <td>10S,5M,0L</td>
                    <td>23</td>
                    <td>
                      <v-row>
                        <v-btn
                          class="mx-1"
                          x-small
                          color="amber"
                          @click="editProduct(item)"
                          >Edit</v-btn
                        >
                        <v-btn x-small color="red" @click="deleteProduct(item)"
                          >Delete</v-btn
                        >
                      </v-row>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterComponent from "../FilterComponent";
import ProductPanel from "./ProductPanel";
export default {
  name: "Products",
  components: {
    FilterComponent,
    ProductPanel
  },
  data: () => ({
    showProductPanel: false,
    productPanelType: "",
    currentProduct: {},
    edit: true,
    products: []
  }),
  mounted() {
    this.updateProducts();
  },
  updated() {
    this.updateProducts();
  },
  methods: {
    updateProducts() {
      this.$store
        .dispatch("getProducts")
        .then(res => {
          console.log(res);
          //show product added message with snackbar
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch(err => {
          console.log(err);
          //show error with snackbar
        });
    },
    selectSort(item) {
      this.selectedSort = item;
    },
    addProduct() {
      this.productPanelType = "add";
      this.currentProduct = {
        name: "",
        description: "",
        quantity: [
          {
            size: "xxl",
            number: null
          },
          {
            size: "xl",
            number: null
          },
          {
            size: "l",
            number: null
          },
          {
            size: "m",
            number: null
          },
          {
            size: "s",
            number: null
          }
        ],
        images: []
      };
      this.openProductPanel(this.currentProduct);
    },
    editProduct(item) {
      this.productPanelType = "edit";
      this.openProductPanel(item);
    },
    deleteProduct(item) {
      //make a confirm dialog
      //call api to delete product
      console.log("To be deleted:");
      console.log(item.name);
    },
    openProductPanel(item) {
      this.showProductPanel = true;
      this.currentProduct = item;
    },
    save() {
      //reload table then close panel
      this.closeProductPanel();
    },
    closeProductPanel() {
      this.showProductPanel = false;
      this.currentProduct = {};
      this.productPanelType = "";
    }
  },
  computed: {
    editColor() {
      return this.edit ? "amber" : "primary";
    },
    editIcon() {
      return this.edit ? "mdi-content-save-outline" : "mdi-pencil";
    },
    editName() {
      return this.edit ? "Save" : "Edit";
    }
  }
};
</script>