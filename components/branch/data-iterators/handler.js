import { GlobalDataIteratorHandler } from "~/components/_mixins/global-data-iterator-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalDataIteratorHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/branch"
    }
  },

  data: () => ({
    sortableColumns: [{ text: "Nama", value: "name" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord
  })
};
