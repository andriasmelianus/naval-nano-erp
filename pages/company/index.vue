<template>
  <page-content>
    <template v-slot:title>{{ $metaInfo.title }}</template>
    <template v-slot:subtitle>
      Mengubah data perusahaan. Cabang dapat ditambahkan melalui halaman ini.
    </template>

    <v-card>
      <v-tabs v-model="selectedTab" vertical>
        <v-tab>Perusahaan</v-tab>
        <v-tab>Cabang</v-tab>
        <v-tab>Ruangan</v-tab>
        <v-tab>Karyawan</v-tab>

        <v-tab-item>
          <v-card flat>
            <company-form
              :record="companyData"
              edit-mode
              @record-updated="companyUpdated"
            ></company-form>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <branch-table></branch-table>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <room-table></room-table>

            <p class="pa-3 text-caption">
              Data ruangan yang ditampilkan merupakan data ruangan pada cabang
              yang sedang aktif. <br />
              Untuk melihat data ruangan di cabang lain, Anda harus mengganti
              cabang yang aktif ke cabang yang dimaksud.
            </p>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <employee-table></employee-table>

            <p class="pa-3 text-caption">
              Data karyawan yang ditampilkan pada halaman ini merupakan data
              karyawan pada cabang yang sedang aktif.
            </p>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

    <!-- <v-card>
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
    </v-card> -->
  </page-content>
</template>

<script>
import PageContent from "~/components/_support/page-content.vue";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import CompanyForm from "~/components/company/forms/default.vue";
import BranchTable from "~/components/branch/tables/default.vue";
import RoomTable from "~/components/room/tables/default.vue";
import EmployeeTable from "~/components/employee/tables/default.vue";
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
    BranchTable,
    RoomTable,
    EmployeeTable,
  },

  data: () => ({
    selectedTab: undefined,
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
