<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Peralatan</div>

    <v-text-field
      label="Kode"
      v-model="record.code"
      :error-messages="invalidInputMessage.code"
    ></v-text-field>

    <v-text-field
      label="Nama"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-textarea
      label="Deskripsi"
      v-model="record.description"
      :error-messages="invalidInputMessage.description"
      rows="3"
    ></v-textarea>

    <v-btn type="submit" color="success">Simpan</v-btn>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
