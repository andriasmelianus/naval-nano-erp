<template>
  <v-data-table
    v-model="selectedRecords"
    show-select
    dense
    :headers="smallHeaders"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    :search="searchKeyword"
    :items-per-page="5"
    @click:row="handleRowClicked"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-btn color="primary" class="mr-3" @click="assignRoles"
          >Tambahkan</v-btn
        >
        <v-text-field
          label="Cari"
          v-model="searchKeyword"
          append-icon="mdi-magnify"
          single-line
          hide-details
          class="mr-3"
        ></v-text-field>
        <v-toolbar-title class="text-h6">Pilih Role</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],

  methods: {
    assignRoles() {
      this.$emit("roles-assigned", this.selectedRecords);
      this.selectedRecords = [];
      this.searchKeyword = "";
    },
  },
};
</script>
