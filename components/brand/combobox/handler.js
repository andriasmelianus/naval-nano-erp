import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

  props: {
    minimumCharacters: {
      type: Number,
      default: 2
    }
  },

  data: () => ({
    resourceUri: "/brand"
  })
};
