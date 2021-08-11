<template>
  <v-card>
    <v-img
      :src="source"
      :width="width ? width : '100%'"
      :height="height"
    ></v-img>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
