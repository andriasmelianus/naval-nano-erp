import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/branch"
    }
  },

  data: () => ({
    headers: [
      { text: "Kode", value: "code" },
      { text: "Nama", value: "name", align: "left" },
      { text: "Telepon", value: "phone" },
      { text: "Alamat", value: "address" },
      { text: "Kota", value: "city" },
      { text: "Negara", value: "country" },
      { text: "Kode Pos", value: "postal_code" },
      { text: "Diinput", value: "created_at" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallHeaders: [{ text: "Nama", value: "name", align: "left" }],
    singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord
  })
};
