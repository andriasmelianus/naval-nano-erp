import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  props: {
    reloadAfterModification: {
      type: Boolean,
      default: true
    },

    resourceUri: {
      type: String,
      default: "/asset"
    },

    // Equipment for filtering purpose.
    equipment: {
      type: Object,
      default: function() {
        return { id: 0 };
      }
    }
  },

  watch: {
    equipment(newEquipment, previousEquipment) {
      let vm = this,
        equipment_id = 0;

      if (newEquipment.id != undefined) {
        equipment_id = newEquipment.id;
      }

      vm.selectedRecords = [];
      vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
        equipment_id: equipment_id
      });
    }
  },

  data: () => ({
    headers: [
      { text: "Peralatan", value: "equipment_name" },
      { text: "Merk", value: "brand" },
      { text: "Model", value: "model" },
      { text: "S/N", value: "serial_number" },
      { text: "Kode", value: "code" },
      { text: "Tgl. Beli", value: "readable_purchase_date" },
      { text: "Harga", value: "price" },
      { text: "Terdepresiasi", value: "readable_is_depreciated" },
      { text: "Catatan", value: "note" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallHeaders: [
      { text: "Peralatan", value: "equipment_name" },
      { text: "Merk", value: "brand" }
    ],
    singleColumnHeader: [{ text: "Peralatan", value: "equipment_name" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord
  })
};
