<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Mengelola data pengguna dan hak akses (role) yang dimilikinya.</template
    >

    <user-manager></user-manager>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import UserManager from "~/components/user/manager.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Pengguna",
    };
  },

  components: {
    PageContent,

    UserManager,
  },
};
</script>
