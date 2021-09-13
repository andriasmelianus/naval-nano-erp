<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <user-default-autocomplete
      label="Cari berdasarkan email..."
      search-column="email"
      @selected-change="handleSelectedChange"
      @keyword-changed="handleKeywordChange"
    ></user-default-autocomplete>

    <v-text-field
      label="Nama"
      v-model="recordFound.name"
      :error-messages="invalidInputMessage.name"
      readonly
    ></v-text-field>

    <v-btn type="submit" color="success" :disabled="!submitButtonEnabled"
      >Simpan</v-btn
    >
  </v-form>
</template>

<script>
import { Handler } from "./handler";
import UserDefaultAutocomplete from "../autocompletes/default.vue";
export default {
  mixins: [Handler],

  components: {
    UserDefaultAutocomplete,
  },

  data: () => ({
    recordFound: {},
  }),

  computed: {
    submitButtonEnabled() {
      return this.recordFound.name != null;
    },
  },

  methods: {
    /**
     * Handle user select a user event.
     */
    handleSelectedChange(selectedRecord) {
      this.recordFound = Object.assign({}, this.recordFound, selectedRecord);
    },

    /**
     * Handle user typing the email (keyword).
     */
    handleKeywordChange(keyword) {
      this.recordFound = {};
    },

    /**
     * Send selected record to URI based on form.
     */
    submitForm() {
      let vm = this;
      vm.$axios
        .$post(vm.resourceUri + "/attach-to-company", vm.recordFound)
        .then(function (result) {
          vm.$emit("record-selected", vm.recordFound);

          vm.$store.commit("global-snackbar/show", {
            color: "success",
            message: vm.messageSuccessExtract(result),
          });
        })
        .catch(function (result) {
          //
        });
    },
  },
};
</script>
