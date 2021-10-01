<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-btn nuxt to="/" color="success">Home</v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>Testing Page</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-tabs vertical>
        <v-tab>Image Manager</v-tab>
        <v-tab>Watchers</v-tab>
        <v-tab>Combobox</v-tab>

        <v-tab-item>
          <v-card flat>
            <image-uploader-multiple
              v-model="imageIds"
              parent-resource-uri="test"
            ></image-uploader-multiple>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <pre>{{ ages }}</pre>
            <v-btn @click="ages.push(99)">Change</v-btn>
            <p>{{ watchMessage }}</p>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-combobox
                v-model="comboboxSelectedItem"
                item-text="name"
                :items="comboboxItems"
                :search-input.sync="comboboxSearchKeyword"
                :hide-no-data="!comboboxSearchKeyword"
                auto-select-first
                return-object
              ></v-combobox>

              <pre>Search keyword: {{ comboboxSearchKeyword }}</pre>
              <pre>Selected Item: {{ comboboxSelectedItem }}</pre>
              <pre>Selected Item Type: {{ typeof comboboxSelectedItem }}</pre>

              <br />
              <brand-combobox
                label="Pilih Merk"
                v-model="brandComboboxValue"
              ></brand-combobox>
              <pre>Brand combobox value: {{ brandComboboxValue }}</pre>

              <br />
              <equipment-autocomplete
                label="Equipment"
                v-model="equipmentAutocompleteValue"
              ></equipment-autocomplete>
              <pre>Equipment value: {{ equipmentAutocompleteValue }}</pre>
              <v-btn @click="equipmentAutocompleteValue = 947125174"
                >Equipment 1</v-btn
              >
              <v-btn @click="equipmentAutocompleteValue = 1171049788"
                >Equipment 2</v-btn
              >
              <v-btn @click="equipmentAutocompleteValue = 1277441986"
                >Equipment 3</v-btn
              >
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import ImageUploaderMultiple from "~/components/image/uploaders/multiple.vue";
import BrandCombobox from "~/components/brand/comboboxes/default.vue";
import EquipmentAutocomplete from "~/components/equipment/autocompletes/default.vue";
export default {
  layout: "default",

  head() {
    return {
      title: "Testing Page",
    };
  },

  components: { ImageUploaderMultiple, BrandCombobox, EquipmentAutocomplete },

  data: () => ({
    // Image manager
    imageIds: [],

    // Watcher.
    ages: [24, 31, 27, 60],
    watchMessage: "",

    // Combobox
    comboboxSearchKeyword: undefined,
    comboboxItems: [
      { value: 1, name: "Andrias" },
      { value: 2, name: "Melianus" },
      { value: 3, name: "Siwabessy" },
    ],
    comboboxSelectedItem: undefined,

    // Brand Combobox
    brandComboboxValue: {
      id: 30641266,
      name: "Acer",
    },

    // Equipment autocomplete
    equipmentAutocompleteValue: 1171049788,
    equipmentAutocompleteValueAsObject: {
      id: 1171049788,
      name: "Laptop",
    },
  }),

  watch: {
    ages(newData, oldData) {
      this.watchMessage = newData;
    },
  },

  methods: {
    deleteItem(itemId) {
      let vm = this;

      vm.list.splice(vm.list.indexOf(itemId), 1);
    },
  },
};
</script>
