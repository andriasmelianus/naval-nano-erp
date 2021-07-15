<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Pilih salah satu untuk mengelola data yang ada di dalam cabang
      tersebut.</template
    >

    <branch-select-data-iterator></branch-select-data-iterator>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import BranchSelectDataIterator from "~/components/branch/data-iterators/select";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Ganti Cabang Aktif",
    };
  },

  components: {
    PageContent,
    BranchSelectDataIterator,
  },
};
</script>
