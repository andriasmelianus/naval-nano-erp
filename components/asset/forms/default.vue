<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <div class="text-h6">Data Aset Perusahaan</div>

    <room-autocomplete
      label="Ruang menaruh aset"
      v-model="record.room_id"
      :error-message="invalidInputMessage.room_id"
    ></room-autocomplete>

    <equipment-autocomplete
      label="Pilih salah satu peralatan"
      v-model="record.equipment_id"
      :error-message="invalidInputMessage.equipment_id"
    ></equipment-autocomplete>

    <brand-combobox
      label="Merk"
      v-model="record.brand"
      :error-messages="invalidInputMessage.brand"
    ></brand-combobox>

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

    <date-picker
      label="Tanggal Pengadaan"
      v-model="record.purchase_date"
      :error-messages="invalidInputMessage.purchase_date"
    ></date-picker>

    <v-text-field
      label="Harga"
      v-model="record.price"
      :error-messages="invalidInputMessage.price"
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="5">
        <v-checkbox
          v-model="record.is_depreciated"
          label="Aset Terdepresiasi"
          :error-messages="invalidInputMessage.is_depreciated"
        ></v-checkbox>
      </v-col>

      <v-col cols="12" md="7">
        <v-text-field
          label="Jangka Depresiasi"
          hint="Jumlah bulan terjadinya depresiasi aset"
          v-model="record.depreciation_months_count"
          :error-messages="invalidInputMessage.depreciation_months_count"
          :disabled="!record.is_depreciated"
        ></v-text-field>
      </v-col>
    </v-row>

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
import RoomAutocomplete from "~/components/room/autocompletes/default.vue";
import EquipmentAutocomplete from "~/components/equipment/autocompletes/default.vue";
import BrandCombobox from "~/components/brand/comboboxes/default.vue";
import DatePicker from "~/components/_generic/global-date-picker/default.vue";
export default {
  mixins: [Handler],

  components: {
    RoomAutocomplete,
    EquipmentAutocomplete,
    BrandCombobox,
    DatePicker,
  },

  watch: {
    record: {
      handler: function (newRecord, oldRecord) {
        if (newRecord.is_depreciated == false) {
          this.record.depreciation_months_count = undefined;
        }
      },
      deep: true,
    },
  },
};
</script>
