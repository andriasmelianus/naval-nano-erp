<template>
  <div class="pa-2">
    <v-row>
      <v-col cols="12" md="6" class="flex-grow-1 flex-shrink-0">
        <v-file-input
          v-model="filesToBeUploaded"
          :label="placeHolder"
          :accept="accept"
          multiple
          show-size
          prepend-icon="mdi-image"
        >
          <template v-slot:selection="{ text }">
            <v-chip label color="primary">{{ text }}</v-chip>
          </template>
        </v-file-input>
      </v-col>

      <v-col cols="12" md="4" class="flex-grow-1 flex-shrink-0">
        <v-text-field v-model="title" :label="titlePlaceHolder"></v-text-field>
      </v-col>

      <v-col cols="12" md="2" class="flex-grow-0 flex-shrink-1">
        <v-btn block color="primary" @click="beginUploadFiles">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="typeof value == 'object'">
      <v-col cols="4" v-for="id in value" :key="id">
        <image-card-default
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :id="id"
          :height="height"
        ></image-card-default>
      </v-col>
    </v-row>

    <v-row v-if="typeof value == 'string' || typeof value == 'number'">
      <v-col cols="12">
        <image-card-default
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :id="value"
          :height="height"
        ></image-card-default>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Handler } from "./handler";
import ImageCardDefault from "../cards/default.vue";
export default {
  mixins: [Handler],

  components: {
    ImageCardDefault,
  },
};
</script>
