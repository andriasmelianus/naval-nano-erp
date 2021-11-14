<template>
  <v-card
    hover
    :width="width ? width : undefined"
    :height="height ? height : undefined"
  >
    <div class="text-center justify-center">
      <v-icon :size="iconSize" class="pa-2">{{ icon }}</v-icon>
    </div>
    <v-card-text class="text-center justify-center">{{ name }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click="handleDownloadButtonClicked" v-show="downloadable">
        <v-icon>mdi-download</v-icon>
      </v-btn>

      <v-btn icon @click="handleDeleteButtonClicked" v-show="deletable">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
