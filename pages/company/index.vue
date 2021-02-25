<template>
  <v-row class="fill-height">
    <v-col cols="12" md="8">
      <v-card>
        <company-form :record="companyData"></company-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { MessageHandler } from "~/components/_mixins/message-handler";
import CompanyForm from "~/components/company/_form/default";
export default {
  layout: "dashboard",
  head() {
    return {
      title: "Perusahaan",
    };
  },
  mixins: [MessageHandler],
  components: {
    CompanyForm,
  },

  data: () => ({
    companyData: {},
  }),
  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.$store.getters.apiUrl("/company/mine"))
      .then(function (result) {
        vm.companyData = Object.assign(
          {},
          vm.companyData,
          result.response.data
        );
      })
      .catch(function (result) {});
  },
};
</script>
