<template>
  <v-row class="fill-height">
    <v-col cols="12" md="12">
      <div class="text-h5 pb-4">Ganti Cabang Aktif</div>
      <branch-select-data-iterator></branch-select-data-iterator>
    </v-col>
  </v-row>
</template>

<script>
import BranchSelectDataIterator from "~/components/branch/_data-iterators/select";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Ganti Cabang Aktif",
    };
  },

  components: {
    BranchSelectDataIterator,
  },
};
</script>
