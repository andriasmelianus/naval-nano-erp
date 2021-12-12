<template>
  <div>
    <v-data-iterator
      single-select
      :items="records"
      :server-items-length.sync="recordsTotal"
      :options.sync="serverParams"
      :loading="isLoading"
      :items-per-page="itemsPerPage"
      :footer-props="{ 'items-per-page-options': itemsPerPageOptions }"
    >
      <!-- Data Iterator Header -->
      <template v-slot:header>
        <v-toolbar class="mb-4" flat>
          <v-toolbar-title class="text-h6 mr-3"
            >Pilih Perusahaan</v-toolbar-title
          >

          <v-text-field
            prepend-icon="mdi-magnify"
            label="Cari"
            class="mr-3"
            v-model="searchKeyword"
            hide-details
            single-line
          ></v-text-field>

          <v-select
            label="Urutkan"
            class="mr-3"
            v-model="sortColumn"
            :items="sortableColumns"
            hide-details
          ></v-select>

          <v-btn-toggle v-model="sortDesc" mandatory>
            <v-btn icon value="false"
              ><v-icon>mdi-sort-reverse-variant</v-icon></v-btn
            >
            <v-btn icon value="true"><v-icon>mdi-sort-variant</v-icon></v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </template>

      <!-- Data Iterator Content -->
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

    <!-- Confirmation Dialog -->
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

    <!-- Invalid Action Dialog -->
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

    <!-- Success Dialog -->
    <v-dialog persistent max-width="300" v-model="isSuccessDialogShown">
      <v-card>
        <v-card-title>Berhasil</v-card-title>
        <v-card-text>
          Perusahaan yang aktif telah diubah. <br />
          Mohon tunggu beberapa saat sistem akan mengantarkan Anda ke halaman
          login.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Handler } from "./handler";
import CompanyActivationCard from "../cards/activation.vue";
export default {
  mixins: [Handler],

  components: {
    CompanyActivationCard,
  },

  data: () => ({
    selectedCompany: {},

    isConfirmationDialogShown: false,
    isInvalidDialogShown: false,
    isSuccessDialogShown: false,
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
          vm.isConfirmationDialogShown = false;
          vm.isSuccessDialogShown = true;

          setTimeout(function () {
            vm.$router.push("/logout");
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
