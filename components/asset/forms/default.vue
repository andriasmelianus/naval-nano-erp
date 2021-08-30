<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Aset Perusahaan</div>

    <equipment-autocomplete
      label="Pilih salah satu peralatan"
      v-model="record.equipment_id"
      :error-message="invalidInputMessage.equipment_id"
    ></equipment-autocomplete>

    <v-text-field
      label="Merk"
      v-model="record.brand_id"
      :error-messages="invalidInputMessage.brand_id"
    ></v-text-field>

    <v-text-field
      label="Model"
      v-model="record.model"
      :error-messages="invalidInputMessage.model"
    ></v-text-field>

    <v-text-field
      label="Serial Number"
      v-model="record.serial_number"
      :error-messages="invalidInputMessage.serial_number"
    ></v-text-field>

    <v-text-field
      label="Kode"
      v-model="record.code"
      :error-messages="invalidInputMessage.code"
    ></v-text-field>

    <v-text-field
      label="Tanggal Beli"
      v-model="record.purchase_date"
      :error-messages="invalidInputMessage.purchase_date"
    ></v-text-field>

    <v-text-field
      label="Harga"
      v-model="record.price"
      :error-messages="invalidInputMessage.price"
    ></v-text-field>

    <v-checkbox
      v-model="record.is_deprecated"
      label="Aset Terdepresiasi"
      :error-messages="invalidInputMessage.is_deprecated"
    ></v-checkbox>

    <v-textarea
      label="Catatan"
      v-model="record.note"
      :error-messages="invalidInputMessage.note"
      rows="3"
    ></v-textarea>

    <v-btn type="submit" color="success">Simpan</v-btn>
  </v-form>
</template>

<script>
import { Handler } from "./handler";
import EquipmentAutocomplete from "~/components/equipment/autocompletes/default.vue";
export default {
  mixins: [Handler],

  components: {
    EquipmentAutocomplete,
  },
};
</script>
