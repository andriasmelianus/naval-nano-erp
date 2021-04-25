<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined rounded v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
        {{ user_name }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="n in 5" :key="n" @click="() => {}"
        >Menu {{ n }}</v-list-item
      >

      <v-list-item nuxt to="/logout">Logout</v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { UserData } from "~/components/_mixins/user-data";
export default {
  mixins: [UserData],
};
</script>
