<template>
  <v-footer padless color="primary lighten-1" elevation="6">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.title"
        nuxt
        :to="link.to"
        color="white"
        class="my-1"
        text
        rounded
        >{{ link.title }}</v-btn
      >

      <v-col cols="12" class="text-center py-1 primary lighten-2 white--text"
        >Copyright {{ APPLICATION_NAME }} &copy; {{ APPLICATION_YEAR }}</v-col
      >
    </v-row>
  </v-footer>
</template>

<script>
import { items } from "./data/footer-links";
export default {
  data: () => ({
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    APPLICATION_YEAR: process.env.APPLICATION_YEAR,
    links: items,
  }),
};
</script>
