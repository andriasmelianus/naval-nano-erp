<template>
  <div class="mb-4">
    <v-row>
      <v-col cols="12" sm="12" lg="6" class="flex-grow-1 flex-shrink-0">
        <v-file-input
          v-model="filesToBeUploaded"
          :label="placeHolder"
          :accept="accept"
          :multiple="multiple"
          :prepend-icon="prependIcon"
        >
          <template v-slot:selection="{ text }">
            <v-chip label color="primary">{{ text }}</v-chip>
          </template>
        </v-file-input>
      </v-col>

      <v-col cols="12" sm="12" lg="6" class="flex-grow-1 flex-shrink-0">
        <v-text-field
          v-model="description"
          placeholder="Deskripsi"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="flex-grow-1 flex-shrink-0">
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
        :key="isObject(singleFileValue) ? singleFileValue.id : singleFileValue"
      >
        <default-file-card
          :value="singleFileValue"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :downloadable="downloadable"
          :deletable="deletable"
          :width="cardWidth"
          :height="cardHeight"
          :iconSize="iconSize"
          @delete-button-clicked="handleDeleteButtonClicked"
          @file-deleted="deleteFileById"
        ></default-file-card>
      </v-col>
    </v-row>

    <v-row v-else-if="isValueSet && hasSingleValue">
      <v-col cols="12">
        <default-file-card
          :value="isArray(value) ? value[0] : value"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :downloadable="downloadable"
          :deletable="deletable"
          :width="cardWidth"
          :height="cardHeight"
          :iconSize="iconSize"
          @delete-button-clicked="handleDeleteButtonClicked"
          @file-deleted="deleteFileById"
        ></default-file-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Handler } from "./handler";
import DefaultFileCard from "../cards/default.vue";
export default {
  mixins: [Handler],

  components: {
    DefaultFileCard,
  },
};
</script>
