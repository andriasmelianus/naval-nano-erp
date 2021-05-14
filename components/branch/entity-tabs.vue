<template>
  <v-card>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        Pengguna
      </v-tab>
      <v-tab>
        <v-icon left>mdi-page-next</v-icon>
        Ruangan
      </v-tab>
      <v-tab>
        <v-icon left>mdi-broom</v-icon>
        Produk
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <user-default-small-table></user-default-small-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text
            >Ruangan <br />Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Magni voluptatum, voluptas fugit beatae temporibus impedit
            excepturi provident esse ab quasi! Amet, fuga suscipit? Autem nemo
            facilis cumque provident numquam asperiores.</v-card-text
          >
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text
            >Produk <br />Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ipsum, dolorum sequi! Saepe, ut, explicabo pariatur fuga, unde
            placeat a et ullam laborum architecto maxime optio veniam inventore.
            Vero, a ex.</v-card-text
          >
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import UserDefaultSmallTable from "~/components/user/_tables/default-small";
export default {
  components: {
    UserDefaultSmallTable,
  },
};
</script>

<style>
</style>