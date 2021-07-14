<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    show-select
    dense
    v-model="selectedRecords"
    :search="searchKeywords"
    :items-per-page="5"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-btn color="primary" class="mr-3" @click="assignPermissions"
          >Tambahkan</v-btn
        >
        <v-text-field
          label="Cari"
          v-model="searchKeywords"
          append-icon="mdi-magnify"
          single-line
          hide-details
          class="mr-3"
        ></v-text-field>
        <v-toolbar-title class="text-h6">Pilih Permission</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],

  methods: {
    assignPermissions() {
      this.$emit("permissions-assigned", this.selectedRecords);
      this.selectedRecords = [];
      this.searchKeywords = "";
    },
  },
};
</script>
