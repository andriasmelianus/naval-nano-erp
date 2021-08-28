<template>
  <v-autocomplete
    label="Peralatan"
    item-text="name"
    item-value="id"
    hint="Ketik 3 karakter untuk mulai mencari"
    append-icon=""
    :search-input.sync="searchKeyword"
    :loading="isLoading"
    :error-messages="invalidInputMessage.email"
    :items="records"
    @change="handleChange"
    clearable
    hide-selected
    no-filter
    return-object
    hide-no-data
    auto-select-first
  >
    <template v-slot:item="{ parent, item }">
      <div>
        {{ item.name }} ({{ item.code }})
        <br />
        <span
          class="text-caption"
          v-text="
            item.description.length > 50
              ? item.description.substring(0, 50) + '...'
              : item.description
          "
        ></span>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
