<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle>Sesuaikan data Anda di halaman ini.</template>

    <v-card>
      <v-row>
        <v-col cols="12" md="6">
          <user-default-form
            :record="user"
            :edit-mode="true"
            :is-self-edit="true"
            @record-updated="handleRecordUpdated"
          ></user-default-form>
        </v-col>
        <v-col cols="12" md="6">
          <role-user-list :user="user"></role-user-list>
          <v-divider></v-divider>
          <!-- another user-related component -->
        </v-col>
      </v-row>
    </v-card>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import UserDefaultForm from "~/components/user/forms/default.vue";
import RoleUserList from "~/components/role/lists/role-user.vue";
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
    RoleUserList,
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
