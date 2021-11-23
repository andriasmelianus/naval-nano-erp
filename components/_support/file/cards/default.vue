<template>
  <v-card
    hover
    :width="width ? width : undefined"
    :height="height ? height : undefined"
  >
    <div class="text-center justify-center">
      <v-icon
        :size="iconSize"
        class="pa-2"
        @click="handleDownloadButtonClicked"
        >{{ icon }}</v-icon
      >
    </div>
    <v-card-text
      class="text-center justify-center"
      @click="handleDownloadButtonClicked"
      >{{ name }}</v-card-text
    >

    <v-card-actions>
      <v-btn
        block
        @click="handleDeleteButtonClicked"
        v-show="deletable"
        elevation="0"
        rounded
      >
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
