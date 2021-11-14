<template>
  <v-card
    hover
    :width="width ? width : undefined"
    :height="height ? height : undefined"
    :href="url"
    :target="target"
    class="text-center justify-center"
  >
    <v-icon :size="iconSize" class="pa-2">{{ icon }}</v-icon>
    <v-card-text>{{ name }}</v-card-text>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
