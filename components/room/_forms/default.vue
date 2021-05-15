<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Ruangan</div>

    <v-text-field
      label="Kode Ruangan"
      v-model="record.code"
      :error-messages="invalidInputMessage.code"
    ></v-text-field>

    <v-text-field
      label="Nama Ruangan"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-text-field
      label="Terletak di Lantai"
      v-model="record.floor"
      :error-messages="invalidInputMessage.floor"
    ></v-text-field>

    <v-textarea
      label="Deskripsi Ruangan"
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
