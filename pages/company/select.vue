<template>
  <v-row class="fill-height">
    <v-col cols="12" md="12">
      <div class="text-h5 pb-4">Ganti Perusahaan Aktif</div>
      <company-select-data-iterator></company-select-data-iterator>
    </v-col>
  </v-row>
</template>

<script>
import CompanySelectDataIterator from "~/components/company/data-iterators/select";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Ganti Perusahaan Aktif",
    };
  },

  components: {
    CompanySelectDataIterator,
  },
};
</script>
