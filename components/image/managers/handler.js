import { GlobalUploadHandler } from "~/components/_mixins/global-upload-handler";
import { DefaultRecord, DefaultInvalidInputMessage } from "../record";
export const Handler = {
  mixins: [GlobalUploadHandler],

  props: {
    placeHolder: {
      type: String,
      default: "Pilih Gambar"
    },

    accept: {
      type: String,
      default: "image/*"
    },

    resourceUri: {
      type: String,
      default: "image"
    },

    fieldName: {
      type: String,
      default: "image"
    },

    titlePlaceHolder: {
      type: String,
      default: "Judul Gambar"
    }
  },

  data: () => ({
    defaultInvalidInputMessage: DefaultInvalidInputMessage,
    invalidInputMessage: DefaultInvalidInputMessage,

    title: ""
  }),

  watch: {
    /**
     * Set the title to additionalData, so it will appended to form data before upload.
     * @param {String} newTitle Newly typed title.
     * @param {String} oldTitle Previous typed title.
     */
    title(newTitle, oldTitle) {
      this.additionalData[0] = { title: newTitle };
    }
  }
};
