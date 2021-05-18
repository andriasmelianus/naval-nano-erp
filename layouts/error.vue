<template>
  <v-app dark>
    <v-row align="center" justify="center">
      <div style="max-width: 700px" class="text-center">
        <div class="text-h3 font-weight-thin">Upss..!</div>
        <div class="text-h5">
          {{ errorMessage }}
        </div>
        <div class="text-subtitle-1">
          (Kode: <b style="color: #f00">{{ error.statusCode }}</b
          >)
        </div>

        <br />

        <div class="text-body-2">
          Untuk keterangan lebih lanjut, silahkan
          <a href="mailto:andriasmelianus@gmail.com">hubungi administrator</a>
          {{ APPLICATION_NAME }}.
        </div>

        <br />

        <v-btn rounded block outlined nuxt to="/" color="primary"
          >Kembali ke Beranda</v-btn
        >
      </div>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: "empty",

  head() {
    const title = this.error.statusCode;
    return {
      title: title,
    };
  },

  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  data: () => ({
    APPLICATION_NAME: process.env.APPLICATION_NAME,
  }),

  computed: {
    errorMessage() {
      let vm = this;
      if (vm.error.statusCode === 404) {
        return "Halaman yang Anda tuju tidak ditemukan.";
      } else {
        return "Terjadi kesalahan pada halaman ini.";
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
