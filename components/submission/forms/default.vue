<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Permohonan</div>

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

    <!-- File uploader goes here. -->
    <multiple-file-uploader
      v-model="record.files"
      :error-messages="invalidInputMessage.files"
      :parent-resource-uri="resourceUri"
      disable-delete-request
    ></multiple-file-uploader>

    <v-btn color="success" type="submit">Simpan</v-btn>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import DatePicker from "~/components/_generic/global-date-picker/default.vue";
import MultipleFileUploader from "~/components/_generic/file/uploaders/multiple.vue";

export default {
  mixins: [Handler, MessageExtractor],

  components: {
    DatePicker,
    MultipleFileUploader,
  },
};
</script>
