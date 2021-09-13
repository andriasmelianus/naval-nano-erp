import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  data: () => ({
    headers: [
      { text: "Peralatan", value: "equipment_name" },
      { text: "Merk", value: "brand" },
      { text: "Model", value: "model" },
      { text: "S/N", value: "serial_number" },
      { text: "Kode", value: "code" },
      { text: "Tgl. Beli", value: "purchase_date_formatted" },
      { text: "Harga", value: "price" },
      { text: "Terdepresiasi", value: "is_deprecated" },
      { text: "Catatan", value: "note" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallHeaders: [
      { text: "Peralatan", value: "equipment_name" },
      { text: "Merk", value: "brand" }
    ],
    singleColumnHeader: [{ text: "Peralatan", value: "equipment_name" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord,

    resourceUri: "/asset"
  })
};
