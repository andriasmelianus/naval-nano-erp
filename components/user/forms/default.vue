<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Pengguna</div>

    <v-text-field
      label="Nama Pengguna"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-text-field
      label="Email"
      v-model="record.email"
      :error-messages="invalidInputMessage.email"
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Password"
          type="password"
          v-model="record.password"
          :error-messages="invalidInputMessage.password"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Konfirmasi Password"
          type="password"
          v-model="record.password_confirmation"
          :error-messages="invalidInputMessage.password_confirmation"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      label="Telepon"
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

    <image-uploader-single
      v-model="record.image_id"
      :parent-resource-uri="resourceUri"
      :width="250"
      disable-delete-request
      @delete-button-clicked="handleImageDeleteButtonClicked"
    ></image-uploader-single>

    <v-btn type="submit" color="success">Simpan</v-btn>
  </v-form>
</template>

<script>
import ImageUploaderSingle from "~/components/image/uploaders/single.vue";
import { Handler } from "./handler";
export default {
  mixins: [Handler],

  components: {
    ImageUploaderSingle,
  },
};
</script>
