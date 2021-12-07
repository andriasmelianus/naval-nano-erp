<template>
  <v-menu
    v-model="isShown"
    transition="scale-transition"
    min-width="auto"
    max-width="290px"
    :close-on-content-click="false"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateText"
        append-icon="mdi-calendar"
        :hint="textFormat"
        :label="label"
        v-mask="mask"
        v-bind="$attrs"
        v-on="on"
        persistent-hint
        @blur="handleTextFieldBlur"
      ></v-text-field>
    </template>

    <v-date-picker
      v-model="selectedDate"
      no-title
      @input="isShown = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { Handler } from "./handler";
export default {
  inheritAttrs: false,

  mixins: [Handler],
};
</script>
