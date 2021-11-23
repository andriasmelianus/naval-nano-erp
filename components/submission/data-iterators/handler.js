import { GlobalDataIteratorHandler } from "~/components/_mixins/global-data-iterator-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalDataIteratorHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/submission"
    }
  },

  data: () => ({
    sortableColumns: [
      { text: "Tanggal", value: "date" },
      { text: "Judul", value: "title" }
    ],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord
  })
};
