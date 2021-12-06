<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Pilih salah satu untuk mengelola data yang ada di dalam perusahaan
      tersebut.</template
    >

    <company-data-iterator-selector></company-data-iterator-selector>
  </page-content>
</template>

<script>
import PageContent from "~/components/_generic/page-content.vue";
import CompanyDataIteratorSelector from "~/components/company/data-iterators/selector.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Ganti Perusahaan Aktif",
    };
  },

  components: {
    PageContent,
    CompanyDataIteratorSelector,
  },
};
</script>
