<template>
  <v-card>
    <v-row>
      <v-col cols="12" md="5">
        <equipment-default-table></equipment-default-table>
        <p class="pa-3 text-caption">
          Data peralatan di sini dapat berupa jenis/satuan barang seperti CPU,
          monitor, printer, scanner dan sebagainya.<br />
          Atau dapat berupa barang yang di dalamnya terdapat beberapa aset
          sekaligus, contohnya 1 set komputer yang di dalamnya terdapat aset
          berupa monitor, CPU, lisensi Windows original.
        </p>
      </v-col>
      <v-col cols="12" md="7">
        <asset-default-table></asset-default-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import EquipmentDefaultTable from "~/components/equipment/tables/default.vue";
import AssetDefaultTable from "./tables/default.vue";
export default {
  components: {
    EquipmentDefaultTable,
    AssetDefaultTable,
  },
};
</script>
