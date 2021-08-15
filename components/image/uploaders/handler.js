import { GlobalUploadHandler } from "~/components/_mixins/global-upload-handler";
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

    disableDeleteRequest: {
      type: Boolean,
      default: false
    },

    fieldName: {
      type: String,
      default: "image"
    },

    titlePlaceHolder: {
      type: String,
      default: "Judul Gambar"
    },

    /**
     * Image width to be displayed as uploaded images.
     */
    width: {
      type: Number,
      default: 250
    },
    /**
     * Image height to be displayed as uploaded images.
     */
    height: {
      type: Number,
      default: 250
    }
  },

  data: () => ({
    title: ""
  }),

  watch: {
    /**
     * Set the title to additionalData, so it will appended to form data before upload.
     */
    title(newTitle, oldTitle) {
      this.additionalData[0] = { title: newTitle };
    }
  },

  methods: {
    /**
     * Transfer event fired from image card to the parent component.
     * @param {Number} idToDelete
     */
    handleDeleteButtonClicked(idToDelete) {
      this.$emit("delete-button-clicked", idToDelete);
    }
  }
};
