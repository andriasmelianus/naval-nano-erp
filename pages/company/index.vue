<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle>
      Mengubah data perusahaan. Cabang dapat ditambahkan melalui halaman ini.
    </template>

    <v-card>
      <v-row>
        <v-col cols="12" md="6">
          <company-form
            :record="companyData"
            edit-mode
            @record-updated="companyUpdated"
          ></company-form>
        </v-col>
        <v-col cols="12" md="6">
          <branch-small-table></branch-small-table>
        </v-col>
      </v-row>
    </v-card>
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
