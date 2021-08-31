import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  data: () => ({
    headers: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Email", value: "email" },
      { text: "Telepon", value: "phone" },
      { text: "Alamat", value: "address" },
      { text: "Kota", value: "city" },
      { text: "Negara", value: "country" },
      { text: "Kode Pos", value: "postal_code" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Email", value: "email" }
    ],
    singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord,

    resourceUri: "/user"
  })
};
