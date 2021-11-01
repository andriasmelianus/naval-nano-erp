<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Halaman ini memungkinkan untuk melakukan pengajuan permintaan baik
      pengadaan aset, perbaikan aset dan sebagainya.</template
    >
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Pengajuan Permintaan",
    };
  },

  components: {
    PageContent,
  },
};
</script>
