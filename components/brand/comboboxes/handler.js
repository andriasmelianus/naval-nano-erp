import { GlobalComboboxHandler } from "~/components/_mixins/global-combobox-handler";
export const Handler = {
  mixins: [GlobalComboboxHandler],

  props: {
    minimumCharacters: {
      type: Number,
      default: 2
    },

    resourceUri: {
      type: String,
      default: "brand"
    }
  }
};
