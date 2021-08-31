<template>
  <v-autocomplete
    item-text="name"
    item-value="name"
    append-icon=""
    :hint="hintText"
    :search-input.sync="searchKeyword"
    :loading="isLoading"
    :items="records"
    clearable
    hide-selected
    no-filter
    hide-no-data
    auto-select-first
    v-bind="$attrs"
    v-on="$listeners"
  ></v-autocomplete>
</template>

<script>
import { Handler } from "./handler";
export default {
  inheritAttrs: false,
  mixins: [Handler],
};
</script>
