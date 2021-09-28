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
                auto-select-first
                return-object
                :hide-no-data="!comboboxSearchKeyword"
              ></v-combobox>

              <pre>Search keyword: {{ comboboxSearchKeyword }}</pre>
              <pre>Selected Item: {{ comboboxSelectedItem }}</pre>
              <pre>Selected Item Type: {{ typeof comboboxSelectedItem }}</pre>

              <br />
              <brand-combobox
                label="Pilih Merk"
                v-model="brandComboboxValue"
              ></brand-combobox>
              <pre>{{ brandComboboxValue }}</pre>
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
export default {
  layout: "default",

  head() {
    return {
      title: "Testing Page",
    };
  },

  components: { ImageUploaderMultiple, BrandCombobox },

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
