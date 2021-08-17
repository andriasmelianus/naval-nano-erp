<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined rounded v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
        {{ user_name }}
      </v-btn>
    </template>

    <v-card flat max-width="350">
      <v-card-text>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <image-card-simple
              :height="100"
              :width="100"
              :value="user_image_id"
            ></image-card-simple>
          </v-col>

          <v-col cols="12" class="text-center">
            <div class="text-h5">{{ user_name }}</div>
            <a :href="'mailto:' + user_email" class="font-weight-thin">{{
              user_email
            }}</a>
            <br />
            <span class="font-weight-thin font-italic"
              >Akun diupdate {{ user_updated_at }}</span
            >
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn elevation="0" color="white" nuxt to="/user/preference">
          <v-icon>mdi-cogs</v-icon>
          Pengaturan
        </v-btn>

        <v-btn icon nuxt dark color="error" to="/logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import ImageCardSimple from "~/components/image/cards/simple.vue";
import { UserData } from "~/components/_mixins/user-data";
export default {
  mixins: [UserData],

  components: {
    ImageCardSimple,
  },
};
</script>
