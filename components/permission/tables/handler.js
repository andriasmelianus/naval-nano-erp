import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/permission"
    }
  },

  data: () => ({
    headers: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Deskripsi", value: "description" }
    ],
    smallHeaders: [{ text: "Nama", value: "name", align: "left" }],
    singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord
  })
};
