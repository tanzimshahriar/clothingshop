<template>
  <div class="dropdown">
    <v-menu offset-y :close-on-content-click="!radio">
      <template v-slot:activator="{ on }">
        <v-btn 
          v-bind:x-small="xsmallBtn" 
          v-bind:small="smallBtn"  
          v-bind:large="largeBtn" 
          :max-height="height" 
          :min-height="height" 
          :max-width="width" 
          :min-width="width" 
          color="grey" 
          dark v-on="on"
          class="px-1"
          >
          {{ selectedItem.title }}
          <v-spacer></v-spacer>
          <v-icon 
            v-bind:x-small="xsmallBtn" 
            v-bind:small="smallBtn"  
            v-bind:large="largeBtn"
            dark
          >
          {{ selectedItem.icon }}
          </v-icon>
        </v-btn>
      </template>
      <v-list :max-width="width" :min-width="width">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(item)"
          class="px-1"
        >
            <v-list-item-title :class="listClass">{{item.title}}</v-list-item-title>
            
            <v-icon 
              v-if="item.icon" 
              class="mx-0"
              light
              v-bind:x-small="xsmallBtn" 
              v-bind:small="smallBtn"  
              v-bind:large="largeBtn"
            >{{ item.icon }}</v-icon>
            <v-checkbox dense ripple v-if="radio" v-model="item.radio" @click="checkboxClick(item)"></v-checkbox>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    selectedItem: {
      title: {
        type: String
      },
      icon: {
        type: String
      }
    },
    items: {
      type: Array
    },
    radio: {
      type: Boolean
    }
  },
  watch: {
    selectedItem: function(newVal) {
      this.selectedItem = newVal;
    },
    items: function(newVal) {
      this.items = newVal;
    }
  },
  methods: {
    selectItem(item) {
      if(this.radio) {
        item.radio = !item.radio;
      }
      this.$emit("select", item);
    },
    checkboxClick(item) {
      item.radio = !item.radio;
    }
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 95;
        case "sm":
          return 100;
        case "md":
          return 150;
        case "lg":
          return 170;
        case "xl":
          return 170;
        default:
          return 170;
      }
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 25;
        case "sm":
          return 25;
        case "md":
          return 40;
        case "lg":
          return 50;
        case "xl":
          return 50;
        default:
          return 50;
      }
    },
    listClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "overline";
        case "sm":
          return "overline";
        case "md":
          return "overline";
        case "lg":
          return "font-weight-medium text-uppercase body-1";
        case "xl":
          return "font-weight-medium text-uppercase body-1";
        default:
          return "font-weight-medium text-uppercase body-2";
      }
    },
    xsmallBtn() {
      return this.$vuetify.breakpoint.name=='xs' || this.$vuetify.breakpoint.name=='sm'?true:false;
    },
    smallBtn() {
      return this.$vuetify.breakpoint.name=='md'?true:false;
    },
    largeBtn() {
      return this.$vuetify.breakpoint.name=='xl' || this.$vuetify.breakpoint.name=='lg'?true:false
    }
  }
};
</script>
<style scoped>
.dropdown {
  margin: 5px;
}
</style>