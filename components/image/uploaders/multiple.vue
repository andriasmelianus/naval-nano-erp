<template>
  <div class="pa-2">
    <v-row>
      <v-col cols="12" md="6" class="flex-grow-1 flex-shrink-0">
        <v-file-input
          v-model="filesToBeUploaded"
          :label="placeHolder"
          :accept="accept"
          :multiple="typeof value == 'object'"
          show-size
          prepend-icon="mdi-image"
        >
          <template v-slot:selection="{ text }">
            <v-chip label color="primary">{{ text }}</v-chip>
          </template>
        </v-file-input>
      </v-col>

      <v-col cols="12" md="4" class="flex-grow-1 flex-shrink-0">
        <v-text-field v-model="name" :label="namePlaceHolder"></v-text-field>
      </v-col>

      <v-col cols="12" md="2" class="flex-grow-0 flex-shrink-1">
        <v-btn block color="primary" @click="beginUploadFiles">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="hasMultipleValues">
      <v-col cols="4" v-for="id in value" :key="id">
        <image-card-default
          :value="id"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :width="width"
          :height="height"
          @delete-button-clicked="handleDeleteButtonClicked(id)"
        ></image-card-default>
      </v-col>
    </v-row>

    <v-row v-else-if="hasSingleValue">
      <v-col cols="12">
        <image-card-default
          :value="value"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :width="width"
          :height="height"
          @delete-button-clicked="handleDeleteButtonClicked(value)"
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
