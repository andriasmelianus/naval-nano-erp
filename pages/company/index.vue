<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle>
      Mengubah data perusahaan. Cabang dapat ditambahkan melalui halaman ini.
    </template>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <company-form
            :record="companyData"
            edit-mode
            @recordUpdated="companyUpdated"
          ></company-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Data Cabang</v-card-title>
          <branch-small-table></branch-small-table>
        </v-card>
      </v-col>
    </v-row>
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import CompanyForm from "~/components/company/forms/default";
import BranchSmallTable from "~/components/branch/tables/default-small";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Perusahaan",
    };
  },

  mixins: [MessageExtractor],

  components: {
    PageContent,
    CompanyForm,
    BranchSmallTable,
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
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.messageErrorExtract(result),
        });
      });
  },

  methods: {
    companyUpdated(result) {
      let vm = this;

      vm.$store.commit("setCompany", result.data);

      vm.$store.commit("global-snackbar/show", {
        message: vm.messageSuccessExtract(result),
        color: "success",
      });
    },
  },
};
</script>
