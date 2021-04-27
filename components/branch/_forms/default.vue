<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Cabang</div>

    <v-text-field
      label="Kode Cabang"
      v-model="record.code"
      :error-messages="invalidInputMessage.code"
    ></v-text-field>

    <v-text-field
      label="Nama Cabang"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-text-field
      label="Nomor Telepon"
      v-model="record.phone"
      :error-messages="invalidInputMessage.phone"
    ></v-text-field>

    <v-text-field
      label="Alamat"
      v-model="record.address"
      :error-messages="invalidInputMessage.address"
    ></v-text-field>

    <v-text-field
      label="Kota"
      v-model="record.city"
      :error-messages="invalidInputMessage.city"
    ></v-text-field>

    <v-text-field
      label="Negara"
      v-model="record.country"
      :error-messages="invalidInputMessage.country"
    ></v-text-field>

    <v-text-field
      label="Kode Pos"
      v-model="record.postal_code"
      :error-messages="invalidInputMessage.postal_code"
    ></v-text-field>

    <v-btn type="submit" color="success">Simpan</v-btn>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
