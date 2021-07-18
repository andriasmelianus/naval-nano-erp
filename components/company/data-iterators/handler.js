import { GlobalDataIteratorHandler } from "~/components/_mixins/global-data-iterator-handler";
import { DefaultRecord } from "~/components/company/record";
export const Handler = {
  mixins: [GlobalDataIteratorHandler],

  data: () => ({
    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord,

    resourceUri: "/company"
  })
};
