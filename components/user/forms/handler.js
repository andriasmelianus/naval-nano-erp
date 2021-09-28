import { GlobalFormHandler } from "~/components/_mixins/global-form-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalFormHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/user"
    },

    record: {
      type: Object,
      default: function() {
        return DefaultRecord;
      }
    },

    /**
     * To distinguish between administrator and self editing.
     * This value is useful to, for example, disable email field when user is editing self data.
     */
    isSelfEdit: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage
  }),

  methods: {
    handleImageDeleteButtonClicked() {
      this.record.image_id = null;
    }
  }
};
