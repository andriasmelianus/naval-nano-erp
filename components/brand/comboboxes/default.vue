<template>
  <v-combobox
    v-model="selectedRecord"
    :item-text="itemText"
    :hint="hintText"
    :search-input.sync="searchKeyword"
    :loading="isLoading"
    :items="records"
    :return-object="returnObject"
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
  inheritAttrs: false,
  mixins: [Handler],
};
</script>
