<template>
  <v-app :id="applicationId">
    <v-main>
      <nuxt />
    </v-main>

    <global-snackbar></global-snackbar>
  </v-app>
</template>

<script>
import GlobalSnackbar from "~/components/_support/global-snackbar";
export default {
  components: {
    GlobalSnackbar,
  },

  data: () => ({
    applicationId: process.env.APPLICATION_ID,
  }),
};
</script>

<style>
</style>