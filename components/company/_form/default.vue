<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Perusahaan</div>

    <v-text-field
      label="Nama Perusahaan"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-text-field
      label="Nama Legalitas"
      v-model="record.legal_name"
      :error-messages="invalidInputMessage.legal_name"
    ></v-text-field>

    <v-text-field
      label="Telepon"
      v-model="record.phone"
      :error-messages="invalidInputMessage.phone"
    ></v-text-field>

    <v-textarea
      label="Deskripsi Singkat Perusahaan"
      v-model="record.description"
      :error-messages="invalidInputMessage.description"
      rows="2"
    ></v-textarea>

    <v-btn color="success" type="submit">Simpan</v-btn>
  </v-form>
</template>

<script>
import { handler } from "./handler";
export default {
  mixins: [handler],
};
</script>
