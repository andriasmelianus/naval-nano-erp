<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Halaman ini memungkinkan untuk melakukan pengajuan permintaan baik
      pengadaan aset, perbaikan aset dan sebagainya.</template
    >

    <submission-data-iterator></submission-data-iterator>
  </page-content>
</template>

<script>
import PageContent from "~/components/_generic/page-content.vue";
import SubmissionDataIterator from "~/components/submission/data-iterators/default.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Pengajuan Permintaan",
    };
  },

  components: {
    PageContent,

    SubmissionDataIterator,
  },
};
</script>
