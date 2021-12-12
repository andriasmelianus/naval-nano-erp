<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Perusahaan</div>

    <v-text-field
      label="Nama Perusahaan"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-text-field
      label="Nama Sesuai Legalitas"
      v-model="record.legal_name"
      :error-messages="invalidInputMessage.legal_name"
    ></v-text-field>

    <v-text-field
      label="Alamat Website"
      v-model="record.website"
      :error-messages="invalidInputMessage.website"
    ></v-text-field>

    <v-text-field
      label="Telepon"
      v-model="record.phone"
      :error-messages="invalidInputMessage.phone"
    ></v-text-field>

    <v-text-field
      label="Deskripsi Singkat Perusahaan"
      v-model="record.short_description"
      :error-messages="invalidInputMessage.short_description"
    ></v-text-field>

    <v-textarea
      label="Deskripsi Perusahaan"
      v-model="record.description"
      :error-messages="invalidInputMessage.description"
      rows="3"
    ></v-textarea>

    <image-uploader
      v-model="record.image_id"
      place-holder="Logo Perusahaan (Upload sebelum simpan)"
      :parent-resource-uri="resourceUri"
      :card-width="250"
      :card-height="250"
      disable-delete-request
      return-id
      @delete-button-clicked="handleImageDeleteButtonClicked"
    ></image-uploader>

    <v-btn color="success" type="submit">Simpan</v-btn>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
import ImageUploader from "~/components/_generic/file/uploaders/image.vue";
export default {
  mixins: [Handler],

  components: {
    ImageUploader,
  },
};
</script>
