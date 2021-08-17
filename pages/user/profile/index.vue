<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle>Sesuaikan data Anda di halaman ini.</template>

    <v-card width="600">
      <user-default-form
        :record="user"
        :edit-mode="true"
        @record-updated="handleRecordUpdated"
      ></user-default-form>
    </v-card>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import UserDefaultForm from "~/components/user/forms/default.vue";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Profil Pengguna",
    };
  },

  mixins: [MessageExtractor],

  components: {
    PageContent,

    UserDefaultForm,
  },

  data: () => ({
    user: {},
  }),

  mounted() {
    let vm = this;

    vm.$axios
      .$get("/user/" + vm.$auth.user.id)
      .then(function (result) {
        vm.user = result;
      })
      .catch(function (result) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.errorMessageExtract(result),
        });
      });
  },

  methods: {
    handleRecordUpdated(updatedUser) {
      let vm = this;
      vm.$store.commit("global-snackbar/show", {
        color: "success",
        message: "Mohon logout dan login lagi untuk melihat perubahannya",
      });
    },
  },
};
</script>
