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
  </div>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
