<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Pilih salah satu untuk mengelola data yang ada di dalam cabang
      tersebut.</template
    >

    <branch-data-iterator-selector></branch-data-iterator-selector>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import BranchDataIteratorSelector from "~/components/branch/data-iterators/selector.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Ganti Cabang Aktif",
    };
  },

  components: {
    PageContent,
    BranchDataIteratorSelector,
  },
};
</script>
