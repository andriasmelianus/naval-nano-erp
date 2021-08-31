import { GlobalCardHandler } from "~/components/_mixins/global-card-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalCardHandler],

  props: {
    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    }
  }
};
