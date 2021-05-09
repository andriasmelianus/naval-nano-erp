<template>
  <v-row align="center" justify="center">
    <div style="max-width: 700px">
      <div class="text-h1 font-weight-thin">{{ APPLICATION_NAME }}</div>
      <div class="text-body-2">{{ APPLICATION_DESCRIPTION }}</div>
      <div class="text-overline">
        Copyright {{ APPLICATION_NAME }} &copy; {{ APPLICATION_YEAR }}
      </div>
    </div>
  </v-row>
</template>

<script>
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Tentang",
    };
  },

  data() {
    return {
      APPLICATION_NAME: process.env.APPLICATION_NAME,
      APPLICATION_DESCRIPTION: process.env.APPLICATION_DESCRIPTION,
      APPLICATION_YEAR: process.env.APPLICATION_YEAR,
    };
  },
};
</script>
