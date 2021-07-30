import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
import {
  DefaultRecord,
  DefaultInvalidInputMessage
} from "~/components/user/record";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

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

    resourceUri: "/user"
  })
};
