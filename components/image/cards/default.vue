<template>
  <v-card hover :width="width ? width : undefined">
    <v-img :src="source" :width="width ? width : '100%'" :height="height">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>

        <v-btn color="error" @click="handleDeleteButtonClicked">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-app-bar>
    </v-img>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
