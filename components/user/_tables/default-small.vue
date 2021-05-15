<template>
  <v-data-table
    :headers="smallHeaders"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    :search="searchKeywords"
    v-model="selectedRecords"
    @item-selected="handleRecordSelected"
    show-select
    single-select
  >
    <template v-slot:header.data-table-select>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn small icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
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
          <user-default-form
            :record="editedRecord"
            :edit-mode="formIsInEditMode"
            @recordCreated="handleRecordCreated($event)"
            @recordUpdated="handleRecordUpdated($event)"
          ></user-default-form>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import UserDefaultForm from "~/components/user/_forms/default";
import { Handler } from "./handler";
export default {
  mixins: [Handler],

  components: {
    UserDefaultForm,
  },
};
</script>
