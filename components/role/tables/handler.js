import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "~/components/role/record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  data: () => ({
    headers: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Hak Khusus", value: "special" },
      { text: "Deskripsi", value: "description" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Hak Khusus", value: "special" },
      { text: "Deskripsi", value: "description" }
    ],
    singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord,

    resourceUri: "/role"
  })
};
