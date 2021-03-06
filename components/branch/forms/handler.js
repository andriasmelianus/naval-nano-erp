import { GlobalFormHandler } from "~/components/_mixins/global-form-handler";
import {
  DefaultRecord,
  DefaultInvalidInputMessage
} from "~/components/branch/record";
export const Handler = {
  mixins: [GlobalFormHandler],

  props: {
    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage,

    resourceUri: "/branch"
  })
};
