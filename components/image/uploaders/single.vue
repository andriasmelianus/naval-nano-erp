<template>
  <div class="mb-4">
    <v-row>
      <v-col cols="12" md="8" class="flex-grow-1 flex-shrink-0">
        <v-file-input
          v-model="fileToBeUploaded"
          :label="placeHolder"
          :accept="accept"
          show-size
          prepend-icon="mdi-image"
        ></v-file-input>
      </v-col>

      <v-col cols="12" md="4" class="flex-grow-1 flex-shrink-0">
        <v-btn block color="primary" @click="beginUploadFile">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="value != null">
      <v-col cols="12">
        <image-card-default
          v-model="value"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :width="width"
          :height="height"
          @delete-button-clicked="handleDeleteButtonClicked"
        ></image-card-default>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Handler } from "./handler";
import ImageCardDefault from "~/components/image/cards/default.vue";
export default {
  mixins: [Handler],

  components: {
    ImageCardDefault,
  },
};
</script>
