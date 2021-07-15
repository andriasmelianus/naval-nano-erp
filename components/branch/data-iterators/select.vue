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
            <branch-activation-card
              :record="item"
              @choosen="branchChoosen"
            ></branch-activation-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <!-- Confirmation Dialog -->
    <v-dialog max-width="300" v-model="isConfirmationDialogShown">
      <v-card>
        <v-card-title>Konfirmasi</v-card-title>
        <v-card-text
          >Penggantian cabang yang aktif mengharuskan Anda untuk login kembali.
          <br />
          <br />
          Anda yakin?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="green" @click="changeActiveBranch">OK</v-btn>
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
          >Tidak dapat memilih cabang yang sedang aktif. Mohon pilih cabang yang
          lainnya.</v-card-text
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
          Cabang yang aktif telah diubah. <br />
          Mohon tunggu beberapa saat sistem akan mengantarkan Anda ke halaman
          login.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Handler } from "./handler";
import BranchActivationCard from "~/components/branch/cards/activation";
export default {
  mixins: [Handler],

  components: {
    BranchActivationCard,
  },

  data: () => ({
    selectedBranch: {},

    isConfirmationDialogShown: false,
    isInvalidDialogShown: false,
    isSuccessDialogShown: false,
  }),

  methods: {
    isTheChoosenEqualWithCurrentlyActive(choosenBranchId) {
      return this.$auth.user.active_branch_id == choosenBranchId;
    },

    branchChoosen(branch) {
      let vm = this;
      if (vm.isTheChoosenEqualWithCurrentlyActive(branch.id)) {
        vm.isInvalidDialogShown = true;
      } else {
        vm.isConfirmationDialogShown = true;
        vm.selectedBranch = Object.assign({}, vm.selectedBranch, branch);
      }
    },

    changeActiveBranch() {
      let vm = this;
      vm.$axios
        .$post("/branch/activate/" + vm.selectedBranch.id)
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
