import { GlobalFormHandler } from "~/components/_mixins/global-form-handler";
import {
  DefaultRecord,
  DefaultInvalidInputMessage
} from "~/components/user/record";
export const Handler = {
  mixins: [GlobalFormHandler],

  props: {
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
    defaultInvalidInputMessage: DefaultInvalidInputMessage,

    resourceUri: "/user"
  }),

  methods: {
    handleImageDeleteButtonClicked() {
      this.record.image_id = null;
    }
  }
};
