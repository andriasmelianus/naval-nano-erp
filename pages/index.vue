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

    <v-col cols="12" md="8"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur,
      eius provident asperiores voluptatem, aliquam libero voluptatum laboriosam
      fugit autem quis sed, neque obcaecati? Accusamus iure ipsam nisi odio
      cumque fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Reprehenderit, non! Quam eius quo consequatur voluptatem, qui laboriosam
      aperiam laborum enim officia ut? Amet necessitatibus dolore numquam nihil
      excepturi minus dignissimos! lorme
    </v-col>
    <v-col cols="12" md="4"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos iure
      consequatur architecto inventore unde consectetur ex. Quibusdam ipsum vel
      quos dolore voluptatibus, aperiam eaque in, architecto facere, ea
      veritatis voluptatem?</v-col
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
import CompanyDashboardCard from "~/components/company/_card/dashboard";
import AssetDashboardCard from "~/components/asset/_card/dashboard";
import ProductDashboardCard from "~/components/product/_card/dashboard";
import AuthDashboardCard from "~/components/auth/_card/dashboard";
export default {
  layout: "dashboard",
  head() {
    return {
      title: "Dashboard",
    };
  },
  components: {
    CompanyDashboardCard,
    AssetDashboardCard,
    ProductDashboardCard,
    AuthDashboardCard,
  },
};
</script>
