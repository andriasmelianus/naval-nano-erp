<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Pengajuan-pengajuan yang telah diinput dapat disetujui melalui halaman
      ini.</template
    >
  </page-content>
</template>

<script>
import PageContent from "~/components/_generic/page-content.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Persetujuan Pengajuan",
    };
  },

  components: {
    PageContent,
  },
};
</script>
