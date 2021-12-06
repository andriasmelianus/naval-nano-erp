<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Mengelola data role, termasuk di dalamnya menambahkan permission yang
      diperlukan.</template
    >

    <role-manager></role-manager>
  </page-content>
</template>

<script>
import PageContent from "~/components/_generic/page-content.vue";
import RoleManager from "~/components/role/manager.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Role & Permission (Hak Akses)",
    };
  },

  components: {
    PageContent,
    RoleManager,
  },
};
</script>
