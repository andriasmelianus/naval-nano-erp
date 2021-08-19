<template>
  <v-list two-line>
    <v-subheader>Role Saya</v-subheader>

    <v-list-item v-for="record in records" :key="record.id">
      <v-list-item-content>
        <v-list-item-title>{{ record.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ record.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="records.length == 0">
      <v-list-item-content>
        <v-list-item-title>Tidak memiliki role.</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
