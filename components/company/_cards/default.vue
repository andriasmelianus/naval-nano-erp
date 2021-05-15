<template>
  <v-card max-width="400">
    <v-app-bar flat dense>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-list-item>
      <v-list-item-subtitle>Nama Perusahaan</v-list-item-subtitle>
      <v-list-item-title>{{ record.name }}</v-list-item-title>
    </v-list-item>

    <v-list-item dense>
      <v-list-item-subtitle>Nama Terdaftar</v-list-item-subtitle>
      <v-list-item-title>{{ record.legal_name }}</v-list-item-title>
    </v-list-item>

    <v-list-item dense>
      <v-list-item-subtitle>Email</v-list-item-subtitle>
      <v-list-item-title>
        <a :href="'mailto:' + record.email">{{
          record.email
        }}</a></v-list-item-title
      >
    </v-list-item>

    <v-list-item dense>
      <v-list-item-subtitle>Website</v-list-item-subtitle>
      <v-list-item-title>
        <a :href="record.website" target="_blank" rel="noopener noreferrer">{{
          record.website
        }}</a>
      </v-list-item-title>
    </v-list-item>

    <v-list-item dense>
      <v-list-item-subtitle>Telepon</v-list-item-subtitle>
      <v-list-item-title>{{ record.phone }}</v-list-item-title>
    </v-list-item>

    <v-list-item dense>
      <v-list-item-subtitle>Deskripsi Singkat</v-list-item-subtitle>
      <v-list-item-title>{{ record.short_description }}</v-list-item-title>
    </v-list-item>

    <v-list-item dense>
      <v-list-item-subtitle>Deskripsi</v-list-item-subtitle>
      <v-list-item-title v-text="record.description"></v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text nuxt :to="'/company'">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
