<template>
  <v-row class="fill-height">
    <v-col cols="12" md="6">
      <v-card>
        <company-form
          :record="companyData"
          edit-mode
          @recordUpdated="companyUpdated"
        ></company-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import CompanyForm from "~/components/company/_forms/default";
export default {
  layout: "dashboard",
  head() {
    return {
      title: "Perusahaan",
    };
  },
  mixins: [MessageExtractor],
  components: {
    CompanyForm,
  },

  data: () => ({
    companyData: {},
  }),
  mounted() {
    let vm = this;
    vm.$axios
      .$get("/company/mine")
      .then(function (result) {
        vm.companyData = Object.assign({}, vm.companyData, result);
      })
      .catch(function (result) {
        console.log(result);
      });
  },

  methods: {
    companyUpdated(result) {
      let vm = this;
      vm.$store.commit("global-snackbar/show", {
        message: vm.messageSuccessExtract(result),
        color: "success",
      });
    },
  },
};
</script>
