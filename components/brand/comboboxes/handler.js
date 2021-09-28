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
    },

    /**
     * Since the brand column store the plain text of brand name,
     * then v-model should return the brand name, not brand ID.
     */
    itemValue: {
      type: String,
      default: "name"
    }
  }
};
