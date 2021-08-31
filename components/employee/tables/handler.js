import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  data: () => ({
    headers: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Jenis ID", value: "id_type" },
      { text: "Nomor ID", value: "id_number" },
      { text: "Telepon I", value: "phone" },
      { text: "Telepon II", value: "phone_alternative" },
      { text: "Email", value: "email" },
      { text: "Alamat", value: "address" },
      { text: "Kota", value: "city" },
      { text: "Negara", value: "country" },
      { text: "Kode Pos", value: "postal_code" },
      { text: "Diupdate", value: "updated_at" },
      { text: "Oleh", value: "user_name" }
    ],
    smallHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Telepon", value: "phone" }
    ],
    singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord,

    resourceUri: "/employee"
  })
};
