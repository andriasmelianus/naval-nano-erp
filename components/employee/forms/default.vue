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
          v-model="record.id_type"
          label="Jenis Identitas"
          item-value="text"
          :items="id_types"
          :error-messages="invalidInputMessage.id_type"
        ></v-select>
      </v-col>

      <v-col cols="12" md="8">
        <v-text-field
          v-model="record.id_number"
          label="Nomor Identitas"
          :error-messages="invalidInputMessage.id_number"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="record.phone"
          label="Nomor Telepon 1"
          :error-messages="invalidInputMessage.phone"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="record.phone_alternative"
          label="Nomor Telepon 2"
          :error-messages="invalidInputMessage.phone_alternative"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="record.email"
      label="Email"
      :error-messages="invalidInputMessage.email"
    ></v-text-field>

    <v-text-field
      v-model="record.address"
      label="Alamat"
      :error-messages="invalidInputMessage.address"
    ></v-text-field>

    <v-text-field
      v-model="record.city"
      label="Kota"
      :error-messages="invalidInputMessage.city"
    ></v-text-field>

    <v-text-field
      v-model="record.country"
      label="Negara"
      :error-messages="invalidInputMessage.country"
    ></v-text-field>

    <v-text-field
      v-model="record.postal_code"
      label="Kode Pos"
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
      .$get(vm.resourceUri + "/id-types")
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
