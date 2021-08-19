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
