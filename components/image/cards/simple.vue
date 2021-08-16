<template>
  <v-card hover flat :width="width ? width : undefined">
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
