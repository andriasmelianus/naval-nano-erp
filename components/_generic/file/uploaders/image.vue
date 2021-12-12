<template>
  <div class="mb-4">
    <v-row>
      <v-col cols="12" lg="8" md="8" sm="12">
        <v-file-input
          v-model="filesToBeUploaded"
          accept="image/*"
          :label="placeHolder"
          :multiple="multiple"
          :prepend-icon="prependIcon"
        >
          <template v-slot:selection="{ text }">
            <v-chip label color="primary">{{ text }}</v-chip>
          </template>
        </v-file-input>
      </v-col>

      <v-col cols="12" lg="4" md="4" sm="12">
        <v-btn block color="primary" @click="beginUploadFiles">Upload</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="isValueSet && hasMultipleValues">
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="4"
        xl="3"
        v-for="singleFileValue in value"
        :key="
          isObject(singleFileValue)
            ? singleFileValue[idProperty]
            : singleFileValue
        "
      >
        <image-default
          :value="singleFileValue"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :deletable="deletable"
          :width="cardWidth"
          :height="cardHeight"
          @delete-button-clicked="handleDeleteButtonClicked"
          @file-deleted="deleteFileById"
          image
        ></image-default>
      </v-col>
    </v-row>

    <v-row v-else-if="isValueSet && hasSingleValue">
      <v-col cols="12">
        <image-default
          :value="isArray(value) ? value[0] : value"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :deletable="deletable"
          :width="cardWidth"
          :height="cardHeight"
          @delete-button-clicked="handleDeleteButtonClicked"
          @file-deleted="deleteFileById"
          image
        ></image-default>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Handler } from "./handler";
import ImageDefault from "../cards/image-default.vue";
export default {
  mixins: [Handler],

  components: {
    ImageDefault,
  },
};
</script>