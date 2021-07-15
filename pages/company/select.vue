<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Pilih salah satu untuk mengelola data yang ada di dalam perusahaan
      tersebut.</template
    >

    <company-select-data-iterator></company-select-data-iterator>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import CompanySelectDataIterator from "~/components/company/data-iterators/select";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Ganti Perusahaan Aktif",
    };
  },

  components: {
    PageContent,
    CompanySelectDataIterator,
  },
};
</script>
