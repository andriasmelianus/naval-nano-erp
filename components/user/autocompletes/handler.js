import { GlobalAutocompleteHandler } from "~/components/_mixins/global-autocomplete-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalAutocompleteHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/user"
    },

    searchKeywordRequestParameterName: {
      type: String,
      default: "email"
    },

    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage
  }),

  methods: {
    /**
     * Handle the selected-changed of the v-autocomplete control.
     * @param {Object} selectedRecord
     * @returns {void}
     */
    handleChange(selectedRecord) {
      this.$emit("selected-change", selectedRecord);
    }
  }
};
