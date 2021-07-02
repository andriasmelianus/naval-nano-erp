<template>
  <v-card max-width="400">
    <v-app-bar flat dense>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <slot>
      <v-list-item>
        <v-list-item-subtitle>Nama Cabang</v-list-item-subtitle>
        <v-list-item-title>{{ record.name }}</v-list-item-title>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-subtitle>Kode Cabang</v-list-item-subtitle>
        <v-list-item-title>{{ record.code }}</v-list-item-title>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-subtitle>Telepon</v-list-item-subtitle>
        <v-list-item-title>{{ record.phone }}</v-list-item-title>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-subtitle>Alamat</v-list-item-subtitle>
        <v-list-item-title>{{ record.address }}</v-list-item-title>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-subtitle>Kota</v-list-item-subtitle>
        <v-list-item-title>{{ record.city }}</v-list-item-title>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-subtitle>Negara</v-list-item-subtitle>
        <v-list-item-title>{{ record.country }}</v-list-item-title>
      </v-list-item>

      <v-list-item dense>
        <v-list-item-subtitle>Kode Pos</v-list-item-subtitle>
        <v-list-item-title>{{ record.postal_code }}</v-list-item-title>
      </v-list-item>
    </slot>

    <v-divider></v-divider>

    <v-card-actions>
      <slot name="actions">
        <v-btn text nuxt :to="'/branch/' + record.id">Edit</v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
