<template>
  <v-autocomplete
    label="Pilih salah satu..."
    item-text="email"
    item-value="email"
    :search-input.sync="searchKeyword"
    :loading="isLoading"
    :error-messages="invalidInputMessage.email"
    :items="records"
    @change="handleChange"
    no-filter
    return-object
    hide-no-data
    auto-select-first
  ></v-autocomplete>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
