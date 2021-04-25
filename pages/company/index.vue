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
import { MessageHandler } from "~/components/_mixins/message-handler";
import CompanyForm from "~/components/company/_forms/default";
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
      .$get("/company/mine")
      .then(function (result) {
        vm.companyData = Object.assign({}, result);
      })
      .catch(function (result) {
        console.log(result);
      });
  },

  methods: {
    companyUpdated(result) {
      let vm = this;
      vm.$store.commit("notification/show", vm.generateNotification(result));
    },
  },
};
</script>
