<template>
  <div class="mb-4">
    <v-row>
      <v-col cols="12" lg="8" class="flex-grow-1 flex-shrink-0">
        <v-file-input
          v-model="fileToBeUploaded"
          :label="placeHolder"
          :accept="accept"
          show-size
          prepend-icon="mdi-file"
        ></v-file-input>
      </v-col>

      <v-col cols="12" lg="4" class="flex-grow-1 flex-shrink-0">
        <v-btn block color="primary" @click="beginUploadFile">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="hasSingleValue">
      <v-col cols="12">
        <default-file-card
          v-model="value"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :downloadable="downloadable"
          :deletable="deletable"
          :width="cardWidth"
          :height="cardHeight"
          :iconSize="iconSize"
          @delete-button-clicked="handleDeleteButtonClicked"
        ></default-file-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Handler } from "./handler";
import DefaultFileCard from "~/components/_support/file/cards/default.vue";
export default {
  mixins: [Handler],

  components: {
    DefaultFileCard,
  },
};
</script>
