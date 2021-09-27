import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/equipment"
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage
  })
};
