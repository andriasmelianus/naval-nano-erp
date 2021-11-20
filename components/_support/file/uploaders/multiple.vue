<template>
  <div class="mb-4">
    <v-row>
      <v-col cols="12" sm="12" lg="6" class="flex-grow-1 flex-shrink-0">
        <v-file-input
          v-model="filesToBeUploaded"
          :label="placeHolder"
          :accept="accept"
          :multiple="typeof value == 'object'"
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

    <v-row v-if="hasMultipleValues">
      <v-col cols="4" v-for="id in value" :key="id">
        <default-file-card
          :value="id"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :width="cardWidth"
          :height="cardHeight"
          @delete-button-clicked="handleDeleteButtonClicked(id)"
        ></default-file-card>
      </v-col>
    </v-row>

    <v-row v-else-if="hasSingleValue">
      <v-col cols="12">
        <default-file-card
          :value="value"
          :parent-resource-uri="parentResourceUri"
          :resource-uri="resourceUri"
          :disable-delete-request="disableDeleteRequest"
          :width="cardWidth"
          :height="cardHeight"
          @delete-button-clicked="handleDeleteButtonClicked(value)"
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
