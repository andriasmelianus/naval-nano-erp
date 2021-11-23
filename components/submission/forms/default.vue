<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Permohonan</div>

    <v-row>
      <v-col cols="12" lg="8">
        <v-select
          v-model="record.entity"
          label="Entitas"
          :items="entities"
          :error-messages="invalidInputMessage.id_type"
        ></v-select>

        <date-picker
          v-model="record.date"
          label="Tanggal"
          :error-messages="invalidInputMessage.date"
        ></date-picker>

        <v-text-field
          v-model="record.title"
          label="Judul"
          :error-messages="invalidInputMessage.title"
        ></v-text-field>

        <v-textarea
          label="Deskripsi"
          v-model="record.description"
          :error-messages="invalidInputMessage.description"
          rows="3"
        ></v-textarea>

        <v-btn color="success" type="submit">Simpan</v-btn>
      </v-col>

      <v-col cols="12" lg="4">
        <!-- File uploader goes here. -->
        <multiple-file-uploader
          v-model="record.attachments"
          :error-messages="invalidInputMessage.attachments"
          :parent-resource-uri="resourceUri"
          disable-delete-request
        ></multiple-file-uploader>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import DatePicker from "~/components/_support/global-date-picker.vue";
import MultipleFileUploader from "~/components/_support/file/uploaders/multiple.vue";

export default {
  mixins: [Handler, MessageExtractor],

  components: {
    DatePicker,
    MultipleFileUploader,
  },
};
</script>
