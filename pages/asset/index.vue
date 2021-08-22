<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle
      >Mengelola data aset dan peralatan perusahaan.</template
    >

    <asset-manager></asset-manager>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import AssetManager from "~/components/asset/manager.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Aset & Peralatan",
    };
  },

  components: {
    PageContent,

    AssetManager,
  },
};
</script>
