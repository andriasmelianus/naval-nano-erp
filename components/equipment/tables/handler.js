import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  data: () => ({
    headers: [
      { text: "Kode", value: "code" },
      { text: "Nama", value: "name" },
      { text: "Deskripsi", value: "description" }
    ],
    smallHeaders: [
      { text: "Kode", value: "code" },
      { text: "Nama", value: "name" }
    ],
    singleColumnHeader: [{ text: "Nama", value: "name" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord,

    resourceUri: "/equipment"
  })
};
