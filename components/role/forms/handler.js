import { GlobalFormHandler } from "~/components/_mixins/global-form-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalFormHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/role"
    },

    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage
  })
};
