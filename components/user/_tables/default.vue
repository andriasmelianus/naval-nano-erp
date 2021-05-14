<template>
  <v-data-table
    :headers="headers"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    show-select
    single-select
    v-model="selectedRecords"
    :search="searchKeywords"
    @item-selected="handleRecordSelected"
  ></v-data-table>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>
