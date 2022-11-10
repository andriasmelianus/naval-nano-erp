<template>
  <v-data-table
    v-model="selectedRecords"
    show-select
    single-select
    :headers="smallHeaders"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    :items-per-page="5"
    :search="searchKeyword"
    @click:row="handleRowClicked"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-toolbar-title class="text-h6 mr-3">Data Karyawan</v-toolbar-title>

        <v-text-field
          label="Cari"
          v-model="searchKeyword"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>

    <template v-slot:[`header.data-table-select`]>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn small icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="readRecords()">
            <v-list-item-title>Refresh</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="showForm(false)">
            <v-list-item-title>Baru</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="showForm(true)"
            :disabled="!selectedRecordExists"
          >
            <v-list-item-title>Ubah</v-list-item-title>
          </v-list-item>

          <v-list-item @click="deleteSingleRecord" disabled>
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-model="formIsShown" max-width="500px" ref="formDialog">
        <v-card>
          <employee-default-form
            :record="editedRecord"
            :edit-mode="formIsInEditMode"
            @record-created="handleRecordCreated($event)"
            @record-updated="handleRecordUpdated($event)"
          ></employee-default-form>
        </v-card>
      </v-dialog> </template
  ></v-data-table>
</template>

<script>
import { Handler } from "./handler";
import EmployeeDefaultForm from "../forms/default.vue";
export default {
  mixins: [Handler],

  components: {
    EmployeeDefaultForm,
  },
};
</script>
