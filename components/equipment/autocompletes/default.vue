<template>
  <v-autocomplete
    v-model="selectedRecord"
    append-icon=""
    :item-text="itemText"
    :item-value="itemValue"
    :hint="hintText"
    :search-input.sync="searchKeyword"
    :loading="isLoading"
    :items="records"
    :return-object="returnObject"
    clearable
    hide-selected
    no-filter
    hide-no-data
    auto-select-first
    v-bind="$attrs"
    v-on="$listeners"
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
  inheritAttrs: false,
  mixins: [Handler],
};
</script>
