<template>
  <div class="pa-2">
    <v-row>
      <v-col cols="12" md="7">
        <v-file-input
          v-model="files"
          :label="placeHolder"
          :accept="accept"
          :error-messages="invalidInputMessage.image"
          multiple
          show-size
          prepend-icon="mdi-image"
        >
          <template v-slot:selection="{ text }">
            <v-chip label color="primary">{{ text }}</v-chip>
          </template>
        </v-file-input>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="title" :label="titlePlaceHolder"></v-text-field>
      </v-col>

      <v-col cols="12" md="1">
        <v-btn block color="primary" @click="upload">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="typeof value == 'object'">
      <v-col cols="4" v-for="id in value" :key="id">
        <image-card-default
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :id="id"
          :height="height"
          @delete-button-clicked="handleDeleteButtonClicked"
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
          @delete-button-clicked="handleDeleteButtonClicked"
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

  methods: {
    /**
     *
     */
    handleDeleteButtonClicked(imageId) {
      /**
       * Remove specific item in array.
       * https://stackoverflow.com/a/5767357/7963686
       */
      const initialIdToRemoveIndex = this.initialIds.indexOf(imageId);
      if (initialIdToRemoveIndex > -1) {
        this.initialIds.splice(initialIdToRemoveIndex, 1); // Same result.
        // this.$delete(this.initialIds, initialIdToRemoveIndex); // Deprecated in Vue 3.
      }

      // this.$emit("deleted", imageId);
    },
  },
};
</script>
