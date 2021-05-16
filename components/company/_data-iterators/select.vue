<template>
  <div>
    <v-data-iterator
      single-select
      :items="records"
      :server-items-length.sync="recordsTotal"
      :options.sync="serverParams"
      :loading="isLoading"
      :items-per-page="8"
      :footer-props="{ 'items-per-page-options': [8, 16] }"
    >
      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="3">
            <company-activation-card
              :record="item"
              @choosen="companyChoosen"
            ></company-activation-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <v-dialog max-width="300" v-model="isConfirmationDialogShown">
      <v-card>
        <v-card-title>Konfirmasi</v-card-title>
        <v-card-text
          >Penggantian perusahaan yang aktif mengharuskan Anda untuk login
          kembali.
          <br />
          <br />
          Anda yakin?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="green" @click="changeActiveCompany">OK</v-btn>
          <v-btn text color="red" @click="isConfirmationDialogShown = false"
            >Batal</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="300" v-model="isInvalidDialogShown">
      <v-card>
        <v-card-title>Invalid</v-card-title>
        <v-card-text
          >Tidak dapat memilih perusahaan yang sedang aktif. Mohon pilih
          perusahaan yang lainnya.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="isInvalidDialogShown = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Handler } from "./handler";
import CompanyActivationCard from "~/components/company/_cards/activation";
export default {
  mixins: [Handler],

  components: {
    CompanyActivationCard,
  },

  data: () => ({
    selectedCompany: {},

    isConfirmationDialogShown: false,
    isInvalidDialogShown: false,
  }),

  methods: {
    isTheChoosenEqualWithCurrentlyActive(choosenCompanyId) {
      return this.$auth.user.active_company_id == choosenCompanyId;
    },

    companyChoosen(company) {
      let vm = this;
      if (vm.isTheChoosenEqualWithCurrentlyActive(company.id)) {
        vm.isInvalidDialogShown = true;
      } else {
        vm.isConfirmationDialogShown = true;
        vm.selectedCompany = Object.assign({}, vm.selectedCompany, company);
      }
    },

    changeActiveCompany() {
      let vm = this;
      vm.$axios
        .$post("/company/activate/" + vm.selectedCompany.id)
        .then(function (result) {
          setTimeout(function () {
            vm.$store.commit("global-snackbar/show", {
              color: "error",
              message: vm.messageSuccessExtract(result),
            });
          }, 2000);
        })
        .catch(function (result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.messageErrorExtract(result),
          });
        });
    },
  },
};
</script>
