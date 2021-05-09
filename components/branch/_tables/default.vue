<template>
  <v-data-table
    :headers="headers"
    :items="records"
    show-select
    single-select
    v-model="selectedRecords"
    :search="searchKeywords"
    @item-selected="handleRecordSelected"
  ></v-data-table>
</template>

<script>
import { Handler } from "~/components/branch/_tables/handler";
export default {
  mixins: [Handler],
};
</script>
