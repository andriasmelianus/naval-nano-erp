import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

  props: {
    minimumCharacters: {
      type: Number,
      default: 2
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage,

    resourceUri: "/room"
  })
};
