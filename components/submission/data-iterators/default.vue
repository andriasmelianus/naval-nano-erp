<template>
  <div>
    <v-data-iterator
      single-select
      :items="records"
      :server-items-length.sync="recordsTotal"
      :options.sync="serverParams"
      :loading="isLoading"
      :items-per-page="12"
      :footer-props="{ 'items-per-page-options': [8, 16] }"
    >
      <!-- Data Iterator Header -->
      <template v-slot:header>
        <v-toolbar class="mb-4" flat>
          <v-toolbar-title class="text-h6 mr-3"
            >Pilih Perusahaan</v-toolbar-title
          >

          <div class="ma-2">
            <v-btn color="success" class="ml-2" @click="readRecords">
              <v-icon left>mdi-refresh</v-icon>&nbsp;Refresh
            </v-btn>
            <v-btn color="primary" class="mr-2" @click="showForm(false)">
              <v-icon left>mdi-plus</v-icon>&nbsp;Baru
            </v-btn>
          </div>

          <v-text-field
            prepend-icon="mdi-magnify"
            label="Cari"
            class="mr-3"
            v-model="searchKeyword"
            hide-details
            single-line
          ></v-text-field>

          <v-select
            label="Urutkan"
            class="mr-3"
            v-model="sortColumn"
            :items="sortableColumns"
            hide-details
          ></v-select>

          <v-btn-toggle v-model="sortDesc" mandatory>
            <v-btn icon value="false"
              ><v-icon>mdi-sort-reverse-variant</v-icon></v-btn
            >
            <v-btn icon value="true"><v-icon>mdi-sort-variant</v-icon></v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <!-- Data Iterator Content -->
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="2"
          >
            <submission-default-card
              :record="item"
              @card-clicked="handleRecordSelected"
            ></submission-default-card>
          </v-col>
        </v-row>

        <!-- Form -->
        <v-dialog v-model="formIsShown" max-width="1024px" ref="formDialog">
          <v-card>
            <submission-form
              :record="editedRecord"
              :edit-mode="formIsInEditMode"
              @record-created="handleRecordCreated($event)"
              @record-updated="handleRecordUpdated($event)"
            ></submission-form>
          </v-card>
        </v-dialog>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { Handler } from "./handler";
import SubmissionDefaultCard from "../cards/default.vue";
import SubmissionForm from "../forms/default.vue";
export default {
  mixins: [Handler],

  components: {
    SubmissionDefaultCard,
    SubmissionForm,
  },
};
</script>
