<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Karyawan</div>

    <v-text-field
      label="Nama Karyawan"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="4">
        <v-select
          label="Jenis Identitas"
          :items="id_types"
          v-model="record.id_type"
          :error-messages="invalidInputMessage.id_type"
        ></v-select>
      </v-col>

      <v-col cols="12" md="8">
        <v-text-field
          label="Nomor Identitas"
          v-model="record.id_number"
          :error-messages="invalidInputMessage.id_number"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="Nomor Telepon 1"
          v-model="record.phone"
          :error-messages="invalidInputMessage.phone"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="Nomor Telepon 2"
          v-model="record.phone_alternative"
          :error-messages="invalidInputMessage.phone_alternative"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      label="Email"
      v-model="record.email"
      :error-messages="invalidInputMessage.email"
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
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export default {
  mixins: [Handler, MessageExtractor],

  data: () => ({
    id_types: [],
  }),

  mounted() {
    let vm = this;
    vm.$axios
      .$get("/employee/id-types")
      .then(function (result) {
        vm.id_types = result;
      })
      .catch(function (result) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.messageErrorExtract(result),
        });
      });
  },
};
</script>
