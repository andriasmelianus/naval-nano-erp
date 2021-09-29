import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

  props: {
    minimumCharacters: {
      type: Number,
      default: 2
    },

    resourceUri: {
      type: String,
      default: "/brand"
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage
  })
};
