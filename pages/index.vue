<template>
  <v-row class="fill-height">
    <v-col cols="12" md="3">
      <company-dashboard-card></company-dashboard-card>
    </v-col>
    <v-col cols="12" md="3">
      <asset-dashboard-card></asset-dashboard-card>
    </v-col>
    <v-col cols="12" md="3">
      <product-dashboard-card></product-dashboard-card>
    </v-col>
    <v-col cols="12" md="3">
      <auth-dashboard-card></auth-dashboard-card>
    </v-col>

    <v-col cols="12" md="3">
      <company-default-card title="Perusahaan Aktif" :record="companyData">
        <template v-slot:actions>
          <v-btn text nuxt to="/company/select">Ganti</v-btn>
        </template>
      </company-default-card>
    </v-col>
    <v-col cols="12" md="3">
      <branch-default-card title="Cabang Aktif" :record="branchData">
        <template v-slot:actions>
          <v-btn text nuxt to="/branch/select">Ganti</v-btn>
        </template>
      </branch-default-card>
    </v-col>
    <v-col cols="12" md="6">
      <branch-entity-tabs></branch-entity-tabs>
    </v-col>

    <v-col cols="12" md="4"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga.</v-col
    >
    <v-col cols="12" md="4"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga.</v-col
    >
    <v-col cols="12" md="4"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-col
    >

    <v-col cols="12" md="4"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga.</v-col
    >
    <v-col cols="12" md="4"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga.</v-col
    >
    <v-col cols="12" md="4"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-col
    >

    <v-col cols="12" md="4"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga.</v-col
    >
    <v-col cols="12" md="4"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga.</v-col
    >
    <v-col cols="12" md="4"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-col
    >
  </v-row>
</template>

<script>
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import CompanyDashboardCard from "~/components/company/cards/dashboard";
import AssetDashboardCard from "~/components/asset/cards/dashboard";
import ProductDashboardCard from "~/components/product/cards/dashboard";
import AuthDashboardCard from "~/components/auth/cards/dashboard";

import CompanyDefaultCard from "~/components/company/cards/default";
import BranchDefaultCard from "~/components/branch/cards/default";
import BranchEntityTabs from "~/components/branch/entity-tabs";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Dashboard",
    };
  },

  mixins: [MessageExtractor],

  components: {
    CompanyDashboardCard,
    AssetDashboardCard,
    ProductDashboardCard,
    AuthDashboardCard,

    CompanyDefaultCard,
    BranchDefaultCard,
    BranchEntityTabs,
  },

  data: () => ({
    companyData: {},
    branchData: {},
  }),

  mounted() {
    let vm = this;

    // Fetch current company data.
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

    // Fetch current branch data.
    vm.$axios
      .$get("/branch/mine")
      .then(function (result) {
        vm.branchData = Object.assign({}, vm.branchData, result);
      })
      .catch(function (result) {
        vm.$store.commit("global-snackbar/show", {
          color: "error",
          message: vm.messageErrorExtract(result),
        });
      });
  },
};
</script>
