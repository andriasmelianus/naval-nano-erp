<template>
  <v-combobox
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
    v-bind="$attrs"
    v-on="$listeners"
  ></v-combobox>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
