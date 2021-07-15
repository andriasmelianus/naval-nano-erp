<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Role</div>

    <v-text-field
      label="Nama Role"
      v-model="record.name"
      :error-messages="invalidInputMessage.name"
    ></v-text-field>

    <v-select
      label="Hak Khusus"
      :items="specials"
      v-model="record.special"
      :error-messages="invalidInputMessage.special"
    ></v-select>

    <v-textarea
      label="Deskripsi Role"
      v-model="record.description"
      :error-messages="invalidInputMessage.description"
      rows="3"
    ></v-textarea>

    <v-btn type="submit" color="success">Simpan</v-btn>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export default {
  mixins: [Handler, MessageExtractor],

  data: () => ({
    specials: [],
  }),

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.resourceUri + "/specials")
      .then(function (result) {
        vm.specials.push("");
        vm.specials.push(...result);
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
