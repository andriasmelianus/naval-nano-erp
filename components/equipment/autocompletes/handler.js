import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
import {
  DefaultRecord,
  DefaultInvalidInputMessage
} from "~/components/user/record";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage,

    resourceUri: "/equipment"
  })
};
