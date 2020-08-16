<template>
  <v-container grey lighten-4 class="px-0 py-0 mx-0 my-0" fill-height fluid>
    <v-layout row>
      <v-flex col>
        <v-col>
          <v-col align="center" class="px-0 py-0">
            <FilterComponent v-if="!this.showProductPanel" />
            <v-row v-if="!showProductPanel" justify="end" class="pt-3">
              <v-btn
                @click="updateProducts"
                class="mx-1"
                x-small
                dark
                color="light"
              >
                <v-icon small left light>mdi-reload</v-icon>Reload Products
              </v-btn>
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
            <DeleteDialog
              :show="showDeleteDialog"
              title="Delete Item?"
              description2="Are you sure you want to delete the item?"
              description1="Once deleted the item can not be recovered"
              buttonLabel="Confirm"
              buttonLabel2="Cancel"
              @click="confirmDelete"
              @click2="cancelDelete"
            />
            <ProductPanel
              class="product-panel"
              v-if="showProductPanel"
              :type="productPanelType"
              :product="currentProduct"
              @click="save"
              @cancel="closeProductPanel"
            />
            <v-card-text v-if="loading">Loading...</v-card-text>
            <v-simple-table
              v-if="!showProductPanel && !loading && products.length != 0"
              class="my-3 mx-2"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Product Code</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Sale</th>
                    <th class="text-left">Available</th>
                    <th class="text-left">Orders</th>
                    <th v-if="edit" class="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products" :key="item.name">
                    <td>
                      <v-card-text>{{ item.code }}</v-card-text>
                    </td>
                    <td>
                      <v-card-text>{{ item.name }}</v-card-text>
                    </td>
                    <td>
                      <v-card-text>${{ item.price }}</v-card-text>
                    </td>
                    <td v-if="item.sale">{{ item.sale }}%</td>
                    <td v-if="!item.sale">None</td>
                    <td>{{ getAvailable(item.sizeAndQuantityAvailable) }}</td>
                    <td>{{ item.orders.length }}</td>
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
            <v-card-text v-if="noProducts && !showProductPanel && !loading"
              >No Pruduct has been added.</v-card-text
            >
          </v-col>
        </v-col>
        <v-row justify="center" v-if="!loading && !showProductPanel">
          <v-pagination
            class="py-2"
            v-model="currentPage"
            :length="noOfPages"
          ></v-pagination>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterComponent from "../FilterComponent";
import axios from "axios";
import ProductPanel from "./ProductPanel";
import DeleteDialog from "../../views/CustomComponents/Dialog";
export default {
  name: "Products",
  components: {
    FilterComponent,
    ProductPanel,
    DeleteDialog
  },
  data: () => ({
    loading: false,
    showProductPanel: false,
    productPanelType: "",
    currentProduct: {},
    edit: true,
    showDeleteDialog: false,
    itemToDelete: null,
    products: [],
    noProducts: false,
    maxNoOfItems: 10,
    noOfPages: 0,
    currentPage: 1
  }),
  mounted() {
    this.updateProducts();
  },
  methods: {
    updateProducts() {
      this.loading = true;
      const params = new URLSearchParams();

      //set pagination, number of items and page number
      params.append("max", this.maxNoOfItems ? this.maxNoOfItems : 10);
      params.append("page", this.currentPage ? this.currentPage : 1);

      this.$store
        .dispatch("getProducts", params)
        .then(res => {
          this.loading = false;
          this.products = res.data.products;
          this.noOfPages = res.data.noOfPages;
          res.data.products.length == 0
            ? (this.noProducts = true)
            : (this.noProducts = false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectSort(item) {
      this.selectedSort = item;
    },
    addProduct() {
      this.productPanelType = "add";
      this.currentProduct = {
        name: "",
        code: "",
        price: 0,
        sale: 0,
        description: "",
        sizeAndQuantityAvailable: [],
        images: [],
        gender: {
          male: true,
          female: true
        },
        // orders: [],
        categories: []
      };
      this.openProductPanel(this.currentProduct);
    },
    editProduct(item) {
      this.productPanelType = "edit";
      this.openProductPanel(item);
    },
    deleteProduct(item) {
      this.showDeleteDialog = true;
      this.itemToDelete = item;
    },
    confirmDelete() {
      //call api to delete product
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.$store.state.user.token
      };
      var payload = {
        code: this.itemToDelete.code
      };
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.VUE_APP_API_URL + "/deleteproduct"
          : "http://localhost:8080/deleteproduct";
      axios
        .post(url, payload, { headers })
        .then(res => {
          console.log(res);
          //show snackbar that item has been deleted
          this.updateProducts();
        })
        .catch(err => {
          console.log(err);
          //show sncakbar that item hasnt been deleted
        });
      //on success close the dialog
      this.showDeleteDialog = false;
    },
    cancelDelete() {
      this.showDeleteDialog = false;
      this.itemToDelete = null;
    },
    openProductPanel(item) {
      this.showProductPanel = true;
      this.currentProduct = item;
    },
    save() {
      //close panel and reload products
      this.closeProductPanel();
      this.updateProducts();
    },
    closeProductPanel() {
      this.showProductPanel = false;
      this.currentProduct = {};
      this.productPanelType = "";
    },
    getAvailable(sAndQ) {
      var quantity = 0;
      sAndQ.forEach(value => {
        quantity = quantity + value.quantityAvailable;
      });
      return quantity;
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
  },
  watch: {
    currentPage: function() {
      this.updateProducts();
    }
  }
};
</script>
