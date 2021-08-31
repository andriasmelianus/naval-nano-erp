<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    show-select
    single-select
    v-model="selectedRecords"
    :search="searchKeyword"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-toolbar-title class="text-h6">Data Role</v-toolbar-title>
        <v-btn color="success" icon @click="readRecords"
          ><v-icon>mdi-refresh</v-icon></v-btn
        >
        <v-btn color="primary" icon @click="showForm(false)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn
          color="warning"
          icon
          :disabled="!selectedRecordExists"
          @click="showForm(true)"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
        <v-btn
          color="error"
          icon
          :disabled="!selectedRecordExists"
          @click="deleteSingleRecord"
          ><v-icon>mdi-minus</v-icon></v-btn
        >
        <v-text-field
          label="Cari"
          v-model="searchKeyword"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>

    <template v-slot:header.data-table-select>
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

          <v-list-item
            @click="deleteSingleRecord"
            :disabled="!selectedRecordExists"
          >
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-model="formIsShown" max-width="500px" ref="formDialog">
        <v-card>
          <role-form
            :record="editedRecord"
            :edit-mode="formIsInEditMode"
            @record-created="handleRecordCreated($event)"
            @record-updated="handleRecordUpdated($event)"
          ></role-form>
        </v-card>
      </v-dialog> </template
  ></v-data-table>
</template>

<script>
import { Handler } from "./handler";
import RoleForm from "../forms/default.vue";
export default {
  mixins: [Handler],

  components: {
    RoleForm,
  },
};
</script>
